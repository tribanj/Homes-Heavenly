import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    category: '',
    price: '',
    area: '',
    location: '',
    expiryDays: '60',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Property Submitted:', formData);
    // Later: Send to backend
  };

  return (
    <div>
      <h4 className="mb-4">🏠 Add New Property</h4>
      <Card className="p-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Property Title</Form.Label>
                <Form.Control type="text" name="title" onChange={handleChange} placeholder="E.g. 2BHK Flat in Pune" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Property Type</Form.Label>
                <Form.Select name="type" onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Flat">Flat</option>
                  <option value="House">House</option>
                  <option value="Plot">Plot</option>
                  <option value="Office">Office</option>
                  <option value="Shop">Shop</option>
                  <option value="Land">Land</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Listing Category</Form.Label>
                <Form.Select name="category" onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                  <option value="Resale">Resale</option>
                  <option value="Commercial">Commercial</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Price (₹)</Form.Label>
                <Form.Control type="number" name="price" onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Area (sq.ft)</Form.Label>
                <Form.Control type="number" name="area" onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name="location" onChange={handleChange} placeholder="City, Locality" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Upload Media</Form.Label>
                <Form.Control type="file" multiple />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Listing Expiry</Form.Label>
                <Form.Select name="expiryDays" onChange={handleChange}>
                  <option value="30">30 Days</option>
                  <option value="60">60 Days</option>
                  <option value="90">90 Days</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit">📤 Submit Listing</Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddProperty;
