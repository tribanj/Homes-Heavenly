import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

const CompanyDashboardOverview = () => {
  return (
    <div>
      <h3 className="mb-4">📊 Company Dashboard Overview</h3>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Listings</Card.Title>
              <Card.Text>💼 Buy: 120 | 🏠 Rent: 85 | 🔁 Resale: 40</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Properties Status</Card.Title>
              <Card.Text>✅ Available: 180 | ❌ Sold/Rented: 65</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>New Leads Today</Card.Title>
              <Card.Text>👥 18 New Inquiries</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Active Campaigns</Card.Title>
              <Card.Text>📢 Spotlight x3, Banners x2</Card.Text>
              <Card.Text>⏳ 2 expiring soon</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Broker Performance</Card.Title>
              <Card.Text>⭐ Top Broker: Rajiv Kumar (12 Closures)</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title>Quick Actions</Card.Title>
              <Button variant="primary" className="m-1">➕ Add Listing</Button>
              <Button variant="success" className="m-1">💰 Buy Ad</Button>
              <Button variant="info" className="m-1">📨 View Inquiries</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CompanyDashboardOverview;
