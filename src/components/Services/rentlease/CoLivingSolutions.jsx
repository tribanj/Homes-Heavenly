import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CoLivingSolutions = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    budget: '',
    occupation: '',
    moveInDate: '',
    preferences: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🏠 Co-Living Inquiry Submitted:", formData);
    toast.success("Thanks! Our team will contact you shortly.");
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: '',
      budget: '',
      occupation: '',
      moveInDate: '',
      preferences: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>🏘️ Co-Living & Shared Housing Solutions</h1>
      <p className="lead">
        Discover affordable, hassle-free shared housing options crafted for students, young professionals, and digital nomads.
      </p>

      <section className="mt-4">
        <h4>🌟 Why Co-Live With Us?</h4>
        <ul>
          <li>✅ Fully furnished shared apartments & private rooms</li>
          <li>✅ Flexible rent terms – weekly, monthly, or longer</li>
          <li>✅ Inclusive of bills – WiFi, housekeeping, utilities</li>
          <li>✅ Vibrant community events & co-working spaces</li>
          <li>✅ Access to amenities: kitchens, gyms, lounges, laundry</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📬 Submit Your Interest</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} required />
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
            <label className="form-label">Preferred City</label>
            <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Monthly Budget (INR)</label>
            <input type="number" name="budget" className="form-control" value={formData.budget} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Occupation</label>
            <select name="occupation" className="form-select" value={formData.occupation} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Student">Student</option>
              <option value="Working Professional">Working Professional</option>
              <option value="Freelancer/Digital Nomad">Freelancer/Digital Nomad</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Preferred Move-in Date</label>
            <input type="date" name="moveInDate" className="form-control" value={formData.moveInDate} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <label className="form-label">Roommate or Housing Preferences</label>
            <textarea name="preferences" className="form-control" rows="3" value={formData.preferences} onChange={handleChange} />
          </div>

          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary">📩 Submit Request</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>❓ Frequently Asked Questions</h4>
        <div className="accordion" id="faq">
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq1">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                Are utilities and WiFi included in the rent?
              </button>
            </h2>
            <div id="collapse1" className="accordion-collapse collapse show">
              <div className="accordion-body">
                Yes, our pricing includes all major utilities, high-speed internet, housekeeping, and basic furnishings.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                Can I choose my roommate or room preference?
              </button>
            </h2>
            <div id="collapse2" className="accordion-collapse collapse">
              <div className="accordion-body">
                Yes. You can mention roommate preferences in the form. We’ll match you accordingly, subject to availability.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq3">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                Is there a minimum stay period?
              </button>
            </h2>
            <div id="collapse3" className="accordion-collapse collapse">
              <div className="accordion-body">
                Most co-living spaces require a minimum 1-month stay, but flexible plans are available based on location.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoLivingSolutions;
