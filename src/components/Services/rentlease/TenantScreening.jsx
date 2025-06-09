import React, { useState } from 'react';
import { toast } from 'react-toastify';

const TenantScreening = () => {
  const [formData, setFormData] = useState({
    landlordName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    tenantName: '',
    screeningType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🔍 Tenant Screening Request:", formData);
    toast.success("Screening request submitted. Our team will contact you soon.");
    setFormData({
      landlordName: '',
      email: '',
      phone: '',
      propertyAddress: '',
      tenantName: '',
      screeningType: '',
    });
  };

  return (
    <div className="container mt-5 mb-5">
      <h1>👤 Tenant Screening & Background Checks</h1>
      <p className="lead">
        Protect your rental investment by making informed decisions. We offer thorough, reliable screening of all prospective tenants.
      </p>

      <section className="mt-4">
        <h4>🔎 What Our Screening Covers</h4>
        <ul>
          <li>✅ Identity & government-issued ID verification</li>
          <li>✅ Employment & income validation</li>
          <li>✅ Rental history & prior landlord feedback</li>
          <li>✅ Credit score evaluation</li>
          <li>✅ Criminal background check (if permitted by law)</li>
          <li>✅ Court records & eviction history</li>
        </ul>
      </section>

      <section className="mt-4">
        <h4>📨 Request Screening Services</h4>
        <form className="row g-3 mt-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Your Full Name</label>
            <input type="text" name="landlordName" className="form-control" value={formData.landlordName} onChange={handleChange} required />
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
            <label className="form-label">Property Address</label>
            <input type="text" name="propertyAddress" className="form-control" value={formData.propertyAddress} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Prospective Tenant’s Name</label>
            <input type="text" name="tenantName" className="form-control" value={formData.tenantName} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Type of Screening</label>
            <select name="screeningType" className="form-select" value={formData.screeningType} onChange={handleChange} required>
              <option value="">-- Select --</option>
              <option value="Basic">Basic (ID + Employment + Rental History)</option>
              <option value="Full">Full (Includes Criminal & Credit Check)</option>
              <option value="Custom">Custom Screening</option>
            </select>
          </div>
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary">📤 Submit Screening Request</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>❓ Frequently Asked Questions</h4>
        <div className="accordion" id="screeningFaq">
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq1">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                Is tenant consent required for screening?
              </button>
            </h2>
            <div id="collapse1" className="accordion-collapse collapse show">
              <div className="accordion-body">Yes. Written consent from the tenant is mandatory for background and credit checks.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                How long does the screening process take?
              </button>
            </h2>
            <div id="collapse2" className="accordion-collapse collapse">
              <div className="accordion-body">Typically 24–48 hours for basic checks. Full reports may take 3–5 business days.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq3">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                Is this service available in all states?
              </button>
            </h2>
            <div id="collapse3" className="accordion-collapse collapse">
              <div className="accordion-body">We cover most of India. Some services depend on access to local records or government systems.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TenantScreening;
