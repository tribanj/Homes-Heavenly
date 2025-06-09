import React, { useState } from 'react';
import { toast } from 'react-toastify';

const FreeValuation = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyType: '',
    location: '',
    propertySize: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Valuation Request:", formData);
    toast.success('Your free valuation request has been submitted!');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      propertyType: '',
      location: '',
      propertySize: '',
    });
  };

  return (
    <div className="container mt-4 mb-5">
      <h1>📐 Free Property Valuation & Appraisal</h1>
      <p className="lead">
        Know your property’s worth with a professional, no-cost market appraisal.
        Ideal for sellers, landlords, or investors.
      </p>

      <section className="mt-4">
        <h4>🔍 What You Get</h4>
        <ul>
          <li>✔ Accurate current market value</li>
          <li>✔ Competitor analysis & price trends</li>
          <li>✔ No-obligation consultation with a local expert</li>
        </ul>
      </section>

      <section className="mt-4">
        <h4>📈 Why Get a Valuation?</h4>
        <p>
          Whether you're selling, renting, or just curious, knowing your property's true
          market value helps you make informed decisions. Our experts analyze recent
          transactions, neighborhood trends, and your property’s unique features.
        </p>
      </section>

      <section className="mt-4">
        <h4>📑 Sample Report Preview</h4>
        <img
          src="https://via.placeholder.com/700x300?text=Valuation+Report+Preview"
          alt="Sample Valuation Report"
          className="img-fluid rounded shadow"
        />
      </section>

      <section className="mt-5">
        <h4>📝 Get Your Free Valuation</h4>
        <form className="row g-3 mt-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} required />
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
            <label className="form-label">Property Type</label>
            <select name="propertyType" className="form-select" value={formData.propertyType} onChange={handleChange} required>
              <option value="">Choose...</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land / Plot</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Property Size (sq.ft)</label>
            <input type="number" name="propertySize" className="form-control" value={formData.propertySize} onChange={handleChange} required />
          </div>

          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-success">📩 Request Valuation</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>❓ Frequently Asked Questions</h4>
        <div className="accordion" id="valuationFAQ">
          <div className="accordion-item">
            <h2 className="accordion-header" id="faqOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                How long does it take to get a valuation?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show">
              <div className="accordion-body">Usually within 24-48 hours depending on location and complexity.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                Is this really free?
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse">
              <div className="accordion-body">Yes, there are no charges or obligations involved.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faqThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                Do you offer in-person visits?
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse">
              <div className="accordion-body">Yes, in-person or virtual assessments are available based on your preference.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeValuation;
