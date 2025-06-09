import React, { useState } from 'react';
import { toast } from 'react-toastify';

const DistressedSales = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investmentBudget: '',
    preferredLocation: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📥 Distressed Sales Inquiry:", formData);
    toast.success('Your inquiry has been submitted!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      investmentBudget: '',
      preferredLocation: '',
    });
  };

  return (
    <div className="container mt-5 mb-5">
      <h1>🏚️ Foreclosed & Distressed Sales</h1>
      <p className="lead">
        Invest smart with below-market property options. Explore verified foreclosed and distressed listings for serious buyers and investors.
      </p>

      <section className="mt-4">
        <h4>💡 Why Choose Distressed Properties?</h4>
        <ul>
          <li>✅ Purchase at 10–40% below market value</li>
          <li>✅ Opportunity for high ROI through renovation or resale</li>
          <li>✅ Often quick closing with motivated sellers or banks</li>
        </ul>
      </section>

      <section className="mt-4">
        <h4>🛠️ Our Value-Add Services</h4>
        <ul>
          <li>✔ Verified & vetted distressed property listings</li>
          <li>✔ Comprehensive risk analysis & ROI forecast reports</li>
          <li>✔ End-to-end legal and financial due diligence</li>
        </ul>
      </section>

      <section className="mt-4">
        <h4>🏘️ Featured Listings Preview</h4>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card shadow">
              <img src="https://via.placeholder.com/300x180?text=Property+1" className="card-img-top" alt="Property 1" />
              <div className="card-body">
                <h5 className="card-title">2BHK, Bangalore</h5>
                <p className="card-text">Listed at ₹45L (Market: ₹62L)</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow">
              <img src="https://via.placeholder.com/300x180?text=Property+2" className="card-img-top" alt="Property 2" />
              <div className="card-body">
                <h5 className="card-title">Plot, Pune</h5>
                <p className="card-text">Listed at ₹22L (Market: ₹30L)</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow">
              <img src="https://via.placeholder.com/300x180?text=Property+3" className="card-img-top" alt="Property 3" />
              <div className="card-body">
                <h5 className="card-title">3BHK Duplex, Hyderabad</h5>
                <p className="card-text">Listed at ₹65L (Market: ₹85L)</p>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-2"><em>*Full listings available after verification</em></p>
      </section>

      <section className="mt-4">
        <h4>🔐 Legal & Financial Handling</h4>
        <p>
          We take legal uncertainty seriously. All properties listed undergo title verification, pending dues checks, encumbrance certification, and are managed by our partnered legal teams.
          For buyers, we offer:
        </p>
        <ul>
          <li>✅ Clean title assurance</li>
          <li>✅ Assistance with bank auction process (if applicable)</li>
          <li>✅ Loan processing support for eligible investors</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📩 Submit Your Interest</h4>
        <form className="row g-3 mt-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
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
            <label className="form-label">Investment Budget (INR)</label>
            <input type="number" name="investmentBudget" className="form-control" value={formData.investmentBudget} onChange={handleChange} required />
          </div>
          <div className="col-12">
            <label className="form-label">Preferred Location(s)</label>
            <input type="text" name="preferredLocation" className="form-control" value={formData.preferredLocation} onChange={handleChange} required />
          </div>
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-danger">🔍 Browse Verified Listings</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>❓ Frequently Asked Questions</h4>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq1">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                Are distressed sales legally safe?
              </button>
            </h2>
            <div id="collapse1" className="accordion-collapse collapse show">
              <div className="accordion-body">Yes, we ensure all documentation and ownership is legally verified before listing.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                Can I get a loan for these properties?
              </button>
            </h2>
            <div id="collapse2" className="accordion-collapse collapse">
              <div className="accordion-body">Yes, we help you secure financing from banks familiar with auctioned/distressed property protocols.</div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq3">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                Do you charge brokerage or service fees?
              </button>
            </h2>
            <div id="collapse3" className="accordion-collapse collapse">
              <div className="accordion-body">Our service fee varies depending on the deal structure and is disclosed transparently.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DistressedSales;
