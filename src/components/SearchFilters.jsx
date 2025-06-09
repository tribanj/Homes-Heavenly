import React, { useState } from 'react';

const SearchFilters = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchClick = () => {
    onSearch(filters);
  };

  return (
    <div className="search-bar mb-4">
      <div className="row g-2">
        <div className="col-md-3">
          <input
            type="text"
            name="location"
            className="form-control"
            placeholder="Location"
            value={filters.location}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-3">
          <select
            name="propertyType"
            className="form-control"
            value={filters.propertyType}
            onChange={handleInputChange}
          >
            <option value="">Property Type</option>
            <option value="flat">Flat / Apartment</option>
            <option value="pg">PG / Hostel</option>
            <option value="house">House / Kothi / Villa</option>
            <option value="plot">Plot / Land</option>
            <option value="garage">Garage / Parking</option>
            <option value="shop">Shop / Showroom / Office</option>
            <option value="warehouse">Warehouse</option>
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="minPrice"
            className="form-control"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="maxPrice"
            className="form-control"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="bedrooms"
            className="form-control"
            placeholder="Bedrooms"
            value={filters.bedrooms}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="bathrooms"
            className="form-control"
            placeholder="Bathrooms"
            value={filters.bathrooms}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="size"
            className="form-control"
            placeholder="Min Size (sq ft)"
            value={filters.size}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-primary w-100"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;