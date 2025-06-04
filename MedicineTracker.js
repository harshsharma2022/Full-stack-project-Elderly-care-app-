import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const MedicineTracker = () => {
  const [medicines, setMedicines] = useState([]);
  const [open, setOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    frequency: '',
    time: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewMedicine({ name: '', dosage: '', frequency: '', time: '' });
  };

  const handleChange = (e) => {
    setNewMedicine({
      ...newMedicine,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMedicine = () => {
    if (newMedicine.name.trim()) {
      setMedicines([...medicines, { ...newMedicine, id: Date.now() }]);
      handleClose();
    }
  };

  const handleDeleteMedicine = (medicineId) => {
    setMedicines(medicines.filter((medicine) => medicine.id !== medicineId));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Medicine Tracker
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        sx={{ mb: 3 }}
      >
        Add Medicine
      </Button>
      <Paper>
        <List>
          {medicines.map((medicine) => (
            <ListItem key={medicine.id}>
              <ListItemText
                primary={medicine.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Dosage: {medicine.dosage}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Frequency: {medicine.frequency}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="textSecondary">
                      Time: {medicine.time}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteMedicine(medicine.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Medicine</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Medicine Name"
            type="text"
            fullWidth
            value={newMedicine.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="dosage"
            label="Dosage"
            type="text"
            fullWidth
            value={newMedicine.dosage}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="frequency"
            label="Frequency"
            type="text"
            fullWidth
            value={newMedicine.frequency}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="time"
            label="Time"
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={newMedicine.time}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddMedicine} variant="contained">
            Add Medicine
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MedicineTracker; 