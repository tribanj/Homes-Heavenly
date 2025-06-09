import React, { useState } from 'react';
import { Card, Button, Form, Table } from 'react-bootstrap';

const initialDocs = [
  { id: 1, name: 'Client Agreement - Raj Malhotra.pdf', uploadedBy: 'Anil Kumar', date: '2025-04-20' },
  { id: 2, name: 'KYC - Pooja Rao.zip', uploadedBy: 'Support Team', date: '2025-04-18' },
];

const LegalDocsVault = () => {
  const [docs, setDocs] = useState(initialDocs);
  const [fileName, setFileName] = useState('');

  const handleUpload = () => {
    if (fileName.trim() === '') return;

    const newDoc = {
      id: docs.length + 1,
      name: fileName,
      uploadedBy: 'Admin',
      date: new Date().toISOString().slice(0, 10),
    };

    setDocs([newDoc, ...docs]);
    setFileName('');
  };

  return (
    <div>
      <h4 className="mb-4">📂 Legal & Document Vault</h4>

      <Card className="p-4 mb-4 shadow-sm">
        <Form inline="true">
          <Form.Group className="mb-2">
            <Form.Label className="me-2">Upload New Document</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter file name..."
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" className="ms-2 mt-2" onClick={handleUpload}>
            Upload
          </Button>
        </Form>
      </Card>

      <Card className="p-4 shadow-sm">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Uploaded By</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.name}</td>
                <td>{doc.uploadedBy}</td>
                <td>{doc.date}</td>
                <td>
                  <Button size="sm" variant="outline-secondary">Download</Button>{' '}
                  <Button size="sm" variant="outline-success">Sign</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default LegalDocsVault;
