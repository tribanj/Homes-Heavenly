import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form } from 'react-bootstrap';

const initialBrokers = [
  {
    id: 1,
    name: 'Amit Verma',
    email: 'amit.verma@realestateco.com',
    region: 'South Delhi',
    assignedListings: 12,
    commission: '₹1.2L',
    status: 'Active',
  },
];

const BrokerManagement = () => {
  const [brokers, setBrokers] = useState(initialBrokers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBroker, setNewBroker] = useState({
    name: '',
    email: '',
    region: '',
  });

  const handleAddBroker = () => {
    setBrokers([
      ...brokers,
      {
        id: Date.now(),
        ...newBroker,
        assignedListings: 0,
        commission: '₹0',
        status: 'Pending',
      },
    ]);
    setShowAddModal(false);
    setNewBroker({ name: '', email: '', region: '' });
  };

  return (
    <div>
      <h4 className="mb-4">👥 Broker / Sales Team Management</h4>

      <Card className="p-3 mb-4 shadow-sm">
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          ➕ Onboard New Broker
        </Button>
      </Card>

      <Card className="p-3 shadow-sm">
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>Assigned Listings</th>
              <th>Commission Earned</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {brokers.map((broker, idx) => (
              <tr key={broker.id}>
                <td>{idx + 1}</td>
                <td>{broker.name}</td>
                <td>{broker.email}</td>
                <td>{broker.region}</td>
                <td>{broker.assignedListings}</td>
                <td>{broker.commission}</td>
                <td>{broker.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Add Broker Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Onboard New Broker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={newBroker.name}
                onChange={(e) => setNewBroker({ ...newBroker, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email ID</Form.Label>
              <Form.Control
                type="email"
                value={newBroker.email}
                onChange={(e) => setNewBroker({ ...newBroker, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assigned Region</Form.Label>
              <Form.Control
                type="text"
                value={newBroker.region}
                onChange={(e) => setNewBroker({ ...newBroker, region: e.target.value })}
              />
            </Form.Group>
            <Button variant="success" onClick={handleAddBroker}>
              Add Broker
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BrokerManagement;
