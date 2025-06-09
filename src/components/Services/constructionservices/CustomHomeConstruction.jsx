import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CustomHomeConstruction = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    serviceInterested: '',
    propertyLocation: '',
    designPreferences: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Service Request Submitted:", formData);
    toast.success("Your request has been submitted successfully!");
    setFormData({
      name: '',
      email: '',
      contact: '',
      serviceInterested: '',
      propertyLocation: '',
      designPreferences: '',
    });
  };

  const goToPortfolio = (section) => {
    navigate(`/portfolio/${section}`);
  };

  return (
    <div className="container my-5">
      <h1>🏡 Custom Home Construction & Design Services</h1>
      <p className="lead">
        Build your dream home with our expert-driven, end-to-end construction and design solutions. From architectural planning to the final handover, we manage it all for you.
      </p>

      {/* Services */}
      <section className="mt-5">
        <h3>💼 Our Services</h3>

        {/* Architectural Design */}
        <div className="my-4">
          <h5>📐 Architectural Design – 2D Floor Plans & 3D Visualization</h5>
          <p>
            Get highly detailed 2D floor plans to plan your space efficiently, and 3D visualizations that offer a photorealistic preview of your future home. This helps in better decision-making and reduces the chance of design changes later.
          </p>
          <button className="btn btn-outline-primary me-2" onClick={() => goToPortfolio('2d-designs')}>View 2D Designs</button>
          <button className="btn btn-outline-primary" onClick={() => goToPortfolio('3d-visualization')}>View 3D Visuals</button>
        </div>

        {/* Structural Planning */}
        <div className="my-4">
          <h5>🏗️ Structural Planning & Civil Engineering</h5>
          <p>
            Ensure your home's safety and longevity with structurally sound foundations, load-bearing walls, slab design, and soil testing — all executed by certified civil engineers.
          </p>
          <button className="btn btn-outline-primary" onClick={() => goToPortfolio('structural-planning')}>View Structural Projects</button>
        </div>

        {/* Smart Home */}
        <div className="my-4">
          <h5>🌱 Sustainable & Smart Home Solutions</h5>
          <p>
            We design homes that are not just stylish, but smart and green. Our homes use solar panels, rainwater harvesting, insulation systems, and IoT devices to lower costs and improve quality of life.
          </p>
          <button className="btn btn-outline-primary" onClick={() => goToPortfolio('smart-homes')}>View Smart Home Projects</button>
        </div>

        {/* Cost Estimation */}
        <div className="my-4">
          <h5>💰 Transparent Cost Estimation & Timeline Tracking</h5>
          <p>
            Get a clear understanding of every rupee spent. We provide line-by-line budget sheets, itemized quotes, and projected timelines so there are no surprises during construction.
          </p>
          <button className="btn btn-outline-primary" onClick={() => goToPortfolio('cost-timelines')}>View Estimations</button>
        </div>

        {/* Project Management */}
        <div className="my-4">
          <h5>🔧 End-to-End Project Management with Regular Updates</h5>
          <p>
            From layout approvals to interior finishing, we handle every aspect with consistent quality checks and weekly progress updates. You'll always be in the loop with photo/video reporting.
          </p>
          <button className="btn btn-outline-primary" onClick={() => goToPortfolio('completed-projects')}>View Completed Projects</button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mt-5">
        <h3>🌟 Why Choose Us?</h3>
        <ul className="list-unstyled">
          <li className="mb-3">
            <strong>✅ All-In-One Service:</strong> No need to coordinate with multiple vendors — we manage architects, engineers, and contractors for you.
          </li>
          <li className="mb-3">
            <strong>📊 Transparent Communication:</strong> From quotes to timelines and delays, you’ll always have real-time insights into your project’s progress.
          </li>
          <li className="mb-3">
            <strong>🛠️ Experienced Team:</strong> Our professionals bring years of hands-on experience in luxury, budget, and sustainable home projects.
          </li>
          <li className="mb-3">
            <strong>🌐 Modern Technologies:</strong> We use BIM modeling, 3D rendering, and smart construction tracking tools to deliver accuracy and speed.
          </li>
          <li className="mb-3">
            <strong>📍 Local Compliance & Quality:</strong> We follow city-specific building codes and safety regulations while maintaining high-quality standards.
          </li>
        </ul>
      </section>

      {/* Turnkey Process */}
      <section className="mt-5">
        <h3>🔑 Our Turnkey Process</h3>
        <ol className="list-group list-group-numbered">
          <li className="list-group-item">
            <strong> Free Consultation & Site Visit:</strong> We assess your land and understand your vision, budget, and lifestyle needs.
          </li>
          <li className="list-group-item">
            <strong> Planning & Architectural Designs:</strong> Our architects create multiple layout options, 2D plans, and 3D renders until you're satisfied.
          </li>
          <li className="list-group-item">
            <strong> Structural & Civil Engineering:</strong> We design the technical framework with complete load calculations, reinforcements, and safety approvals.
          </li>
          <li className="list-group-item">
            <strong> Budget & Contract Finalization:</strong> Transparent BOQs, phased payment plans, and contract documents ensure clarity from day one.
          </li>
          <li className="list-group-item">
            <strong> Construction Execution:</strong> Our site engineers and supervisors handle daily operations, quality control, and procurement.
          </li>
          <li className="list-group-item">
            <strong> Progress Tracking & Reporting:</strong> You receive regular visual and financial updates via email, dashboard, or WhatsApp.
          </li>
          <li className="list-group-item">
            <strong> Final Finishing & Handover:</strong> After quality audits and snag lists, we hand over a fully completed, ready-to-live-in home.
          </li>
        </ol>
      </section>

      {/* Request Form */}
      <section className="mt-5">
        <h4>📩 Request a Service or Consultation</h4>
        <form className="row g-3 mt-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name *</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Contact Number *</label>
            <input type="tel" name="contact" className="form-control" value={formData.contact} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email Address *</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Interested Service *</label>
            <select name="serviceInterested" className="form-select" value={formData.serviceInterested} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Architectural Design">Architectural Design</option>
              <option value="Structural Planning">Structural Planning</option>
              <option value="Smart Home Solutions">Smart Home Solutions</option>
              <option value="Cost Estimation & Timeline">Cost Estimation & Timeline</option>
              <option value="End-to-End Project Management">End-to-End Project Management</option>
            </select>
          </div>

          <div className="col-md-12">
            <label className="form-label">Property Location *</label>
            <input type="text" name="propertyLocation" className="form-control" value={formData.propertyLocation} onChange={handleChange} required />
          </div>

          <div className="col-md-12">
            <label className="form-label">Design Preferences / Additional Notes</label>
            <textarea name="designPreferences" rows="4" className="form-control" value={formData.designPreferences} onChange={handleChange} />
          </div>

          <div className="col-12 text-end">
            <button type="submit" className="btn btn-success">📩 Submit Request</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CustomHomeConstruction;
