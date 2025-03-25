import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddTaskPage from './pages/AddTaskPage';
import AllTasksPage from './pages/AllTasksPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';  // Import ProtectedRoute
import './styles/App.css';
import { Box } from '@mui/material';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor:'#f0f8ff',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Navbar />

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected Routes */}
              <Route path="/add-task" element={<ProtectedRoute><AddTaskPage /></ProtectedRoute>} />
              <Route path="/all-tasks" element={<ProtectedRoute><AllTasksPage /></ProtectedRoute>} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </Provider>
  );
};

export default App;
