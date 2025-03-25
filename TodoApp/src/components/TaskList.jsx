import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, setUserTasks } from '../redux/taskSlice';   // Import setUserTasks
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Chip, Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

   const { username } = useSelector((state) => state.auth.user);
 

  // ✅ Load tasks from localStorage on component mount
  useEffect(() => {
    if (username) {
      dispatch(setUserTasks(username));   // Load tasks into Redux store
    }
  }, [dispatch,username]);

  return (
    <TableContainer component={Paper} sx={{ boxShadow: '0 8px 16px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="task table">

        {/* Table Header */}
        <TableHead>
          <TableRow sx={{ backgroundColor: '#1976d2' }}>
            <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Task</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#fff' }} align="center">Priority</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: '#fff' }} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#f0f8ff' }  // Light hover effect
                }}
              >
                {/* Task Column */}
                <TableCell sx={{ maxWidth: '350px', wordWrap: 'break-word' }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
                    {task.task}
                  </Typography>
                </TableCell>

                {/* Priority Column */}
                <TableCell align="center">
                  <Chip
                    label={task.priority}
                    color={task.priority === 'High' ? 'error' : task.priority === 'Medium' ? 'warning' : 'success'}
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>

                {/* Delete Icon Column */}
                <TableCell align="center">
                  <Tooltip title="Delete Task" arrow>
                    <IconButton
                      onClick={() => dispatch(deleteTask({
                        username: user.username,    // Pass username
                        index                       // Task index
                      }))}
                      sx={{ color: '#d32f2f', '&:hover': { color: '#f00' } }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography sx={{ color: '#555' }}>No tasks available</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;
