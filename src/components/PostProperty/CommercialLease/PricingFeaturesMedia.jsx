import React from "react";

const PricingFeaturesMedia = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      media: Array.from(e.target.files),
    }));
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Step 2: Lease Terms, Features & Media</h4>

      <div className="mb-3">
        <label className="form-label">Monthly Rent (₹)</label>
        <input
          type="number"
          className="form-control"
          name="rent"
          value={formData.rent || ""}
          onChange={handleChange}
          placeholder="e.g., 50000"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Security Deposit (₹)</label>
        <input
          type="number"
          className="form-control"
          name="deposit"
          value={formData.deposit || ""}
          onChange={handleChange}
          placeholder="e.g., 150000"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Lease Duration (in months)</label>
        <input
          type="number"
          className="form-control"
          name="duration"
          value={formData.duration || ""}
          onChange={handleChange}
          placeholder="e.g., 36"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Key Features</label>
        <textarea
          className="form-control"
          name="features"
          value={formData.features || ""}
          onChange={handleChange}
          placeholder="e.g., Fully furnished, central AC, 24x7 security"
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
