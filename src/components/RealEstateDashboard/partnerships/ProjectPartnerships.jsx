import React, { useState } from 'react';
import { Card, Button, Table, Modal, Form } from 'react-bootstrap';

const initialProjects = [
  {
    id: 1,
    name: 'Skyline Heights',
    builder: 'ABC Developers',
    location: 'Whitefield, Bangalore',
    units: 120,
    commission: '2.5%',
    floorPlans: 'Uploaded',
  },
];

const ProjectPartnerships = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    builder: '',
    location: '',
    units: '',
    commission: '',
  });

  const handleAddProject = () => {
    setProjects([...projects, { ...newProject, id: Date.now(), floorPlans: 'Pending' }]);
    setShowAddModal(false);
    setNewProject({ name: '', builder: '', location: '', units: '', commission: '' });
  };

  return (
    <div>
      <h4 className="mb-4">🏗️ Builder Tie-ups & Project Listings</h4>
      <Card className="p-3 shadow-sm mb-4">
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          ➕ Add Builder Project
        </Button>
      </Card>

      <Card className="p-3 shadow-sm">
        <Table bordered responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>Builder</th>
              <th>Location</th>
              <th>Total Units</th>
              <th>Commission</th>
              <th>Floor Plans</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj, index) => (
              <tr key={proj.id}>
                <td>{index + 1}</td>
                <td>{proj.name}</td>
                <td>{proj.builder}</td>
                <td>{proj.location}</td>
                <td>{proj.units}</td>
                <td>{proj.commission}</td>
                <td>{proj.floorPlans}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Modal to Add New Project */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Builder Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Builder Name</Form.Label>
              <Form.Control
                type="text"
                value={newProject.builder}
                onChange={(e) => setNewProject({ ...newProject, builder: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={newProject.location}
                onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total Units</Form.Label>
              <Form.Control
                type="number"
                value={newProject.units}
                onChange={(e) => setNewProject({ ...newProject, units: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Commission (%)</Form.Label>
              <Form.Control
                type="text"
                value={newProject.commission}
                onChange={(e) => setNewProject({ ...newProject, commission: e.target.value })}
              />
            </Form.Group>
            <Button variant="success" onClick={handleAddProject}>
              Save Project
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProjectPartnerships;
