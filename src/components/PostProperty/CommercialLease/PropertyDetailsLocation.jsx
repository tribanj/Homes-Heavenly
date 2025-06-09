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
        <label className="form-label">Property Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="e.g., Commercial Office Space in Downtown"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Property Type</label>
        <select
          className="form-select"
          name="type"
          value={formData.type || ""}
          onChange={handleChange}
        >
          <option value="">Select type</option>
          <option value="Office">Office</option>
          <option value="Retail">Retail</option>
          <option value="Warehouse">Warehouse</option>
          <option value="Industrial">Industrial</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          placeholder="Enter full address"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          name="city"
          value={formData.city || ""}
          onChange={handleChange}
          placeholder="City name"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">State</label>
        <input
          type="text"
          className="form-control"
          name="state"
          value={formData.state || ""}
          onChange={handleChange}
          placeholder="State"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Pin Code</label>
        <input
          type="text"
          className="form-control"
          name="pincode"
          value={formData.pincode || ""}
          onChange={handleChange}
          placeholder="Postal code"
        />
      </div>

      <button className="btn btn-primary" onClick={nextStep}>
        Next
      </button>
    </div>
  );
};

export default PropertyDetailsLocation;
