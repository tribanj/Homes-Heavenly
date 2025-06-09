import React from "react";

const ContactPreviewSubmit = ({ formData, handleChange, onBack }) => {
  const handleSubmit = () => {
    console.log("Submitting property:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="container py-4">
      <h3>📞 Contact & Preview</h3>
      {/* Display preview or collect contact info */}
      <pre>{JSON.stringify(formData, null, 2)}</pre>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary" onClick={onBack}>
          ⬅ Back
        </button>
        <button className="btn btn-success" onClick={handleSubmit}>
          ✅ Submit
        </button>
      </div>
    </div>
  );
};

export default ContactPreviewSubmit;
