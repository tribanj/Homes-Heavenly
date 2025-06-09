import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className="card h-100 shadow">
      {property.images && property.images.length > 0 && (
        <img
          src={URL.createObjectURL(property.images[0])}
          className="card-img-top"
          alt="Property"
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{property.city}</h5>
        <p className="card-text">
          <strong>₹{property.rent}/month</strong><br />
          {property.bedrooms} BHK • {property.furnishing}
        </p>
        <p className="text-muted small">{property.address}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
