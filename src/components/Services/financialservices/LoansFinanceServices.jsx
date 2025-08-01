// Home Loans & Financial Services
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const subServices = [
  "Home Loan & Mortgage Assistance",
  "Loan Refinancing & Balance Transfer",
  "Real Estate Tax & Investment Planning"
];

const LoansFinanceServices = () => {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Home Loans & Financial Services</h2>
      <Row>
        {subServices.map((item, idx) => (
          <Col md={6} className="mb-4" key={idx}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{item}</Card.Title>
                <Card.Text>
                  Navigate home financing and tax planning with ease.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LoansFinanceServices;