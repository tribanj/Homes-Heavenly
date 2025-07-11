// 📁 src/components/Admindashboard/appointments/AppointmentsManagement.js

import React, { useState } from 'react';
import SidebarMenu from './SidebarMenu';

// Example appointment data
const appointmentData = [
  { id: 1, user: 'Ravi Kumar', property: 'Luxury Villa in Mumbai', date: '2025-04-20', status: 'Pending' },
  { id: 2, user: 'Anita Verma', property: 'Beach House in Chennai', date: '2025-04-22', status: 'Confirmed' },
  { id: 3, user: 'John Fernandes', property: 'Commercial Space in Bangalore', date: '2025-04-25', status: 'Cancelled' },
];

function AppointmentsManagement() {
  const [appointments, setAppointments] = useState(appointmentData);

  // Confirm appointment
  const handleConfirm = (id) => {
    const updated = appointments.map(app => app.id === id ? { ...app, status: 'Confirmed' } : app);
    setAppointments(updated);
  };

  // Cancel appointment
  const handleCancel = (id) => {
    const updated = appointments.map(app => app.id === id ? { ...app, status: 'Cancelled' } : app);
    setAppointments(updated);
  };

  return (
    <div className="admin-dashboard-container">
      {/* <SidebarMenu /> */}

      <div className="container mt-5 admin-dashboard-content">
        <h2>🗓️ Manage Appointments</h2>
        <p>View, confirm, or cancel user appointments for property viewings or service bookings.</p>

        <table className="table table-striped mt-4">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Property</th>
              <th>Appointment Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.user}</td>
                <td>{appointment.property}</td>
                <td>{appointment.date}</td>
                <td>
                  <span className={
                    appointment.status === 'Confirmed' ? 'badge bg-success' :
                    appointment.status === 'Pending' ? 'badge bg-warning' :
                    appointment.status === 'Cancelled' ? 'badge bg-danger' :
                    'badge bg-secondary'
                  }>
                    {appointment.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-success me-2" onClick={() => handleConfirm(appointment.id)}>
                    Confirm
                  </button>
                  <button className="btn btn-sm btn-danger me-2" onClick={() => handleCancel(appointment.id)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {appointments.length === 0 && (
          <div className="alert alert-info text-center">No appointments available.</div>
        )}
      </div>
    </div>
  );
}

export default AppointmentsManagement;
