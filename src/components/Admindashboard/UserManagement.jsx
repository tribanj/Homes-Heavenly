// 📁 src/components/Admindashboard/UserManagement.js

import React, { useState } from 'react';
import SidebarMenu from './SidebarMenu';

// Sample user data
const userData = [
  { id: 1, username: 'ravi_kumar', email: 'ravi@example.com', role: 'normal', status: 'Active' },
  { id: 2, username: 'anita_verma', email: 'anita@example.com', role: 'builder', status: 'Inactive' },
  { id: 3, username: 'john_fernandes', email: 'john@example.com', role: 'agent', status: 'Active' },
  { id: 4, username: 'priya_patel', email: 'priya@example.com', role: 'normal', status: 'Inactive' },
];

function UserManagement() {
  const [users, setUsers] = useState(userData);

  // Activate/Deactivate user
  const toggleUserStatus = (id) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <div className="admin-dashboard-container">
      {/* <SidebarMenu /> */}

      <div className="container mt-5 admin-dashboard-content">
        <h2>👥 User Management</h2>
        <p>Manage user accounts, roles, and statuses.</p>

        <table className="table table-striped mt-4">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={
                    user.status === 'Active' ? 'badge bg-success' : 'badge bg-danger'
                  }>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => toggleUserStatus(user.id)}>
                    {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="btn btn-sm btn-info">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="alert alert-info text-center">No users found.</div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
