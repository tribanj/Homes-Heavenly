import React from 'react';
import { Card, Row, Col, Button, Table,} from 'react-bootstrap';

const dummyAds = [
  {
    id: 1,
    title: 'Spotlight: 3BHK in Thane',
    type: 'Spotlight',
    status: 'Active',
    budget: '₹5000',
    reach: 1200,
    expiry: '5 Days Left',
  },
  {
    id: 2,
    title: 'Banner: Luxury Villas Banner',
    type: 'Banner',
    status: 'Paused',
    budget: '₹12,000',
    reach: 3400,
    expiry: '12 Days Left',
  },
];

const AdsPromotions = () => {
  return (
    <div>
      <h4 className="mb-4">📣 Ads & Promotions</h4>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <h6>📦 Available Packages</h6>
            <ul>
              <li>🎯 Spotlight Listings (₹5000/month)</li>
              <li>🔝 Top Search Boost (₹3000/week)</li>
              <li>🖼️ Banner Promotions (₹12000/2 weeks)</li>
            </ul>
            <Button variant="primary" size="sm">View All Packages</Button>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <h6>📊 Campaign Planner</h6>
            <p>Plan your next promotion by selecting duration, location, and target audience.</p>
            <Button variant="success" size="sm">Launch New Campaign</Button>
          </Card>
        </Col>
      </Row>

      <Card className="p-4 shadow-sm">
        <h5 className="mb-3">📈 Active Campaigns</h5>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Campaign Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Budget</th>
              <th>Reach</th>
              <th>Expiry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyAds.map((ad) => (
              <tr key={ad.id}>
                <td>{ad.title}</td>
                <td>{ad.type}</td>
                <td>{ad.status}</td>
                <td>{ad.budget}</td>
                <td>{ad.reach}</td>
                <td>{ad.expiry}</td>
                <td>
                  <Button size="sm" variant="warning" className="me-2">Pause</Button>
                  <Button size="sm" variant="outline-secondary">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="text-end">
          <Button variant="outline-primary">📤 Export Campaign Report</Button>
        </div>
      </Card>
    </div>
  );
};

export default AdsPromotions;
