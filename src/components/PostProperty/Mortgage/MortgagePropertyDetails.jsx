import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebaseConfig'; // Adjust path as per your project structure
import { collection, getDocs } from 'firebase/firestore';
import { FiHome, FiMapPin, FiDollarSign, FiFileText } from 'react-icons/fi';

const MortgagePropertyDetails = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const listingsCollection = collection(db, 'mortgageListings');
                const listingsSnapshot = await getDocs(listingsCollection);
                const listingsData = listingsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setListings(listingsData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching listings:', err);
                setError('Failed to load listings. Please try again later.');
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-orange-500 text-xl animate-pulse">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-full mx-auto">
                <h1 className="text-3xl font-bold text-orange-500 text-center mb-8">
                    Mortgage Property Listings
                </h1>
                {listings.length === 0 ? (
                    <p className="text-gray-400 text-center text-lg">
                        No properties listed yet.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listings.map(listing => (
                            <div
                                key={listing.id}
                                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                            >
                                {/* Property Images */}
                                <div className="relative">
                                    {listing.imageUrls && listing.imageUrls.length > 0 ? (
                                        <img
                                            src={listing.imageUrls[0]}
                                            alt={listing.propertyTitle}
                                            className="w-full h-48 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                                            <FiHome className="text-orange-500 text-4xl" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                        {listing.mortgageType || 'N/A'}
                                    </div>
                                </div>

                                {/* Property Details */}
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-orange-400 mb-2">
                                        {listing.propertyTitle || 'Untitled Property'}
                                    </h2>
                                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                        {listing.propertyDescription || 'No description available.'}
                                    </p>

                                    <div className="space-y-2">
                                        <div className="flex items-center text-gray-200">
                                            <FiHome className="text-orange-500 mr-2" />
                                            <span>
                                                {listing.propertyType} | {listing.builtUpArea || 'N/A'} sq ft
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-200">
                                            <FiMapPin className="text-orange-500 mr-2" />
                                            <span>
                                                {listing.locality}, {listing.city}, {listing.state}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-200">
                                            <FiDollarSign className="text-orange-500 mr-2" />
                                            <span>Loan: ₹{listing.loanAmount || 'N/A'}</span>
                                        </div>
                                    </div>

                                    {/* Mortgage Details */}
                                    {/* <div className="mt-4 pt-4 border-t border-gray-700">
                                        <p className="text-gray-400 text-sm">
                                            <span className="font-medium text-orange-300">Tenure:</span>{' '}
                                            {listing.loanTenure || 'N/A'} years
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            <span className="font-medium text-orange-300">Interest Rate:</span>{' '}
                                            {listing.interestRate || 'N/A'}%
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            <span className="font-medium text-orange-300">Purpose:</span>{' '}
                                            {listing.loanPurpose || 'N/A'}
                                        </p>
                                    </div> */}

                                    {/* Contact and Documents */}
                                    {/* <div className="mt-4 pt-4 border-t border-gray-700">
                                        <p className="text-gray-400 text-sm">
                                            <span className="font-medium text-orange-300">Contact:</span>{' '}
                                            {listing.name} | {listing.phone}
                                        </p>
                                        {listing.ownershipDocUrls && listing.ownershipDocUrls.length > 0 && (
                                            <div className="flex items-center text-gray-400 text-sm mt-2">
                                                <FiFileText className="text-orange-500 mr-2" />
                                                <span>{listing.ownershipDocUrls.length} Document(s)</span>
                                            </div>
                                        )}
                                    </div> */}

                                    {/* Action Button */}
                                    <div className="mt-6">
                                        <button
                                            onClick={() => alert(`Contact ${listing.name} at ${listing.email}`)}
                                            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200"
                                        >
                                           view Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MortgagePropertyDetails;