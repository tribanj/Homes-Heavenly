import React, { useState } from 'react';
import { toast } from 'react-toastify';

const HomeInsurancePlans = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    email: '',
    propertyType: '',
    coverageInterest: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Insurance Interest Form Submitted:", formData);
    toast.success("Your insurance inquiry has been submitted!");
    setFormData({
      fullName: '',
      contact: '',
      email: '',
      propertyType: '',
      coverageInterest: '',
      address: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>🏠 Home Insurance & Property Protection Plans</h1>
      <p className="lead">
        Safeguard your property and rental income with comprehensive, flexible insurance plans tailored for homeowners, landlords, and investors.
      </p>

      <section className="mt-4">
        <h4>🛡️ What’s Covered:</h4>
        <ul>
          <li>🔥 Fire, theft, and natural disaster protection</li>
          <li>💸 Rental income protection for landlords</li>
          <li>⚖️ Liability coverage for legal claims</li>
          <li>📉 Affordable premiums with customizable coverage options</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📋 Request a Personalized Insurance Quote</h4>
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
            <label className="form-label">Property Type</label>
            <select name="propertyType" className="form-select" value={formData.propertyType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Rental Property">Rental Property</option>
              <option value="Vacation Home">Vacation Home</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">Coverage Interest</label>
            <select name="coverageInterest" className="form-select" value={formData.coverageInterest} onChange={handleChange} required>
              <option value="">Select Interest</option>
              <option value="Fire/Theft/Natural Disaster">Fire, Theft, Natural Disaster</option>
              <option value="Rental Income Protection">Rental Income Protection</option>
              <option value="Liability Coverage">Landlord Liability Coverage</option>
              <option value="Comprehensive">Comprehensive (All-Inclusive)</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">Property Address</label>
            <textarea name="address" className="form-control" rows="3" value={formData.address} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">📨 Explore Insurance Options</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>✅ Why Choose Us?</h4>
        <ul>
          <li>✔️ Partnerships with top-rated insurers</li>
          <li>✔️ Expert consultation to match your needs</li>
          <li>✔️ Transparent terms with no hidden charges</li>
          <li>✔️ Claims support and renewals assistance</li>
        </ul>
      </section>
    </div>
  );
};

export default HomeInsurancePlans;
