import React, { useState } from 'react';
import { toast } from 'react-toastify';

const FractionalOwnershipREIT = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    investmentAmount: '',
    preferredPropertyType: '',
    investmentGoal: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Fractional Ownership/REIT Investment Request Submitted:", formData);
    toast.success("Your fractional ownership/REIT investment request has been received!");
    setFormData({
      name: '',
      email: '',
      contact: '',
      investmentAmount: '',
      preferredPropertyType: '',
      investmentGoal: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>🏢 Fractional Ownership & REIT Investment</h1>
      <p className="lead">
        Invest in premium properties or Real Estate Investment Trusts (REITs) with low entry points and enjoy the benefits of passive income. 
        Real estate ownership is now affordable and accessible!
      </p>

      <section className="mt-4">
        <h4>💡 Why Choose Fractional Ownership & REIT Investment?</h4>
        <ul>
          <li>🏠 Shared ownership of high-value real estate assets</li>
          <li>💰 Earn monthly income without the hassle of property management</li>
          <li>📑 Regulatory-compliant REITs and trusted investment platforms</li>
          <li>🔄 Exit options and secondary resale support for easy liquidity</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📝 Start Your Fractional Ownership & REIT Investment</h4>
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
            <label className="form-label">Investment Amount (₹)</label>
            <input type="number" name="investmentAmount" className="form-control" value={formData.investmentAmount} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Preferred Property Type</label>
            <select name="preferredPropertyType" className="form-select" value={formData.preferredPropertyType} onChange={handleChange} required>
              <option value="">Select Property Type</option>
              <option value="Commercial">Commercial Property</option>
              <option value="Residential">Residential Property</option>
              <option value="Mixed-use">Mixed-use Development</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Investment Goal</label>
            <select name="investmentGoal" className="form-select" value={formData.investmentGoal} onChange={handleChange} required>
              <option value="">Select Goal</option>
              <option value="Capital Appreciation">Capital Appreciation</option>
              <option value="Rental Income">Rental Income</option>
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success">📩 Start Fractional Investment</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>📊 Why Invest in Fractional Ownership & REITs?</h4>
        <ul>
          <li>📈 High returns with affordable investment sizes</li>
          <li>💸 Access to premium properties, which were previously out of reach</li>
          <li>🔒 Risk diversification across multiple properties</li>
          <li>⚖️ Passive income generation through shared ownership</li>
          <li>🏢 Regulatory compliance for security and transparency</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>🧠 Why Work With Us?</h4>
        <ul>
          <li>✔️ Transparent fractional ownership opportunities</li>
          <li>✔️ Curated selection of high-value properties and trusted REIT platforms</li>
          <li>✔️ Legal and financial support for seamless transactions</li>
          <li>✔️ Exit strategies and secondary market options to ensure liquidity</li>
        </ul>
      </section>
    </div>
  );
};

export default FractionalOwnershipREIT;
