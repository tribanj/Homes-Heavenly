// src/component/agentdashboard/manageproperties/AddEditProperty.js
import React, { useState } from 'react';

const AddEditProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    address: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Property:', formData);
    // Later: Send this data to backend
  };

  return (
    <div className="add-edit-property" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Add / Edit Property</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Office">Office Space</option>
          <option value="Land">Land/Plot</option>
        </select>

        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
        />

        <input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
        />

        <input
          type="number"
          name="area"
          placeholder="Area (Sq Ft)"
          value={formData.area}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        ></textarea>

        <button type="submit" className="btn btn-success">Save Property</button>
      </form>
    </div>
  );
};

export default AddEditProperty;
