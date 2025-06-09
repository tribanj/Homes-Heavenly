import React from 'react';

const MediaContactSubmit = ({ formData, setFormData, onBack, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">📸 Media & Contact Information</h4>

      <div className="mb-3">
        <label className="form-label">Upload Project Images</label>
        <input
          type="file"
          name="images"
          multiple
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contact Name</label>
        <input
          type="text"
          name="contactName"
          className="form-control"
          value={formData.contactName || ''}
          onChange={handleChange}
          placeholder="e.g., John Doe"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contact Email</label>
        <input
          type="email"
          name="contactEmail"
          className="form-control"
          value={formData.contactEmail || ''}
          onChange={handleChange}
          placeholder="e.g., contact@project.com"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contact Number</label>
        <input
          type="text"
          name="contactPhone"
          className="form-control"
          value={formData.contactPhone || ''}
          onChange={handleChange}
          placeholder="e.g., +91-9876543210"
        />
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary" onClick={onBack}>Back</button>
        <button className="btn btn-success" onClick={onSubmit}>Submit Ad</button>
      </div>
    </div>
  );
};

export default MediaContactSubmit;
