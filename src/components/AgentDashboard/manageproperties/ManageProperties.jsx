import React from 'react';
import {useNavigate } from 'react-router-dom';

const ManageProperties = () => {
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate('/agent-dashboard/manage-properties/add');
  };

  const handleEdit = (propertyId) => {
    navigate('/agent-dashboard/manage-properties/add');
    // Later we can pass propertyId if you want edit functionality
  };

  const handleUploadMedia = (propertyId) => {
    navigate('/agent-dashboard/manage-properties/upload-media');
    // Later we can pass propertyId to upload specific property media
  };

  const handleOpenHouse = (propertyId) => {
    navigate('/agent-dashboard/manage-properties/set-open-house');
    // This will navigate to "Set Open House" page (we will create soon)
  };

  const handleDelete = (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      // Logic for deleting property (when backend ready)
      alert(`Property ID ${propertyId} deleted (dummy alert for now)`);
    }
  };

  return (
    <div className="manage-properties">
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Manage Properties</h2>
        <button onClick={handleAddNew} className="btn btn-primary">➕ Add New Listing</button>
      </div>

      {/* Listings Table */}
      <div className="listings-table">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Image</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Title</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Price</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Status</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy Example Row */}
            <tr>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>
                <img src="https://via.placeholder.com/80" alt="property" />
              </td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>Luxury Apartment in City Center</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>$500,000</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>Active</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>
                <button onClick={() => handleEdit(1)} className="btn btn-sm btn-info" style={{ marginRight: '5px' }}>Edit</button>
                <button onClick={() => handleUploadMedia(1)} className="btn btn-sm btn-secondary" style={{ marginRight: '5px' }}>Media</button>
                <button onClick={() => handleOpenHouse(1)} className="btn btn-sm btn-warning" style={{ marginRight: '5px' }}>Open House</button>
                <button onClick={() => handleDelete(1)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperties;
