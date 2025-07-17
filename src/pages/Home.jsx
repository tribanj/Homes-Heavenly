import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { motion } from "framer-motion";
import { FiSearch, FiHome, FiDollarSign, FiMapPin, FiCheckCircle, FiFilter, FiX } from "react-icons/fi";
import { FaBed, FaBath, FaRulerCombined, FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [auctionProperties, setAuctionProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced filter states
  const [filters, setFilters] = useState({
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    minArea: "",
    maxArea: "",
    amenities: []
  });

  // Available property types and amenities
  const propertyTypes = ["Apartment", "House", "Villa", "Plot", "Commercial"];
  const amenitiesList = ["Parking", "Garden", "Pool", "Furnished", "AC", "Security"];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        // Fetch properties for rent or sale
        let rentSaleQuery = query(
          collection(db, "property_for_rent_or_sale"),
          where("status", "==", "approved"),
          orderBy("timestamp", "desc"),
          limit(12)
        );

        const rentSaleSnapshot = await getDocs(rentSaleQuery);
        const rentSalePropertiesData = rentSaleSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          listingType: doc.data().listingType?.toLowerCase() || 'rent'
        }));

        // Fetch auction properties
        const auctionQuery = query(
          collection(db, "property_for_auction"),
          where("status", "==", "approved"),
          orderBy("updatedAt", "desc")
        );

        const auctionSnapshot = await getDocs(auctionQuery);

        const auctionPropertiesData = auctionSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.basicDetails?.listingTitle || 'Auction Property',
            price: data.auctionDetails?.reservePrice || 0,
            locality: data.locationDetails?.locality || '',
            city: data.locationDetails?.city || '',
            bedrooms: data.propertyDetails?.bedrooms || '',
            bathrooms: data.propertyDetails?.bathrooms || '',
            builtupArea: data.propertyDetails?.builtUpArea || '',
            photos: data.mediaUploads?.propertyImages || [],
            listingType: 'auction',
            auctionDetails: data.auctionDetails || {},
            propertyType: data.propertyDetails?.propertyType || ''
          };
        });

        setProperties(rentSalePropertiesData);
        setAuctionProperties(auctionPropertiesData);

      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle amenities toggle
  const toggleAmenity = (amenity) => {
    setFilters(prev => {
      if (prev.amenities.includes(amenity)) {
        return {
          ...prev,
          amenities: prev.amenities.filter(a => a !== amenity)
        };
      } else {
        return {
          ...prev,
          amenities: [...prev.amenities, amenity]
        };
      }
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      minArea: "",
      maxArea: "",
      amenities: []
    });
  };

  // Filter properties based on active tab and filters
  const filterProperties = (propertyList) => {
    return propertyList.filter(property => {
      // Basic search filter
      const matchesSearch =
        property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.locality?.toLowerCase().includes(searchQuery.toLowerCase());

      // Property type filter
      const matchesPropertyType =
        !filters.propertyType ||
        property.propertyType?.toLowerCase() === filters.propertyType.toLowerCase();

      // Price range filter
      const price = property.price || 0;
      const matchesPrice =
        (!filters.minPrice || price >= Number(filters.minPrice)) &&
        (!filters.maxPrice || price <= Number(filters.maxPrice));

      // Bedrooms filter
      const matchesBedrooms =
        !filters.bedrooms ||
        String(property.bedrooms) === filters.bedrooms;

      // Bathrooms filter
      const matchesBathrooms =
        !filters.bathrooms ||
        String(property.bathrooms) === filters.bathrooms;

      // Area filter
      const area = property.builtupArea || 0;
      const matchesArea =
        (!filters.minArea || area >= Number(filters.minArea)) &&
        (!filters.maxArea || area <= Number(filters.maxArea));

      // Amenities filter (simplified - in real app you'd check each amenity)
      const matchesAmenities =
        filters.amenities.length === 0 ||
        filters.amenities.every(amenity =>
          property.amenities?.includes(amenity.toLowerCase()));

      return (
        matchesSearch &&
        matchesPropertyType &&
        matchesPrice &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesArea &&
        matchesAmenities
      );
    });
  };

  // Apply filters based on active tab
  const filteredProperties = filterProperties(
    properties.filter(property => {
      if (activeTab === "all") return true;
      if (activeTab === "rent") return property.listingType === "rent";
      if (activeTab === "sale") return property.listingType === "sale";
      return false;
    })
  );

  const filteredAuctionProperties = activeTab === "auction" ?
    filterProperties(auctionProperties) : [];

  const rentProperties = filteredProperties.filter(p => p.listingType === "rent");
  const saleProperties = filteredProperties.filter(p => p.listingType === "sale");

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-4 px-4 text-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500"
          >
            Discover Your Dream Property
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Premium Homes And Apartments Curated For Your Perfect Lifestyle
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="flex shadow-2xl rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search by location, property, or type..."
                className="flex-1 px-2 py-2 focus:outline-none text-white bg-gray-800 border border-gray-700 rounded-l-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="bg-amber-500 hover:bg-amber-600 px-2 flex items-center transition text-white font-medium"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiFilter className="text-sm mr-2" />
                Filters
              </button>
              <button className="bg-amber-500 hover:bg-amber-600 px-2 flex items-center transition text-white font-medium">
                <FiSearch className="text-xl mr-2" />
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-6 shadow-xl border-t border-gray-700"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <FiFilter className="mr-2 text-amber-500" />
                Filters
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Property Type</label>
                <select
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleFilterChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">All Types</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="w-1/2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="w-1/2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium mb-2">Bedrooms</label>
                <select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-medium mb-2">Bathrooms</label>
                <select
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleFilterChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
              </div>

              {/* Area */}
              <div>
                <label className="block text-sm font-medium mb-2">Area (sqft)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    name="minArea"
                    placeholder="Min"
                    value={filters.minArea}
                    onChange={handleFilterChange}
                    className="w-1/2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  <input
                    type="number"
                    name="maxArea"
                    placeholder="Max"
                    value={filters.maxArea}
                    onChange={handleFilterChange}
                    className="w-1/2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Amenities */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {amenitiesList.map(amenity => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-3 py-1 rounded-full text-sm flex items-center ${filters.amenities.includes(amenity) ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                      {filters.amenities.includes(amenity) ? (
                        <FiCheckCircle className="mr-1" />
                      ) : null}
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex items-end space-x-3 md:col-span-2">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg text-white transition flex-1"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Property Tabs */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center mb-8">
          <div className="inline-flex bg-gray-800 rounded-xl shadow-lg">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-3 rounded-lg transition font-medium ${activeTab === "all" ? "bg-amber-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              All Properties
            </button>
            <button
              onClick={() => setActiveTab("rent")}
              className={`px-5 py-3 rounded-lg transition font-medium ${activeTab === "rent" ? "bg-amber-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              For Rent
            </button>
            <button
              onClick={() => setActiveTab("sale")}
              className={`px-5 py-3 rounded-lg transition font-medium ${activeTab === "sale" ? "bg-amber-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              For Sale
            </button>
            <button
              onClick={() => setActiveTab("auction")}
              className={`px-5 py-3 rounded-lg transition font-medium ${activeTab === "auction" ? "bg-amber-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              Auction
            </button>
          </div>

          <div className="text-gray-400">
            {activeTab === "all" && `${filteredProperties.length} Properties`}
            {activeTab === "rent" && `${rentProperties.length} Rental Properties`}
            {activeTab === "sale" && `${saleProperties.length} Properties for Sale`}
            {activeTab === "auction" && `${filteredAuctionProperties.length} Auction Properties`}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <>
            {/* Property Grid */}
            {activeTab === "auction" ? (
              filteredAuctionProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredAuctionProperties.map((property) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                      className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                      onClick={() => navigate(`/services/buysale/AuctionSupport`)}
                    >
                      {/* Property Image */}
                      <div className="relative h-56 w-full">
                        <img
                          src={property.photos?.[0] || '/images/placeholder.jpg'}
                          alt={property.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-0 left-0 bg-amber-600 text-white px-3 py-1 text-sm font-medium rounded-br-lg">
                          AUCTION
                        </div>
                        <div className="absolute top-0 right-0 flex space-x-2 p-3">
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-gray-900/80 rounded-full backdrop-blur hover:bg-amber-600 transition"
                          >
                            <FaRegHeart className="text-white" />
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-gray-900/80 rounded-full backdrop-blur hover:bg-amber-600 transition"
                          >
                            <FaShareAlt className="text-white" />
                          </button>
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="p-2">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold truncate">{property.title}</h3>
                          <p className="text-amber-500 font-bold text-lg whitespace-nowrap">
                            ₹{property.price?.toLocaleString('en-IN')}
                          </p>
                        </div>

                        <p className="text-gray-400 mb-4 flex items-center">
                          <FiMapPin className="mr-2 text-amber-500" />
                          {[property.locality, property.city].filter(Boolean).join(', ')}
                        </p>

                        {/* Property Features */}
                        <div className="flex justify-between border-t border-gray-700 pt-4 text-gray-400">
                          <div className="flex items-center">
                            <FaBed className="mr-2 text-amber-500" />
                            <span>{property.bedrooms || 'N/A'} Beds</span>
                          </div>
                          <div className="flex items-center">
                            <FaBath className="mr-2 text-amber-500" />
                            <span>{property.bathrooms || 'N/A'} Baths</span>
                          </div>
                          <div className="flex items-center">
                            <FaRulerCombined className="mr-2 text-amber-500" />
                            <span>{property.builtupArea || 'N/A'} sqft</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-800 rounded-xl">
                  <FiHome className="mx-auto text-5xl text-amber-500 mb-4" />
                  <h3 className="text-2xl font-medium text-white mb-2">
                    No auction properties found
                  </h3>
                  <p className="text-gray-400">
                    {searchQuery ? "Try a different search term" : "Check back later for new auction listings"}
                  </p>
                </div>
              )
            ) : (
              filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProperties.map((property) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                      className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      {/* Property Image */}
                      <div className="relative h-56 w-full">
                        <img
                          src={property.photos?.[0] || '/images/placeholder.jpg'}
                          alt={property.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-0 left-0 bg-amber-600 text-white px-3 py-1 text-sm font-medium rounded-br-lg">
                          {property.listingType === 'rent' ? 'FOR RENT' : 'FOR SALE'}
                        </div>
                        <div className="absolute top-0 right-0 flex space-x-2 p-3">
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-gray-900/80 rounded-full backdrop-blur hover:bg-amber-600 transition"
                          >
                            <FaRegHeart className="text-white" />
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-gray-900/80 rounded-full backdrop-blur hover:bg-amber-600 transition"
                          >
                            <FaShareAlt className="text-white" />
                          </button>
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="p-2">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold truncate">{property.title}</h3>
                          <p className="text-amber-500 font-bold text-lg whitespace-nowrap">
                            ₹{property.price?.toLocaleString('en-IN')}
                            {property.listingType === 'rent' && '/mo'}
                          </p>
                        </div>

                        <p className="text-gray-400 mb-4 flex items-center">
                          <FiMapPin className="mr-2 text-amber-500" />
                          {[property.locality, property.city].filter(Boolean).join(', ')}
                        </p>

                        {/* Property Features */}
                        <div className="flex justify-between border-t border-gray-700 pt-4 text-gray-400">
                          <div className="flex items-center">
                            <FaBed className="mr-2 text-amber-500" />
                            <span>{property.bedrooms || 'N/A'} Beds</span>
                          </div>
                          <div className="flex items-center">
                            <FaBath className="mr-2 text-amber-500" />
                            <span>{property.bathrooms || 'N/A'} Baths</span>
                          </div>
                          <div className="flex items-center">
                            <FaRulerCombined className="mr-2 text-amber-500" />
                            <span>{property.builtupArea || 'N/A'} sqft</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-800 rounded-xl">
                  <FiHome className="mx-auto text-5xl text-amber-500 mb-4" />
                  <h3 className="text-2xl font-medium text-white mb-2">
                    No properties found
                  </h3>
                  <p className="text-gray-400">
                    {searchQuery ? "Try a different search term or adjust your filters" : "Check back later for new listings"}
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg text-white transition"
                  >
                    Reset Filters
                  </button>
                </div>
              )
            )}

            {/* Featured Cities */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6 text-white">Popular Cities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {['Chandigarh', 'Mohali', 'Panchkula', 'Zirakpur', 'Kharar'].map(city => (
                  <button
                    key={city}
                    onClick={() => setSearchQuery(city)}
                    className="flex items-center justify-center p-4 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 hover:border-amber-500 border border-gray-700 transition"
                  >
                    <FiMapPin className="text-amber-500 mr-2" />
                    <span className="text-white">{city}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      {/* <MortgagePropertyDetails /> */}
    </div>
  );
};

export default Home;