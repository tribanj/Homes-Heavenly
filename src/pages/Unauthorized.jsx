import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Unauthorized.css'; // Optional: Create this file for custom styles

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container text-center mt-5">
      <h1 className="display-4 text-danger">🚫 Access Denied</h1>
      <p className="lead">
        You do not have permission to access this page.
      </p>
      <button className="btn btn-primary mt-4" onClick={() => navigate('/')}>
        Go to Home
      </button>
    </div>
  );
};

export default Unauthorized;
