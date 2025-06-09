import React, { useState } from 'react';
import { toast } from 'react-toastify';

const TenantManagement = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    propertyLocation: '',
    unitsCount: '',
    servicesNeeded: [],
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedServices = checked
        ? [...formData.servicesNeeded, value]
        : formData.servicesNeeded.filter((service) => service !== value);
      setFormData({ ...formData, servicesNeeded: updatedServices });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📋 Tenant Management Request:", formData);
    toast.success("Your tenant management request has been submitted!");
    setFormData({
      ownerName: '',
      email: '',
      phone: '',
      propertyLocation: '',
      unitsCount: '',
      servicesNeeded: [],
      notes: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>🏢 Rent Collection & Tenant Management</h1>
      <p className="lead">
        Let us handle rent collection, tenant communication, and property occupancy — so you can focus on your investments. Our professional management ensures peace of mind.
      </p>

      <section className="mt-4">
        <h4>🔧 Our Services Include:</h4>
        <ul>
          <li>💰 Monthly rent collection & deposit tracking</li>
          <li>📜 Lease compliance & eviction handling</li>
          <li>📞 24/7 tenant communication & issue resolution</li>
          <li>📣 Vacancy advertising and tenant onboarding</li>
          <li>📊 Occupancy reports & revenue insights</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📬 Get a Property Manager</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Owner Name</label>
            <input type="text" name="ownerName" className="form-control" value={formData.ownerName} onChange={handleChange} required />
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
            <label className="form-label">Property Location</label>
            <input type="text" name="propertyLocation" className="form-control" value={formData.propertyLocation} onChange={handleChange} required />
          </div>

          <div className="col-md-4">
            <label className="form-label">No. of Rental Units</label>
            <input type="number" name="unitsCount" className="form-control" value={formData.unitsCount} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <label className="form-label">Select Required Services:</label>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" name="servicesNeeded" value="Rent Collection" onChange={handleChange} checked={formData.servicesNeeded.includes('Rent Collection')} />
              <label className="form-check-label">Rent Collection</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" name="servicesNeeded" value="Tenant Communication" onChange={handleChange} checked={formData.servicesNeeded.includes('Tenant Communication')} />
              <label className="form-check-label">Tenant Communication</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" name="servicesNeeded" value="Compliance Monitoring" onChange={handleChange} checked={formData.servicesNeeded.includes('Compliance Monitoring')} />
              <label className="form-check-label">Lease Compliance & Legal</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" name="servicesNeeded" value="Vacancy Marketing" onChange={handleChange} checked={formData.servicesNeeded.includes('Vacancy Marketing')} />
              <label className="form-check-label">Vacancy Marketing & Onboarding</label>
            </div>
          </div>

          <div className="col-12">
            <label className="form-label">Additional Notes or Instructions</label>
            <textarea name="notes" className="form-control" rows="3" value={formData.notes} onChange={handleChange}></textarea>
          </div>

          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary">📩 Submit Management Request</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>📈 Why Work With Us?</h4>
        <ul>
          <li>✔️ Timely and secure rent deposits</li>
          <li>✔️ Reduced vacancy rates with fast turnarounds</li>
          <li>✔️ Legal support for disputes and evictions</li>
          <li>✔️ Transparent reporting and monthly summaries</li>
        </ul>
      </section>
    </div>
  );
};

export default TenantManagement;
