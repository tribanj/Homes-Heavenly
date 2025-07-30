import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const subServices = [
  "Rent Collection & Tenant Management",
  "Maintenance & Repairs Coordination",
  "Legal Dispute Resolution for Landlords & Tenants",
  "Home Insurance & Property Protection Plans"
];

const PropertyManagementServices = () => {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Property Management Services</h2>
      <Row>
        {subServices.map((item, idx) => (
          <Col md={6} className="mb-4" key={idx}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{item}</Card.Title>
                <Card.Text>
                  {/* Optional: Add short descriptions for each sub-service */}
                  Get expert help in managing your property professionally and legally.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PropertyManagementServices;
