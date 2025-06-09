import React from 'react';

const CompanyTopbar = () => {
  return (
    <div className="bg-light p-3 border-bottom d-flex justify-content-between align-items-center">
      <h5 className="mb-0">🏘️ Real Estate Company Dashboard</h5>
      <div>
        <span className="me-3">👤 Logged in as: <strong>Company Admin</strong></span>
        <button className="btn btn-outline-danger btn-sm">Logout</button>
      </div>
    </div>
  );
};

export default CompanyTopbar;
