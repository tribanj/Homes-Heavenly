// src/pages/Buy.jsx
import React from 'react';
import PropertyList from '../components/listings/PropertyList';

const Buy = () => {
  const propertiesForSale = [
    {
      title: '3BHK Flat in Pune',
      location: 'Koregaon Park',
      price: '95,00,000',
      image: '/images/flat1.jpg',
    },
    {
      title: 'Farmhouse in Lonavala',
      location: 'Tiger Point',
      price: '2,50,00,000',
      image: '/images/farmhouse.jpg',
    },
    {
      title: 'Commercial Shop in Mumbai',
      location: 'Andheri East',
      price: '1,75,00,000',
      image: '/images/shop.jpg',
    },
  ];

  return (
    <div className="container mt-4">
      <h2>🏠 Buy Properties</h2>
      <p>Find plots, flats, shops, farmhouses and more!</p>
      <PropertyList properties={propertiesForSale} />
    </div>
  );
};

export default Buy;
