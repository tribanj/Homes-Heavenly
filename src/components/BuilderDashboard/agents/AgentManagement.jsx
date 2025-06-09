import React, { useState } from 'react';
import { Table, Button, Modal, Form, Badge } from 'react-bootstrap';

const AgentManagement = () => {
  const [agents, setAgents] = useState([
    { id: 1, name: 'Ravi Mehta', phone: '9876543210', email: 'ravi@agent.com', assignedProjects: 2, status: 'active' },
    { id: 2, name: 'Pooja Shah', phone: '9123456780', email: 'pooja@broker.com', assignedProjects: 0, status: 'inactive' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '', phone: '', email: '', assignedProjects: 0, status: 'active',
  });

  const handleAddAgent = () => {
    const updatedList = [...agents, { ...newAgent, id: Date.now() }];
    setAgents(updatedList);
    setNewAgent({ name: '', phone: '', email: '', assignedProjects: 0, status: 'active' });
    setShowModal(false);
  };

  const handleToggleStatus = (id) => {
    const updated = agents.map(agent =>
      agent.id === id
        ? { ...agent, status: agent.status === 'active' ? 'inactive' : 'active' }
        : agent
    );
    setAgents(updated);
  };

  return (
    <div>
      <h4 className="mb-4">👥 Agent / Broker Management</h4>

      <Button variant="success" className="mb-3" onClick={() => setShowModal(true)}>
        ➕ Add New Agent
      </Button>

      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Agent Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Assigned Projects</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, idx) => (
            <tr key={agent.id}>
              <td>{idx + 1}</td>
              <td>{agent.name}</td>
              <td>{agent.phone}</td>
              <td>{agent.email}</td>
              <td>{agent.assignedProjects}</td>
              <td>
                <Badge bg={agent.status === 'active' ? 'success' : 'secondary'}>
                  {agent.status}
                </Badge>
              </td>
              <td>
                <Button
                  size="sm"
                  variant="outline-warning"
                  onClick={() => handleToggleStatus(agent.id)}
                >
                  🔄 Toggle Status
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Agent Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Onboard New Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Agent Name</Form.Label>
              <Form.Control
                value={newAgent.name}
                onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                value={newAgent.phone}
                onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={newAgent.email}
                onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
              />
            </Form.Group>
            <Button variant="success" onClick={handleAddAgent}>
              ✅ Add Agent
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AgentManagement;
