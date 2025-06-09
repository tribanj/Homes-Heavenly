import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LandInvestment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    investmentGoal: '',
    landPreference: '',
    budget: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Land Investment Request Submitted:", formData);
    toast.success("Your land investment request has been received!");
    setFormData({
      name: '',
      email: '',
      contact: '',
      investmentGoal: '',
      landPreference: '',
      budget: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>🌍 Land & Plot Investment Services</h1>
      <p className="lead">
        Unlock the potential of land investments with expert guidance, legal transparency, and future development insights.
        Perfect for buyers looking to build, resell, or hold land for long-term appreciation.
      </p>

      <section className="mt-4">
        <h4>🛠️ Services We Offer:</h4>
        <ul>
          <li>🔍 Detailed land due diligence & title verification</li>
          <li>🏗️ Zoning, utility, and infrastructure analysis</li>
          <li>📊 Market appreciation trends and investment forecasts</li>
          <li>📝 Full assistance with purchase, registration, and legal formalities</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📝 Start Your Land Investment Plan</h4>
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
            <label className="form-label">Investment Goal</label>
            <select name="investmentGoal" className="form-select" value={formData.investmentGoal} onChange={handleChange} required>
              <option value="">Select Goal</option>
              <option value="Build Property">Build Property</option>
              <option value="Resell for Profit">Resell for Profit</option>
              <option value="Hold for Appreciation">Hold for Appreciation</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Preferred Land/Plot Type</label>
            <input type="text" name="landPreference" className="form-control" value={formData.landPreference} onChange={handleChange} placeholder="e.g., Residential Plot, Agricultural Land" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Budget</label>
            <input type="text" name="budget" className="form-control" value={formData.budget} onChange={handleChange} placeholder="e.g. ₹20 Lakhs - ₹50 Lakhs" required />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success">📩 Start Land Investment Journey</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>📊 Why Invest in Land?</h4>
        <ul>
          <li>📈 High appreciation potential, especially in developing areas</li>
          <li>🏡 Opportunity for future development (residential, commercial, or mixed-use projects)</li>
          <li>🌳 Limited supply, growing demand for well-located plots</li>
          <li>⚖️ Lower maintenance costs compared to built properties</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>🧠 Why Work With Us?</h4>
        <ul>
          <li>✔️ Transparent and thorough due diligence process</li>
          <li>✔️ Expert analysis of zoning, utilities, and market trends</li>
          <li>✔️ Access to exclusive off-market land deals</li>
          <li>✔️ Legal and financial assistance for seamless transactions</li>
        </ul>
      </section>
    </div>
  );
};

export default LandInvestment;
