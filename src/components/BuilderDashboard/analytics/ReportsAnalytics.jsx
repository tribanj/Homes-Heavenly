import React from 'react';
import {Card, Button, Row, Col, Badge } from 'react-bootstrap';

const ReportsAnalytics = () => {
  const inquiries = [
    { id: 1, project: 'Skyline Heights', leads: 54, source: 'Google Ads', status: 'High' },
    { id: 2, project: 'Eco Bliss Apartments', leads: 33, source: 'Facebook Campaign', status: 'Medium' },
    { id: 3, project: 'Oceanic Villas', leads: 12, source: 'Organic Search', status: 'Low' },
  ];

  const handleDownload = () => {
    alert('📄 Simulated download started for detailed report (CSV/PDF)');
  };

  return (
    <div>
      <h4 className="mb-4">📊 Reports & Analytics</h4>

      <Row className="mb-4">
        {inquiries.map((item) => (
          <Col md={4} key={item.id}>
            <Card className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>{item.project}</Card.Title>
                <Card.Text>
                  <strong>Leads:</strong> {item.leads} <br />
                  <strong>Source:</strong> {item.source} <br />
                  <strong>Status:</strong>{' '}
                  <Badge bg={item.status === 'High' ? 'success' : item.status === 'Medium' ? 'warning' : 'secondary'}>
                    {item.status}
                  </Badge>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-end">
        <Button variant="outline-primary" onClick={handleDownload}>
          ⬇️ Download Full Report
        </Button>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
