import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const LocationDetails = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [location, setLocation] = useState({
    city: formData.city || '',
    state: formData.state || '',
    address: formData.address || '',
    pincode: formData.pincode || '',
    coordinates: formData.coordinates || ''
  });

  // Effect to update state when formData changes (for reusability)
  useEffect(() => {
    setLocation({
      city: formData.city || '',
      state: formData.state || '',
      address: formData.address || '',
      pincode: formData.pincode || '',
      coordinates: formData.coordinates || ''
    });
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  // Form Validation (Client-Side)
  const handleNext = (e) => {
    e.preventDefault();

    const { city, state, address, pincode } = location;

    if (!city || !state || !address || !pincode) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      alert('Please enter a valid 6-digit pincode.');
      return;
    }

    updateFormData(location);  // Pass data to the parent component
    nextStep();  // Proceed to the next step
  };

  return (
    <Form onSubmit={handleNext} className="p-3">
      <h4 className="mb-4">Step 3: Location Details</h4>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={location.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={location.state}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="address" className="mb-3">
        <Form.Label>Full Address</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="address"
          value={location.address}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="pincode" className="mb-3">
        <Form.Label>Pincode / Postal Code</Form.Label>
        <Form.Control
          type="text"
          name="pincode"
          value={location.pincode}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="coordinates" className="mb-4">
        <Form.Label>Latitude & Longitude (optional)</Form.Label>
        <Form.Control
          type="text"
          name="coordinates"
          placeholder="Eg: 28.6139, 77.2090"
          value={location.coordinates}
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

export default LocationDetails;
