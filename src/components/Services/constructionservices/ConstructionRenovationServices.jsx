// Construction & Renovation Services
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const subServices = [
  "Custom Home Construction & Architectural Design",
  "Interior Designing & Home Furnishing",
  "Smart Home & Automation Installations",
  "Landscaping & Outdoor Living Solutions"
];

const ConstructionRenovationServices = () => {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Construction & Renovation Services</h2>
      <Row>
        {subServices.map((item, idx) => (
          <Col md={6} className="mb-4" key={idx}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{item}</Card.Title>
                <Card.Text>
                  Build or upgrade your property with quality and style.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ConstructionRenovationServices;