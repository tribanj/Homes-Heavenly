import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LegalAssistance = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceRequired: '',
    propertyLocation: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📝 Legal Assistance Request:", formData);
    toast.success("Your request has been submitted. Our legal team will contact you shortly.");
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceRequired: '',
      propertyLocation: '',
    });
  };

  return (
    <div className="container mt-5 mb-5">
      <h1>📄 Legal & Documentation Assistance</h1>
      <p className="lead">
        From agreements to ownership transfers, our legal experts help you navigate the paperwork safely and efficiently.
      </p>

      <section className="mt-4">
        <h4>📌 What We Help With</h4>
        <ul>
          <li>✅ Drafting & verifying Sale Agreements</li>
          <li>✅ Title Due Diligence & Encumbrance checks</li>
          <li>✅ Registration, Mutation & Stamp Duty handling</li>
          <li>✅ Government approvals & NOC clearances</li>
          <li>✅ POA (Power of Attorney) and Affidavit assistance</li>
          <li>✅ Legal representation during disputes or litigation</li>
        </ul>
      </section>

      <section className="mt-4">
        <h4>🔍 Why Legal Assistance Is Critical</h4>
        <ul>
          <li>✔ Avoid frauds, forgery, or hidden liabilities</li>
          <li>✔ Ensure ownership & documentation are 100% valid</li>
          <li>✔ Prevent legal delays in property resale or rentals</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>👩‍⚖️ Talk to Our Legal Experts</h4>
        <form className="row g-3 mt-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Location of Property</label>
            <input type="text" name="propertyLocation" className="form-control" value={formData.propertyLocation} onChange={handleChange} required />
          </div>
          <div className="col-12">
            <label className="form-label">What Help Do You Need?</label>
            <select name="serviceRequired" className="form-select" value={formData.serviceRequired} onChange={handleChange} required>
              <option value="">-- Select --</option>
              <option value="Sale Agreement">Sale Agreement Draft/Review</option>
              <option value="Title Check">Title Verification</option>
              <option value="Registration">Registration & Stamp Duty</option>
              <option value="NOCs">NOC or Govt Approvals</option>
              <option value="Representation">Legal Dispute Representation</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary">📨 Speak to Our Legal Team</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>❓ Frequently Asked Questions</h4>
        <div className="accordion" id="legalFaq">
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq1">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                Is title verification mandatory before purchase?
              </button>
            </h2>
            <div id="collapse1" className="accordion-collapse collapse show">
              <div className="accordion-body">Absolutely. It ensures the seller has legal ownership and the property is free of any disputes or liabilities.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                Can I do registration without a lawyer?
              </button>
            </h2>
            <div id="collapse2" className="accordion-collapse collapse">
              <div className="accordion-body">Technically yes, but a legal review ensures all clauses are correct and no rights are being waived inadvertently.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq3">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                Do you provide services PAN India?
              </button>
            </h2>
            <div id="collapse3" className="accordion-collapse collapse">
              <div className="accordion-body">Yes, we have legal partners and associates across major metros and Tier 2 cities in India.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalAssistance;
