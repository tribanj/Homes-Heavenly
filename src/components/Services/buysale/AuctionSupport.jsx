import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../../../firebase/firebaseConfig"; // Ensure this path is correct
import { collection, getDocs, query } from "firebase/firestore";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaGavel,
} from "react-icons/fa";
import {
  FiChevronDown,
  FiHelpCircle,
  FiCheckSquare,
  FiAward,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// --- Static data can be defined outside the component ---
const statesWithCities = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Karnataka: ["Bengaluru", "Mysore"],
  Delhi: ["New Delhi", "Dwarka"],
  Gujarat: ["Ahmedabad", "Surat"],
  "Uttar Pradesh": ["Lucknow", "Noida"],
};

const propertyTypes = [
  "Apartment",
  "Villa",
  "Plot",
  "Commercial",
  "Penthouse",
  "Farm House",
];

// --- Helper component for skeleton loading UI ---
const SkeletonCard = () => (
  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 animate-pulse">
    <div className="h-48 bg-gray-700"></div>
    <div className="p-5">
      <div className="h-6 w-3/4 bg-gray-700 rounded mb-3"></div>
      <div className="h-4 w-full bg-gray-700 rounded mb-4"></div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="h-16 bg-gray-700 rounded-md"></div>
        <div className="h-16 bg-gray-700 rounded-md"></div>
      </div>
      <div className="h-4 w-full bg-gray-700 rounded mb-4"></div>
      <div className="h-10 w-full bg-gray-700 rounded-md mt-4"></div>
    </div>
  </div>
);

const AuctionSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interestedCity: "",
    maxBudget: "",
  });
  const [searchFilters, setSearchFilters] = useState({
    state: "",
    city: "",
    propertyType: "",
    maxBudget: "",
  });
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "property_for_auction"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(data);
        setFilteredListings(data);
      } catch (err) {
        console.error("Error loading listings:", err);
        toast.error("Failed to load auction listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    const { state, city, propertyType, maxBudget } = searchFilters;
    const filtered = listings.filter((listing) => {
      const matchesState = state
        ? listing.locationDetails?.state === state
        : true;
      const matchesCity = city ? listing.locationDetails?.city === city : true;
      const matchesType = propertyType
        ? listing.basicDetails?.propertyType === propertyType
        : true;
      const matchesBudget = maxBudget
        ? parseFloat(listing.auctionDetails?.reservePrice || 0) <=
          parseFloat(maxBudget)
        : true;
      return matchesState && matchesCity && matchesType && matchesBudget;
    });
    setFilteredListings(filtered);
  }, [searchFilters, listings]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" && { city: "" }), // Reset city when state changes
    }));
  };

  const handleFormChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registered for Auction Support:", formData);
    toast.success("You are registered! Our team will contact you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      interestedCity: "",
      maxBudget: "",
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    if (isNaN(amount)) return "₹ 0";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isLive = (start, end) => {
    if (!start || !end) return false;
    const now = new Date();
    return now >= new Date(start) && now <= new Date(end);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-8 px-4 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 mb-4">
          Property Auction Support & Listings
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
          Discover, vet, and bid on property auctions across India with our
          end-to-end expert assistance.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* --- NEW SECTION: How It Works --- */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-4">
            Your Path to a Successful Bid
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            We simplify the complex auction process into four clear steps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <FaSearch size={30} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                1. Discover & Filter
              </h3>
              <p className="text-base text-gray-400 mt-2">
                Browse our verified listings and find properties that match your
                exact criteria.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <FiCheckSquare size={30} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                2. Due Diligence
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We assist with legal checks, title verification, and property
                inspections.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <FaGavel size={30} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                3. Bidding Strategy
              </h3>
              <p className="text-base text-gray-400 mt-2">
                Our experts help you form a winning strategy and can even
                represent you at the auction.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <FiAward size={30} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                4. Post-Auction
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We guide you through the final payment, paperwork, and property
                transfer process.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section - Polished UI */}
        <section className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 mb-5 flex items-center">
            <FaSearch className="mr-3" /> Find Your Next Investment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                State
              </label>
              <div className="relative">
                <select
                  name="state"
                  value={searchFilters.state}
                  onChange={handleFilterChange}
                  className="w-full pl-4 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">All States</option>
                  {Object.keys(statesWithCities).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                City
              </label>
              <div className="relative">
                <select
                  name="city"
                  value={searchFilters.city}
                  onChange={handleFilterChange}
                  disabled={!searchFilters.state}
                  className="w-full pl-4 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">All Cities</option>
                  {statesWithCities[searchFilters.state]?.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Property Type
              </label>
              <div className="relative">
                <select
                  name="propertyType"
                  value={searchFilters.propertyType}
                  onChange={handleFilterChange}
                  className="w-full pl-4 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">All Types</option>
                  {propertyTypes.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            {/* Max Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Max Budget (₹)
              </label>
              <div className="relative">
                <FaRupeeSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="maxBudget"
                  placeholder="50,00,000"
                  value={searchFilters.maxBudget}
                  onChange={handleFilterChange}
                  className="w-full pl-8 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Listings Section - With Skeleton Loading and Better Cards */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-orange-400 mb-8">
            🏠 Available for Auction
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.map((listing) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700 hover:border-orange-500/50 transition-all duration-300 flex flex-col"
                >
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={
                        listing.mediaUploads?.propertyImages?.[0] ||
                        "https://via.placeholder.com/400x300/111827/FF9800?text=Property+Image"
                      }
                      alt={listing.basicDetails?.listingTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      {isLive(
                        listing.auctionDetails?.auctionStartDate,
                        listing.auctionDetails?.auctionEndDate
                      ) && (
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                          ● LIVE
                        </span>
                      )}
                      <span className="bg-gray-900/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                        {listing.basicDetails?.propertyType || "Property"}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-orange-400 mb-2 truncate">
                      {listing.basicDetails?.listingTitle || "Auction Property"}
                    </h3>
                    <p className="flex items-start text-gray-400 mb-4 text-sm">
                      <FaMapMarkerAlt className="mr-2 text-orange-500 mt-0.5 shrink-0" />
                      <span>
                        {listing.locationDetails?.locality},{" "}
                        {listing.locationDetails?.city}
                      </span>
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div className="bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-xs text-gray-400">Reserve Price</p>
                        <p className="text-lg font-bold text-orange-400 truncate">
                          {formatCurrency(listing.auctionDetails?.reservePrice)}
                        </p>
                      </div>
                      <div className="bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-xs text-gray-400">Starting Bid</p>
                        <p className="text-lg font-bold text-orange-400 truncate">
                          {formatCurrency(
                            listing.auctionDetails?.startingBidPrice
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-700 pt-3">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-orange-500" />
                        <span>
                          Start:{" "}
                          {formatDate(listing.auctionDetails?.auctionStartDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-orange-500" />
                        <span>
                          End:{" "}
                          {formatDate(listing.auctionDetails?.auctionEndDate)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-auto pt-5">
                      <button
                        onClick={() =>
                          navigate(
                            `/services/buysale/AuctionSupport/${listing.id}`
                          )
                        }
                        className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 p-12 rounded-2xl text-center border border-dashed border-gray-700">
              <FiHelpCircle className="mx-auto text-5xl text-orange-500 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                No Properties Found
              </h3>
              <p className="text-gray-400 mb-6">
                There are no auction listings that match your current filters.
                Try broadening your search.
              </p>
              <button
                onClick={() =>
                  setSearchFilters({
                    state: "",
                    city: "",
                    propertyType: "",
                    maxBudget: "",
                  })
                }
                className="text-orange-400 hover:text-orange-300 font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Registration Form Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Ready to Bid with Confidence?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Register with us for free. Our auction experts will contact you to
            discuss your investment goals and guide you through every step of
            the process.
          </p>
          <form
            className="text-left grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  placeholder="Your full name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email *
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone *
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  placeholder="Your 10-digit mobile number"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Interested City
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="interestedCity"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  value={formData.interestedCity}
                  onChange={handleFormChange}
                  placeholder="e.g. Hyderabad"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Max Budget (₹)
              </label>
              <div className="relative">
                <FaRupeeSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="maxBudget"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  value={formData.maxBudget}
                  onChange={handleFormChange}
                  placeholder="e.g. 7500000 for 75 Lakhs"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Register for Free Support
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuctionSupport;
