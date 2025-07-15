import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { db } from "../../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FaSearch, FaMapMarkerAlt, FaRupeeSign, FaCalendarAlt, FaPhone, FaEnvelope, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const statesWithCities = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
  'Karnataka': ['Bengaluru', 'Mysore'],
  'Delhi': ['New Delhi', 'Dwarka'],
  'Gujarat': ['Ahmedabad', 'Surat'],
  'Uttar Pradesh': ['Lucknow', 'Noida'],
};

const propertyTypes = [
  'Apartment',
  'Villa',
  'Plot',
  'Commercial',
  'Penthouse',
  'Farm House'
];

const AuctionSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedCity: '',
    maxBudget: '',
  });

  const [searchFilters, setSearchFilters] = useState({
    state: '',
    city: '',
    propertyType: '',
    maxBudget: '',
  });

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  // Fetch auction listings from Firebase
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(collection(db, 'property_for_auction'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          auctionStartDate: doc.data().auctionDetails?.auctionStartDate || '',
          auctionEndDate: doc.data().auctionDetails?.auctionEndDate || '',
          reservePrice: doc.data().auctionDetails?.reservePrice || 0,
          startingBidPrice: doc.data().auctionDetails?.startingBidPrice || 0
        }));

        setListings(data);
        setFilteredListings(data);
      } catch (err) {
        console.error('Error loading listings:', err);
        toast.error('Failed to load auction listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Filter listings when filters change
  useEffect(() => {
    const { state, city, propertyType, maxBudget } = searchFilters;
    const filtered = listings.filter(listing => {
      const matchesState = state ? listing.locationDetails?.state === state : true;
      const matchesCity = city ? listing.locationDetails?.city === city : true;
      const matchesType = propertyType ? listing.basicDetails?.propertyType === propertyType : true;
      const matchesBudget = maxBudget ? parseFloat(listing.auctionDetails?.reservePrice || 0) <= parseFloat(maxBudget) : true;
      return matchesState && matchesCity && matchesType && matchesBudget;
    });
    setFilteredListings(filtered);
  }, [searchFilters, listings]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { city: '' } : {}) // Reset city when state changes
    }));
  };

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("You are registered for auction support! Our team will contact you soon.");
    setFormData({
      name: '',
      email: '',
      phone: '',
      interestedCity: '',
      maxBudget: '',
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount).replace('₹', '₹ ');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-500 mb-3">🏦 Auction Support & Listings</h1>
          <p className="text-gray-400 text-lg">
            Discover and participate in property auctions across India with our end-to-end support
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center">
            <FaSearch className="mr-2" /> Filter Auction Listings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">State</label>
              <select
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                name="state"
                value={searchFilters.state}
                onChange={handleFilterChange}
              >
                <option value="">All States</option>
                {Object.keys(statesWithCities).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">City</label>
              <select
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                name="city"
                value={searchFilters.city}
                onChange={handleFilterChange}
                disabled={!searchFilters.state}
              >
                <option value="">All Cities</option>
                {searchFilters.state &&
                  statesWithCities[searchFilters.state].map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Property Type</label>
              <select
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                name="propertyType"
                value={searchFilters.propertyType}
                onChange={handleFilterChange}
              >
                <option value="">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Max Budget (₹)</label>
              <input
                type="number"
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                name="maxBudget"
                value={searchFilters.maxBudget}
                onChange={handleFilterChange}
                placeholder="e.g. 5000000"
              />
            </div>
          </div>
        </div>

        {/* Auction Listings */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">🏠 Available Auction Properties</h2>

          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
              <p className="mt-2 text-gray-400">Loading auction listings...</p>
            </div>
          ) : filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map(listing => (
                <div key={listing.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={listing.mediaUploads?.propertyImages?.[0] || 'https://via.placeholder.com/400x300?text=Property+Image'}
                      alt={listing.basicDetails?.listingTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-orange-400 mb-2">
                      {listing.basicDetails?.listingTitle || 'Auction Property'}
                    </h3>

                    <div className="flex items-center text-gray-400 mb-3">
                      <FaMapMarkerAlt className="mr-2 text-orange-400" />
                      <span>
                        {listing.locationDetails?.locality}, {listing.locationDetails?.city}, {listing.locationDetails?.state}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <p className="text-sm text-gray-400">Reserve Price</p>
                        <p className="text-lg font-bold text-orange-400">
                          <FaRupeeSign className="inline mr-1" />
                          {formatCurrency(listing.reservePrice)}
                        </p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <p className="text-sm text-gray-400">Starting Bid</p>
                        <p className="text-lg font-bold text-orange-400">
                          <FaRupeeSign className="inline mr-1" />
                          {formatCurrency(listing.startingBidPrice)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-gray-400 text-sm">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-orange-400" />
                        <span>{formatDate(listing.auctionStartDate)}</span>
                      </div>
                      <span>to</span>
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-orange-400" />
                        <span>{formatDate(listing.auctionEndDate)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/services/buysale/AuctionSupport/${listing.id}`)}
                      className="w-full mt-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                    >
                      View Details
                    </button>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 p-8 rounded-xl text-center">
              <p className="text-gray-400 text-lg">No auction listings found matching your criteria</p>
              <button
                onClick={() => setSearchFilters({
                  state: '',
                  city: '',
                  propertyType: '',
                  maxBudget: ''
                })}
                className="mt-4 text-orange-400 hover:text-orange-300"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Registration Form */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">📩 Register for Auction Support</h2>
          <p className="text-gray-400 mb-6">
            Our auction experts will guide you through the entire process - from bidding to property transfer
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-300 mb-2">
                <FaUser className="inline mr-2 text-orange-400" /> Full Name *
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                <FaEnvelope className="inline mr-2 text-orange-400" /> Email *
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                <FaPhone className="inline mr-2 text-orange-400" /> Phone *
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.phone}
                onChange={handleFormChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                <FaMapMarkerAlt className="inline mr-2 text-orange-400" /> Interested City
              </label>
              <input
                type="text"
                name="interestedCity"
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.interestedCity}
                onChange={handleFormChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-2">
                <FaRupeeSign className="inline mr-2 text-orange-400" /> Max Budget (₹)
              </label>
              <input
                type="number"
                name="maxBudget"
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.maxBudget}
                onChange={handleFormChange}
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors"
              >
                🎟️ Register for Auction Support
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuctionSupport;