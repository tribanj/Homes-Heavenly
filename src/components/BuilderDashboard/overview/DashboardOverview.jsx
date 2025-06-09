import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

const DashboardOverview = () => {
  // ✅ Example mock stats (can be fetched from backend later)
  const stats = [
    { title: 'Total Projects Listed', value: 8, icon: '🏗️' },
    { title: 'Units Available', value: 120, icon: '🏢' },
    { title: 'Units Sold', value: 65, icon: '✅' },
    { title: 'Pending Booking Requests', value: 14, icon: '📩' },
    { title: 'Active Agents', value: 5, icon: '🧑‍💼' },
    { title: 'Ads Running', value: 4, icon: '📢' },
    { title: 'Expired Ads', value: 2, icon: '🛑' },
    { title: 'Site Visits Scheduled', value: 9, icon: '📅' },
  ];

  return (
    <div>
      <h3 className="mb-4">📊 Dashboard Overview</h3>

      {/* Metrics Grid */}
      <Row className="g-4 mb-4">
        {stats.map((item, idx) => (
          <Col key={idx} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <h1 className="mb-3">{item.icon}</h1>
                <h5 className="fw-bold">{item.value}</h5>
                <p className="text-muted mb-0">{item.title}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions */}
      <h5 className="mb-3">⚡ Quick Actions</h5>
      <Row className="g-3">
        <Col xs={12} sm={6} md={4}>
          <Button variant="primary" className="w-100">➕ Add New Project</Button>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Button variant="secondary" className="w-100">📨 View Inquiries</Button>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Button variant="warning" className="w-100">💳 Buy Ad Package</Button>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardOverview;
