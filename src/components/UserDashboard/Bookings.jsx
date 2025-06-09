import React, { useState } from 'react';
import './Bookings.css';

const Bookings = () => {
  const [services] = useState([
    { id: 1, name: 'Home Cleaning', slot: '10:00 AM', status: 'Booked' },
    { id: 2, name: 'Plumbing', slot: '2:00 PM', status: 'In Progress' }
  ]);

  const [appointments] = useState([
    { id: 1, purpose: 'Property Visit', time: 'April 28, 11:00 AM', status: 'Scheduled' },
    { id: 2, purpose: 'Loan Consultation', time: 'May 2, 3:00 PM', status: 'Rescheduled' }
  ]);

  return (
    <div className="bookings">
      <h2>📋 My Bookings</h2>

      <div className="section">
        <h3>🛠️ Services</h3>
        <ul className="item-list">
          {services.map(service => (
            <li key={service.id}>
              <strong>{service.name}</strong> at {service.slot} <br />
              Status: <span>{service.status}</span>
            </li>
          ))}
        </ul>
        <div className="action">
          <button disabled>+ Book New Service</button>
        </div>
      </div>

      <div className="section">
        <h3>📅 Appointments</h3>
        <ul className="item-list">
          {appointments.map(app => (
            <li key={app.id}>
              <strong>{app.purpose}</strong> on {app.time} <br />
              Status: <span>{app.status}</span>
            </li>
          ))}
        </ul>
        <div className="action">
          <button disabled>+ Schedule New Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
