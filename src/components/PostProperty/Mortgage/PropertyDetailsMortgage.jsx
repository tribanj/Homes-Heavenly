import React from "react";

const PropertyDetailsMortgage = ({
  formData,
  handleChange,
  handleMultiChange,
  nextStep,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Property Type</label>
        <select
          className="form-select"
          value={formData.propertyType || ""}
          onChange={handleChange("propertyType")}
          required
        >
          <option value="">Select Type</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="commercial">Commercial</option>
          <option value="plot">Plot</option>
          <option value="farmhouse">Farmhouse</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Property Location</label>
        <input
          type="text"
          className="form-control"
          value={formData.location || ""}
          onChange={handleChange("location")}
          required
        />
      </div>

      <div className="mb-3">
        <label>Property Size (sq ft)</label>
        <input
          type="number"
          className="form-control"
          value={formData.size || ""}
          onChange={handleChange("size")}
        />
      </div>

      <div className="mb-3">
        <label>Year Built</label>
        <input
          type="number"
          className="form-control"
          value={formData.yearBuilt || ""}
          onChange={handleChange("yearBuilt")}
        />
      </div>

      <div className="mb-3">
        <label>Ownership Type</label>
        <select
          className="form-select"
          value={formData.ownership || ""}
          onChange={handleChange("ownership")}
        >
          <option value="">Select</option>
          <option value="freehold">Freehold</option>
          <option value="leasehold">Leasehold</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Construction Status</label>
        <select
          className="form-select"
          value={formData.constructionStatus || ""}
          onChange={handleChange("constructionStatus")}
        >
          <option value="">Select</option>
          <option value="ready">Ready to move</option>
          <option value="under-construction">Under Construction</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Loan Amount</label>
        <input
          type="number"
          className="form-control"
          value={formData.loanAmount || ""}
          onChange={handleChange("loanAmount")}
          required
        />
      </div>

      <div className="mb-3">
        <label>Bank Name</label>
        <input
          type="text"
          className="form-control"
          value={formData.bankName || ""}
          onChange={handleChange("bankName")}
        />
      </div>

      <div className="mb-3">
        <label>Interest Rate (%)</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          value={formData.interestRate || ""}
          onChange={handleChange("interestRate")}
        />
      </div>

      <div className="mb-3">
        <label>Loan Tenure (in years)</label>
        <input
          type="number"
          className="form-control"
          value={formData.loanTenure || ""}
          onChange={handleChange("loanTenure")}
        />
      </div>

      <div className="mb-3">
        <label>Additional Description</label>
        <textarea
          className="form-control"
          rows="4"
          placeholder="Provide any extra details about the property or mortgage terms..."
          value={formData.description || ""}
          onChange={handleChange("description")}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">
        Next
      </button>
    </form>
  );
};

export default PropertyDetailsMortgage;
