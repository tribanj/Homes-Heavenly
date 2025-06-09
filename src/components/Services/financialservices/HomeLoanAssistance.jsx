import React, { useState } from 'react';
import { toast } from 'react-toastify';

const HomeLoanMortgageAssistance = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    loanAmount: '',
    loanTenure: '',
    propertyType: '',
    assistanceType: 'Home Loan',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Loan/Mortgage Assistance Request Submitted:", formData);
    toast.success("Your request has been submitted successfully!");
    setFormData({
      name: '',
      email: '',
      contact: '',
      loanAmount: '',
      loanTenure: '',
      propertyType: '',
      assistanceType: 'Home Loan',
    });
  };

  return (
    <div className="container my-5">
      <h1>🏦 Home Loan & Mortgage Assistance</h1>
      <p className="lead">
        Welcome to your one-stop solution for all things related to home loans and property mortgage financing.
        Whether you're buying your first home, upgrading, refinancing, or leveraging your property for liquidity — our expert team will guide you through every step.
      </p>

      <section className="mt-4">
        <h4>🧠 Understand the Basics</h4>
        <p><strong>Home Loan:</strong> A loan provided to purchase or construct a residential or commercial property, usually repaid over 10–30 years.</p>
        <p><strong>Mortgage Loan (Loan Against Property):</strong> A secured loan where you pledge existing property to get funds for business, education, or personal needs.</p>
        <p><strong>Balance Transfer:</strong> Transfer your existing loan to another lender offering better interest rates and terms.</p>
      </section>

      <section className="mt-5">
        <h4>📝 Apply Now for Personalized Assistance</h4>
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
            <label className="form-label">Property Type</label>
            <select name="propertyType" className="form-select" value={formData.propertyType} onChange={handleChange} required>
              <option value="">Select Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Loan Amount (₹)</label>
            <input type="number" name="loanAmount" className="form-control" value={formData.loanAmount} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Loan Tenure (Years)</label>
            <input type="number" name="loanTenure" className="form-control" value={formData.loanTenure} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Assistance Type</label>
            <select name="assistanceType" className="form-select" value={formData.assistanceType} onChange={handleChange}>
              <option value="Home Loan">Home Loan</option>
              <option value="Mortgage Loan">Mortgage Loan</option>
              <option value="Both">Both</option>
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">📩 Submit Request</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>🏠 Home Loan Benefits & Details</h4>
        <ul>
          <li>🔍 Choose from top lenders with interest rates starting from 8.5% p.a.</li>
          <li>📅 Flexible tenure options from 5 to 30 years</li>
          <li>🧾 Tax benefits under Sections 80C & 24(b) for principal and interest</li>
          <li>✅ Eligibility support for salaried, self-employed, and NRIs</li>
          <li>📝 Documentation includes KYC, income proof, property documents, etc.</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>🏡 Mortgage Loan (Loan Against Property)</h4>
        <ul>
          <li>💰 Use funds for business expansion, education, or emergencies</li>
          <li>🏛️ Property remains yours — you continue to use it</li>
          <li>📉 Lower interest rates compared to personal loans (starting from 9.25% p.a.)</li>
          <li>🔍 High loan amounts — up to 70% of the property’s market value</li>
          <li>📜 Required: Clear title, ownership documents, income proof</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>🔄 Balance Transfer & Refinance</h4>
        <ul>
          <li>📉 Lower your monthly EMIs and reduce loan burden</li>
          <li>⚡ Quick processing for eligible borrowers</li>
          <li>💼 Negotiate better terms or add top-up loans</li>
          <li>📊 Use our advisory team to calculate savings before switching</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>🧭 Step-by-Step Process Overview</h4>
        <ol>
          <li>🗂️ Consultation with our loan advisor</li>
          <li>🔍 Eligibility check & document collection</li>
          <li>🏦 Lender selection & loan offer comparison</li>
          <li>📝 Application submission & approval tracking</li>
          <li>📜 Disbursement and legal registration</li>
        </ol>
      </section>

      <section className="mt-5">
        <h4>❓ Frequently Asked Questions (FAQs)</h4>
        <ul>
          <li><strong>Q:</strong> Can I get a home loan without a co-applicant?<br /><strong>A:</strong> Yes, but a co-applicant improves eligibility and approval chances.</li>
          <li><strong>Q:</strong> What is the maximum tenure for a mortgage loan?<br /><strong>A:</strong> Generally 15–20 years, depending on the lender and applicant profile.</li>
          <li><strong>Q:</strong> Do I need insurance for a home loan?<br /><strong>A:</strong> It’s optional, but property insurance or loan insurance is often recommended.</li>
        </ul>
      </section>
    </div>
  );
};

export default HomeLoanMortgageAssistance;
