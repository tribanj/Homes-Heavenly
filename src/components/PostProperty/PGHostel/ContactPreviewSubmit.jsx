// src/components/PostProperty/PGHostel/ContactPreviewSubmit.js
import React from "react";

const ContactPreviewSubmit = ({ formData, setFormData, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // You can replace this with actual submission logic
    console.log("PG/Hostel Listing Submitted:", formData);
    alert("Your PG/Hostel listing has been submitted!");
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Step 3: Contact Info & Submit</h4>

      <div className="mb-3">
        <label className="form-label">Contact Name</label>
        <input
          type="text"
          className="form-control"
          name="contactName"
          value={formData.contactName || ""}
          onChange={handleChange}
          placeholder="e.g., Anjali Verma"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <input
          type="tel"
          className="form-control"
          name="contactPhone"
          value={formData.contactPhone || ""}
          onChange={handleChange}
          placeholder="e.g., 9876543210"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email Address</label>
        <input
          type="email"
          className="form-control"
          name="contactEmail"
          value={formData.contactEmail || ""}
          onChange={handleChange}
          placeholder="e.g., anjali@example.com"
        />
      </div>

      <div className="mb-4">
        <h5>Preview:</h5>
        <pre className="bg-light p-3 rounded">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={prevStep}>
          Back
        </button>
        <button className="btn btn-success" onClick={handleSubmit}>
          Submit Listing
        </button>
      </div>
    </div>
  );
};

export default ContactPreviewSubmit;
