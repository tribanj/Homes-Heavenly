import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/listings/PropertyCard";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { motion } from "framer-motion";
import { FiSearch, FiHome, FiDollarSign, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { FaBed, FaBath, FaRulerCombined, FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        // Base query for approved properties
        let q = query(
          collection(db, "property_for_rent_or_sale"),
          where("status", "==", "approved"),
          orderBy("timestamp", "desc"),
          limit(12)
        );

        const snapshot = await getDocs(q);
        const propertiesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          listingType: doc.data().listingType?.toLowerCase() || 'rent'
        }));

        setProperties(propertiesData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch =
      property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.locality?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "rent" && property.listingType === "rent") ||
      (activeTab === "sale" && property.listingType === "sale");

    return matchesSearch && matchesTab;
  });

  const rentProperties = filteredProperties.filter(p => p.listingType === "rent");
  const saleProperties = filteredProperties.filter(p => p.listingType === "sale");

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-24 px-4 text-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500"
          >
            Discover Your Dream Property
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Premium homes and apartments curated for your perfect lifestyle
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
                className="flex-1 px-6 py-4 focus:outline-none text-white border-[2px] rounded-bl-lg rounded-tl-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-amber-500 hover:bg-amber-600 px-8 flex items-center transition text-white font-medium">
                <FiSearch className="text-xl mr-2" />
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Property Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-800 rounded-xl shadow-lg p-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-8 py-3 rounded-lg transition font-medium ${activeTab === "all" ? "bg-amber-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              All Properties
            </button>
            <button
              onClick={() => setActiveTab("rent")}
              className={`px-8 py-3 rounded-lg transition font-medium ${activeTab === "rent" ? "bg-amber-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              For Rent
            </button>
            <button
              onClick={() => setActiveTab("sale")}
              className={`px-8 py-3 rounded-lg transition font-medium ${activeTab === "sale" ? "bg-amber-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              For Sale
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <>
            {/* Property Grid */}
            {filteredProperties.length > 0 ? (
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
                    <div className="p-5">
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
                  {searchQuery ? "Try a different search term" : "Check back later for new listings"}
                </p>
              </div>
            )}

            {/* Stats Section */}
            {/* <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center border border-gray-700 hover:border-amber-500 transition">
                <div className="bg-amber-500/20 p-4 rounded-xl mr-4">
                  <FiHome className="text-amber-500 text-2xl" />
                </div>
                <div>
                  <p className="text-gray-400">Total Properties</p>
                  <p className="text-2xl font-bold text-white">{properties.length}</p>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center border border-gray-700 hover:border-amber-500 transition">
                <div className="bg-amber-500/20 p-4 rounded-xl mr-4">
                  <FiDollarSign className="text-amber-500 text-2xl" />
                </div>
                <div>
                  <p className="text-gray-400">For Rent</p>
                  <p className="text-2xl font-bold text-white">{rentProperties.length}</p>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center border border-gray-700 hover:border-amber-500 transition">
                <div className="bg-amber-500/20 p-4 rounded-xl mr-4">
                  <FiCheckCircle className="text-amber-500 text-2xl" />
                </div>
                <div>
                  <p className="text-gray-400">For Sale</p>
                  <p className="text-2xl font-bold text-white">{saleProperties.length}</p>
                </div>
              </div>
            </div> */}

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
    </div>
  );
};

export default Home;