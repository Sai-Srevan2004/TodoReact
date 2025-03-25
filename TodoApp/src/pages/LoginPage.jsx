import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { setUserTasks } from '../redux/taskSlice';  // Load user-specific tasks
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Validate credentials
    const validUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (validUser) {
      dispatch(login({ username }));
      dispatch(setUserTasks(username));   // Load user-specific tasks
      navigate('/add-task');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #cfd9df, #e2ebf0)',  // Light blue gradient
        p: 3
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: '400px',
          p: 4,
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}
        elevation={6}
      >
        <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
          🔐 Login
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Username Input */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Password Input */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Login Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ py: 1.5 }}
        >
          ➡️ Login
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
