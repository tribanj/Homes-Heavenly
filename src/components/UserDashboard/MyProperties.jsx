import React from 'react';
import './MyProperties.css';

const dummyProperties = [
  {
    id: 1,
    title: "2 BHK Apartment in Bangalore",
    type: "Apartment",
    location: "Whitefield, Bangalore",
    price: "₹75 Lakhs",
    status: "Active"
  },
  {
    id: 2,
    title: "3 BHK Villa in Hyderabad",
    type: "Villa",
    location: "Kompally, Hyderabad",
    price: "₹1.2 Cr",
    status: "Expired"
  }
];

const MyProperties = () => {
  return (
    <div className="my-properties">
      <h2>🏠 My Properties</h2>
      <div className="property-list">
        {dummyProperties.map((property) => (
          <div className="property-card" key={property.id}>
            <div className="property-info">
              <h4>{property.title}</h4>
              <p>Type: {property.type}</p>
              <p>Location: {property.location}</p>
              <p>Price: {property.price}</p>
              <p>Status: <span className={`status ${property.status.toLowerCase()}`}>{property.status}</span></p>
            </div>
            <div className="property-actions">
              <button className="view-btn">👁 View</button>
              <button className="edit-btn">✏️ Edit</button>
              <button className="delete-btn">🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProperties;
