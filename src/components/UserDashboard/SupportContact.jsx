import React, { useState } from 'react';
import './SupportContact.css';

const SupportContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call or backend trigger
    console.log('Support Request:', formData);
    setSubmitted(true);
  };

  return (
    <div className="support-contact">
      <h2>📞 Support / Contact Us</h2>

      {submitted ? (
        <div className="success-msg">
          ✅ Your message has been sent. We’ll get back to you shortly!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="support-form">
          <label>
            Name:
            <input type="text" name="name" required value={formData.name} onChange={handleChange} />
          </label>

          <label>
            Email:
            <input type="email" name="email" required value={formData.email} onChange={handleChange} />
          </label>

          <label>
            Subject:
            <input type="text" name="subject" required value={formData.subject} onChange={handleChange} />
          </label>

          <label>
            Message:
            <textarea name="message" rows="5" required value={formData.message} onChange={handleChange}></textarea>
          </label>

          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
};

export default SupportContact;
