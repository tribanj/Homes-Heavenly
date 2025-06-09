// src/components/admindashboard/UserSupport.js

import React, { useState, useEffect } from 'react';

// Mocking complaints data for now
const mockComplaints = [
  { id: 1, user: 'John Doe', issue: 'Unable to log in', status: 'Pending' },
  { id: 2, user: 'Jane Smith', issue: 'Property listing not showing up', status: 'Resolved' },
  { id: 3, user: 'Alice Brown', issue: 'Payment issue', status: 'Pending' },
];

const UserSupport = () => {
  const [complaints, setComplaints] = useState(mockComplaints);

  useEffect(() => {
    // This is where you would fetch real complaint data from an API
    // Example:
    // fetch('/api/complaints')
    //   .then(res => res.json())
    //   .then(data => setComplaints(data));
  }, []);

  const handleResolveComplaint = (id) => {
    // In a real app, update the complaint status via an API request
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: 'Resolved' } : c));
  };

  return (
    <div className="container">
      <h1>User Support & Complaints</h1>
      <p>Manage and resolve user complaints here.</p>

      {/* Complaints Table */}
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Issue</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.user}</td>
              <td>{complaint.issue}</td>
              <td>{complaint.status}</td>
              <td>
                {complaint.status === 'Pending' && (
                  <button className="btn btn-success" onClick={() => handleResolveComplaint(complaint.id)}>
                    Resolve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserSupport;
