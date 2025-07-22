import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase/firebaseConfig";

function PgHostel() {
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'PGAndHostels'));
                const listingsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setListings(listingsData);
                setFilteredListings(listingsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching listings:', error);
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    useEffect(() => {
        const results = listings.filter(listing =>
            listing.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            listing.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
            listing.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredListings(results);
    }, [searchTerm, listings]);

    const handleViewDetails = (id) => {
        navigate(`/pg-hostel-details/${id}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-orange-400 text-xl font-semibold animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-orange-400 mb-8 tracking-tight">PG & Hostel Listings</h1>

                {/* Search Bar */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search by property name, locality, or city..."
                        className="w-full p-4 rounded-xl bg-gray-800 border border Tyson border-orange-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Listings Grid */}
                {filteredListings.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 text-lg">
                        No listings found matching your search.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredListings.map((listing) => (
                            <div
                                key={listing.id}
                                className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {/* Property Image */}
                                {listing.imageUrls && listing.imageUrls.length > 0 && (
                                    <div className="h-56 overflow-hidden">
                                        <img
                                            src={listing.imageUrls[0]}
                                            alt={listing.propertyName}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>
                                )}

                                {/* Property Details */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h2 className="text-2xl font-bold text-white tracking-tight">
                                            {listing.propertyName}
                                        </h2>
                                        <span className="bg-orange-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                                            {listing.propertyType}
                                        </span>
                                    </div>

                                    <div className="flex items-center text-gray-300 mb-3">
                                        <svg className="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{listing.locality}, {listing.city}, {listing.state}</span>
                                    </div>

                                    <div className="flex items-center text-gray-300 mb-4">
                                        <svg className="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Available for: {listing.availableFor}</span>
                                    </div>

                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <span className="text-xl font-bold text-orange-400">₹{listing.monthlyRent}</span>
                                            <span className="text-gray-400 text-sm"> / month</span>
                                        </div>
                                        <span className="text-sm text-gray-300">
                                            {listing.roomType} Room
                                        </span>
                                    </div>

                                    {/* Amenities */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {listing.wifi === "Yes" && (
                                            <span className="bg-gray-800 text-gray-200 text-xs font-medium px-3 py-1.5 rounded-full">
                                                WiFi
                                            </span>
                                        )}
                                        {listing.foodIncluded === "Yes" && (
                                            <span className="bg-gray-800 text-gray-200 text-xs font-medium px-3 py-1.5 rounded-full">
                                                Food Included
                                            </span>
                                        )}
                                        {listing.parking && (
                                            <span className="bg-gray-800 text-gray-200 text-xs font-medium px-3 py-1.5 rounded-full">
                                                {listing.parking}
                                            </span>
                                        )}
                                        {listing.attachedBathroom === "Yes" && (
                                            <span className="bg-gray-800 text-gray-200 text-xs font-medium px-3 py-1.5 rounded-full">
                                                Attached Bathroom
                                            </span>
                                        )}
                                    </div>

                                    {/* View Details Button */}
                                    <button
                                        onClick={() => handleViewDetails(listing.id)}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PgHostel;