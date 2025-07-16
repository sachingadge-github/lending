import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid, MenuItem
} from '@mui/material';
import { getBorrowers } from '../../api/borrower';
import { createLoan } from '../../api/loan';

export default function LoanFormDialog({ open, onClose, onSubmit, initialData = {}, mode = 'create' }) {
  const isEdit = mode === 'edit';

  const [borrowers, setBorrowers] = useState([]);
  const [formData, setFormData] = useState({
    borrowerId: '',
    principal: '',
    interestRate: '',
    interestType: 'monthly',
    startDate: '',
    dueDate: '',
    status: 'active',
    collateral: ''
  });

  useEffect(() => {
    const fetchBorrowers = async () => {
      const data = await getBorrowers();
      setBorrowers(data);
    };
    if (open) fetchBorrowers();
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async () => {
  try {
    await onSubmit(formData);
    onClose();
  } catch (err) {
    console.error('Loan submit failed:', err);
    alert('Error while saving loan');
  }
};


  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Loan</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth select label="Borrower" name="borrowerId"
              value={formData.borrowerId} onChange={handleChange} required
            >
              {borrowers.map((b) => (
                <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Principal" name="principal" value={formData.principal} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Interest Rate" name="interestRate" value={formData.interestRate} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth select label="Interest Type" name="interestType" value={formData.interestType} onChange={handleChange}>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth select label="Status" name="status" value={formData.status} onChange={handleChange}>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
              <MenuItem value="defaulted">Defaulted</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField type="date" fullWidth label="Start Date" name="startDate" value={formData.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={6}>
            <TextField type="date" fullWidth label="Due Date" name="dueDate" value={formData.dueDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Collateral" name="collateral" value={formData.collateral} onChange={handleChange} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Create</Button>
      </DialogActions>
    </Dialog>
  );
}
