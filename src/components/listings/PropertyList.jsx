import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties }) => {
  if (!properties || properties.length === 0) {
    return <p className="text-muted">No listings found.</p>;
  }

  return (
    <div className="row">
      {properties.map((property, index) => (
        <div className="col-md-12" key={index}>
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
