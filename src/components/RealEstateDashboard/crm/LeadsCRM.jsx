import React, { useState } from 'react';
import { Card, Table, Badge, Button, Modal, Form } from 'react-bootstrap';

const initialLeads = [
  {
    id: 1,
    name: 'Rohit Mehra',
    contact: '9876543210',
    status: 'Hot',
    source: 'Website Form',
    agent: 'Pooja Desai',
    lastFollowUp: '2025-04-22',
  },
];

const LeadsCRM = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    contact: '',
    source: '',
    agent: '',
    status: 'Warm',
    lastFollowUp: '',
  });

  const handleAddLead = () => {
    setLeads([
      ...leads,
      {
        id: Date.now(),
        ...newLead,
      },
    ]);
    setShowModal(false);
    setNewLead({
      name: '',
      contact: '',
      source: '',
      agent: '',
      status: 'Warm',
      lastFollowUp: '',
    });
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'Hot':
        return 'danger';
      case 'Warm':
        return 'warning';
      case 'Cold':
        return 'secondary';
      default:
        return 'info';
    }
  };

  return (
    <div>
      <h4 className="mb-4">📋 CRM & Lead Management</h4>

      <Card className="p-3 mb-3 shadow-sm">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          ➕ Add New Lead
        </Button>
      </Card>

      <Card className="p-3 shadow-sm">
        <Table bordered responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Lead Name</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Source</th>
              <th>Assigned Agent</th>
              <th>Last Follow-up</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={lead.id}>
                <td>{index + 1}</td>
                <td>{lead.name}</td>
                <td>{lead.contact}</td>
                <td>
                  <Badge bg={getBadgeVariant(lead.status)}>{lead.status}</Badge>
                </td>
                <td>{lead.source}</td>
                <td>{lead.agent}</td>
                <td>{lead.lastFollowUp}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Modal for Adding New Lead */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Lead Name</Form.Label>
              <Form.Control
                type="text"
                value={newLead.name}
                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                value={newLead.contact}
                onChange={(e) => setNewLead({ ...newLead, contact: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Source</Form.Label>
              <Form.Control
                type="text"
                value={newLead.source}
                onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assign Agent</Form.Label>
              <Form.Control
                type="text"
                value={newLead.agent}
                onChange={(e) => setNewLead({ ...newLead, agent: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lead Status</Form.Label>
              <Form.Select
                value={newLead.status}
                onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
              >
                <option>Hot</option>
                <option>Warm</option>
                <option>Cold</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Follow-Up</Form.Label>
              <Form.Control
                type="date"
                value={newLead.lastFollowUp}
                onChange={(e) => setNewLead({ ...newLead, lastFollowUp: e.target.value })}
              />
            </Form.Group>
            <Button variant="success" onClick={handleAddLead}>
              Save Lead
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LeadsCRM;
