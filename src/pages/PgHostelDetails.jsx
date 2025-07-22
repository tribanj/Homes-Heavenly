import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase/firebaseConfig";

function PgHostelDetails() {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const docRef = doc(db, 'PGAndHostels', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setListing({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError('No such listing found!');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching listing:', error);
                setError('Failed to load listing details.');
                setLoading(false);
            }
        };

        fetchListing();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-orange-400 text-xl font-semibold animate-pulse">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-red-400 text-xl font-semibold">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center text-orange-400 hover:text-orange-500 transition-colors duration-300"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Listings
                </button>

                {/* Main Card */}
                <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-orange-500/20">
                    {/* Hero Section */}
                    <div className="relative">
                        {listing.imageUrls && listing.imageUrls.length > 0 && (
                            <div className="h-96 overflow-hidden">
                                <img
                                    src={listing.imageUrls[0]}
                                    alt={listing.propertyName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-8">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h1 className="text-4xl font-extrabold text-white mb-2">{listing.propertyName}</h1>
                                    <div className="flex items-center text-orange-300">
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-lg">{listing.locality}, {listing.city}, {listing.state}</span>
                                    </div>
                                </div>
                                <div className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg">
                                    <div className="text-2xl font-bold">₹{listing.monthlyRent}</div>
                                    <div className="text-sm">per month</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                        {/* Left Column - Details */}
                        <div className="lg:col-span-2">
                            {/* Property Highlights */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500/30 pb-2">Property Highlights</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Room Type</div>
                                        <div className="text-white">{listing.roomType}</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Available For</div>
                                        <div className="text-white">{listing.availableFor}</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Furnishing</div>
                                        <div className="text-white">{listing.furnishing || 'N/A'}</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Security Deposit</div>
                                        <div className="text-white">₹{listing.securityDeposit || 'N/A'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            {listing.description && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500/30 pb-2">Description</h2>
                                    <p className="text-gray-300 leading-relaxed">{listing.description}</p>
                                </div>
                            )}

                            {/* Amenities */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500/30 pb-2">Amenities</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {listing.wifi === "Yes" && (
                                        <div className="flex items-center text-gray-300">
                                            <svg className="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                            </svg>
                                            WiFi
                                        </div>
                                    )}
                                    {listing.foodIncluded === "Yes" && (
                                        <div className="flex items-center text-gray-300">
                                            <svg className="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Food Included
                                        </div>
                                    )}
                                    {listing.parking && (
                                        <div className="flex items-center text-gray-300">
                                            <svg className="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                            </svg>
                                            {listing.parking}
                                        </div>
                                    )}
                                    {listing.attachedBathroom === "Yes" && (
                                        <div className="flex items-center text-gray-300">
                                            <svg className="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                            </svg>
                                            Attached Bathroom
                                        </div>
                                    )}
                                    {listing.powerBackup === "Full" && (
                                        <div className="flex items-center text-gray-300">
                                            <svg className="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Power Backup
                                        </div>
                                    )}
                                    {listing.housekeeping && (
                                        <div className="flex items-center text-gray-300">
                                            <svg className="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            Housekeeping: {listing.housekeeping}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Additional Images */}
                            {listing.imageUrls && listing.imageUrls.length > 1 && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500/30 pb-2">Gallery</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {listing.imageUrls.slice(1).map((url, index) => (
                                            <img
                                                key={index}
                                                src={url}
                                                alt={`${listing.propertyName} ${index + 2}`}
                                                className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                                onClick={() => window.open(url, '_blank')}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Contact and Rules */}
                        <div className="space-y-6">
                            {/* Contact Card */}
                            <div className="bg-gray-800 rounded-lg p-6 border border-orange-500/20">
                                <h3 className="text-xl font-bold text-orange-400 mb-4">Contact Owner</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-gray-400 text-sm">Contact Person</div>
                                        <div className="text-white font-medium">{listing.contactPerson}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm">Phone Number</div>
                                        <div className="text-white font-medium">{listing.contactNumber}</div>
                                    </div>
                                    {listing.email && (
                                        <div>
                                            <div className="text-gray-400 text-sm">Email</div>
                                            <div className="text-white font-medium">{listing.email}</div>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => window.location.href = `tel:${listing.contactNumber}`}
                                    className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                                >
                                    Call Now
                                </button>
                            </div>

                            {/* Rules and Policies */}
                            <div className="bg-gray-800 rounded-lg p-6 border border-orange-500/20">
                                <h3 className="text-xl font-bold text-orange-400 mb-4">Rules & Policies</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-gray-400 text-sm">Minimum Stay</div>
                                        <div className="text-white">{listing.minimumStay || 'N/A'}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm">Gate Timing</div>
                                        <div className="text-white">{listing.gateTiming || 'N/A'}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm">Visitor Policy</div>
                                        <div className="text-white">{listing.visitorEntry === "Yes" ? 'Allowed' : 'Not Allowed'}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm">Smoking Policy</div>
                                        <div className="text-white">{listing.smokingAllowed === "Yes" ? 'Allowed' : 'Not Allowed'}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm">Drinking Policy</div>
                                        <div className="text-white">{listing.drinkingAllowed === "Yes" ? 'Allowed' : 'Not Allowed'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Meals Provided */}
                            {listing.mealsProvided && listing.mealsProvided.length > 0 && (
                                <div className="bg-gray-800 rounded-lg p-6 border border-orange-500/20">
                                    <h3 className="text-xl font-bold text-orange-400 mb-4">Meals Provided</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {listing.mealsProvided.map((meal, index) => (
                                            <span key={index} className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-sm">
                                                {meal}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PgHostelDetails;