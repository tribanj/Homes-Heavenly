// Legal & Compliance Services
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const subServices = [
  "Property Title Verification & Due Diligence",
  "RERA Compliance & Registration Assistance",
  "Landlord & Tenant Dispute Resolution",
  "Stamp Duty & Property Registration Support"
];

const LegalComplianceServices = () => {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Legal & Compliance Services</h2>
      <Row>
        {subServices.map((item, idx) => (
          <Col md={6} className="mb-4" key={idx}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{item}</Card.Title>
                <Card.Text>
                  Protect your real estate interests legally and securely.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LegalComplianceServices;
