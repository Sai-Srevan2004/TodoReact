import React from 'react';
import TaskInput from '../components/TaskInput';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';


const AddTaskPage = () => {
  const { username } = useSelector((state) => state.auth.user);

  return (
    <Box
      sx={{
        width: '100vw',           // Full viewport width         // Full viewport height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',  // Light blue background
        p: 3
      }}
    >
      {/* Welcome Message */}
      <Typography
        variant="h3"
        sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3, textAlign: 'center' }}
      >
        🚀 Welcome to To-Do App {username}
      </Typography>

      {/* Task Input Section */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          p: 4,
          borderRadius: '12px',
          backgroundColor: '#fff',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        }}
      >
        <TaskInput />
      </Box>
    </Box>
  );
};

export default AddTaskPage;
