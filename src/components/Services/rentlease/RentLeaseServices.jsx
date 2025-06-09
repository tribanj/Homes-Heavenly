// Rent & Lease Services
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const subServices = [
  "Residential & Commercial Rentals",
  "PG & Shared Accommodation Services",
  "Long-term & Short-term Lease Management",
  "Tenant Background Verification"
];

const RentLeaseServices = () => {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Rent & Lease Services</h2>
      <Row>
        {subServices.map((item, idx) => (
          <Col md={6} className="mb-4" key={idx}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{item}</Card.Title>
                <Card.Text>
                  Manage your rental or lease easily and securely.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RentLeaseServices;