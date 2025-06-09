import React from "react";

const ContactPreviewSubmit = ({ formData, setFormData, prevStep }) => {
  return (
    <div className="container py-4">
      <h4 className="mb-4">Step 3: Contact & Preview</h4>

      <div className="mb-3">
        <label className="form-label">Your Name</label>
        <input
          type="text"
          className="form-control"
          name="contactName"
          value={formData.contactName || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, contactName: e.target.value }))
          }
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Your Phone Number</label>
        <input
          type="tel"
          className="form-control"
          name="contactPhone"
          value={formData.contactPhone || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))
          }
          placeholder="Enter your phone number"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Your Email</label>
        <input
          type="email"
          className="form-control"
          name="contactEmail"
          value={formData.contactEmail || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))
          }
          placeholder="Enter your email"
        />
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={prevStep}>
          Back
        </button>
        <button className="btn btn-primary" onClick={() => alert('Listing Submitted')}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ContactPreviewSubmit;
