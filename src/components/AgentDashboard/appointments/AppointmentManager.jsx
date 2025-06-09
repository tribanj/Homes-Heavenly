import React from 'react';
import { Link } from 'react-router-dom';

const AppointmentManager = () => {
  return (
    <div className="appointment-manager" style={{ padding: '30px' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2>Appointment Manager</h2>
        <Link to="/agent-dashboard/appointments/add" className="btn btn-primary">➕ Schedule New Appointment</Link>
      </div>

      {/* Appointments Table */}
      <div className="appointments-table">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Client Name</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Property</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Date & Time</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Type</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Status</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy Appointment */}
            <tr>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>Jane Smith</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>3 BHK Luxury Condo</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>2025-05-02 11:00 AM</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>Site Visit</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>Confirmed</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>
                <button className="btn btn-sm btn-info" style={{ marginRight: '5px' }}>View</button>
                <button className="btn btn-sm btn-danger">Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentManager;
