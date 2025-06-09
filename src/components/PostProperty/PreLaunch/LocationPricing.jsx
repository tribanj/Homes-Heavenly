import React from 'react';

const LocationPricing = ({ formData, setFormData, onNext, onBack }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">📍 Location & Pricing Details</h4>

      <div className="mb-3">
        <label className="form-label">City</label>
        <input
          type="text"
          name="city"
          className="form-control"
          value={formData.city || ''}
          onChange={handleChange}
          placeholder="e.g., Bangalore"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Locality</label>
        <input
          type="text"
          name="locality"
          className="form-control"
          value={formData.locality || ''}
          onChange={handleChange}
          placeholder="e.g., Whitefield"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Project Address</label>
        <textarea
          name="address"
          className="form-control"
          rows="2"
          value={formData.address || ''}
          onChange={handleChange}
          placeholder="e.g., 123, Main Road, near IT Park"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Starting Price (₹)</label>
        <input
          type="number"
          name="startingPrice"
          className="form-control"
          value={formData.startingPrice || ''}
          onChange={handleChange}
          placeholder="e.g., 45,00,000"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Price per Sq.ft (₹)</label>
        <input
          type="number"
          name="pricePerSqft"
          className="form-control"
          value={formData.pricePerSqft || ''}
          onChange={handleChange}
          placeholder="e.g., 6,000"
        />
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary" onClick={onBack}>Back</button>
        <button className="btn btn-primary" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default LocationPricing;
