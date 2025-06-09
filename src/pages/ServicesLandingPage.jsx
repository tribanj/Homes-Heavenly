import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const services = [
  { title: 'Buy & Sell Properties', path: '/services/buysale' },
  { title: 'Rent & Lease Services', path: '/services/rentlease' },
  { title: 'Property Management Services', path: '/services/propertymanagement' },
  { title: 'Real Estate Investment & Advisory', path: '/services/investmentadvisory' },
  { title: 'Home Loans & Financial Services', path: '/services/loansfinance' },
  { title: 'Construction & Renovation Services', path: '/services/constructionrenovation' },
  { title: 'Corporate & Commercial Real Estate Services', path: '/services/corporatecommercial' },
  { title: 'Legal & Compliance Services', path: '/services/legalcompliance' }
];

const ServicesLandingPage = () => {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Our Real Estate Services</h2>
      <Row>
        {services.map((service, index) => (
          <Col md={6} lg={4} className="mb-4" key={index}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{service.title}</Card.Title>
                <div className="mt-auto">
                  <Link to={service.path} className="btn btn-primary w-100 mt-3">
                    Explore
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServicesLandingPage;
