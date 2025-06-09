import React, { useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';

const BookingInquiries = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'Amit Sharma',
      project: 'Skyline Towers',
      date: '2025-04-27',
      time: '3:00 PM',
      status: 'pending',
    },
    {
      id: 2,
      name: 'Sneha Rao',
      project: 'Green Valley',
      date: '2025-04-29',
      time: '11:00 AM',
      status: 'approved',
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
  };

  return (
    <div>
      <h4 className="mb-4">📅 Booking Inquiries & Appointments</h4>

      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Project</th>
            <th>Visit Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={req.id}>
              <td>{index + 1}</td>
              <td>{req.name}</td>
              <td>{req.project}</td>
              <td>{req.date}</td>
              <td>{req.time}</td>
              <td>
                <Badge bg={
                  req.status === 'approved'
                    ? 'success'
                    : req.status === 'declined'
                    ? 'danger'
                    : 'warning'
                }>
                  {req.status}
                </Badge>
              </td>
              <td>
                {req.status === 'pending' && (
                  <>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleStatusChange(req.id, 'approved')}
                    >
                      ✅ Approve
                    </Button>{' '}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleStatusChange(req.id, 'declined')}
                    >
                      ❌ Decline
                    </Button>
                  </>
                )}
                {req.status !== 'pending' && (
                  <span className="text-muted">No action</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookingInquiries;
