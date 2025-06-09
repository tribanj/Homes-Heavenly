import React, { useState } from 'react';
import { toast } from 'react-toastify';

const OfficeSpaceLeasing = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    contact: '',
    spaceType: '',
    location: '',
    teamSize: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📨 Office Space Leasing Request:", formData);
    toast.success("Your request has been submitted. Our team will contact you soon!");
    setFormData({
      name: '',
      company: '',
      email: '',
      contact: '',
      spaceType: '',
      location: '',
      teamSize: '',
      notes: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>🏢 Office Space Leasing & Business Relocation</h1>
      <p className="lead">
        Find the right office space that fuels productivity and supports your team’s growth. Whether you need a startup hub or a new HQ, we handle the process end-to-end.
      </p>

      <section className="my-4">
        <h4>🔧 Our Services Include:</h4>
        <ul>
          <li>📦 Fully furnished & unfurnished office leasing</li>
          <li>🤝 Co-working & flexible workspace options</li>
          <li>🚚 End-to-end relocation planning & execution</li>
          <li>📍 Location analysis & cost optimization strategies</li>
        </ul>
      </section>

      <section className="my-5">
        <h4>📋 Tell Us What You Need</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Company Name</label>
            <input type="text" name="company" className="form-control" value={formData.company} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Contact Number</label>
            <input type="tel" name="contact" className="form-control" value={formData.contact} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Office Type</label>
            <select name="spaceType" className="form-select" value={formData.spaceType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Furnished Office">Furnished Office</option>
              <option value="Unfurnished Office">Unfurnished Office</option>
              <option value="Co-Working Space">Co-Working Space</option>
              <option value="Shared Office">Shared Office</option>
              <option value="Custom Setup">Custom Setup</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Preferred Location</label>
            <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Team Size</label>
            <input type="number" name="teamSize" className="form-control" value={formData.teamSize} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <label className="form-label">Additional Notes or Requirements</label>
            <textarea name="notes" className="form-control" rows="3" value={formData.notes} onChange={handleChange} />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">📨 Find an Office Space</button>
          </div>
        </form>
      </section>

      <section className="my-5">
        <h4>🚀 Why Work With Us?</h4>
        <ul>
          <li>✅ End-to-end lease and relocation support</li>
          <li>💼 Access to a wide range of commercial properties</li>
          <li>📊 Strategic location and cost analysis</li>
          <li>📆 Fast execution with minimal business disruption</li>
        </ul>
      </section>

      <section className="my-5">
        <h4>🔄 Our Business Relocation Process</h4>
        <ol>
          <li>📞 Consultation & Needs Assessment</li>
          <li>🔍 Property Search & Comparison</li>
          <li>📑 Lease Negotiation & Documentation</li>
          <li>🚛 Relocation Logistics & IT Setup</li>
          <li>🎉 Post-Move Support</li>
        </ol>
      </section>
    </div>
  );
};

export default OfficeSpaceLeasing;
