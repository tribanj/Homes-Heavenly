import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CorporateSolutions = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    contactPerson: '',
    email: '',
    phone: '',
    serviceInterest: '',
    city: '',
    employeeCount: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🏢 Corporate Real Estate Inquiry:", formData);
    toast.success("Request submitted! Our team will reach out shortly.");
    setFormData({
      companyName: '',
      industry: '',
      contactPerson: '',
      email: '',
      phone: '',
      serviceInterest: '',
      city: '',
      employeeCount: '',
      notes: ''
    });
  };

  return (
    <div className="container my-5">
      <h1>🏢 Real Estate Solutions for Corporates & Startups</h1>
      <p className="lead">
        Custom strategies for office space, expansion, and workplace optimization — built around your business goals.
      </p>

      <section className="my-4">
        <h4>🔧 Tailored Services Include:</h4>
        <ul>
          <li>📈 Portfolio planning & multi-location expansion</li>
          <li>🏗️ Built-to-suit development aligned to your brand & operations</li>
          <li>📜 Lease negotiations, renewals & exit strategies</li>
          <li>📊 Space utilization audits & workplace strategy consulting</li>
        </ul>
      </section>

      <section className="my-5">
        <h4>📋 Request a Corporate Consultation</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Company Name</label>
            <input type="text" className="form-control" name="companyName" value={formData.companyName} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Industry</label>
            <input type="text" className="form-control" name="industry" value={formData.industry} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Contact Person</label>
            <input type="text" className="form-control" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Interested Services</label>
            <select className="form-select" name="serviceInterest" value={formData.serviceInterest} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Built-to-Suit Office">Built-to-Suit Office</option>
              <option value="Expansion Planning">Expansion Planning</option>
              <option value="Lease Advisory">Lease Advisory</option>
              <option value="Workplace Consultancy">Workplace Consultancy</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Preferred City/Region</label>
            <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Approx. No. of Employees</label>
            <input type="number" className="form-control" name="employeeCount" value={formData.employeeCount} onChange={handleChange} />
          </div>

          <div className="col-12">
            <label className="form-label">Additional Notes or Requirements</label>
            <textarea className="form-control" name="notes" rows="3" value={formData.notes} onChange={handleChange} />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-dark">📨 Request Corporate Consultation</button>
          </div>
        </form>
      </section>

      <section className="my-5">
        <h4>💼 Who We Serve</h4>
        <ul>
          <li>🚀 Startups seeking scalable, cost-effective workspaces</li>
          <li>🏢 Corporates planning multi-city or global expansions</li>
          <li>🔄 Enterprises looking to optimize underutilized space</li>
          <li>👥 Remote teams needing hybrid or satellite offices</li>
        </ul>
      </section>
    </div>
  );
};

export default CorporateSolutions;
