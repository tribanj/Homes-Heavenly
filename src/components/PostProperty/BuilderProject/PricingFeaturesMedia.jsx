// src/components/PostProperty/BuilderProject/PricingFeaturesMedia.js
import React from "react";

const PricingFeaturesMedia = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      media: e.target.files,
    }));
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Step 2: Pricing & Features</h4>

      <div className="mb-3">
        <label className="form-label">Price (₹)</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={formData.price || ""}
          onChange={handleChange}
          placeholder="e.g., 500000"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Key Features</label>
        <textarea
          className="form-control"
          name="features"
          value={formData.features || ""}
          onChange={handleChange}
          placeholder="e.g., Modern architecture, Swimming pool, Gym, etc."
          rows={3}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Upload Images/Documents</label>
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
          multiple
        />
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={prevStep}>
          Back
        </button>
        <button className="btn btn-primary" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PricingFeaturesMedia;
