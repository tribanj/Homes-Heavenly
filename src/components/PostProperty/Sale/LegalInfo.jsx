import React from 'react';
import { Form, Button } from 'react-bootstrap';

const LegalInfo = ({ formData, handleChange, nextStep, prevStep }) => {
  const handleNext = () => {
    const { titleVerified, legalAssistance } = formData;
    if (!titleVerified || !legalAssistance) {
      alert("Please answer all legal information questions.");
      return;
    }
    nextStep();
  };

  return (
    <div>
      <h4 className="mb-3">Step 4: Legal Information</h4>
      <Form>
        <Form.Group controlId="titleVerified">
          <Form.Label>Is the property title verified?</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              label="Yes"
              name="titleVerified"
              value="Yes"
              checked={formData.titleVerified === 'Yes'}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="radio"
              label="No"
              name="titleVerified"
              value="No"
              checked={formData.titleVerified === 'No'}
              onChange={handleChange}
            />
          </div>
        </Form.Group>

        <Form.Group controlId="legalAssistance">
          <Form.Label>Do you need assistance with legal documentation?</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              label="Yes"
              name="legalAssistance"
              value="Yes"
              checked={formData.legalAssistance === 'Yes'}
              onChange={handleChange}
            />
            <Form.Check
              inline
              type="radio"
              label="No"
              name="legalAssistance"
              value="No"
              checked={formData.legalAssistance === 'No'}
              onChange={handleChange}
            />
          </div>
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

export default LegalInfo;
