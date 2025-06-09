import React from "react";

const ContactPreviewSubmit = ({ formData, prevStep, handleSubmit }) => {
  return (
    <div>
      <h3 className="mb-4">Preview Your Mortgage Listing</h3>

      <div className="mb-3">
        <strong>Property Type:</strong> {formData.propertyType}
      </div>

      <div className="mb-3">
        <strong>Property Location:</strong> {formData.location}
      </div>

      <div className="mb-3">
        <strong>Loan Amount:</strong> ₹{formData.loanAmount}
      </div>

      <div className="mb-3">
        <strong>Interest Rate:</strong> {formData.interestRate}%
      </div>

      <div className="mb-3">
        <strong>Repayment Plan:</strong> {formData.repaymentPlan}
      </div>

      {formData.processingFee && (
        <div className="mb-3">
          <strong>Processing Fee:</strong> {formData.processingFee}%
        </div>
      )}

      {formData.prepaymentOption && (
        <div className="mb-3">
          <strong>Prepayment Option:</strong> {formData.prepaymentOption}
        </div>
      )}

      <div className="mb-3">
        <strong>Contact Name:</strong> {formData.contactName}
      </div>

      <div className="mb-3">
        <strong>Contact Phone:</strong> {formData.contactPhone}
      </div>

      <div className="mb-3">
        <strong>Contact Email:</strong> {formData.contactEmail}
      </div>

      <div className="mb-3">
        <strong>Uploaded Documents:</strong>
        {formData.documents && formData.documents.length > 0 ? (
          <ul>
            {formData.documents.map((file, index) => (
              <li key={index}>{file.name || `Document ${index + 1}`}</li>
            ))}
          </ul>
        ) : (
          <p>No documents uploaded.</p>
        )}
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={prevStep}>
          Back
        </button>
        <button type="button" className="btn btn-success" onClick={handleSubmit}>
          Submit Listing
        </button>
      </div>
    </div>
  );
};

export default ContactPreviewSubmit;
