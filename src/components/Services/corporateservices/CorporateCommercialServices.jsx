// Corporate & Commercial Real Estate Services
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const subServices = [
  "Office Space Leasing & Business Relocation",
  "Industrial, Warehouse & Retail Space Solutions",
  "Real Estate Solutions for Corporates & Startups"
];

const CorporateCommercialServices = () => {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Corporate & Commercial Real Estate Services</h2>
      <Row>
        {subServices.map((item, idx) => (
          <Col md={6} className="mb-4" key={idx}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{item}</Card.Title>
                <Card.Text>
                  Commercial real estate solutions for growing businesses.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CorporateCommercialServices;