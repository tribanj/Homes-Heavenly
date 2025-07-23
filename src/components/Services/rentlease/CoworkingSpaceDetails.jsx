import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { FaBuilding, FaWifi, FaParking, FaSnowflake, FaShieldAlt, FaMapMarkerAlt, FaRulerCombined, FaMoneyBillWave, FaCalendarAlt, FaArrowLeft, FaPhone, FaEnvelope, FaFilePdf, FaYoutube } from 'react-icons/fa';

const CoworkingSpaceDetails = () => {
    const { id } = useParams();
    const [space, setSpace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpaceDetails = async () => {
            try {
                const docRef = doc(db, 'coworkingLeaseProperties', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setSpace({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError('No such coworking space found!');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching space details:', error);
                setError('Failed to load space details.');
                setLoading(false);
            }
        };

        fetchSpaceDetails();
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
        <div className="min-h-screen bg-gray-950 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center text-orange-400 hover:text-orange-500 transition-colors duration-300"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Listings
                </button>

                {/* Main Content */}
                <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-orange-500/20">
                    {/* Hero Section */}
                    <div className="relative">
                        {space.imageUrls && space.imageUrls.length > 0 && (
                            <div className="h-96 overflow-hidden">
                                <img
                                    src={space.imageUrls[0]}
                                    alt={space.propertyTitle}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-8">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-white mb-2">{space.propertyTitle}</h1>
                                    <div className="flex items-center text-orange-300">
                                        <FaMapMarkerAlt className="mr-2" />
                                        <span className="text-lg">{space.locality}, {space.city} - {space.pinCode}</span>
                                    </div>
                                </div>
                                <div className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg">
                                    <div className="text-2xl font-bold">₹{space.monthlyRent}</div>
                                    <div className="text-sm">per month</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                        {/* Left Column - Main Details */}
                        <div className="lg:col-span-2">
                            {/* Property Highlights */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500/30 pb-2">Space Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Space Type</div>
                                        <div className="text-white">{space.spaceType}</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Furnished Status</div>
                                        <div className="text-white">{space.furnishedStatus}</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Carpet Area</div>
                                        <div className="text-white">{space.carpetArea} sq.ft</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Total Area</div>
                                        <div className="text-white">{space.totalArea} sq.ft</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Floor</div>
                                        <div className="text-white">{space.propertyFloor}/{space.totalFloors}</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Facing</div>
                                        <div className="text-white">{space.facing}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500/30 pb-2">Amenities</h2>
                                <div className="flex flex-wrap gap-3">
                                    {space.airConditioning && (
                                        <span className="bg-gray-800 text-gray-200 text-sm font-medium px-4 py-2 rounded-full flex items-center">
                                            <FaSnowflake className="mr-2" /> Air Conditioning
                                        </span>
                                    )}
                                    {space.powerBackup && (
                                        <span className="bg-gray-800 text-gray-200 text-sm font-medium px-4 py-2 rounded-full flex items-center">
                                            <FaShieldAlt className="mr-2" /> Power Backup
                                        </span>
                                    )}
                                    <span className="bg-gray-800 text-gray-200 text-sm font-medium px-4 py-2 rounded-full flex items-center">
                                        <FaParking className="mr-2" /> {space.parkingSpaces} Parking Spaces
                                    </span>
                                    <span className="bg-gray-800 text-gray-200 text-sm font-medium px-4 py-2 rounded-full flex items-center">
                                        <FaWifi className="mr-2" /> High-Speed WiFi
                                    </span>
                                    <span className="bg-gray-800 text-gray-200 text-sm font-medium px-4 py-2 rounded-full flex items-center">
                                        <FaBuilding className="mr-2" /> {space.washrooms} Washrooms
                                    </span>
                                </div>
                            </div>

                            {/* Additional Images */}
                            {space.imageUrls && space.imageUrls.length > 1 && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500/30 pb-2">
                                        Gallery
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {space.imageUrls.slice(1).map((url, index) => (
                                            <img
                                                key={url}
                                                src={url}
                                                alt={`Gallery image ${index + 2} for ${space.propertyTitle}`}
                                                className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                                onClick={() => window.open(url, '_blank')}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}


                            {/* Terms & Conditions */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500/30 pb-2">Lease Terms</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Lease Duration</div>
                                        <div className="text-white">{space.leaseDuration}</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Lock-in Period</div>
                                        <div className="text-white">{space.lockInPeriod}</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Security Deposit</div>
                                        <div className="text-white">₹{space.securityDeposit}</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Maintenance Charges</div>
                                        <div className="text-white">₹{space.maintenanceCharges}/month</div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500/30 pb-2">Additional Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Property Age</div>
                                        <div className="text-white">{space.ageOfProperty}</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Interior Condition</div>
                                        <div className="text-white">{space.interiorCondition}</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">Fire Safety</div>
                                        <div className="text-white">{space.fireSafety}</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-orange-400 font-semibold">RERA Number</div>
                                        <div className="text-white">{space.reraNumber}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Special Notes */}
                            {space.specialNotes && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500/30 pb-2">Special Notes</h2>
                                    <p className="text-gray-300">{space.specialNotes}</p>
                                </div>
                            )}

                            {/* Documents */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500/30 pb-2">Documents</h2>
                                <div className="space-y-4">
                                    {space.floorPlanUrl && (
                                        <a
                                            href={space.floorPlanUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-orange-400 hover:text-orange-300"
                                        >
                                            <FaFilePdf className="mr-2" /> Floor Plan
                                        </a>
                                    )}
                                    {space.videoTourLink && (
                                        <a
                                            href={space.videoTourLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-orange-400 hover:text-orange-300"
                                        >
                                            <FaYoutube className="mr-2" /> Video Tour
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Contact & Quick Info */}
                        <div className="space-y-6">
                            {/* Contact Card */}
                            <div className="bg-gray-800 rounded-lg p-6 border border-orange-500/20">
                                <h3 className="text-xl font-bold text-orange-400 mb-4">Contact Owner</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-gray-400 text-sm">Contact Person</div>
                                        <div className="text-white font-medium">{space.contactName}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm">Phone Number</div>
                                        <div className="text-white font-medium">{space.contactNumber}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm">Email</div>
                                        <div className="text-white font-medium">{space.email}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => window.location.href = `tel:${space.contactNumber}`}
                                    className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                                >
                                    <FaPhone className="mr-2" /> Call Now
                                </button>
                                <button
                                    onClick={() => window.location.href = `mailto:${space.email}`}
                                    className="w-full mt-3 bg-transparent border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                                >
                                    <FaEnvelope className="mr-2" /> Email
                                </button>
                            </div>

                            {/* Quick Facts */}
                            <div className="bg-gray-800 rounded-lg p-6 border border-orange-500/20">
                                <h3 className="text-xl font-bold text-orange-400 mb-4">Quick Facts</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Available From:</span>
                                        <span className="text-white">{space.availableFrom}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Property Type:</span>
                                        <span className="text-white">{space.propertyType}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Ownership:</span>
                                        <span className="text-white">{space.propertyOwnership}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Furniture Details:</span>
                                        <span className="text-white">{space.furnitureDetails || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoworkingSpaceDetails;