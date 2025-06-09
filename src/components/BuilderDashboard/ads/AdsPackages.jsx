import React from 'react';
import { Card, Button, Row, Col, ProgressBar } from 'react-bootstrap';

const AdsPackages = () => {
  const adPackages = [
    {
      id: 1,
      title: 'Basic Boost',
      price: '₹499',
      duration: '7 Days',
      features: ['Highlighted Listing', 'Standard Reach'],
    },
    {
      id: 2,
      title: 'Premium Spotlight',
      price: '₹999',
      duration: '14 Days',
      features: ['Top of Search Results', 'Increased Impressions', 'Featured Badge'],
    },
    {
      id: 3,
      title: 'Max Visibility',
      price: '₹1999',
      duration: '30 Days',
      features: ['Home Page Banner', 'Lead Priority', 'Dedicated Mailer'],
    },
  ];

  const adPerformance = {
    impressions: 3200,
    clicks: 540,
    ctr: ((540 / 3200) * 100).toFixed(2),
  };

  const handlePurchase = (plan) => {
    alert(`🛒 You selected the "${plan.title}" plan for ${plan.price}`);
  };

  return (
    <div>
      <h4 className="mb-4">📢 Ads & Promotion Packages</h4>

      <Row className="mb-5">
        {adPackages.map((plan) => (
          <Col md={4} key={plan.id}>
            <Card className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>{plan.title}</Card.Title>
                <h5 className="text-primary">{plan.price}</h5>
                <p><strong>Duration:</strong> {plan.duration}</p>
                <ul>
                  {plan.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
                <Button variant="outline-success" onClick={() => handlePurchase(plan)}>
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h5 className="mb-3">📈 Current Ad Performance</h5>
      <Card className="p-3 shadow-sm">
        <p><strong>Impressions:</strong> {adPerformance.impressions}</p>
        <p><strong>Clicks:</strong> {adPerformance.clicks}</p>
        <p><strong>Click Through Rate (CTR):</strong> {adPerformance.ctr}%</p>
        <ProgressBar now={adPerformance.ctr} label={`${adPerformance.ctr}% CTR`} />
      </Card>
    </div>
  );
};

export default AdsPackages;
