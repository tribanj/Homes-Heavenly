import React from "react";

const FinancialTermsDocuments = ({
  formData,
  handleChange,
  handleMultiChange,
  nextStep,
  prevStep,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    handleMultiChange("documents")(files);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Interest Rate (%)</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          value={formData.interestRate || ""}
          onChange={handleChange("interestRate")}
          required
        />
      </div>

      <div className="mb-3">
        <label>Processing Fee (%)</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          value={formData.processingFee || ""}
          onChange={handleChange("processingFee")}
        />
      </div>

      <div className="mb-3">
        <label>Repayment Plan</label>
        <select
          className="form-select"
          value={formData.repaymentPlan || ""}
          onChange={handleChange("repaymentPlan")}
          required
        >
          <option value="">Select Plan</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="bi-annual">Bi-Annual</option>
          <option value="annual">Annual</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Prepayment Option</label>
        <select
          className="form-select"
          value={formData.prepaymentOption || ""}
          onChange={handleChange("prepaymentOption")}
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Upload Documents</label>
        <input
          type="file"
          className="form-control"
          onChange={handleFileUpload}
          multiple
        />
        {formData.documents?.length > 0 && (
          <ul className="mt-2">
            {formData.documents.map((doc, index) => (
              <li key={index}>{doc.name || `Document ${index + 1}`}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={prevStep}>
          Back
        </button>
        <button type="submit" className="btn btn-primary">
          Next
        </button>
      </div>
    </form>
  );
};

export default FinancialTermsDocuments;
