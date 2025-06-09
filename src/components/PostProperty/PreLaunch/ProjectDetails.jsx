import React from 'react';

const ProjectDetails = ({ formData, setFormData, onNext }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">🧱 Pre-Launch Project Details</h4>

      <div className="mb-3">
        <label className="form-label">Project Name</label>
        <input
          type="text"
          name="projectName"
          className="form-control"
          value={formData.projectName || ''}
          onChange={handleChange}
          placeholder="e.g., Green Heights Residency"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Builder/Developer Name</label>
        <input
          type="text"
          name="builderName"
          className="form-control"
          value={formData.builderName || ''}
          onChange={handleChange}
          placeholder="e.g., XYZ Constructions"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Property Type</label>
        <select
          name="propertyType"
          className="form-select"
          value={formData.propertyType || ''}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
          <option value="Studio">Studio</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Tentative Launch Date</label>
        <input
          type="date"
          name="launchDate"
          className="form-control"
          value={formData.launchDate || ''}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Key Features</label>
        <textarea
          name="features"
          className="form-control"
          rows="4"
          value={formData.features || ''}
          onChange={handleChange}
          placeholder="e.g., Clubhouse, Swimming Pool, Smart Homes..."
        />
      </div>

      <button className="btn btn-primary mt-3" onClick={onNext}>Next</button>
    </div>
  );
};

export default ProjectDetails;
