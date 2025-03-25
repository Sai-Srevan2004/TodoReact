import React, { useEffect } from 'react';
import TaskList from '../components/TaskList';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserTasks } from '../redux/taskSlice';

const AllTasksPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = localStorage.getItem('username');  // Get username from localStorage

  // ✅ Load tasks from localStorage into Redux store on page load
  useEffect(() => {
    if (username) {
      dispatch(setUserTasks(username));
    }
  }, [dispatch, username]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3f2fd',
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

      {/* Task List */}
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
