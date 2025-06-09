// src/components/PostProperty/BuilderProject/PropertyDetailsLocation.js
import React from "react";

const PropertyDetailsLocation = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Step 1: Property Details & Location</h4>

      <div className="mb-3">
        <label className="form-label">Project Name</label>
        <input
          type="text"
          className="form-control"
          name="projectName"
          value={formData.projectName || ""}
          onChange={handleChange}
          placeholder="e.g., The Grand Tower"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Location</label>
        <input
          type="text"
          className="form-control"
          name="location"
          value={formData.location || ""}
          onChange={handleChange}
          placeholder="e.g., New York"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Size (in sqft)</label>
        <input
          type="number"
          className="form-control"
          name="size"
          value={formData.size || ""}
          onChange={handleChange}
          placeholder="e.g., 1500"
        />
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyDetailsLocation;
