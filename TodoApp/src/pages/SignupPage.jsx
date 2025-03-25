import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    setError('');
    setSuccess('');

    if (!username || !password || !confirmPassword) {
      setError('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Get existing users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check for duplicate username
    const isUserExists = users.some((user) => user.username === username);
    if (isUserExists) {
      setError('Username already exists!');
      return;
    }

    // Save the new user to local storage
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setSuccess('Signup successful!');
    setTimeout(() => {
      navigate('/');  // Redirect to login page
    }, 1500);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #cfd9df, #e2ebf0)',  // Light gradient background
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
        {/* Signup Heading */}
        <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3 }}>
          ✍️ Signup
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

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
          sx={{ mb: 2 }}
        />

        {/* Confirm Password Input */}
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Signup Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignup}
          sx={{ py: 1.5 }}
        >
          ✅ Signup
        </Button>
      </Paper>
    </Box>
  );
};

export default SignupPage;
