import React, { useState } from 'react';

const AddEditListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    address: '',
    status: 'active',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Listing Submitted!\n${JSON.stringify(formData, null, 2)}`);
    // Later: Send formData to backend server
  };

  return (
    <div className="add-edit-listing" style={{ maxWidth: '700px', margin: '0 auto', padding: '30px' }}>
      <h2>Add / Edit Property Listing</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label>Property Title:</label>
          <input 
            type="text" 
            className="form-control" 
            name="title" 
            value={formData.title} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label>Price (INR):</label>
          <input 
            type="number" 
            className="form-control" 
            name="price" 
            value={formData.price} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label>Property Description:</label>
          <textarea 
            className="form-control" 
            name="description" 
            value={formData.description} 
            onChange={handleChange}
            rows="4"
            required 
          />
        </div>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label>Property Address:</label>
          <input 
            type="text" 
            className="form-control" 
            name="address" 
            value={formData.address} 
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label>Status:</label>
          <select 
            className="form-control" 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">Save Listing</button>
      </form>
    </div>
  );
};

export default AddEditListing;
