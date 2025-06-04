import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const EmergencySOS = () => {
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewContact({ name: '', phone: '', relationship: '' });
  };

  const handleChange = (e) => {
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddContact = () => {
    if (newContact.name.trim() && newContact.phone.trim()) {
      setContacts([...contacts, { ...newContact, id: Date.now() }]);
      handleClose();
    }
  };

  const handleDeleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  const handleEmergencyCall = () => {
    // In a real application, this would trigger an emergency call
    alert('Emergency services have been notified. Help is on the way!');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Emergency SOS
      </Typography>
      <Button
        variant="contained"
        color="error"
        size="large"
        fullWidth
        onClick={handleEmergencyCall}
        sx={{ mb: 3 }}
      >
        EMERGENCY SOS
      </Button>

      <Typography variant="h6" gutterBottom>
        Emergency Contacts
      </Typography>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        sx={{ mb: 3 }}
      >
        Add Contact
      </Button>
      <Paper>
        <List>
          {contacts.map((contact) => (
            <ListItem key={contact.id}>
              <ListItemText
                primary={contact.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Phone: {contact.phone}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="textSecondary">
                      Relationship: {contact.relationship}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteContact(contact.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Emergency Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Contact Name"
            type="text"
            fullWidth
            value={newContact.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone Number"
            type="tel"
            fullWidth
            value={newContact.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="relationship"
            label="Relationship"
            type="text"
            fullWidth
            value={newContact.relationship}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddContact} variant="contained">
            Add Contact
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmergencySOS; 