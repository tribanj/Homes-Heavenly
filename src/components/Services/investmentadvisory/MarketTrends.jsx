import React, { useState } from 'react';
import { toast } from 'react-toastify';

const MarketTrendsForecasting = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    preferredLocation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Market Trends & Price Forecasting Request Submitted:", formData);
    toast.success("Your request for market insights has been received!");
    setFormData({
      name: '',
      email: '',
      contact: '',
      preferredLocation: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>📊 Market Trends & Price Forecasting</h1>
      <p className="lead">
        Stay ahead of the curve with expert-backed property market analysis and price forecasts, tailored to help investors make informed decisions.
      </p>

      <section className="mt-4">
        <h4>💡 Why Market Trends & Price Forecasting Matter?</h4>
        <ul>
          <li>📈 Stay informed with local & national market updates</li>
          <li>🔥 Track property demand and price movement through heatmaps and indices</li>
          <li>🔮 Gain insights from forecast reports based on demand-supply trends</li>
          <li>💼 Receive customized investor briefs to guide your investments</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📩 Get Customized Market Insights</h4>
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
            <label className="form-label">Preferred Location</label>
            <input type="text" name="preferredLocation" className="form-control" value={formData.preferredLocation} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success">📩 Get Market Insights</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>📊 Features of Our Market Trends & Forecasting Service</h4>
        <ul>
          <li>📍 Local & National Market Updates: Get the latest data on price trends and market conditions across key locations.</li>
          <li>🌍 Property Heatmaps & Price Indices: Visualize price movements and spot hot spots for investment opportunities.</li>
          <li>🔮 Forecast Reports: Predict the future with data-driven market insights, helping you stay ahead of trends.</li>
          <li>📈 Customized Investor Briefs: Receive tailored reports that cater to your investment preferences and goals.</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📈 Why Choose Our Market Forecasting Services?</h4>
        <ul>
          <li>🔍 AI-backed analysis for accurate and reliable forecasts</li>
          <li>📊 Access to comprehensive historical data and expert insights</li>
          <li>💼 Tailored recommendations based on your investment goals</li>
          <li>🔒 Data privacy and security — Your information is protected</li>
        </ul>
      </section>
    </div>
  );
};

export default MarketTrendsForecasting;
