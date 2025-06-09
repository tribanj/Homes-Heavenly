// Real Estate Investment & Advisory
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const subServices = [
  "Investment Planning & ROI Analysis",
  "Land & Plot Investment Services",
  "Fractional Ownership & REIT Investment",
  "Market Trends & Price Forecasting"
];

const InvestmentAdvisoryServices = () => {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Real Estate Investment & Advisory</h2>
      <Row>
        {subServices.map((item, idx) => (
          <Col md={6} className="mb-4" key={idx}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{item}</Card.Title>
                <Card.Text>
                  Invest smarter with expert real estate guidance.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default InvestmentAdvisoryServices;