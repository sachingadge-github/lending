import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import MainCard from 'components/MainCard';
import {MaterialReactTable} from 'material-react-table';
import { createLoan, getLoans, deleteLoan, updateLoan } from '../../api/loan';

import LoanFormDialog from './LoanFormDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


const LoanList = () => {
    const [loans, setLoans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openCreate, setOpenCreate] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState({ open: false, loan: null });

    console.log(selectedLoan, 'selectedLoan');
    
  const fetchLoans = async () => {
    try {
      const data = await getLoans();
      setLoans(data);
    } catch (error) {
      console.error('Failed to fetch loans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const columns = [
  { accessorKey: 'borrowerId', header: 'Borrower ID' },
  { accessorKey: 'principal', header: 'Principal' },
  { accessorKey: 'interestRate', header: 'Interest Rate (%)' },
  { accessorKey: 'interestType', header: 'Type' },
  { accessorKey: 'startDate', header: 'Start Date' },
  { accessorKey: 'dueDate', header: 'Due Date' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'collateral', header: 'Collateral' },
  {
    accessorKey: 'actions',
    header: 'Actions',
    Cell: ({ row }) => (
      <>
        <IconButton
          color="primary"
          onClick={() => {
            setSelectedLoan(row.original);
            setEditMode(true);
            setOpenCreate(true);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => setConfirmDelete({ open: true, loan: row.original })}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ),
    enableSorting: false,
    enableColumnFilter: false
  }
];


const handleLoanSave = async (data) => {
    console.log(editMode, selectedLoan?.id);
    
  if (editMode && selectedLoan?.id) {
    await updateLoan(selectedLoan.id, data);
  } else {
    await createLoan(data);
  }
  fetchLoans();
};

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Loans</Typography>
          <Button variant="contained" onClick={() => setOpenCreate(true)}>Add Loan</Button>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <MaterialReactTable
            columns={columns}
            data={loans}
            state={{ isLoading }}
          />
        </MainCard>
      </Grid>

      <LoanFormDialog
        open={openCreate}
        onClose={() => {
            setOpenCreate(false);
            setSelectedLoan(null);
            setEditMode(false);
        }}
        initialData={selectedLoan || {}}
        onSubmit={handleLoanSave}
        mode={editMode ? 'edit' : 'create'}
        />

      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, loan: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this loan?</DialogContent>
        <DialogActions>
            <Button onClick={() => setConfirmDelete({ open: false, loan: null })}>Cancel</Button>
            <Button
            variant="contained"
            color="error"
            onClick={async () => {
                await deleteLoan(confirmDelete.loan.id);
                setConfirmDelete({ open: false, loan: null });
                fetchLoans();
            }}
            >
            Delete
            </Button>
        </DialogActions>
        </Dialog>

    </Grid>
  );
};

export default LoanList;
