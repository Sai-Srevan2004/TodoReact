import { createSlice } from '@reduxjs/toolkit';

// Load tasks for the logged-in user
const loadTasksFromLocalStorage = (username) => {
  if (!username) return [];
  const tasks = localStorage.getItem(`tasks_${username}`);
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (username, tasks) => {
  if (username) {
    localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
  }
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: []
  },
  reducers: {
    setUserTasks: (state, action) => {
      state.tasks = loadTasksFromLocalStorage(action.payload);  // Load specific user tasks
    },
    addTask: (state, action) => {
      const { username, task } = action.payload;
      state.tasks.push(task);  // Add the new task
      saveTasksToLocalStorage(username, state.tasks);  // Save to localStorage
    },
    deleteTask: (state, action) => {
      const { username, index } = action.payload;
      
      // Ensure index is valid before deleting
      if (index >= 0 && index < state.tasks.length) {
        state.tasks = state.tasks.filter((_, i) => i !== index);  // Properly remove the task
        saveTasksToLocalStorage(username, state.tasks);  // Save updated list
      }
    },
  }
});

export const { setUserTasks, addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
