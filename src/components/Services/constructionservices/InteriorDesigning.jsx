import React, { useState } from 'react';
import { toast } from 'react-toastify';

const InteriorDesigning = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    propertyType: '',
    designPreferences: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Interior Design Consultation Request Submitted:", formData);
    toast.success("Your interior design consultation request has been submitted!");
    setFormData({
      name: '',
      email: '',
      contact: '',
      propertyType: '',
      designPreferences: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>🏡 Interior Designing & Home Furnishing</h1>
      <p className="lead">
        Transform your interiors into personalized sanctuaries or stylish functional spaces. Our interior design team blends aesthetics with utility, tailored to your taste and lifestyle.
      </p>

      <section className="mt-4">
        <h4>🛋️ What We Offer:</h4>
        <ul>
          <li>🖼️ Concept development & space planning</li>
          <li>🪑 Furniture selection & layout design</li>
          <li>💡 Lighting, color, and material palette curation</li>
          <li>🏠 Turnkey furnishing solutions</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📩 Book a Design Consultation</h4>
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
            <label className="form-label">Property Type</label>
            <select name="propertyType" className="form-select" value={formData.propertyType} onChange={handleChange} required>
              <option value="">Select Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Office">Office</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">Design Preferences</label>
            <textarea name="designPreferences" className="form-control" value={formData.designPreferences} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success">📩 Book My Design Consultation</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>🌟 Why Choose Our Interior Design Services?</h4>
        <ul>
          <li>🎨 Customized interior concepts based on your style and needs</li>
          <li>🛋️ Expert furniture selection, layout planning, and space optimization</li>
          <li>💡 Color, material, and lighting curation for balanced ambiance</li>
          <li>🏡 Turnkey solutions with end-to-end project management</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>🔑 Our Design Process:</h4>
        <ul>
          <li>🖌️ Initial consultation to understand your vision</li>
          <li>💻 Concept design and layout planning using 3D models</li>
          <li>🪑 Selection of furniture, accessories, and color schemes</li>
          <li>🛠️ Full execution of the design with project oversight</li>
        </ul>
      </section>
    </div>
  );
};

export default InteriorDesigning;
