import React, { useState } from 'react';
import { Form, Card, Button, Row, Col } from 'react-bootstrap';

const CompanySettings = () => {
  const [settings, setSettings] = useState({
    companyName: 'Heavenly Estates',
    brandingColor: '#4e73df',
    officeHours: '10:00 AM - 6:00 PM',
    contactEmail: 'support@heavenlyrealty.com',
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Settings Saved');
  };

  return (
    <div>
      <h4 className="mb-4">🏢 Company Profile & Settings</h4>
      <Card className="p-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={settings.companyName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Office Timing</Form.Label>
                <Form.Control
                  type="text"
                  name="officeHours"
                  value={settings.officeHours}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Branding Color</Form.Label>
                <Form.Control
                  type="color"
                  name="brandingColor"
                  value={settings.brandingColor}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Support Email</Form.Label>
                <Form.Control
                  type="email"
                  name="contactEmail"
                  value={settings.contactEmail}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Enable Email Notifications"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Save Settings
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default CompanySettings;
