import React, { useState } from 'react';
import { toast } from 'react-toastify';

const RERACompliance = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: '',
    state: '',
    projectName: '',
    serviceType: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📋 RERA Assistance Request:", formData);
    toast.success("Your RERA request has been submitted successfully.");
    setFormData({
      name: '',
      email: '',
      phone: '',
      userType: '',
      state: '',
      projectName: '',
      serviceType: '',
      message: '',
    });
  };

  return (
    <div className="container py-5">
      <h1 className="mb-3">🏛️ RERA Compliance & Registration Assistance</h1>
      <p className="lead">
        Stay aligned with India's Real Estate Regulatory Authority (RERA) requirements. Whether you're a developer, agent, or buyer — we ensure compliance, registrations, and legal documentation are managed smoothly.
      </p>

      <section className="my-4">
        <h4>📌 Services We Offer:</h4>
        <ul>
          <li>📂 RERA project registration for developers and agents</li>
          <li>📝 Documentation, form submission & filing support</li>
          <li>⚖️ Legal advisory on RERA compliance & penalties</li>
          <li>🛡️ Help in RERA complaint resolution or appeals</li>
          <li>📢 RERA awareness guidance for buyers & investors</li>
        </ul>
      </section>

      <section className="my-5">
        <h4>📨 Request RERA Support</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">User Type</label>
            <select name="userType" className="form-select" value={formData.userType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Developer">Developer</option>
              <option value="Real Estate Agent">Real Estate Agent</option>
              <option value="Property Buyer">Property Buyer</option>
              <option value="Investor">Investor</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">State / RERA Jurisdiction</label>
            <input type="text" name="state" className="form-control" value={formData.state} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Project Name (if applicable)</label>
            <input type="text" name="projectName" className="form-control" value={formData.projectName} onChange={handleChange} />
          </div>
          <div className="col-md-12">
            <label className="form-label">Required Service</label>
            <select name="serviceType" className="form-select" value={formData.serviceType} onChange={handleChange} required>
              <option value="">Select a Service</option>
              <option value="RERA Registration (Project)">RERA Registration (Project)</option>
              <option value="RERA Registration (Agent)">RERA Registration (Agent)</option>
              <option value="Compliance Advisory">Compliance Advisory</option>
              <option value="Legal Representation">Legal Representation</option>
              <option value="Complaint Filing / Resolution">Complaint Filing / Resolution</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Additional Notes</label>
            <textarea name="message" className="form-control" rows="4" value={formData.message} onChange={handleChange}></textarea>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">📩 Get RERA Help</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>👤 Who Should Use This Page?</h4>
        <ul>
          <li>✅ Builders and Developers launching new projects</li>
          <li>✅ Real Estate Agents needing registration or renewal</li>
          <li>✅ Buyers facing issues with non-RERA-registered projects</li>
          <li>✅ Anyone needing legal clarity on RERA rules & rights</li>
        </ul>
      </section>
    </div>
  );
};

export default RERACompliance;
