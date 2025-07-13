import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FiFilter, FiHome, FiMapPin, FiDollarSign } from "react-icons/fi";
import { FaBed, FaBath, FaRulerCombined, FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const Rent = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    minSize: ''
  });

  const propertyTypes = [
    'Apartment',
    'House',
    'Villa',
    'PG/Hostel',
    'Commercial Space',
    'Builder Floor'
  ];

  const fetchRentalProperties = async () => {
    try {
      setLoading(true);

      // Only fetch from rentListings collection
      const q = query(
        collection(db, "property_for_rent_or_sale"),
        where("listingType", "==", "rent"),
        where("status", "==", "approved")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log("Fetched rental properties:", data); // Debug log
      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error("Error fetching rental properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentalProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, properties]);

  const applyFilters = () => {
    const results = properties.filter(property => {
      // Location filter
      const locationMatch = !filters.location ||
        (property.city && property.city.toLowerCase().includes(filters.location.toLowerCase())) ||
        (property.locality && property.locality.toLowerCase().includes(filters.location.toLowerCase()));

      // Property type filter
      const typeMatch = !filters.propertyType ||
        property.propertyType === filters.propertyType;

      // Price filter
      const priceMatch =
        (!filters.minPrice || (property.price && Number(property.price) >= Number(filters.minPrice))) &&
        (!filters.maxPrice || (property.price && Number(property.price) <= Number(filters.maxPrice)));

      // Bedrooms filter
      const bedroomsMatch = !filters.bedrooms ||
        (property.bedrooms && Number(property.bedrooms) === Number(filters.bedrooms));

      // Bathrooms filter
      const bathroomsMatch = !filters.bathrooms ||
        (property.bathrooms && Number(property.bathrooms) === Number(filters.bathrooms));

      // Size filter
      const sizeMatch = !filters.minSize ||
        (property.builtupArea && Number(property.builtupArea) >= Number(filters.minSize));

      return locationMatch && typeMatch && priceMatch && bedroomsMatch && bathroomsMatch && sizeMatch;
    });

    setFilteredProperties(results);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      minSize: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 py-16 px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your Perfect Rental
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Discover premium homes and apartments available for rent
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Toggle Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <FiFilter />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiMapPin className="mr-2" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="City or Locality"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiHome className="mr-2" />
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Types</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiDollarSign className="mr-2" />
                  Price Range (₹)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaBed className="mr-2" />
                  Bedrooms
                </label>
                <select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaBath className="mr-2" />
                  Bathrooms
                </label>
                <select
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3+</option>
                </select>
              </div>

              {/* Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaRulerCombined className="mr-2" />
                  Min Size (sqft)
                </label>
                <input
                  type="number"
                  name="minSize"
                  value={filters.minSize}
                  onChange={handleFilterChange}
                  placeholder="Minimum size"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Reset Button */}
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {filteredProperties.length} Properties Found
          </h2>
        </div>

        {/* Property List */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate(`/property/${property.id}`)}
              >
                {/* Property Image */}
                <div className="relative h-48 w-full">
                  <img
                    src={property.photos?.[0] || '/images/placeholder.jpg'}
                    alt={property.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs font-medium rounded">
                    {property.propertyType || 'Rental'}
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold truncate">{property.title}</h3>
                    <p className="text-blue-600 font-bold whitespace-nowrap">
                      ₹{property.price?.toLocaleString('en-IN')}/mo
                    </p>
                  </div>

                  <p className="text-gray-600 mb-3 flex items-center text-sm">
                    <FiMapPin className="mr-1 text-blue-500" />
                    {[property.locality, property.city].filter(Boolean).join(', ')}
                  </p>

                  {/* Property Features */}
                  <div className="flex justify-between border-t border-gray-100 pt-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaBed className="mr-1" />
                      <span>{property.bedrooms || 'N/A'} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <FaBath className="mr-1" />
                      <span>{property.bathrooms || 'N/A'} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <FaRulerCombined className="mr-1" />
                      <span>{property.builtupArea || 'N/A'} sqft</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <FiHome className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No properties found matching your criteria
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or check back later for new listings
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rent;