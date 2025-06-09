import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const PropertyDetails = ({ formData, updateFormData, nextStep }) => {
  const [details, setDetails] = useState({
    purpose: formData.purpose || '',
    bedrooms: formData.bedrooms || '',
    bathrooms: formData.bathrooms || '',
    area: formData.area || ''
  });

  const [error, setError] = useState('');

  const handleChangeLocal = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();

    const bedrooms = Number(details.bedrooms);
    const bathrooms = Number(details.bathrooms);
    const area = Number(details.area);

    if (!details.purpose) {
      setError("Please select the purpose of the property (Sale or Rent).");
      return;
    }

    if (!bedrooms || bedrooms <= 0) {
      setError("Number of bedrooms must be greater than zero.");
      return;
    }
    if (!bathrooms || bathrooms <= 0) {
      setError("Number of bathrooms must be greater than zero.");
      return;
    }
    if (!area || area <= 0) {
      setError("Area must be greater than zero.");
      return;
    }

    setError('');
    updateFormData({
      purpose: details.purpose,
      bedrooms,
      bathrooms,
      area
    });
    nextStep();
  };

  return (
    <div>
      <h4 className="mb-3">Step 1: Property Details</h4>
      <Form onSubmit={handleNext}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Purpose</Form.Label>
          <Form.Select
            name="purpose"
            value={details.purpose}
            onChange={handleChangeLocal}
            required
          >
            <option value="">Select Purpose</option>
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bedrooms</Form.Label>
          <Form.Control
            type="number"
            name="bedrooms"
            value={details.bedrooms}
            onChange={handleChangeLocal}
            min="1"
            placeholder="Enter number of bedrooms"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bathrooms</Form.Label>
          <Form.Control
            type="number"
            name="bathrooms"
            value={details.bathrooms}
            onChange={handleChangeLocal}
            min="1"
            placeholder="Enter number of bathrooms"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Area (sq ft)</Form.Label>
          <Form.Control
            type="number"
            name="area"
            value={details.area}
            onChange={handleChangeLocal}
            min="1"
            placeholder="Enter area in square feet"
          />
        </Form.Group>

        <div className="d-flex justify-content-end mt-4">
          <Button variant="primary" type="submit">
            Next &raquo;
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PropertyDetails;
