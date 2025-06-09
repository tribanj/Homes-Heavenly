import React, { useState } from 'react';
import { toast } from 'react-toastify';

const StampDutyRegistrationSupport = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    propertyValue: '',
    location: '',
    serviceNeeded: '',
    notes: '',
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('📄 Registration Request Submitted:', form);
    toast.success('Your request has been received. We will get back to you shortly.');
    setForm({
      name: '',
      email: '',
      phone: '',
      propertyType: '',
      propertyValue: '',
      location: '',
      serviceNeeded: '',
      notes: '',
    });
  };

  return (
    <div className="container py-5">
      <h1 className="mb-3">📜 Stamp Duty & Property Registration Support</h1>
      <p className="lead">
        Make your property transaction official and legally secure. We assist with every step — from calculating stamp duty to completing your property's legal registration.
      </p>

      <section className="my-4">
        <h4>🔎 We Help You With:</h4>
        <ul>
          <li>🧮 Accurate stamp duty assessment based on location, asset type, and market value</li>
          <li>💻 Digital or in-person registration process guidance</li>
          <li>📄 Preparation of sale deeds, Power of Attorney (POA), and affidavits</li>
          <li>🏢 Representation at sub-registrar’s office if required</li>
          <li>📝 Notarization and e-stamping support</li>
        </ul>
      </section>

      <section className="my-5">
        <h4>📨 Request Legal Registration Support</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input type="tel" name="phone" className="form-control" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Property Type</label>
            <select name="propertyType" className="form-select" value={form.propertyType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Land/Plot">Land / Plot</option>
              <option value="Industrial">Industrial</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Estimated Property Value (INR)</label>
            <input type="number" name="propertyValue" className="form-control" value={form.propertyValue} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Property Location (City/State)</label>
            <input type="text" name="location" className="form-control" value={form.location} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Services Required</label>
            <select name="serviceNeeded" className="form-select" value={form.serviceNeeded} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Stamp Duty Calculation">Stamp Duty Calculation</option>
              <option value="Sale Deed Drafting">Sale Deed Drafting</option>
              <option value="Full Registration Support">Full Registration Support</option>
              <option value="Representation at Registrar">Representation at Registrar</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Additional Notes</label>
            <textarea name="notes" className="form-control" rows="3" value={form.notes} onChange={handleChange}></textarea>
          </div>
          <div className="col-12">
            <button className="btn btn-success" type="submit">📥 Book Registration Support</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>💡 Why Choose Us?</h4>
        <ul>
          <li>✔️ End-to-end legal compliance</li>
          <li>✔️ Transparent stamp duty calculation by location & slab</li>
          <li>✔️ No hidden charges or third-party ambiguity</li>
          <li>✔️ Dedicated legal experts for every case</li>
        </ul>
      </section>
    </div>
  );
};

export default StampDutyRegistrationSupport;
