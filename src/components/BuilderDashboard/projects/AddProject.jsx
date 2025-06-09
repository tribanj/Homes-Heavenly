import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const AddNewProject = () => {
  const [project, setProject] = useState({
    name: '',
    location: '',
    type: 'Residential',
    description: '',
    launchDate: '',
    rera: '',
    status: 'Upcoming',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('✅ Project Submitted:', project);
    // TODO: Save to backend or local state
  };

  return (
    <Card className="p-4 shadow-sm border-0">
      <h4 className="mb-4">📝 Add New Project - Step 1: Project Details</h4>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            placeholder="Enter project name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={project.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Project Type</Form.Label>
          <Form.Select name="type" value={project.type} onChange={handleChange}>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Mixed</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Launch Date</Form.Label>
          <Form.Control
            type="date"
            name="launchDate"
            value={project.launchDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>RERA Number</Form.Label>
          <Form.Control
            type="text"
            name="rera"
            value={project.rera}
            onChange={handleChange}
            placeholder="Enter RERA ID"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select name="status" value={project.status} onChange={handleChange}>
            <option>Upcoming</option>
            <option>Ongoing</option>
            <option>Completed</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={project.description}
            onChange={handleChange}
            placeholder="Brief project description..."
          />
        </Form.Group>

        <Button type="submit" variant="success">Next: Upload Media</Button>
      </Form>
    </Card>
  );
};

export default AddNewProject;
