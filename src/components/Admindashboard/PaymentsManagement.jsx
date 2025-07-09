// 📁 src/components/Admindashboard/PaymentsManagement.js

import React from 'react';
import { Link } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';  // Correct import if it's in the same folder


function PaymentsManagement() {
  return (
    <div className="admin-dashboard-container">

      {/* Main Content Section */}
      <div className="container mt-5">
        <h1>💰 Payments & Subscriptions</h1>
        <p>Manage and monitor all completed and pending payments and subscriptions here.</p>

        {/* Payments Overview */}
        <h4 className="mt-4 mb-3">Payments Overview</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Total Payments</h5>
                <p className="card-text">View all completed payments made by users.</p>
                <Link to="/admin/payments/overview" className="btn btn-primary">View All Payments</Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Pending Subscriptions</h5>
                <p className="card-text">Check and approve pending subscription payments.</p>
                <Link to="/admin/payments/pending" className="btn btn-primary">View Pending Subscriptions</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Payment History Section */}
        <h4 className="mt-5">Payment History</h4>
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Complete Payment History</h5>
                <p className="card-text">Access detailed transaction records for users.</p>
                <Link to="/admin/payments/history" className="btn btn-primary">View Payment History</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentsManagement;
