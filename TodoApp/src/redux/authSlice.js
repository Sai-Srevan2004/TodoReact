import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!user,
    user: user || null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));  // Store user in local storage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user');  // Clear local storage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
