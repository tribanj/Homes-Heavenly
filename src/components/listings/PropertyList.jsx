// src/components/listings/PropertyList.jsx
import React from 'react';

const PropertyList = ({ properties }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="border rounded p-4 shadow">
          <img
            src={property.photos?.[0] || '/images/placeholder.jpg'}
            alt={property.title}
            className="h-48 w-full object-cover mb-2 rounded"
          />
          <h3 className="text-lg font-semibold">{property.title}</h3>
          <p className="text-sm text-gray-600">{property.locality}, {property.city}</p>
          <p className="text-blue-700 font-bold mt-1">₹ {property.price}</p>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
