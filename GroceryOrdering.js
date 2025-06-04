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

const GroceryOrdering = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    category: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewItem({ name: '', quantity: '', category: '' });
  };

  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddItem = () => {
    if (newItem.name.trim()) {
      setItems([...items, { ...newItem, id: Date.now() }]);
      handleClose();
    }
  };

  const handleDeleteItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Grocery Ordering
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        sx={{ mb: 3 }}
      >
        Add Item
      </Button>
      <Paper>
        <List>
          {items.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Quantity: {item.quantity}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="textSecondary">
                      Category: {item.category}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Item Name"
            type="text"
            fullWidth
            value={newItem.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="quantity"
            label="Quantity"
            type="text"
            fullWidth
            value={newItem.quantity}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            value={newItem.category}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddItem} variant="contained">
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GroceryOrdering; 