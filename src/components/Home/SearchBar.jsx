import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [purpose, setPurpose] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission reload
    const filters = {
      keyword: keyword.trim(),
      purpose,
      propertyType,
      location: location.trim(),
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
    };
    onSearch(filters);
  };

  const handleReset = () => {
    setKeyword("");
    setPurpose("");
    setPropertyType("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    onSearch({}); // Optionally trigger search with empty filters
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {/* Keyword Search */}
        <div className="lg:col-span-2">
          <input
            type="text"
            placeholder="Search by keyword (e.g., sea-facing villa, 2BHK Mumbai)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Purpose Dropdown */}
        <div>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Purpose</option>
            <option value="sale">Buy</option>
            <option value="rent">Rent</option>
            <option value="lease">Lease</option>
            <option value="pg">PG</option>
            <option value="hostel">Hostel</option>
            <option value="prelaunch">Pre-Launch</option>
          </select>
        </div>

        {/* Property Type Dropdown */}
        <div>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Property Type</option>
            <option value="villa">Villa</option>
            <option value="apartment">Apartment</option>
            <option value="plot">Plot</option>
            <option value="commercial">Commercial</option>
            <option value="studio">Studio</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price Range */}
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min={minPrice || "0"}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
          >
            <span className="mr-2">🔍</span> Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
