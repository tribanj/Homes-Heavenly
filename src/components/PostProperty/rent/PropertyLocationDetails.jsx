import React from "react";

const PropertyLocationDetails = ({ formData, setFormData, onNext, onBack }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (!formData.city || !formData.state || !formData.pincode || !formData.addressLine1 || !formData.builtUpArea) {
      alert("Please fill in all required fields marked with *.");
      return;
    }
    onNext();
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">📍 Property Location & Area Details</h3>

      <div className="mb-3">
        <label className="form-label">Property Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="Optional - e.g. 2BHK Flat near XYZ Mall"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address Line 1 *</label>
        <input
          type="text"
          className="form-control"
          name="addressLine1"
          value={formData.addressLine1 || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address Line 2</label>
        <input
          type="text"
          className="form-control"
          name="addressLine2"
          value={formData.addressLine2 || ""}
          onChange={handleChange}
        />
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">City *</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">State *</label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={formData.state || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label">Pincode *</label>
          <input
            type="text"
            className="form-control"
            name="pincode"
            value={formData.pincode || ""}
            onChange={handleChange}
            pattern="\d{6}"
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Landmark</label>
        <input
          type="text"
          className="form-control"
          name="landmark"
          value={formData.landmark || ""}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Google Maps Link</label>
        <input
          type="url"
          className="form-control"
          name="mapLink"
          value={formData.mapLink || ""}
          onChange={handleChange}
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Built-up Area (sqft) *</label>
          <input
            type="number"
            className="form-control"
            name="builtUpArea"
            value={formData.builtUpArea || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Carpet Area (sqft)</label>
          <input
            type="number"
            className="form-control"
            name="carpetArea"
            value={formData.carpetArea || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Property Facing</label>
        <select
          className="form-select"
          name="facing"
          value={formData.facing || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="North-East">North-East</option>
          <option value="North-West">North-West</option>
          <option value="South-East">South-East</option>
          <option value="South-West">South-West</option>
        </select>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary" onClick={onBack}>
          ⬅ Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default PropertyLocationDetails;
