// src/listings/rentlistings.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const RentListings = () => {
  const [rentProperties, setRentProperties] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'rentProperties'));
        const listings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRentProperties(listings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="container py-4">
      <h2>🏠 Rent Listings</h2>
      <div className="row">
        {rentProperties.length > 0 ? (
          rentProperties.map(property => (
            <div className="col-md-4 mb-4" key={property.id}>
              <div className="card">
                {property.mediaUrls && property.mediaUrls.length > 0 && (
                  <img
                    src={property.mediaUrls[0]}
                    className="card-img-top"
                    alt={property.title || 'Property Image'}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{property.title || 'Untitled Property'}</h5>
                  <p className="card-text">
                    📍 {property.addressLine1}, {property.city} <br />
                    💰 ₹{property.price}/month
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
};

export default RentListings;
