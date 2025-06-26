// src/components/UserDashboard/MyServiceRequests.jsx
import React from 'react';

const MyServiceRequests = () => {
  const serviceRequests = [
    {
      id: 1,
      service: 'Book Property Valuation',
      date: '2025-06-15',
      status: 'In Progress',
    },
    {
      id: 2,
      service: 'RERA Legal Support',
      date: '2025-06-10',
      status: 'Completed',
    },
    {
      id: 3,
      service: 'Smart Home Installation',
      date: '2025-06-05',
      status: 'Pending',
    },
  ];

  return (
    <div className="p-4">
      <h2>My Service Requests</h2>
      {serviceRequests.length === 0 ? (
        <p>You haven't requested any services yet.</p>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Service</th>
                <th>Date Requested</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {serviceRequests.map((req) => (
                <tr key={req.id}>
                  <td>{req.service}</td>
                  <td>{req.date}</td>
                  <td>{req.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyServiceRequests;
