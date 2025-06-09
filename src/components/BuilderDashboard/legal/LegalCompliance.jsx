import React, { useState } from 'react';
import { Table, Form, Button, Badge } from 'react-bootstrap';

const LegalCompliance = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Skyline Heights',
      reraStatus: 'approved',
      docsUploaded: true,
    },
    {
      id: 2,
      name: 'Eco Bliss Apartments',
      reraStatus: 'pending',
      docsUploaded: false,
    },
  ]);

  const handleUpload = (id) => {
    const updated = projects.map((proj) =>
      proj.id === id ? { ...proj, docsUploaded: true, reraStatus: 'pending' } : proj
    );
    setProjects(updated);
  };

  return (
    <div>
      <h4 className="mb-4">📜 Legal & Compliance Documents</h4>

      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Project Name</th>
            <th>Documents Uploaded</th>
            <th>RERA Status</th>
            <th>Upload Documents</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj, index) => (
            <tr key={proj.id}>
              <td>{index + 1}</td>
              <td>{proj.name}</td>
              <td>
                {proj.docsUploaded ? (
                  <Badge bg="success">✅ Uploaded</Badge>
                ) : (
                  <Badge bg="danger">❌ Not Uploaded</Badge>
                )}
              </td>
              <td>
                <Badge
                  bg={
                    proj.reraStatus === 'approved'
                      ? 'success'
                      : proj.reraStatus === 'pending'
                      ? 'warning'
                      : 'secondary'
                  }
                >
                  {proj.reraStatus}
                </Badge>
              </td>
              <td>
                {!proj.docsUploaded ? (
                  <Form.Group controlId={`upload-${proj.id}`}>
                    <Form.Control type="file" size="sm" className="mb-1" />
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleUpload(proj.id)}
                    >
                      📤 Upload
                    </Button>
                  </Form.Group>
                ) : (
                  <span className="text-muted">Already Uploaded</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LegalCompliance;
