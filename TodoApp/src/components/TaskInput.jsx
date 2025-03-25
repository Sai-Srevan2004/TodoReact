import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import { TextField, Button, MenuItem, Box, Typography, Alert } from '@mui/material';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Low');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth.user);

  const handleAddTask = () => {
    // Properly validate for empty or whitespace-only tasks
    if (!task || !task.trim()) {
      setError('Please enter a valid task');
      return;  // Exit the function if invalid task
    }

    // Dispatch the task with the username
    dispatch(addTask({
      username: username,   
      task: { task: task.trim(), priority }   // Use trimmed task
    }));

    // Clear the form fields after adding valid task
    setTask('');
    setPriority('Low');
    setError('');  
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
        Add New Task
      </Typography>

      {/* Display error message */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Task Input */}
      <TextField
        label="Task"
        variant="outlined"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        fullWidth
        required
      />

      {/* Priority Selector */}
      <TextField
        select
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        fullWidth
      >
        <MenuItem value="High">🔥 High</MenuItem>
        <MenuItem value="Medium">⚠️ Medium</MenuItem>
        <MenuItem value="Low">✅ Low</MenuItem>
      </TextField>

      {/* Add Task Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTask}
        fullWidth
      >
        ➕ Add Task
      </Button>
    </Box>
  );
};

export default TaskInput;
