// src/pages/Sell.jsx
import React from 'react';
import PropertyList from '../components/listings/PropertyList';

const Sell = () => {
  const propertiesBeingSold = [
    {
      title: '2BHK Flat by Owner',
      location: 'Noida Sector 62',
      price: '68,00,000',
      image: '/images/flat2.jpg',
    },
    {
      title: 'Plot for Sale in Jaipur',
      location: 'Mansarovar',
      price: '40,00,000',
      image: '/images/plot.jpg',
    },
    {
      title: 'Showroom in Surat',
      location: 'Ring Road',
      price: '90,00,000',
      image: '/images/showroom.jpg',
    },
  ];

  return (
    <div className="container mt-4">
      <h2>🏷️ Sell Properties</h2>
      <p>See what other users are listing for sale.</p>
      <PropertyList properties={propertiesBeingSold} />
    </div>
  );
};

export default Sell;
