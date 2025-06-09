import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LegalDisputeResolution = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    email: '',
    role: '',
    disputeType: '',
    propertyAddress: '',
    caseDetails: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📑 Legal Dispute Form Submitted:", formData);
    toast.success("Your request for legal support has been submitted.");
    setFormData({
      fullName: '',
      contact: '',
      email: '',
      role: '',
      disputeType: '',
      propertyAddress: '',
      caseDetails: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>⚖️ Legal Dispute Resolution for Landlords & Tenants</h1>
      <p className="lead">
        Conflicts can happen — we're here to help resolve them efficiently and legally. Whether you're a landlord facing non-payment or a tenant dealing with unfair eviction, our experts are ready to support you.
      </p>

      <section className="mt-4">
        <h4>🛡️ We Handle:</h4>
        <ul>
          <li>🚫 Tenant evictions and default handling</li>
          <li>💰 Rent disputes and breach of contract</li>
          <li>🏛️ Representation before rent control boards or housing tribunals</li>
          <li>📚 Guidance on rights and legal obligations of landlords and tenants</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📋 Request Legal Assistance</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} required />
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
            <label className="form-label">I am a:</label>
            <select name="role" className="form-select" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="Landlord">Landlord</option>
              <option value="Tenant">Tenant</option>
              <option value="Property Manager">Property Manager</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Type of Dispute</label>
            <select name="disputeType" className="form-select" value={formData.disputeType} onChange={handleChange} required>
              <option value="">Select Dispute</option>
              <option value="Eviction">Eviction Issue</option>
              <option value="Rent Dispute">Rent Dispute</option>
              <option value="Contract Breach">Breach of Agreement</option>
              <option value="Legal Notice">Legal Notice / Court Order</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Property Address</label>
            <input type="text" name="propertyAddress" className="form-control" value={formData.propertyAddress} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <label className="form-label">Case Details</label>
            <textarea name="caseDetails" className="form-control" rows="4" value={formData.caseDetails} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-danger">📨 Get Legal Help</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>✅ Why Choose Us?</h4>
        <ul>
          <li>✔️ Legal professionals with real estate specialization</li>
          <li>✔️ Personalized support for landlords & tenants</li>
          <li>✔️ Quick turnarounds on mediation and filings</li>
          <li>✔️ Affordable packages for legal services</li>
        </ul>
      </section>
    </div>
  );
};

export default LegalDisputeResolution;
