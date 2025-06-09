import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [purpose, setPurpose] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    const filters = {
      keyword,
      purpose,
      propertyType,
      location,
      minPrice,
      maxPrice,
    };
    onSearch(filters);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search by keyword (e.g., sea-facing villa, 2BHK Mumbai)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
        <option value="">Purpose</option>
        <option value="sale">Buy</option>
        <option value="rent">Rent</option>
        <option value="lease">Lease</option>
        <option value="pg">PG</option>
        <option value="hostel">Hostel</option>
        <option value="prelaunch">Pre-Launch</option>
      </select>

      <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
        <option value="">Property Type</option>
        <option value="villa">Villa</option>
        <option value="apartment">Apartment</option>
        <option value="plot">Plot</option>
        <option value="commercial">Commercial</option>
        <option value="studio">Studio</option>
      </select>

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <button onClick={handleSearch}>🔍 Search</button>
    </div>
  );
};

export default SearchBar;
