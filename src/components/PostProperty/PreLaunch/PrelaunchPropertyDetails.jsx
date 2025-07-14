import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const PrelaunchPropertyDetails = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                if (!projectId) {
                    throw new Error("Invalid property ID");
                }

                // Get the project document directly from the main collection
                const projectRef = doc(db, "prelaunchProjects", projectId);
                const projectSnap = await getDoc(projectRef);

                if (projectSnap.exists()) {
                    setProperty({
                        id: projectId,
                        ...projectSnap.data()
                    });
                } else {
                    toast.error("Project not found");
                    navigate("/prelaunch-properties");
                }
            } catch (error) {
                console.error("Error fetching property:", error);
                toast.error("Failed to load project details");
                navigate("/prelaunch-properties");
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [projectId, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse bg-gray-800 rounded-xl h-96 w-full"></div>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-xl text-gray-400">Property not found</p>
                    <button
                        onClick={() => navigate('/services/buysale/OffPlanDeals')}
                        className="mt-4 text-amber-500 hover:text-amber-400"
                    >
                        Back to Pre-Launch Properties
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-amber-500 hover:text-amber-400 mb-4 z-80"
                    >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Listings
                    </button>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">
                        {property.title}
                    </h1>
                    <p className="text-xl text-amber-500 mb-4">
                        {property.startPrice ? `Starting from ₹${property.startPrice.toLocaleString('en-IN')}` : 'Price on request'}
                    </p>
                    <p className="text-gray-400 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {property.locality}, {property.city}, {property.state}
                    </p>
                </motion.div>

                {/* Image Gallery */}
                {property.imageUrls?.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {property.imageUrls.map((image, index) => (
                                <div key={index} className="h-64 bg-gray-800 rounded-xl overflow-hidden">
                                    <img
                                        src={image}
                                        alt={`${property.title} - ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Property Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {/* Project Overview */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gray-800 rounded-xl p-6 mb-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-100 mb-4 border-b border-amber-500 pb-2 inline-block">
                                Project Overview
                            </h2>
                            <p className="text-gray-300 mb-6">{property.description || 'No description available'}</p>

                            {/* Project Specifications */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-100 mb-3">Project Specifications</h3>
                                    <ul className="space-y-3">
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Project Type</span>
                                            <span className="text-gray-100">{property.type || '-'}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Builder</span>
                                            <span className="text-gray-100">{property.builder || '-'}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">RERA Number</span>
                                            <span className="text-gray-100">{property.rera || '-'}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Status</span>
                                            <span className="text-gray-100">{property.status || '-'}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Launch Date</span>
                                            <span className="text-gray-100">{property.launchDate || '-'}</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-100 mb-3">Construction Details</h3>
                                    <ul className="space-y-3">
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Towers</span>
                                            <span className="text-gray-100">{property.towers || '-'}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Floors</span>
                                            <span className="text-gray-100">{property.floors || '-'}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Total Units</span>
                                            <span className="text-gray-100">{property.totalUnits || '-'}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Possession Type</span>
                                            <span className="text-gray-100">{property.possessionType || '-'}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Amenities */}
                            {property.amenities?.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-bold text-gray-100 mb-3">Amenities</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {property.amenities.map((amenity, index) => (
                                            <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Pricing Information */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gray-800 rounded-xl p-6 mb-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-100 mb-4 border-b border-amber-500 pb-2 inline-block">
                                Pricing Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-100 mb-2">Price Details</h3>
                                    <ul className="space-y-3">
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Starting Price</span>
                                            <span className="text-gray-100">
                                                {property.startPrice ? `₹${property.startPrice.toLocaleString('en-IN')}` : '-'}
                                            </span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Price Range</span>
                                            <span className="text-gray-100">{property.priceRange || '-'}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-400">Booking Amount</span>
                                            <span className="text-gray-100">
                                                {property.bookingAmount ? `₹${property.bookingAmount.toLocaleString('en-IN')}` : '-'}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-100 mb-2">Payment Plan</h3>
                                    <p className="text-gray-300 mb-3">{property.paymentPlan || 'Not specified'}</p>
                                    {property.paymentPlanDescription && (
                                        <p className="text-gray-400 text-sm">{property.paymentPlanDescription}</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Floor Plans */}
                        {property.floorPlanUrls?.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-gray-800 rounded-xl p-6 mb-8"
                            >
                                <h2 className="text-2xl font-bold text-gray-100 mb-4 border-b border-amber-500 pb-2 inline-block">
                                    Floor Plans
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {property.floorPlanUrls.map((plan, index) => (
                                        <div key={index} className="bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-between">
                                            <p className="text-gray-300 font-semibold mb-4 text-center">
                                                Configuration: {property.configurations?.[index] || 'Not specified'}
                                            </p>

                                            <a
                                                href={plan}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download
                                                className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md transition text-sm w-full text-center"
                                            >
                                                📥 Download Floor Plan {index + 1}
                                            </a>

                                            <p className="text-gray-400 text-xs mt-2 text-center">
                                                If the file doesn't open, right-click and choose “Save link as…”
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>


                        )}

                        {/* Contact Information */}
                        {property.contacts?.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="bg-gray-800 rounded-xl p-6"
                            >
                                <h2 className="text-2xl font-bold text-gray-100 mb-4 border-b border-amber-500 pb-2 inline-block">
                                    Contact Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {property.contacts.map((contact, index) => (
                                        <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                            <h3 className="text-lg font-bold text-amber-500 mb-2">
                                                {contact.name || 'Sales Representative'}
                                            </h3>
                                            <ul className="space-y-2">
                                                <li className="flex items-center">
                                                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                    </svg>
                                                    <span className="text-gray-300">{contact.phone || '-'}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                    </svg>
                                                    <span className="text-gray-300">{contact.email || '-'}</span>
                                                </li>
                                                {contact.website && (
                                                    <li className="flex items-center">
                                                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                                        </svg>
                                                        <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">
                                                            {contact.website}
                                                        </a>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-gray-800 rounded-xl p-6 sticky top-4"
                        >
                            <h3 className="text-xl font-bold text-gray-100 mb-4">Quick Facts</h3>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-400 text-sm">Project Name</p>
                                    <p className="text-gray-100">{property.title}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">Developer</p>
                                    <p className="text-gray-100">{property.builder || 'Not specified'}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">Possession Date</p>
                                    <p className="text-gray-100">{property.completionDate || 'To be announced'}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">RERA Registration</p>
                                    <p className="text-gray-100">{property.rera || 'Not specified'}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">Configurations</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {property.configurations?.map((config, index) => (
                                            <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                                {config}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {property.mapUrl && (
                                    <div className="pt-4">
                                        <a
                                            href={property.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-amber-500 hover:text-amber-400 flex items-center text-sm"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            View on Google Maps
                                        </a>
                                    </div>
                                )}

                                {property.brochureUrl && (
                                    <div className="pt-4">
                                        <a
                                            href={property.brochureUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-amber-500 hover:text-amber-400 flex items-center text-sm"
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                            </svg>
                                            Download Brochure
                                        </a>
                                    </div>
                                )}
                            </div>

                            <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-md mt-6 transition">
                                Contact Developer
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrelaunchPropertyDetails;