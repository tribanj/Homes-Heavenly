// src/components/UserDashboard/SavedListings.jsx
import React from 'react';

const SavedListings = () => {
  const savedProperties = [
    {
      id: 1,
      title: '3BHK Apartment in Gurgaon',
      location: 'Sector 56, Gurgaon',
      price: '₹1.2 Cr',
      type: 'For Sale',
    },
    {
      id: 2,
      title: '2BHK Flat for Rent in Pune',
      location: 'Kharadi, Pune',
      price: '₹25,000/month',
      type: 'For Rent',
    },
    {
      id: 3,
      title: 'Luxury Villa in Goa',
      location: 'Candolim Beach',
      price: '₹3.5 Cr',
      type: 'For Sale',
    },
  ];

  return (
    <div className="p-4">
      <h2>Saved Listings</h2>
      {savedProperties.length === 0 ? (
        <p>You haven’t saved any listings yet.</p>
      ) : (
        <div className="row mt-3">
          {savedProperties.map((property) => (
            <div key={property.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{property.title}</h5>
                  <p className="card-text">
                    <strong>Location:</strong> {property.location} <br />
                    <strong>Price:</strong> {property.price} <br />
                    <strong>Type:</strong> {property.type}
                  </p>
                  <button className="btn btn-primary btn-sm">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedListings;
