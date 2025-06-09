import React, { useState } from 'react';
import { toast } from 'react-toastify';

const TitleVerification = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    city: '',
    propertyType: '',
    documentAvailable: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🔍 Title Verification Request:", formData);
    toast.success("Verification request submitted. Our legal team will contact you shortly.");
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      propertyAddress: '',
      city: '',
      propertyType: '',
      documentAvailable: '',
      notes: ''
    });
  };

  return (
    <div className="container my-5">
      <h1>🧾 Property Title Verification & Due Diligence</h1>
      <p className="lead">
        Safeguard your investment with a thorough legal check before any deal is signed. Our legal experts analyze all documents and ensure you're protected from hidden risks.
      </p>

      <section className="my-4">
        <h4>✔️ We Check For:</h4>
        <ul>
          <li>✅ Clear and marketable title</li>
          <li>⚠️ Encumbrances, liens, or ongoing litigation</li>
          <li>📜 Chain of ownership and succession verification</li>
          <li>📐 Land use permission & zoning compliance</li>
          <li>🏛️ Relevant government approvals & certificates</li>
        </ul>
      </section>

      <section className="my-5">
        <h4>📝 Request Title Verification</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} required />
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
            <label className="form-label">Property Address</label>
            <input type="text" className="form-control" name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">City / State</label>
            <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Property Type</label>
            <select className="form-select" name="propertyType" value={formData.propertyType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Plot/Land">Plot/Land</option>
              <option value="Industrial">Industrial</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Do You Have Any Documents?</label>
            <select className="form-select" name="documentAvailable" value={formData.documentAvailable} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Yes - Soft Copy">Yes - Soft Copy</option>
              <option value="Yes - Hard Copy Only">Yes - Hard Copy Only</option>
              <option value="Not Yet">Not Yet</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">Additional Notes (optional)</label>
            <textarea className="form-control" rows="3" name="notes" value={formData.notes} onChange={handleChange}></textarea>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-dark">🔍 Verify Property Title</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>💼 Who Should Use This Service?</h4>
        <ul>
          <li>🏠 Homebuyers</li>
          <li>🏢 Commercial investors</li>
          <li>🧑‍⚖️ Real estate agents or developers</li>
          <li>🏗️ Builders and project financiers</li>
        </ul>
        <p className="mt-3">
          Don’t leave your investment to chance — let our legal experts ensure the property you're buying is clean, compliant, and safe.
        </p>
      </section>
    </div>
  );
};

export default TitleVerification;
