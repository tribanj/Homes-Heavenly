import React, { useState } from 'react';
import { toast } from 'react-toastify';

const RentalDisputeResolution = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    issueType: '',
    propertyLocation: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📋 Dispute Resolution Request:", formData);
    toast.success("Your dispute request has been submitted.");
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      issueType: '',
      propertyLocation: '',
      details: '',
    });
  };

  return (
    <div className="container py-5">
      <h1 className="mb-3">🛠️ Landlord & Tenant Dispute Resolution</h1>
      <p className="lead">
        Rental conflicts don’t need to escalate. Our legal team offers mediation, representation, and documentation assistance to resolve disputes professionally and lawfully.
      </p>

      <section className="my-4">
        <h4>🔍 Support Covers:</h4>
        <ul>
          <li>🏠 Eviction proceedings & rent defaults</li>
          <li>📑 Lease violations or unauthorized use</li>
          <li>💸 Unpaid rent, damage recovery, & deposit disputes</li>
          <li>⚖️ Legal mediation, arbitration, & court representation</li>
          <li>📋 Drafting legal notices, NOC & settlement terms</li>
        </ul>
      </section>

      <section className="my-5">
        <h4>📨 Submit a Dispute Case</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">You Are A:</label>
            <select name="role" className="form-select" value={formData.role} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Landlord">Landlord</option>
              <option value="Tenant">Tenant</option>
              <option value="Property Manager">Property Manager</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Type of Dispute</label>
            <select name="issueType" className="form-select" value={formData.issueType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Eviction / Non-payment">Eviction / Non-payment</option>
              <option value="Lease Violation">Lease Violation</option>
              <option value="Security Deposit Issue">Security Deposit Issue</option>
              <option value="Property Damage">Property Damage</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Property Location</label>
            <input type="text" name="propertyLocation" className="form-control" value={formData.propertyLocation} onChange={handleChange} required />
          </div>
          <div className="col-12">
            <label className="form-label">Dispute Details</label>
            <textarea name="details" className="form-control" rows="4" value={formData.details} onChange={handleChange} placeholder="Explain the situation in brief..." required></textarea>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">📩 Resolve a Rental Dispute</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>💡 Why Choose Our Legal Experts?</h4>
        <ul>
          <li>✔️ Deep understanding of rental laws & tenancy rights</li>
          <li>✔️ Professional mediation to avoid lengthy court battles</li>
          <li>✔️ Transparent, fixed-fee legal services</li>
          <li>✔️ Representation at local rent boards or consumer courts</li>
        </ul>
      </section>
    </div>
  );
};

export default RentalDisputeResolution;
