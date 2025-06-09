import React, { useState } from 'react';
import { toast } from 'react-toastify';

const StudentHousing = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    preferredLocation: '',
    moveInDate: '',
    roomType: '',
    specialNeeds: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🏠 Student Housing Inquiry Submitted:", formData);
    toast.success("Your housing inquiry has been submitted!");
    setFormData({
      name: '',
      email: '',
      phone: '',
      institution: '',
      preferredLocation: '',
      moveInDate: '',
      roomType: '',
      specialNeeds: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>🎓 Student Housing & PG Listings</h1>
      <p className="lead">
        Find safe, affordable, and student-friendly PGs and hostels near top colleges and universities. Modern amenities, verified listings, and flexible pricing.
      </p>

      <section className="mt-4">
        <h4>🏡 Why Choose Us?</h4>
        <ul>
          <li>✅ Verified listings with photos, rules, and reviews</li>
          <li>🍽️ Meals, laundry, housekeeping & Wi-Fi included</li>
          <li>🚍 Walking distance to public transport and campuses</li>
          <li>🔐 Gender-specific and secure options</li>
          <li>📷 Virtual tours and availability checks</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📥 Find Student Housing</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Institution / College</label>
            <input type="text" name="institution" className="form-control" value={formData.institution} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Preferred Location</label>
            <input type="text" name="preferredLocation" className="form-control" value={formData.preferredLocation} onChange={handleChange} required />
          </div>

          <div className="col-md-3">
            <label className="form-label">Move-In Date</label>
            <input type="date" name="moveInDate" className="form-control" value={formData.moveInDate} onChange={handleChange} required />
          </div>

          <div className="col-md-3">
            <label className="form-label">Room Type</label>
            <select name="roomType" className="form-select" value={formData.roomType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Private Room">Private Room</option>
              <option value="Shared Room">Shared Room</option>
              <option value="Hostel">Hostel</option>
              <option value="Studio Apartment">Studio Apartment</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">Special Requirements (Optional)</label>
            <textarea name="specialNeeds" className="form-control" rows="3" value={formData.specialNeeds} onChange={handleChange} />
          </div>

          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-success">📬 Submit Housing Request</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>📌 Tips for Students</h4>
        <ul>
          <li>🛏️ Visit or request a video tour before finalizing</li>
          <li>📝 Understand house rules and notice period policies</li>
          <li>📚 Look for quiet study zones and Wi-Fi coverage</li>
          <li>🚨 Choose secure neighborhoods near campus zones</li>
        </ul>
      </section>
    </div>
  );
};

export default StudentHousing;
