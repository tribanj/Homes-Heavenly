import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const BuilderProfileSettings = () => {
  const [formData, setFormData] = useState({
    companyName: 'Heaven Constructions Pvt Ltd',
    contactEmail: 'info@heavenconstructions.com',
    phone: '+91-9876543210',
    website: 'https://www.heavenconstructions.com',
    logo: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Profile updated successfully!');
    // 🔄 You can later connect this with backend API
  };

  return (
    <div>
      <h4 className="mb-4">🏢 Builder Profile & Settings</h4>
      <Card className="p-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Logo Upload</Form.Label>
                <Form.Control
                  type="file"
                  name="logo"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Contact Email</Form.Label>
                <Form.Control
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Facebook Link</Form.Label>
                <Form.Control
                  type="url"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>LinkedIn Link</Form.Label>
                <Form.Control
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Instagram Link</Form.Label>
                <Form.Control
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Receive Email Notifications"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default BuilderProfileSettings;
