import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Redirect unauthenticated users to the login page
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
