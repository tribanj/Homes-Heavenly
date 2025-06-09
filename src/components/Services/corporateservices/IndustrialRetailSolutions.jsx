import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CommercialSpaceSolutions = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    contact: '',
    propertyType: '',
    location: '',
    sizeRequirement: '',
    purpose: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🗂️ Commercial Space Inquiry Submitted:", formData);
    toast.success("Your request has been submitted successfully!");
    setFormData({
      name: '',
      company: '',
      email: '',
      contact: '',
      propertyType: '',
      location: '',
      sizeRequirement: '',
      purpose: '',
      notes: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>🏭 Industrial, Warehouse & Retail Space Solutions</h1>
      <p className="lead">
        We help businesses secure industrial, retail, and warehouse properties that match their scale and operations.
      </p>

      <section className="my-4">
        <h4>🔍 We Specialize In:</h4>
        <ul>
          <li>🏗️ Industrial plots & logistics hubs</li>
          <li>❄️ Cold storage, manufacturing & warehousing</li>
          <li>🏬 Retail stores, showrooms, malls & kiosks</li>
          <li>📃 Long-term leases and outright purchase options</li>
        </ul>
      </section>

      <section className="my-5">
        <h4>📋 Submit Your Requirements</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Your Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Company Name</label>
            <input type="text" name="company" className="form-control" value={formData.company} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input type="tel" name="contact" className="form-control" value={formData.contact} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Property Type</label>
            <select name="propertyType" className="form-select" value={formData.propertyType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Retail Space">Retail Space</option>
              <option value="Cold Storage">Cold Storage</option>
              <option value="Manufacturing Unit">Manufacturing Unit</option>
              <option value="Industrial Plot">Industrial Plot</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Preferred Location</label>
            <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Size Requirement (sq ft)</label>
            <input type="text" name="sizeRequirement" className="form-control" value={formData.sizeRequirement} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Purpose of Use</label>
            <input type="text" name="purpose" className="form-control" value={formData.purpose} onChange={handleChange} placeholder="e.g. Storage, Retail, Manufacturing" />
          </div>

          <div className="col-12">
            <label className="form-label">Additional Notes</label>
            <textarea name="notes" className="form-control" rows="3" value={formData.notes} onChange={handleChange} />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">📨 Browse Commercial Listings</button>
          </div>
        </form>
      </section>

      <section className="my-5">
        <h4>🚀 Why Choose Us?</h4>
        <ul>
          <li>✅ Verified listings with industrial compliance</li>
          <li>📊 Customized property matches based on operations</li>
          <li>📝 Legal and lease support with transparent terms</li>
          <li>🤝 End-to-end service: site visit to possession</li>
        </ul>
      </section>

      <section className="my-5">
        <h4>📦 Popular Use Cases</h4>
        <ol>
          <li>✅ E-commerce warehousing & logistics hubs</li>
          <li>✅ Cold storage for perishables or pharmaceuticals</li>
          <li>✅ Retail chains looking for footfall-centric storefronts</li>
          <li>✅ SME manufacturing or assembly operations</li>
        </ol>
      </section>
    </div>
  );
};

export default CommercialSpaceSolutions;
