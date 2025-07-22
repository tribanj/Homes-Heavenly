import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  // 👇 Check: User is NOT logged in → redirect to /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 👇 Optional: Check role if allowedRoles is passed
  if (allowedRoles?.length > 0) {
    const normalizedRole = userRole?.toLowerCase();
    const allowed = allowedRoles.map(role => role.toLowerCase());
    if (!allowed.includes(normalizedRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // ✅ Access granted
  return children;
};

export default ProtectedRoute;
