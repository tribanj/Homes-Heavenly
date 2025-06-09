// src/components/UserDashboard/DashboardContent.js
import React from 'react';

const DashboardContent = ({ title }) => {
  return (
    <div className="dashboard-content">
      <h2>{title}</h2>
      <p>This is a placeholder for {title} content.</p>
    </div>
  );
};

export default DashboardContent;
