import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ShortTermRentals = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    rentalType: '',
    specialRequests: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📬 Short-Term Rental Request Submitted:", formData);
    toast.success("Booking request submitted! We'll reach out soon.");
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      checkIn: '',
      checkOut: '',
      guests: '',
      rentalType: '',
      specialRequests: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>🏖️ Short-Term & Vacation Rentals</h1>
      <p className="lead">
        Need a place for a few days or weeks? Choose from fully-furnished vacation homes, serviced apartments, and short-term rentals — ready when you are.
      </p>

      <section className="mt-4">
        <h4>🌟 Perfect For:</h4>
        <ul>
          <li>✅ Tourists exploring the city</li>
          <li>✅ Business travelers on assignment</li>
          <li>✅ Families or individuals relocating</li>
          <li>✅ Medical stays or transit housing</li>
        </ul>
        <ul className="mt-3">
          <li>🛬 Hassle-free check-in/check-out</li>
          <li>🧼 Regular housekeeping included</li>
          <li>🛏️ Furnished spaces with kitchen, AC, WiFi</li>
          <li>🔐 Secure locations, often gated or serviced</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📝 Book a Short-Term Stay</h4>
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
            <label className="form-label">Preferred Location</label>
            <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="col-md-4">
            <label className="form-label">Check-In Date</label>
            <input type="date" name="checkIn" className="form-control" value={formData.checkIn} onChange={handleChange} required />
          </div>

          <div className="col-md-4">
            <label className="form-label">Check-Out Date</label>
            <input type="date" name="checkOut" className="form-control" value={formData.checkOut} onChange={handleChange} required />
          </div>

          <div className="col-md-4">
            <label className="form-label">Guests</label>
            <input type="number" name="guests" className="form-control" min="1" value={formData.guests} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Rental Type</label>
            <select name="rentalType" className="form-select" value={formData.rentalType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Serviced Apartment">Serviced Apartment</option>
              <option value="Vacation Villa">Vacation Villa</option>
              <option value="Studio">Studio</option>
              <option value="Guest House">Guest House</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">Special Requests</label>
            <textarea name="specialRequests" className="form-control" rows="3" value={formData.specialRequests} onChange={handleChange} />
          </div>

          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary">📩 Submit Booking Request</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>🧭 Tips for a Comfortable Stay</h4>
        <ul>
          <li>📍 Book early during tourist or festival seasons</li>
          <li>🔑 Verify ID and receive digital check-in info in advance</li>
          <li>🧾 Review refund and cancellation policies</li>
          <li>📲 Stay connected with our 24/7 support line</li>
        </ul>
      </section>
    </div>
  );
};

export default ShortTermRentals;
