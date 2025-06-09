import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form } from 'react-bootstrap';

const initialAppointments = [
  {
    id: 1,
    client: 'Neha Sharma',
    property: '3BHK Flat - Powai',
    date: '2025-04-30',
    time: '11:00 AM',
    agent: 'Rahul Kapoor',
    status: 'Scheduled',
  },
];

const Appointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [showModal, setShowModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    client: '',
    property: '',
    date: '',
    time: '',
    agent: '',
  });

  const handleSchedule = () => {
    setAppointments([
      ...appointments,
      {
        id: Date.now(),
        ...newAppointment,
        status: 'Scheduled',
      },
    ]);
    setShowModal(false);
    setNewAppointment({ client: '', property: '', date: '', time: '', agent: '' });
  };

  return (
    <div>
      <h4 className="mb-4">📅 Booking Requests & Appointments</h4>

      <Card className="p-3 mb-3 shadow-sm">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          ➕ Schedule New Appointment
        </Button>
      </Card>

      <Card className="p-3 shadow-sm">
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Client</th>
              <th>Property</th>
              <th>Date</th>
              <th>Time</th>
              <th>Assigned Agent</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={appt.id}>
                <td>{index + 1}</td>
                <td>{appt.client}</td>
                <td>{appt.property}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.agent}</td>
                <td>{appt.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Modal for Scheduling */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                type="text"
                value={newAppointment.client}
                onChange={(e) => setNewAppointment({ ...newAppointment, client: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Property</Form.Label>
              <Form.Control
                type="text"
                value={newAppointment.property}
                onChange={(e) => setNewAppointment({ ...newAppointment, property: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assign Agent</Form.Label>
              <Form.Control
                type="text"
                value={newAppointment.agent}
                onChange={(e) => setNewAppointment({ ...newAppointment, agent: e.target.value })}
              />
            </Form.Group>
            <Button variant="success" onClick={handleSchedule}>
              Confirm Schedule
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Appointments;
