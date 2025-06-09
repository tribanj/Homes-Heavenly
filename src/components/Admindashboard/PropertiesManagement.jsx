// 📁 src/components/admindashboard/properties/PropertiesManagement.js

import React from 'react';
import { Link } from 'react-router-dom';

function PropertiesManagement() {
  return (
    <div className="container mt-5">
      <h1>🏠 Properties Management</h1>
      <p>Here you can review, approve, reject or delete user-submitted property listings.</p>

      {/* Example Property Table */}
      <div className="table-responsive mt-4">
        <table className="table table-striped table-bordered shadow-sm">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Location</th>
              <th>Type</th>
              <th>Status</th>
              <th>Posted By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy Data */}
            <tr>
              <td>1</td>
              <td>Luxury Villa in Mumbai</td>
              <td>Mumbai, India</td>
              <td>Sale</td>
              <td>Pending</td>
              <td>user123</td>
              <td>
                <button className="btn btn-success btn-sm mx-1">Approve</button>
                <button className="btn btn-danger btn-sm mx-1">Reject</button>
                <button className="btn btn-warning btn-sm mx-1">Delete</button>
              </td>
            </tr>
            {/* More rows later from backend */}
          </tbody>
        </table>
      </div>

      {/* Back Button */}
      <Link to="/admin" className="btn btn-secondary mt-3">⬅️ Back to Dashboard</Link>
    </div>
  );
}

export default PropertiesManagement;
