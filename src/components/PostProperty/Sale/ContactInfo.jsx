import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ContactInfo = ({ formData, handleChange, nextStep, prevStep }) => {
  const handleNext = () => {
    const { contactName, contactEmail, contactPhone } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!contactName || !contactEmail || !contactPhone) {
      alert("Please fill in all fields.");
      return;
    }

    if (!emailRegex.test(contactEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(contactPhone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    nextStep();
  };

  return (
    <div>
      <h4 className="mb-3">Step 1: Contact Information</h4>
      <Form>
        <Form.Group controlId="contactName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="contactEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="contactPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={prevStep}>
            &laquo; Back
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Next &raquo;
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ContactInfo;
