import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TaskScheduler from './components/tasks/TaskScheduler';
import MedicineTracker from './components/medicine/MedicineTracker';
import GroceryOrdering from './components/grocery/GroceryOrdering';
import EmergencySOS from './components/emergency/EmergencySOS';
import './i18n';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TaskScheduler />
              </PrivateRoute>
            }
          />
          <Route
            path="/medicine"
            element={
              <PrivateRoute>
                <MedicineTracker />
              </PrivateRoute>
            }
          />
          <Route
            path="/grocery"
            element={
              <PrivateRoute>
                <GroceryOrdering />
              </PrivateRoute>
            }
          />
          <Route
            path="/emergency"
            element={
              <PrivateRoute>
                <EmergencySOS />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 