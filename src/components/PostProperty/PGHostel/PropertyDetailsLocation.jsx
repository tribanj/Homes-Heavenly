// src/components/PostProperty/PGHostel/PropertyDetailsLocation.js
import React from "react";

const PropertyDetailsLocation = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Step 1: PG/Hostel Details & Location</h4>

      <div className="mb-3">
        <label className="form-label">Property Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="e.g., Spacious PG for Girls near University"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Type</label>
        <select
          className="form-select"
          name="type"
          value={formData.type || ""}
          onChange={handleChange}
        >
          <option value="">Select type</option>
          <option value="pg">PG</option>
          <option value="hostel">Hostel</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          name="city"
          value={formData.city || ""}
          onChange={handleChange}
          placeholder="e.g., Pune"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Locality</label>
        <input
          type="text"
          className="form-control"
          name="locality"
          value={formData.locality || ""}
          onChange={handleChange}
          placeholder="e.g., Shivaji Nagar"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Landmark</label>
        <input
          type="text"
          className="form-control"
          name="landmark"
          value={formData.landmark || ""}
          onChange={handleChange}
          placeholder="e.g., Near Metro Station"
        />
      </div>

      <div className="text-end">
        <button className="btn btn-primary" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyDetailsLocation;
