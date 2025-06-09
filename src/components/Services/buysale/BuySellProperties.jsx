// Buy & Sell Properties
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const subServices = [
  "Residential Property Buying & Selling",
  "Commercial Property Deals",
  "Resale & Secondary Market Listings",
  "Land / Plot Transactions"
];

const BuySellProperties = () => {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Buy & Sell Properties</h2>
      <Row>
        {subServices.map((item, idx) => (
          <Col md={6} className="mb-4" key={idx}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{item}</Card.Title>
                <Card.Text>
                  Find your dream property or sell with expert support.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuySellProperties;