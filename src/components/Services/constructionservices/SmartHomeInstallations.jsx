import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SmartHomeAutomation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    homeType: '',
    smartNeeds: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Smart Home Consultation Request Submitted:", formData);
    toast.success("Your smart home consultation request has been submitted!");
    setFormData({
      name: '',
      email: '',
      contact: '',
      homeType: '',
      smartNeeds: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>🏡 Smart Home & Automation Installations</h1>
      <p className="lead">
        Upgrade your living with intelligent automation solutions for security, convenience, and energy efficiency. We design and install smart systems that fit seamlessly into your lifestyle.
      </p>

      <section className="mt-4">
        <h4>💡 Smart Features Include:</h4>
        <ul>
          <li>🔌 Lighting, AC & curtain automation</li>
          <li>📹 Video doorbells, cameras & smart locks</li>
          <li>🎥 Home theaters & voice-controlled systems</li>
          <li>🌐 Integration with Alexa, Google Home & more</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📩 Book a Smart Home Consultation</h4>
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
            <label className="form-label">Home Type</label>
            <select name="homeType" className="form-select" value={formData.homeType} onChange={handleChange} required>
              <option value="">Select Home Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">Smart Home Needs</label>
            <textarea name="smartNeeds" className="form-control" value={formData.smartNeeds} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success">📩 Book My Smart Home Consultation</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>🌟 Why Choose Our Smart Home Solutions?</h4>
        <ul>
          <li>🏡 Seamless integration with your home’s existing systems</li>
          <li>🔒 Enhanced security with smart cameras, locks, and video doorbells</li>
          <li>💡 Improved energy efficiency with automated lighting and temperature control</li>
          <li>🎬 Entertainment made easy with smart home theaters and voice-controlled systems</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>🔑 Our Smart Home Installation Process:</h4>
        <ul>
          <li>🔍 Initial consultation to assess your home’s needs</li>
          <li>🖥️ Custom design and system integration planning</li>
          <li>💻 Installation of smart systems with expert configuration</li>
          <li>🔧 Ongoing support and updates for seamless functionality</li>
        </ul>
      </section>
    </div>
  );
};

export default SmartHomeAutomation;
