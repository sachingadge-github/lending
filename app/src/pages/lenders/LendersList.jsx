import React, { useEffect, useState } from 'react';
import { Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material';
import MainCard from '../../components/MainCard';
import { getLenders } from '../../api/user';
import { MaterialReactTable } from 'material-react-table';


// import React, { useEffect, useState } from 'react';
// import { Grid, Typography } from '@mui/material';
// import MainCard from '../../components/MainCard
// ';
// import { getLenders } from '../../api/user';
// import MaterialReactTable from 'material-react-table';


const LendersList = () => {
  const [lenders, setLenders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLenders = async () => {
      try {
        const data = await getLenders();

        console.log(data,'data')
        setLenders(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching lenders', err);
      }
    };

    loadLenders();
  }, []);

   const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'isEmailVerified',
      header: 'Status',
      Cell: ({ cell }) => (cell.getValue() ? 'Verified' : 'Pending'),
    },
  ];
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7} lg={8}>

        <MainCard sx={{ mt: 2 }} content={false}>
          <MaterialReactTable
            columns={columns}
            data={lenders}
            state={{ isLoading }}
            enableColumnFilters
            enableSorting
            enablePagination
            muiTableContainerProps={{ sx: { maxHeight: '500px' } }}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default LendersList;
