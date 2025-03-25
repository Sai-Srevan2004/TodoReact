import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import { TextField, Button, MenuItem, Box, Typography, Alert } from '@mui/material';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask = { username, task, priority };

      // Dispatch to Redux and save in local storage
      dispatch(addTask(newTask));

      // Clear form fields
      setTask('');
      setPriority('Medium');
      setError('');
    } else {
      setError('Please enter a valid task');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
        Add New Task
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {/* Task Input */}
      <TextField
        label="Task"
        variant="outlined"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        fullWidth
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
