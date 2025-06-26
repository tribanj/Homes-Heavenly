// src/components/UserDashboard/MyAppointments.jsx
import React from 'react';

const MyAppointments = () => {
  const appointments = [
    {
      id: 1,
      title: 'Site Visit - 3BHK Noida',
      date: '2025-06-21',
      time: '11:00 AM',
      with: 'Agent: Rahul Sharma',
      status: 'Confirmed',
    },
    {
      id: 2,
      title: 'Consultation - Home Renovation',
      date: '2025-06-22',
      time: '03:30 PM',
      with: 'Builder: DreamHomes Pvt Ltd',
      status: 'Pending',
    },
    {
      id: 3,
      title: 'Discussion - Investment Property',
      date: '2025-06-23',
      time: '02:00 PM',
      with: 'Company: Elite Real Estate',
      status: 'Cancelled',
    },
  ];

  return (
    <div className="p-4">
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments scheduled yet.</p>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>With</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.title}</td>
                  <td>{appt.with}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td>{appt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
