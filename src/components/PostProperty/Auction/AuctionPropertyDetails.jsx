import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import {
    FaMapMarkerAlt, FaRupeeSign, FaBed, FaBath, FaRulerCombined,
    FaCalendarAlt, FaPhone, FaEnvelope, FaShare, FaHeart, FaRegHeart, FaUser
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';

const AuctionPropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    // Fetch property details
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const docRef = doc(db, 'property_for_auction', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProperty({
                        id: docSnap.id,
                        ...data,
                        // Flatten nested objects for easier access
                        ...data.basicDetails,
                        ...data.propertyDetails,
                        ...data.auctionDetails,
                        ...data.locationDetails,
                        ...data.ownerInfo,
                        ...data.mediaUploads,
                        ...data.legalDetails
                    });
                } else {
                    navigate('/auctions');
                    toast.error('Property not found');
                }
            } catch (error) {
                console.error('Error fetching property:', error);
                toast.error('Failed to load property details');
                navigate('/auctions');
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id, navigate]);

    // Check if property is saved
    useEffect(() => {
        if (user && property) {
            const checkSavedStatus = async () => {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setSaved(userDoc.data().savedProperties?.includes(property.id) || false);
                }
            };
            checkSavedStatus();
        }
    }, [user, property]);

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount).replace('₹', '₹ ');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    <p className="mt-4 text-orange-400">Loading property details...</p>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-xl">Property not found</p>
                    <button
                        onClick={() => navigate('/auctions')}
                        className="mt-4 text-orange-400 hover:text-orange-300"
                    >
                        Back to Auctions
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Property Header */}
            <div className="relative">
                {/* Main Image */}
                <div className="h-96 w-full overflow-hidden">
                    <img
                        src={property.propertyImages?.[activeImage] || '/images/placeholder.jpg'}
                        alt={property.listingTitle}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-orange-500 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>

                {/* Save Button */}
                <button
                    className="absolute top-4 right-4 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-orange-500 transition-colors"
                    onClick={() => {
                        if (!user) {
                            navigate('/login');
                            return;
                        }
                        setSaved(!saved);
                        // Here you would update Firestore with the saved status
                    }}
                >
                    {saved ? (
                        <FaHeart className="text-orange-500 text-xl" />
                    ) : (
                        <FaRegHeart className="text-white text-xl" />
                    )}
                </button>
            </div>

            {/* Thumbnail Images */}
            {property.propertyImages?.length > 1 && (
                <div className="flex overflow-x-auto py-4 px-4 space-x-2 bg-gray-800">
                    {property.propertyImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden ${activeImage === index ? 'ring-2 ring-orange-500' : ''}`}
                        >
                            <img
                                src={img}
                                alt={`Property ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Property Title and Basic Info */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">{property.listingTitle}</h1>

                    <div className="flex items-center text-orange-300 mb-4">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{property.locality}, {property.city}, {property.state} - {property.pinCode}</span>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="bg-gray-800 p-3 rounded-lg flex-1 min-w-[200px]">
                            <p className="text-gray-400 text-sm">Reserve Price</p>
                            <p className="text-2xl font-bold text-orange-400">
                                <FaRupeeSign className="inline mr-1" />
                                {formatCurrency(property.reservePrice)}
                            </p>
                        </div>

                        <div className="bg-gray-800 p-3 rounded-lg flex-1 min-w-[200px]">
                            <p className="text-gray-400 text-sm">Starting Bid</p>
                            <p className="text-2xl font-bold text-orange-400">
                                <FaRupeeSign className="inline mr-1" />
                                {formatCurrency(property.startingBidPrice)}
                            </p>
                        </div>

                        <div className="bg-gray-800 p-3 rounded-lg flex-1 min-w-[200px]">
                            <p className="text-gray-400 text-sm">Bid Increment</p>
                            <p className="text-2xl font-bold text-orange-400">
                                <FaRupeeSign className="inline mr-1" />
                                {formatCurrency(property.bidIncrement)}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h2 className="text-xl font-bold text-orange-400 mb-2">Auction Timeline</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-400">Auction Starts</p>
                                <p className="text-white flex items-center">
                                    <FaCalendarAlt className="mr-2 text-orange-400" />
                                    {formatDate(property.auctionStartDate)}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400">Auction Ends</p>
                                <p className="text-white flex items-center">
                                    <FaCalendarAlt className="mr-2 text-orange-400" />
                                    {formatDate(property.auctionEndDate)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Property Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Left Column - Property Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-gray-800 p-6 rounded-xl">
                            <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500 pb-2">Property Description</h2>
                            <p className="text-gray-300">{property.description || 'No description provided.'}</p>
                        </div>

                        {/* Key Features */}
                        <div className="bg-gray-800 p-6 rounded-xl">
                            <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500 pb-2">Key Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <FaBed className="text-orange-400 mr-3 text-xl" />
                                    <div>
                                        <p className="text-gray-400">Bedrooms</p>
                                        <p className="text-white font-medium">{property.bedrooms || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaBath className="text-orange-400 mr-3 text-xl" />
                                    <div>
                                        <p className="text-gray-400">Bathrooms</p>
                                        <p className="text-white font-medium">{property.bathrooms || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaRulerCombined className="text-orange-400 mr-3 text-xl" />
                                    <div>
                                        <p className="text-gray-400">Built-up Area</p>
                                        <p className="text-white font-medium">
                                            {property.builtUpArea ? `${property.builtUpArea} sq.ft` : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaRulerCombined className="text-orange-400 mr-3 text-xl" />
                                    <div>
                                        <p className="text-gray-400">Carpet Area</p>
                                        <p className="text-white font-medium">
                                            {property.carpetArea ? `${property.carpetArea} sq.ft` : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-5 h-5 rounded-full bg-orange-400 mr-3"></div>
                                    <div>
                                        <p className="text-gray-400">Property Type</p>
                                        <p className="text-white font-medium">{property.propertyType || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-5 h-5 rounded-full bg-orange-400 mr-3"></div>
                                    <div>
                                        <p className="text-gray-400">Furnishing</p>
                                        <p className="text-white font-medium">{property.furnishingStatus || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        {property.amenities?.length > 0 && (
                            <div className="bg-gray-800 p-6 rounded-xl">
                                <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500 pb-2">Amenities</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {property.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center">
                                            <div className="w-2 h-2 rounded-full bg-orange-400 mr-2"></div>
                                            <span className="text-gray-300">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Video Tour */}
                        {property.videoTourLink && (
                            <div className="bg-gray-800 p-6 rounded-xl">
                                <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500 pb-2">Virtual Tour</h2>
                                <div className="aspect-w-16 aspect-h-9">
                                    <iframe
                                        src={property.videoTourLink.replace('watch?v=', 'embed/')}
                                        className="w-full h-96 rounded-lg"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Property video tour"
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Owner Contact and Documents */}
                    <div className="space-y-6">
                        {/* Owner Contact */}
                        <div className="bg-gray-800 p-6 rounded-xl sticky top-4">
                            <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500 pb-2">Contact Owner</h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-400">Name</p>
                                    <p className="text-white font-medium flex items-center">
                                        <FaUser className="mr-2 text-orange-400" />
                                        {property.fullName || 'N/A'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-400">Phone</p>
                                    <p className="text-white font-medium flex items-center">
                                        <FaPhone className="mr-2 text-orange-400" />
                                        {property.contactNumber || 'N/A'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-400">Email</p>
                                    <p className="text-white font-medium flex items-center">
                                        <FaEnvelope className="mr-2 text-orange-400" />
                                        {property.email || 'N/A'}
                                    </p>
                                </div>

                                <button className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors mt-4">
                                    Request More Information
                                </button>
                            </div>
                        </div>

                        {/* Legal Documents */}
                        <div className="bg-gray-800 p-6 rounded-xl">
                            <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500 pb-2">Legal Documents</h2>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-gray-400">Ownership Type</p>
                                    <p className="text-white font-medium">{property.ownershipType || 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400">Legal Status</p>
                                    <p className="text-white font-medium">{property.legalDisputes || 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400">Encumbrance Certificate</p>
                                    <p className="text-white font-medium">{property.encumbranceCertificate || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Documents List */}
                            {property.documents?.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-orange-400 mb-3">Available Documents</h3>
                                    <div className="space-y-2">
                                        {property.documents.map((doc, index) => (
                                            <a
                                                key={index}
                                                href={doc}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-blue-400 hover:text-blue-300"
                                            >
                                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                </svg>
                                                Document {index + 1} (PDF)
                                            </a>
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
};

export default AuctionPropertyDetails;