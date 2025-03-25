import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromLocalStorage = (username) => {
  if (typeof window === "undefined" || !username) return [];
  const tasks = localStorage.getItem(`tasks_${username}`);
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (username, tasks) => {
  if (typeof window !== "undefined" && username) {
    localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
  }
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: []
  },
  reducers: {
    // Load user-specific tasks
    setUserTasks: (state, action) => {
      state.tasks = loadTasksFromLocalStorage(action.payload);
    },
    // Add task and save to localStorage
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(action.payload.username, state.tasks);
    },
    // Delete task and save to localStorage
    deleteTask: (state, action) => {
      const { username, index } = action.payload;
      state.tasks.splice(index, 1);
      saveTasksToLocalStorage(username, state.tasks);
    },
    // Clear tasks
    clearTasks: (state) => {
      state.tasks = [];
    }
  }
});

export const { setUserTasks, addTask, deleteTask, clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
