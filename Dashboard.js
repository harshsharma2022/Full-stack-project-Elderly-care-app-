import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Tasks', path: '/tasks' },
    { title: 'Medicine', path: '/medicine' },
    { title: 'Grocery', path: '/grocery' },
    { title: 'Emergency', path: '/emergency' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Elderly Care
      </Typography>
      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
              onClick={() => navigate(item.path)}
            >
              <Typography variant="h6">{item.title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard; 