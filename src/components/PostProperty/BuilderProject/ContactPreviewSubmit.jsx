// src/components/PostProperty/BuilderProject/ContactPreviewSubmit.js
import React from "react";

const ContactPreviewSubmit = ({ formData, setFormData, prevStep }) => {
  const handleSubmit = () => {
    // Here, you can handle form submission, like saving the data or sending to the backend.
    alert("Builder Project listing submitted successfully!");
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Step 3: Contact & Preview</h4>

      <div className="mb-3">
        <label className="form-label">Contact Name</label>
        <input
          type="text"
          className="form-control"
          name="contactName"
          value={formData.contactName || ""}
          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
          placeholder="e.g., John Doe"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contact Number</label>
        <input
          type="tel"
          className="form-control"
          name="contactNumber"
          value={formData.contactNumber || ""}
          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          placeholder="e.g., +91 1234567890"
        />
      </div>

      <div>
        <h5>Preview:</h5>
        <p><strong>Project Name:</strong> {formData.projectName}</p>
        <p><strong>Location:</strong> {formData.location}</p>
        <p><strong>Size:</strong> {formData.size} sqft</p>
        <p><strong>Price:</strong> ₹{formData.price}</p>
        <p><strong>Features:</strong> {formData.features}</p>
        <p><strong>Contact:</strong> {formData.contactName}, {formData.contactNumber}</p>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={prevStep}>
          Back
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ContactPreviewSubmit;
