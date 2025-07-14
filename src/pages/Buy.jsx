import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FiFilter, FiHome, FiMapPin, FiDollarSign, FiSearch } from "react-icons/fi";
import { FaBed, FaBath, FaRulerCombined, FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const Buy = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
    'Plot',
    'Commercial Space',
    'Farmhouse'
  ];

  const fetchBuyProperties = async () => {
    try {
      setLoading(true);

      // Query with case-insensitive matching for sale properties
      const q = query(
        collection(db, "property_for_rent_or_sale"),
        where("status", "==", "approved"),
        where("listingType", "in", ["sale", "Sale", "SALE"])
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error("Error fetching properties for sale:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, properties, searchQuery]);

  const applyFilters = () => {
    const results = properties.filter(property => {
      // Search query filter
      const searchMatch =
        !searchQuery ||
        property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.locality?.toLowerCase().includes(searchQuery.toLowerCase());

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

      return searchMatch && locationMatch && typeMatch && priceMatch && bedroomsMatch && bathroomsMatch && sizeMatch;
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
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500"
        >
          Premium Properties for Sale
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Discover luxury homes, plots, and commercial spaces available for purchase
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location, property, or type..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-gray-200"
            />
          </div>

          {/* Filter Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition border border-gray-700"
          >
            <FiFilter className="text-amber-500" />
            <span className="text-gray-200">
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </span>
          </motion.button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 overflow-hidden border border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                  <FiMapPin className="mr-2 text-amber-500" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="City or Locality"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-amber-500 focus:border-amber-500 text-gray-200"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                  <FiHome className="mr-2 text-amber-500" />
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleFilterChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-amber-500 focus:border-amber-500 text-gray-200"
                >
                  <option value="">All Types</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type} className="bg-gray-800">{type}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                  <FiDollarSign className="mr-2 text-amber-500" />
                  Price Range (₹)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className="w-1/2 p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-amber-500 focus:border-amber-500 text-gray-200"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className="w-1/2 p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-amber-500 focus:border-amber-500 text-gray-200"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                  <FaBed className="mr-2 text-amber-500" />
                  Bedrooms
                </label>
                <select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-amber-500 focus:border-amber-500 text-gray-200"
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
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                  <FaBath className="mr-2 text-amber-500" />
                  Bathrooms
                </label>
                <select
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleFilterChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-amber-500 focus:border-amber-500 text-gray-200"
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3+</option>
                </select>
              </div>

              {/* Size */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                  <FaRulerCombined className="mr-2 text-amber-500" />
                  Min Size (sqft)
                </label>
                <input
                  type="number"
                  name="minSize"
                  value={filters.minSize}
                  onChange={handleFilterChange}
                  placeholder="Minimum size"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-amber-500 focus:border-amber-500 text-gray-200"
                />
              </div>

              {/* Reset Button */}
              <div className="flex items-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetFilters}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded-md transition border border-gray-600"
                >
                  Reset Filters
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-200">
            {filteredProperties.length} Properties Found
          </h2>
        </div>

        {/* Property List */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse border border-gray-700">
                <div className="h-48 bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2 mb-3"></div>
                  <div className="h-8 bg-gray-700 rounded w-full"></div>
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
                className="bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all border border-gray-700"
                onClick={() => navigate(`/property/${property.id}`)}
              >
                {/* Property Image */}
                <div className="relative h-48 w-full">
                  <img
                    src={property.photos?.[0] || '/images/placeholder.jpg'}
                    alt={property.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-1 text-xs font-medium rounded">
                    {property.propertyType || 'For Sale'}
                  </div>
                  <button className="absolute top-2 right-2 p-2 bg-gray-900 bg-opacity-70 rounded-full hover:bg-amber-600 transition">
                    <FaRegHeart className="text-white" />
                  </button>
                </div>

                {/* Property Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-100 truncate">{property.title}</h3>
                    <p className="text-amber-500 font-bold whitespace-nowrap">
                      ₹{property.price?.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <p className="text-gray-400 mb-3 flex items-center text-sm">
                    <FiMapPin className="mr-1 text-amber-500" />
                    {[property.locality, property.city].filter(Boolean).join(', ')}
                  </p>

                  {/* Property Features */}
                  <div className="flex justify-between border-t border-gray-700 pt-3 text-sm text-gray-400">
                    <div className="flex items-center">
                      <FaBed className="mr-1 text-amber-500" />
                      <span>{property.bedrooms || 'N/A'} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <FaBath className="mr-1 text-amber-500" />
                      <span>{property.bathrooms || 'N/A'} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <FaRulerCombined className="mr-1 text-amber-500" />
                      <span>{property.builtupArea || 'N/A'} sqft</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl shadow-md p-8 text-center border border-gray-700">
            <FiHome className="mx-auto text-4xl text-amber-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-200 mb-2">
              No properties found matching your criteria
            </h3>
            <p className="text-gray-400">
              Try adjusting your filters or check back later for new listings
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetFilters}
              className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition"
            >
              Reset Filters
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buy;