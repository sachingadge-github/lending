import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

const EditBorrowerModal = ({ open, borrower, onClose, onSave }) => {
const [form, setForm] = useState(borrower);

useEffect(() => {
    setForm(borrower);
}, [borrower]);

const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSave = () => {
    onSave(form);
};

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Borrower</DialogTitle>
            <DialogContent>
                <TextField margin="dense" fullWidth label="Name" name="name" value={form.name || ''} onChange={handleChange} />
                <TextField margin="dense" fullWidth label="Email" name="email" value={form.email || ''} onChange={handleChange} />
                <TextField margin="dense" fullWidth label="Phone" name="phone" value={form.phone || ''} onChange={handleChange} />
                <TextField margin="dense" fullWidth label="KYC Status" name="kycStatus" value={form.kycStatus || ''} onChange={handleChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditBorrowerModal;