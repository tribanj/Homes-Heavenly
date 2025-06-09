import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

const PricingFeatures = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [details, setDetails] = useState({
    price: formData.price || '',
    area: formData.area || '',
    bedrooms: formData.bedrooms || '',
    bathrooms: formData.bathrooms || '',
    parking: formData.parking || '',
    amenities: formData.amenities || '', // comma-separated string for now
  });

  const [error, setError] = useState('');

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Validate numeric inputs (price, area, bedrooms, bathrooms, parking)
  const validateFields = () => {
    const { price, area, bedrooms, bathrooms, parking } = details;
    
    if (!price || !area || !bedrooms || !bathrooms || !parking) {
      setError('All fields are required.');
      return false;
    }

    if (price <= 0 || area <= 0 || bedrooms <= 0 || bathrooms <= 0 || parking < 0) {
      setError('Please enter valid positive numbers.');
      return false;
    }

    setError('');
    return true;
  };

  // Handle the Next button click
  const handleNext = (e) => {
    e.preventDefault();
    if (validateFields()) {
      updateFormData(details);
      nextStep();
    }
  };

  return (
    <Form onSubmit={handleNext} className="p-3">
      <h4 className="mb-4">Step 4: Pricing & Features</h4>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="price">
            <Form.Label>Price (₹)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={details.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="area">
            <Form.Label>Area (sq ft)</Form.Label>
            <Form.Control
              type="number"
              name="area"
              value={details.area}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="bedrooms">
            <Form.Label>Bedrooms</Form.Label>
            <Form.Control
              type="number"
              name="bedrooms"
              value={details.bedrooms}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="bathrooms">
            <Form.Label>Bathrooms</Form.Label>
            <Form.Control
              type="number"
              name="bathrooms"
              value={details.bathrooms}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="parking">
            <Form.Label>Parking Spaces</Form.Label>
            <Form.Control
              type="number"
              name="parking"
              value={details.parking}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="amenities" className="mb-4">
        <Form.Label>Amenities (comma-separated)</Form.Label>
        <Form.Control
          type="text"
          name="amenities"
          placeholder="e.g., Gym, Swimming Pool, Lift, Security"
          value={details.amenities}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={prevStep}>
          &laquo; Back
        </Button>
        <Button variant="primary" type="submit">
          Next &raquo;
        </Button>
      </div>
    </Form>
  );
};

export default PricingFeatures;
