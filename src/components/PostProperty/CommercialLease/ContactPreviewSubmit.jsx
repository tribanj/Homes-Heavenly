import React from "react";

const ContactPreviewSubmit = ({ formData, setFormData, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Commercial Lease:", formData);
    alert("Commercial Lease listing submitted successfully!");
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Step 3: Contact Info & Preview</h4>

      <div className="mb-3">
        <label className="form-label">Contact Name</label>
        <input
          type="text"
          className="form-control"
          name="contactName"
          value={formData.contactName || ""}
          onChange={handleChange}
          placeholder="e.g., Rajiv Mehra"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contact Phone</label>
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
        <label className="form-label">Contact Email</label>
        <input
          type="email"
          className="form-control"
          name="contactEmail"
          value={formData.contactEmail || ""}
          onChange={handleChange}
          placeholder="e.g., email@example.com"
        />
      </div>

      <hr />
      <h5>Preview</h5>
      <pre className="bg-light p-3 border rounded">
        {JSON.stringify(formData, null, 2)}
      </pre>

      <div className="d-flex justify-content-between mt-3">
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
