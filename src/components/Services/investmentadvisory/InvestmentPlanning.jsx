import React, { useState } from 'react';
import { toast } from 'react-toastify';

const InvestmentPlanning = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    investmentGoal: '',
    budget: '',
    timeline: '',
    assetPreference: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Investment Plan Inquiry Submitted:", formData);
    toast.success("Your investment planning request has been received!");
    setFormData({
      name: '',
      email: '',
      contact: '',
      investmentGoal: '',
      budget: '',
      timeline: '',
      assetPreference: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>💼 Investment Planning & ROI Analysis</h1>
      <p className="lead">
        Build wealth with confidence. Our expert advisors provide personalized guidance to help you make smart real estate investments backed by data and strategy.
      </p>

      <section className="mt-4">
        <h4>📊 What You Get:</h4>
        <ul>
          <li>🧭 Customized investment roadmap based on your goals</li>
          <li>📈 ROI projections and market-based profitability estimates</li>
          <li>🛡️ Risk profiling and diversification strategies</li>
          <li>⏳ Short-term and long-term property investment guidance</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📝 Start Your Investment Plan</h4>
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
              <option value="Capital Appreciation">Capital Appreciation</option>
              <option value="Rental Income">Rental Income</option>
              <option value="Flip & Resell">Flip & Resell</option>
              <option value="Diversified Portfolio">Diversified Portfolio</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Planned Investment Budget</label>
            <input type="text" name="budget" className="form-control" value={formData.budget} onChange={handleChange} placeholder="e.g. ₹50 Lakhs - ₹1 Cr" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Investment Timeline</label>
            <select name="timeline" className="form-select" value={formData.timeline} onChange={handleChange} required>
              <option value="">Select Timeline</option>
              <option value="Immediate (0–3 months)">Immediate (0–3 months)</option>
              <option value="Short Term (3–12 months)">Short Term (3–12 months)</option>
              <option value="Long Term (1+ years)">Long Term (1+ years)</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">Preferred Asset Types</label>
            <input type="text" name="assetPreference" className="form-control" value={formData.assetPreference} onChange={handleChange} placeholder="e.g. Plots, Apartments, Commercial, REITs" required />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success">📩 Start Investment Planning</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>🧠 Why Work With Us?</h4>
        <ul>
          <li>✔️ Local and national market expertise</li>
          <li>✔️ Transparent data-driven reports</li>
          <li>✔️ ROI forecasting models based on real analytics</li>
          <li>✔️ Access to pre-launch deals, off-market listings & more</li>
        </ul>
      </section>
    </div>
  );
};

export default InvestmentPlanning;
