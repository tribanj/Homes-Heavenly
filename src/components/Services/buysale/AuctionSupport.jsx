import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { db } from "../../../firebase/firebaseConfig";
import { collection, getDocs } from 'firebase/firestore';

const statesWithCities = {
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
  Karnataka: ['Bengaluru', 'Mysore'],
  Delhi: ['New Delhi', 'Dwarka'],
  Gujarat: ['Ahmedabad', 'Surat'],
  'Uttar Pradesh': ['Lucknow', 'Noida'],
};

const propertyTypes = [
  'Flat',
  'Independent House',
  'Commercial Shop',
  'Plot',
  'Warehouse',
  'Office Space',
  'Industrial Land',
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

  // Fetch listings from Firebase
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'auctionListings'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListings(data);
        setFilteredListings(data);
      } catch (err) {
        console.error('Error loading listings:', err);
      }
    };

    fetchListings();
  }, []);

  // Filter listings when filters change
  useEffect(() => {
    const { state, city, propertyType, maxBudget } = searchFilters;
    const filtered = listings.filter(listing => {
      const matchesState = state ? listing.state === state : true;
      const matchesCity = city ? listing.city === city : true;
      const matchesType = propertyType ? listing.propertyType === propertyType : true;
      const matchesBudget = maxBudget ? parseFloat(listing.reservePrice) <= parseFloat(maxBudget) : true;
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
    console.log("Auction Registration Submitted:", formData);
    toast.success("You are registered for auction support!");
    setFormData({
      name: '',
      email: '',
      phone: '',
      interestedCity: '',
      maxBudget: '',
    });
  };

  return (
    <div className="container mt-5 mb-5">
      <h2>🏦 Auction Support & Listings</h2>
      <p className="text-muted">Discover and participate in property auctions across India with our end-to-end support.</p>

      {/* 🔍 Search Filters */}
      <div className="mt-4">
        <h5>🔍 Filter Auction Listings</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">State</label>
            <select className="form-select" name="state" value={searchFilters.state} onChange={handleFilterChange}>
              <option value="">All States</option>
              {Object.keys(statesWithCities).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">City</label>
            <select className="form-select" name="city" value={searchFilters.city} onChange={handleFilterChange} disabled={!searchFilters.state}>
              <option value="">All Cities</option>
              {searchFilters.state &&
                statesWithCities[searchFilters.state].map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Property Type</label>
            <select className="form-select" name="propertyType" value={searchFilters.propertyType} onChange={handleFilterChange}>
              <option value="">All Types</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Max Budget (₹)</label>
            <input
              type="number"
              className="form-control"
              name="maxBudget"
              value={searchFilters.maxBudget}
              onChange={handleFilterChange}
              placeholder="e.g. 5000000"
            />
          </div>
        </div>
      </div>

      {/* 🏠 Listings */}
      <div className="mt-4">
        <h5>🏠 Auction Listings</h5>
        {filteredListings.length > 0 ? (
          <div className="row">
            {filteredListings.map(listing => (
              <div className="col-md-4 mb-4" key={listing.id}>
                <div className="card shadow-sm">
                  <img
                    src={listing.images?.[0] || 'https://via.placeholder.com/300x180?text=Auction+Image'}
                    className="card-img-top"
                    alt={listing.title}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{listing.title}</h5>
                    <p className="card-text">
                      📍 {listing.city}, {listing.state}<br />
                      💰 Reserve Price: ₹{listing.reservePrice}<br />
                      🕒 {listing.auctionStartDate} to {listing.auctionEndDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No listings found for selected criteria.</p>
        )}
      </div>

      {/* 📩 Registration Form */}
      <div className="mt-5">
        <h5>📩 Register for Auction Support</h5>
        <form className="row g-3 mt-2" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleFormChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleFormChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleFormChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Interested City</label>
            <input type="text" name="interestedCity" className="form-control" value={formData.interestedCity} onChange={handleFormChange} />
          </div>
          <div className="col-12">
            <label className="form-label">Max Budget (₹)</label>
            <input type="number" name="maxBudget" className="form-control" value={formData.maxBudget} onChange={handleFormChange} />
          </div>
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-warning">🎟️ Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuctionSupport;
