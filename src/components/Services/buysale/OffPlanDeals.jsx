import React, { useState } from 'react';
import { toast } from 'react-toastify';

const OffPlanDeals = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectInterested: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry Submitted:", formData);
    toast.success("Your inquiry has been submitted successfully!");
    setFormData({ name: '', email: '', phone: '', projectInterested: '', message: '' });
  };

  return (
    <div className="container my-5">
      <header className="text-center mb-5">
        <h1>Off-Plan & Pre-Launch Property Deals</h1>
        <p className="lead">Secure the future with smart investment choices. Be among the first to access exclusive properties still under development.</p>
      </header>

      <section className="mb-5">
        <h2>Why Choose Off-Plan Properties?</h2>
        <p>Off-plan properties are units purchased before they are constructed. This gives investors and homebuyers a unique opportunity to:</p>
        <ul>
          <li><strong>Get Early Bird Prices:</strong> Buy at the lowest market rate before launch price appreciation.</li>
          <li><strong>High ROI:</strong> Potential for capital appreciation by the time of possession.</li>
          <li><strong>Customization:</strong> Choose layouts, interiors, and fittings before construction completes.</li>
          <li><strong>Flexible Payment Options:</strong> Pay in installments linked to construction progress.</li>
          <li><strong>Less Competition:</strong> Beat the crowd and pick prime units in the best locations.</li>
        </ul>
      </section>

      <section className="mb-5">
        <h2>Current Pre-Launch Projects</h2>
        <div className="row">
          {[{
            name: "Skyline Towers",
            location: "Downtown City Central",
            price: "Starting from ₹45 Lakhs",
            possession: "Expected in Q4 2026",
            highlights: ["2 & 3 BHK luxury apartments", "Smart home automation", "RERA approved"]
          }, {
            name: "Green Valley Residences",
            location: "East Bangalore",
            price: "Starting from ₹65 Lakhs",
            possession: "Possession by Mid 2025",
            highlights: ["Eco-friendly gated community", "Clubhouse and work-from-home pods", "Zero pre-EMI till possession"]
          }, {
            name: "Oceanview Heights",
            location: "Mumbai Coastal Zone",
            price: "Starting from ₹1.1 Crores",
            possession: "Estimated in 2027",
            highlights: ["Sea-facing penthouses", "Easy 10-80-10 plan", "5-star amenities"]
          }].map((project, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100">
                <div className="card-body">
                  <h5>{project.name}</h5>
                  <p>{project.location}</p>
                  <p className="text-success fw-bold">{project.price}</p>
                  <p className="text-muted">{project.possession}</p>
                  <ul>
                    {project.highlights.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  <button className="btn btn-outline-primary btn-sm mt-2">Request Brochure</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h2>Flexible Payment Plans</h2>
        <p>Invest smartly with our developer-partnered financial plans:</p>
        <ul>
          <li><strong>10-80-10 Plan:</strong> Pay 10% now, 80% during construction, and 10% on possession.</li>
          <li><strong>Zero Pre-EMI Till Possession:</strong> No EMIs until you get your keys (available in select projects).</li>
          <li><strong>Bank-Approved Financing:</strong> Tie-ups with leading banks and NBFCs for hassle-free loans.</li>
          <li><strong>Custom Schedule:</strong> Tailored payment plans based on your needs.</li>
        </ul>
      </section>

      <section className="mb-5">
        <h2>Send an Inquiry</h2>
        <p>Fill in your details and our team will get in touch to help you choose the perfect off-plan property for your needs.</p>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Interested Project</label>
            <input type="text" className="form-control" name="projectInterested" value={formData.projectInterested} onChange={handleChange} />
          </div>
          <div className="col-12">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows="4" name="message" value={formData.message} onChange={handleChange} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success">Submit Inquiry</button>
          </div>
        </form>
      </section>

      <section className="mb-5">
        <h2>Frequently Asked Questions (FAQs)</h2>
        <ul>
          <li><strong>Is investing in off-plan properties safe?</strong><br />Yes, ensure the project is RERA registered and developed by a reputed builder.</li>
          <li><strong>Can I sell the property before it's completed?</strong><br />Yes, but subject to builder terms and local real estate laws.</li>
          <li><strong>What if the project is delayed?</strong><br />RERA protects you in most cases with penalty clauses for delays.</li>
        </ul>
      </section>

      <footer className="text-center">
        <h5>Need help choosing the right investment?</h5>
        <button className="btn btn-primary">Talk to an Expert Now</button>
      </footer>
    </div>
  );
};

export default OffPlanDeals;
