import React from 'react';
import TaskList from '../components/TaskList';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AllTasksPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100vw',           // Full viewport width
        height: '100vh',          // Full viewport height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3f2fd',  // Light blue background
        p: 4
      }}
    >
      {/* Heading */}
      <Typography
        variant="h3"
        sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3, textAlign: 'center' }}
      >
        📝 Your To-Do Tasks
      </Typography>

      {/* Task List Table directly on the background */}
      <TaskList />

      {/* Button to Add New Tasks */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={() => navigate('/add-task')}
      >
        ➕ Add New Task
      </Button>
    </Box>
  );
};

export default AllTasksPage;
