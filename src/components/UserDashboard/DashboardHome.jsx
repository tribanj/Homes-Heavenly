// src/components/UserDashboard/DashboardHome.jsx
import React from 'react';

const DashboardHome = () => {
  return (
    <div className="p-4">
      <h2>Welcome to Your Dashboard</h2>
      <p>This is your personal space to manage your properties, inquiries, and profile.</p>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Properties</h5>
              <p className="card-text">3</p> {/* Replace with dynamic count later */}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Inquiries Received</h5>
              <p className="card-text">5</p> {/* Replace with dynamic count later */}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-info mb-3">
            <div className="card-body">
              <h5 className="card-title">Profile Status</h5>
              <p className="card-text">Complete</p> {/* Replace with dynamic status later */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
