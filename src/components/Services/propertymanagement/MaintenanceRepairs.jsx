import React, { useState } from 'react';
import { toast } from 'react-toastify';

const MaintenanceSupport = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    contact: '',
    email: '',
    propertyAddress: '',
    maintenanceType: [],
    preferredDate: '',
    additionalNotes: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updated = checked
        ? [...formData.maintenanceType, value]
        : formData.maintenanceType.filter((item) => item !== value);
      setFormData({ ...formData, maintenanceType: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🛠️ Maintenance Request Submitted:", formData);
    toast.success("Your maintenance support request has been submitted!");
    setFormData({
      ownerName: '',
      contact: '',
      email: '',
      propertyAddress: '',
      maintenanceType: [],
      preferredDate: '',
      additionalNotes: '',
    });
  };

  return (
    <div className="container my-5">
      <h1>🛠️ Maintenance & Repairs Coordination</h1>
      <p className="lead">
        Ensure your property stays in excellent shape. We offer end-to-end coordination of 
        maintenance tasks — from inspections to emergency repairs.
      </p>

      <section className="mt-4">
        <h4>🧰 Maintenance Services We Provide:</h4>
        <ul>
          <li>🔍 Scheduled inspections and preventive upkeep</li>
          <li>🔧 Plumbing, electrical, and HVAC repairs</li>
          <li>🧼 Deep cleaning and pest control</li>
          <li>🔗 Trusted network of certified technicians</li>
          <li>📞 24/7 emergency repair coordination</li>
        </ul>
      </section>

      <section className="mt-5">
        <h4>📋 Schedule Maintenance Support</h4>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Owner/Manager Name</label>
            <input type="text" name="ownerName" className="form-control" value={formData.ownerName} onChange={handleChange} required />
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
            <label className="form-label">Property Address</label>
            <input type="text" name="propertyAddress" className="form-control" value={formData.propertyAddress} onChange={handleChange} required />
          </div>

          <div className="col-md-12">
            <label className="form-label">Select Maintenance Required:</label>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" name="maintenanceType" value="Plumbing" onChange={handleChange} checked={formData.maintenanceType.includes("Plumbing")} />
              <label className="form-check-label">Plumbing</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" name="maintenanceType" value="Electrical" onChange={handleChange} checked={formData.maintenanceType.includes("Electrical")} />
              <label className="form-check-label">Electrical</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" name="maintenanceType" value="HVAC" onChange={handleChange} checked={formData.maintenanceType.includes("HVAC")} />
              <label className="form-check-label">HVAC/AC Repairs</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" name="maintenanceType" value="Cleaning" onChange={handleChange} checked={formData.maintenanceType.includes("Cleaning")} />
              <label className="form-check-label">Cleaning & Housekeeping</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" name="maintenanceType" value="Pest Control" onChange={handleChange} checked={formData.maintenanceType.includes("Pest Control")} />
              <label className="form-check-label">Pest Control</label>
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Preferred Visit Date</label>
            <input type="date" name="preferredDate" className="form-control" value={formData.preferredDate} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <label className="form-label">Additional Notes</label>
            <textarea className="form-control" name="additionalNotes" rows="3" value={formData.additionalNotes} onChange={handleChange}></textarea>
          </div>

          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-success">📩 Submit Maintenance Request</button>
          </div>
        </form>
      </section>

      <section className="mt-5">
        <h4>✅ Why Choose Our Maintenance Team?</h4>
        <ul>
          <li>✔️ Certified and verified service providers</li>
          <li>✔️ On-time job tracking & follow-ups</li>
          <li>✔️ Transparent billing with no surprise charges</li>
          <li>✔️ Emergency and weekend support available</li>
        </ul>
      </section>
    </div>
  );
};

export default MaintenanceSupport;
