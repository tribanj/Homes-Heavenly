import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LandscapingOutdoorLiving = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    projectType: '',
    specificNeeds: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Landscaping Consultation Request Submitted:", formData);
    toast.success("Your landscaping consultation request has been submitted!");
    setFormData({
      name: '',
      email: '',
      contact: '',
      projectType: '',
      specificNeeds: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>🌳 Landscaping & Outdoor Living Solutions</h1>
      <p className="lead">
        Create beautiful, functional outdoor environments that complement your home and lifestyle. From gardens to gazebos, we turn unused outdoor space into a private oasis.
      </p>

      <section className="mt-4">
        <h4>🌱 We Specialize In:</h4>
        <ul>
          <li>🌳 Garden design, turfing & irrigation systems</li>
          <li>🍽️ Decks, patios, pergolas & outdoor kitchens</li>
          <li>💧 Water features, lighting & hardscape elements</li>
          <li>🌿 Eco-friendly and low-maintenance options</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📩 Book Your Outdoor Design Consultation</h4>
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
            <label className="form-label">Project Type</label>
            <select name="projectType" className="form-select" value={formData.projectType} onChange={handleChange} required>
              <option value="">Select Project Type</option>
              <option value="Garden Design">Garden Design</option>
              <option value="Decks & Patios">Decks & Patios</option>
              <option value="Water Features">Water Features</option>
              <option value="Outdoor Kitchens">Outdoor Kitchens</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">Specific Needs or Ideas</label>
            <textarea name="specificNeeds" className="form-control" value={formData.specificNeeds} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success">📩 Book My Outdoor Design Consultation</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>🌟 Why Choose Our Landscaping & Outdoor Living Services?</h4>
        <ul>
          <li>🌿 Transform unused space into a beautiful outdoor oasis</li>
          <li>💧 Custom-designed water features and eco-friendly options</li>
          <li>🍂 Durable and low-maintenance landscaping for long-term beauty</li>
          <li>🍴 Outdoor kitchen and entertainment areas for modern living</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>🔨 Our Landscaping Process</h4>
        <ul>
          <li>🎨 Initial consultation to understand your needs and vision</li>
          <li>🌱 Concept design and planning, including plant selection</li>
          <li>🔧 Professional installation of hardscapes, lighting, and water features</li>
          <li>🌸 Ongoing care and maintenance to ensure your outdoor space thrives</li>
        </ul>
      </section>
    </div>
  );
};

export default LandscapingOutdoorLiving;
