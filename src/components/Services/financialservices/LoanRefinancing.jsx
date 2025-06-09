import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LoanRefinancingBalanceTransfer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    existingLoanAmount: '',
    existingLender: '',
    preferredEMI: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Loan Refinancing & Balance Transfer Request Submitted:", formData);
    toast.success("Your loan refinancing request has been submitted!");
    setFormData({
      name: '',
      email: '',
      contact: '',
      existingLoanAmount: '',
      existingLender: '',
      preferredEMI: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>🔄 Loan Refinancing & Balance Transfer</h1>
      <p className="lead">
        Lower your interest burden or switch lenders for better terms. We help you refinance existing loans or transfer your balance seamlessly.
      </p>

      <section className="mt-4">
        <h4>💡 Why Refinance With Us?</h4>
        <ul>
          <li>💸 Lower EMIs and better repayment terms</li>
          <li>📊 Transparent charges and cost-saving breakdown</li>
          <li>⚡ Quick processing with minimal paperwork</li>
          <li>🤝 Expert negotiation with banks on your behalf</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📩 Refinance Your Loan Today</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Contact Number</label>
            <input type="tel" name="contact" className="form-control" value={formData.contact} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Existing Loan Amount</label>
            <input type="number" name="existingLoanAmount" className="form-control" value={formData.existingLoanAmount} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Existing Lender Name</label>
            <input type="text" name="existingLender" className="form-control" value={formData.existingLender} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Preferred EMI Amount</label>
            <input type="number" name="preferredEMI" className="form-control" value={formData.preferredEMI} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success">📩 Refinance My Loan</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>🔑 Loan Refinancing Benefits</h4>
        <ul>
          <li>📉 Reduce your monthly payment by lowering interest rates</li>
          <li>🏦 Switch to a better lender with better terms and conditions</li>
          <li>📊 Get detailed cost-saving breakdown and comparison</li>
          <li>📝 We handle all paperwork and documentation for a smooth process</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>🔒 Why Choose Us for Refinancing & Balance Transfer?</h4>
        <ul>
          <li>🔍 Get access to multiple loan offers from top lenders</li>
          <li>🤝 Expert negotiation to get you the best terms</li>
          <li>💼 Minimal documentation required to process your request</li>
          <li>🔒 Secure, transparent, and efficient process</li>
        </ul>
      </section>
    </div>
  );
};

export default LoanRefinancingBalanceTransfer;
