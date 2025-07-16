import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
  Stack,
  InputLabel,
  OutlinedInput,
  FormHelperText
} from '@mui/material';
import MainCard from '../../components/MainCard';
import { getBorrowers, createBorrower, updateBorrower, deleteBorrower } from '../../api/borrower';
import { MaterialReactTable } from 'material-react-table';
import { Edit, Delete } from '@mui/icons-material';

const defaultFormData = {
  name: '',
  email: '',
  phone: '',
  kycStatus: 'pending'
};

const BorrowerList = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const fetchBorrowers = async () => {
    try {
      setIsLoading(true);
      const data = await getBorrowers();
      console.log(data, 'data');
      
      setBorrowers(data);
    } catch (error) {
      console.error('Failed to fetch borrowers', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowers();
  }, []);

  const handleFormOpen = (borrower = defaultFormData) => {
    setFormData(borrower);
    setEditingId(borrower._id || null);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setFormData(defaultFormData);
    setEditingId(null);
  };

  const handleFormSubmit = async () => {
    try {
      if (editingId) {
        await updateBorrower(editingId, formData);
        setToast({ open: true, message: 'Borrower updated', severity: 'success' });
      } else {
        await createBorrower(formData);
        setToast({ open: true, message: 'Borrower created', severity: 'success' });
      }
      fetchBorrowers();
      handleFormClose();
    } catch (error) {
      console.error(error);
      setToast({ open: true, message: 'Error saving borrower', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this borrower?')) {
      try {
        await deleteBorrower(id);
        fetchBorrowers();
        setToast({ open: true, message: 'Borrower deleted', severity: 'success' });
      } catch (err) {
        console.error(err);
        setToast({ open: true, message: 'Failed to delete borrower', severity: 'error' });
      }
    }
  };

  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'kycStatus', header: 'KYC Status' },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <>
          <IconButton onClick={() => handleFormOpen(row.original)}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.original.id)}>
            <Delete fontSize="small" />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Borrowers</Typography>
          <Button variant="contained" onClick={() => handleFormOpen()}>Add Borrower</Button>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <MaterialReactTable
            columns={columns}
            data={borrowers}
            state={{ isLoading }}
            enableColumnFilters
            enableSorting
            enablePagination
          />
        </MainCard>
      </Grid>

      <Dialog open={formOpen} onClose={handleFormClose} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? 'Edit Borrower' : 'Add Borrower'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <Stack spacing={1}>
              <InputLabel>Name</InputLabel>
              <OutlinedInput
                fullWidth
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter name"
              />
            </Stack>
            <Stack spacing={1}>
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                fullWidth
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
              />
            </Stack>
            <Stack spacing={1}>
              <InputLabel>Phone</InputLabel>
              <OutlinedInput
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </Stack>
            <Stack spacing={1}>
              <InputLabel>KYC Status</InputLabel>
              <OutlinedInput
                fullWidth
                name="kycStatus"
                value={formData.kycStatus}
                onChange={(e) => setFormData({ ...formData, kycStatus: e.target.value })}
                placeholder="pending | verified | rejected"
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained">
            {editingId ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default BorrowerList;
