import React from 'react';
import { Card, Button, Table, Row, Col, Form } from 'react-bootstrap';

const branches = [
  {
    id: 1,
    location: 'Mumbai - Head Office',
    manager: 'Ravi Shah',
    listings: 125,
    activeAgents: 12,
  },
  {
    id: 2,
    location: 'Pune Branch',
    manager: 'Neha Mehra',
    listings: 84,
    activeAgents: 7,
  },
];

const BranchManagement = () => {
  return (
    <div>
      <h4 className="mb-4">🏢 Branch / Franchise Management</h4>

      <Card className="p-4 shadow-sm mb-4">
        <h6>Add New Branch</h6>
        <Form>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control placeholder="Branch Location" />
            </Col>
            <Col md={4}>
              <Form.Control placeholder="Manager Name" />
            </Col>
            <Col md={4}>
              <Button variant="success">➕ Add Branch</Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="p-4 shadow-sm">
        <h5>🏬 Existing Branches</h5>
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Location</th>
              <th>Branch Manager</th>
              <th>Listings</th>
              <th>Active Agents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.id}>
                <td>{branch.location}</td>
                <td>{branch.manager}</td>
                <td>{branch.listings}</td>
                <td>{branch.activeAgents}</td>
                <td>
                  <Button size="sm" variant="outline-primary" className="me-2">View</Button>
                  <Button size="sm" variant="outline-secondary">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default BranchManagement;
