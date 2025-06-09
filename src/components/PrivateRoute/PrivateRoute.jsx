// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';  // This will be used to redirect
import { useAuth } from '../context/AuthContext';  // Import the AuthContext

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();  // Get user and loading state from the context

  // Show a loading message while we're determining if the user is logged in
  if (loading) return <div>Loading...</div>;

  // If no user is logged in, redirect them to the homepage or login page
  if (!user) return <Navigate to="/" />;

  // If the user is logged in, render the protected content
  return children;
};

export default PrivateRoute;
