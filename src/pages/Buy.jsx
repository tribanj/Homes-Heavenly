// src/pages/Buy.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import PropertyList from '../components/listings/PropertyList';

const Buy = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const q = query(
          collection(db, 'property_for_rent_or_sale'),
          where('listingType', '==', 'Sale'),
          where('status', '==', 'approved') // only show approved listings
        );
        const querySnapshot = await getDocs(q);

        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProperties(results);
      } catch (err) {
        console.error('Error fetching listings:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-2">🏠 Buy Properties</h2>
      <p className="mb-6">Find plots, flats, shops, farmhouses and more!</p>

      {loading ? (
        <p>Loading listings...</p>
      ) : properties.length > 0 ? (
        <PropertyList />
      ) : (
        <p>No properties available for sale yet.</p>
      )}
    </div>
  );
};

export default Buy;
