import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Amenities = ({ formData, handleChange, nextStep, prevStep }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    handleChange({ [name]: checked });
  };

  return (
    <div>
      <h4 className="mb-3">Step 3: Amenities</h4>
      <Form>
        {/* Swimming Pool Checkbox */}
        <Form.Check
          type="checkbox"
          label="Swimming Pool"
          name="swimmingPool"
          checked={formData.swimmingPool}
          onChange={handleCheckboxChange}
        />
        
        {/* Gym Checkbox */}
        <Form.Check
          type="checkbox"
          label="Gym"
          name="gym"
          checked={formData.gym}
          onChange={handleCheckboxChange}
        />
        
        {/* Parking Checkbox */}
        <Form.Check
          type="checkbox"
          label="Parking"
          name="parking"
          checked={formData.parking}
          onChange={handleCheckboxChange}
        />
        
        {/* Pet Friendly Checkbox */}
        <Form.Check
          type="checkbox"
          label="Pet Friendly"
          name="petFriendly"
          checked={formData.petFriendly}
          onChange={handleCheckboxChange}
        />
        
        {/* Security Checkbox */}
        <Form.Check
          type="checkbox"
          label="Security"
          name="security"
          checked={formData.security}
          onChange={handleCheckboxChange}
        />

        {/* You can add more amenities if needed */}
        
        <div className="d-flex justify-content-between mt-4">
          {/* Previous Button */}
          <Button variant="secondary" onClick={prevStep}>
            &laquo; Back
          </Button>
          
          {/* Next Button */}
          <Button
            variant="primary"
            onClick={nextStep}
            disabled={Object.values(formData).includes(false)} // Disable next if no amenities are selected
          >
            Next &raquo;
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Amenities;
