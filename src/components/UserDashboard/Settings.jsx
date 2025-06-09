import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91-9876543210',
    emailAlerts: true,
    smsAlerts: false,
    password: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Settings updated successfully!');
  };

  return (
    <div className="settings">
      <h2>⚙️ Account Settings</h2>
      <form onSubmit={handleSubmit} className="settings-form">
        <label>
          Full Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Email Address:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>

        <label>
          Phone Number:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>

        <label>
          Change Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>

        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="emailAlerts" checked={formData.emailAlerts} onChange={handleChange} />
            Email Alerts
          </label>
          <label>
            <input type="checkbox" name="smsAlerts" checked={formData.smsAlerts} onChange={handleChange} />
            SMS Alerts
          </label>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
