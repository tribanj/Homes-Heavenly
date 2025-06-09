import React, { useState } from 'react';
import { toast } from 'react-toastify';

const RealEstateTaxInvestmentPlanning = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    propertyType: '',
    investmentGoals: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Tax & Investment Planning Request Submitted:", formData);
    toast.success("Your tax consultation request has been submitted!");
    setFormData({
      name: '',
      email: '',
      contact: '',
      propertyType: '',
      investmentGoals: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>📊 Real Estate Tax & Investment Planning</h1>
      <p className="lead">
        Minimize tax liabilities and plan your real estate investments more efficiently. Our financial experts help you optimize deductions, savings, and asset structuring.
      </p>

      <section className="mt-4">
        <h4>💡 We Assist With:</h4>
        <ul>
          <li>📉 Capital gains tax planning</li>
          <li>🏠 HRA & home loan tax benefits</li>
          <li>💰 Rental income tax advisory</li>
          <li>📊 Property investment portfolio planning</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📩 Book a Tax Consultation</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
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
            <input type="text" name="propertyType" className="form-control" value={formData.propertyType} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <label className="form-label">Investment Goals</label>
            <textarea name="investmentGoals" className="form-control" value={formData.investmentGoals} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success">📩 Book My Tax Consultation</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>🔑 Why Consult Our Experts?</h4>
        <ul>
          <li>💸 Optimize your real estate investments for tax savings</li>
          <li>📈 Get personalized tax planning strategies</li>
          <li>⚖️ Ensure compliance with the latest tax laws and regulations</li>
          <li>🧑‍💼 Gain expert guidance on building a strong property portfolio</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>💼 Our Tax & Investment Planning Services Include:</h4>
        <ul>
          <li>📈 In-depth capital gains tax planning for property sales</li>
          <li>🏠 Strategic advice on HRA and home loan tax benefits</li>
          <li>💵 Expert rental income tax planning and optimization</li>
          <li>📊 Personalized portfolio planning and investment strategies</li>
        </ul>
      </section>

    </div>
  );
};

export default RealEstateTaxInvestmentPlanning;
