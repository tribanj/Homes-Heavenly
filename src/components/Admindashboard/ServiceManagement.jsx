import React, { useState } from 'react';
import SidebarMenu from './SidebarMenu';

// 🧾 Dummy Service Request Data
const initialServiceRequests = [
  { id: 1, type: 'Property Inspection', user: 'Ravi Kumar', status: 'Pending', date: '2025-04-20' },
  { id: 2, type: 'Legal Verification', user: 'Aisha Mehta', status: 'Pending', date: '2025-04-19' },
  { id: 3, type: 'Home Loan Assistance', user: 'John Fernandes', status: 'Approved', date: '2025-04-18' },
  { id: 4, type: 'Property Valuation', user: 'Meera Shah', status: 'Rejected', date: '2025-04-17' }
];

function ServiceManagement() {

  const [requests, setRequests] = useState(initialServiceRequests);

  const handleApprove = (id) => {
    const updated = requests.map(req => req.id === id ? { ...req, status: 'Approved' } : req);
    setRequests(updated);
  };

  const handleReject = (id) => {
    const updated = requests.map(req => req.id === id ? { ...req, status: 'Rejected' } : req);
    setRequests(updated);
  };

  const handleDelete = (id) => {
    const updated = requests.filter(req => req.id !== id);
    setRequests(updated);
  };

  return (
    <div className="admin-dashboard-container">
      <SidebarMenu />
      <div className="container mt-5 admin-dashboard-content">
        <h2>🛠️ Manage Service Requests</h2>
        <p>Approve, reject, or delete user service requests.</p>

        <table className="table table-hover mt-4">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Service Type</th>
              <th>Requested By</th>
              <th>Status</th>
              <th>Request Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.type}</td>
                <td>{req.user}</td>
                <td>
                  <span className={
                    req.status === 'Approved' ? 'badge bg-success' :
                    req.status === 'Pending' ? 'badge bg-warning' :
                    req.status === 'Rejected' ? 'badge bg-danger' :
                    'badge bg-secondary'
                  }>
                    {req.status}
                  </span>
                </td>
                <td>{req.date}</td>
                <td>
                  <button className="btn btn-sm btn-success me-2" onClick={() => handleApprove(req.id)}>Approve</button>
                  <button className="btn btn-sm btn-danger me-2" onClick={() => handleReject(req.id)}>Reject</button>
                  <button className="btn btn-sm btn-secondary" onClick={() => handleDelete(req.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <div className="alert alert-info text-center">No service requests available.</div>
        )}
      </div>
    </div>
  );
}

export default ServiceManagement;
