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
      state.tasks = loadTasksFromLocalStorage(action.payload);  
    },
    addTask: (state, action) => {
      const { username, task, priority } = action.payload;
      state.tasks.push({ task, priority });
      saveTasksToLocalStorage(username, state.tasks);  // 💾 Save on add
    },
    deleteTask: (state, action) => {
      const { username, index } = action.payload;
      state.tasks.splice(index, 1);
      saveTasksToLocalStorage(username, state.tasks);  // 💾 Save on delete
    },
    clearTasks: (state, action) => {
      const { username } = action.payload;
      state.tasks = [];
      saveTasksToLocalStorage(username, []);  // 💾 Save empty tasks
    }
  }
});

export const { setUserTasks, addTask, deleteTask, clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
