import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LeaseDrafting = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyType: '',
    requestType: '',
    propertyAddress: '',
    preferredDate: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📄 Lease Service Request:", formData);
    toast.success("Lease request submitted. Our legal team will reach out shortly.");
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      propertyType: '',
      requestType: '',
      propertyAddress: '',
      preferredDate: '',
      notes: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>📄 Lease Agreement Drafting & Renewal</h1>
      <p className="lead">
        Get legally-compliant lease agreements tailored to your specific requirements. Whether you're a landlord or tenant, we’ll handle new lease drafting, renewals, and modifications.
      </p>

      <section className="mt-4">
        <h4>🛠️ Services Offered</h4>
        <ul>
          <li>✅ Drafting new residential or commercial lease agreements</li>
          <li>✅ Lease extension & renewal management</li>
          <li>✅ Legal compliance with local/state tenancy laws</li>
          <li>✅ Inclusion of exit clauses and dispute resolution terms</li>
          <li>✅ Support for notarization, registration, and stamping</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📝 Request Drafting or Renewal</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} required />
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
            <label className="form-label">Property Type</label>
            <select name="propertyType" className="form-select" value={formData.propertyType} onChange={handleChange} required>
              <option value="">-- Select --</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Service Type</label>
            <select name="requestType" className="form-select" value={formData.requestType} onChange={handleChange} required>
              <option value="">-- Select --</option>
              <option value="Draft New Lease">Draft New Lease</option>
              <option value="Lease Renewal">Lease Renewal</option>
              <option value="Modify Existing Lease">Modify Existing Lease</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Property Address</label>
            <input type="text" name="propertyAddress" className="form-control" value={formData.propertyAddress} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Preferred Service Date</label>
            <input type="date" name="preferredDate" className="form-control" value={formData.preferredDate} onChange={handleChange} />
          </div>
          <div className="col-12">
            <label className="form-label">Additional Notes</label>
            <textarea name="notes" className="form-control" rows="3" value={formData.notes} onChange={handleChange}></textarea>
          </div>
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-success">📤 Submit Lease Request</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>❓ Frequently Asked Questions</h4>
        <div className="accordion" id="leaseFaq">
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq1">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                Is it mandatory to register a lease agreement?
              </button>
            </h2>
            <div id="collapse1" className="accordion-collapse collapse show">
              <div className="accordion-body">Yes, in most states in India, lease agreements longer than 11 months must be registered to be legally valid.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                Do you assist with stamp duty and registration?
              </button>
            </h2>
            <div id="collapse2" className="accordion-collapse collapse">
              <div className="accordion-body">Absolutely. Our legal team will help you with correct stamp duty calculations and coordinate the registration process.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq3">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                Can I include a lock-in period or exit clause?
              </button>
            </h2>
            <div id="collapse3" className="accordion-collapse collapse">
              <div className="accordion-body">Yes. We help you customize terms like lock-in periods, exit clauses, and notice periods to ensure clarity and fairness.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeaseDrafting;
