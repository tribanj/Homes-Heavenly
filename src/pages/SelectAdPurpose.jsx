// src/pages/SelectAdPurpose.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectAdPurpose.css'; // Optional styles

const purposes = [
  { title: 'Sale Property', icon: '🏠', path: '/post-property/sale' },
  { title: 'Rent Property', icon: '🏘️', path: '/post-property/rent' },
  { title: 'Pre-Launch Project', icon: '🚧', path: '/post-property/prelaunch' },
  { title: 'Mortgage Listing', icon: '💰', path: '/post-property/mortgage' },
  { title: 'Other', icon: '📝', path: '/post-property/other' },  
  { title: 'Commercial Lease', icon: '🏢', path: '/post-property/commercial-lease' },  
  { title: 'PG/Hostel', icon: '🛏️', path: '/post-property/pg-hostel' },  
  { title: 'Auction', icon: '🔨', path: '/post-property/auction' },  
  { title: 'Builder Project Listing', icon: '🏗️', path: '/post-property/builder-project' },  
];

const SelectAdPurpose = () => {
  const navigate = useNavigate();

  const handlePurposeClick = (path) => {
    console.log("Navigating to:", path); // Debugging
    navigate(path);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">What is the purpose of your ad?</h2>
      <div className="row">
        {purposes.map((purpose, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div
              className="card text-center h-100 shadow"
              onClick={() => handlePurposeClick(purpose.path)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body">
                <div className="display-3">{purpose.icon}</div>
                <h5 className="card-title mt-3">{purpose.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectAdPurpose;
