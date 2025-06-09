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
        <label className="form-label">Property Name</label>
        <input
          type="text"
          className="form-control"
          name="propertyName"
          value={formData.propertyName || ""}
          onChange={handleChange}
          placeholder="Enter property name"
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
          placeholder="Enter property location"
        />
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyDetailsLocation;
