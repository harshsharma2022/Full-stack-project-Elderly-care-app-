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

const TaskScheduler = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTask({ title: '', description: '', dueDate: '' });
  };

  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      handleClose();
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Task Scheduler
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        sx={{ mb: 3 }}
      >
        Add Task
      </Button>
      <Paper>
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id}>
              <ListItemText
                primary={task.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      {task.description}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="textSecondary">
                      Due: {task.dueDate}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Task Title"
            type="text"
            fullWidth
            value={newTask.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newTask.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={newTask.dueDate}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTask} variant="contained">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskScheduler; 