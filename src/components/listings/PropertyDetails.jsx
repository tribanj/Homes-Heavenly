import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, data } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { FaBed, FaBath, FaRulerCombined, FaHeart, FaRegHeart, FaShare, FaMapMarkerAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    // Fetch property details
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const propertyDoc = await getDoc(doc(db, 'property_for_rent_or_sale', id));
                if (propertyDoc.exists()) {
                    setProperty({ id: propertyDoc.id, ...propertyDoc.data() });
                } else {
                    navigate('/not-found');
                }
            } catch (error) {
                console.error('Error fetching property:', error);
                navigate('/not-found');
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id, navigate]);

    // Check if property is saved
    useEffect(() => {
        if (user) {
            const checkSavedStatus = async () => {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setSaved(userDoc.data().savedProperties?.includes(id) || false);
                }
            };
            checkSavedStatus();
        }
    }, [user, id]);

    const toggleSave = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) return;

            const userData = userSnap.data();
            const savedProperties = userData.savedProperties || [];

            const listingRef = {
                id, // the listing ID passed as a prop
                collection: 'property_for_rent_or_sale' // or dynamically pass it as a prop
            };

            const alreadySaved = savedProperties.some(
                (item) => item.id === listingRef.id
            );

            let updatedSavedProps;

            if (alreadySaved) {
                updatedSavedProps = savedProperties.filter(
                    (item) => item.id !== listingRef.id
                );
            } else {
                updatedSavedProps = [...savedProperties, listingRef];
            }

            await updateDoc(userRef, {
                savedProperties: updatedSavedProps
            });

            setSaved(!saved);
        } catch (error) {
            console.error('Error updating saved properties:', error);
        }
    };


    if (loading) {
        return <div className="text-center py-10 text-orange-400">Loading property details...</div>;
    }

    if (!property) {
        return <div className="text-center py-10 text-red-500">Property not found</div>;
    }

    return (
        <div className="max-w-full mx-auto px-4 py-8 bg-gray-900 text-gray-100 min-h-screen">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Property Images */}
                <div>
                    <div className="mb-4 rounded-lg overflow-hidden border-2 border-orange-500">
                        <img
                            src={property.photos?.[0] || '/images/placeholder.jpg'}
                            alt={property.title}
                            className="w-full h-96 object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {property.photos?.slice(1, 4).map((photo, index) => (
                            <div key={index} className="border-2 border-orange-500 rounded-lg overflow-hidden">
                                <img
                                    src={photo}
                                    alt={`${property.title} ${index + 2}`}
                                    className="w-full h-32 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <h6 className='mt-6'>Videos</h6>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {property.videos?.map((videoUrl, index) => (
                            <div
                                key={index}
                                className="border-2 border-orange-500 rounded-lg overflow-hidden bg-black"
                            >
                                <video
                                    src={videoUrl}
                                    controls
                                    className="w-full h-32 object-cover"
                                    preload="metadata"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Property Details */}
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-3xl font-bold text-orange-400">{property.title}</h1>
                        <div className="flex gap-2">
                            <button
                                onClick={toggleSave}
                                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                                title={saved ? "Remove from saved" : "Save property"}
                            >
                                {saved ? (
                                    <FaHeart className="text-orange-500 text-xl" />
                                ) : (
                                    <FaRegHeart className="text-gray-400 text-xl hover:text-orange-400" />
                                )}
                            </button>
                            <button
                                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                                title="Share"
                            >
                                <FaShare className="text-gray-400 text-xl hover:text-orange-400" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center text-orange-300 mb-4">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{property.locality}, {property.city}, {property.state}</span>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg mb-6 border-l-4 border-orange-500">
                        <p className="text-3xl font-bold text-orange-400 mb-2">
                            ₹ {property.price?.toLocaleString('en-IN')}
                            {property.type === 'rent' && <span className="text-lg font-normal text-gray-300"> / month</span>}
                        </p>
                        <div className="flex gap-4 text-gray-300">
                            <span className="flex items-center">
                                <FaBed className="mr-1 text-orange-400" /> {property.bedrooms} Beds
                            </span>
                            <span className="flex items-center">
                                <FaBath className="mr-1 text-orange-400" /> {property.bathrooms} Baths
                            </span>
                            <span className="flex items-center">
                                <FaRulerCombined className="mr-1 text-orange-400" /> {property.area} sq.ft
                            </span>
                        </div>
                    </div>

                    <div className="mb-6 bg-gray-800 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2 text-orange-400 border-b border-orange-500 pb-2">Description</h2>
                        <p className="text-gray-300">{property.description}</p>
                    </div>

                    {property.amenities?.length > 0 && (
                        <div className="mb-6 bg-gray-800 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-2 text-orange-400 border-b border-orange-500 pb-2">Amenities</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {property.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center text-gray-300">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium transition-colors shadow-lg">
                        Contact Owner
                    </button>
                </div>
            </div>

            {/* Additional Details Section */}
            <div className="mt-8 bg-gray-800 p-6 rounded-lg max-w-[80%] mx-auto">

                <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-orange-500 pb-2">
                    Property Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-orange-300 mb-2">Basic Information</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex justify-between">
                                <span>Property Type:</span>
                                <span className="font-medium">{property.propertyType || 'N/A'}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Listing Type:</span>
                                <span className="font-medium">{property.listingType || 'N/A'}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Status:</span>
                                <span className="font-medium">{property.status || 'N/A'}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Bedrooms:</span>
                                <span className="font-medium">{property.bedrooms || 'N/A'}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Bathrooms:</span>
                                <span className="font-medium">{property.bathrooms || 'N/A'}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Balconies:</span>
                                <span className="font-medium">{property.balconies || 'N/A'}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Facing:</span>
                                <span className="font-medium">{property.facing || 'N/A'}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Additional Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-orange-300 mb-2">Other Details</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex justify-between">
                                <span>Built-up Area:</span>
                                <span className="font-medium">{property.builtupArea || 'N/A'} sq.ft</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Carpet Area:</span>
                                <span className="font-medium">{property.carpetArea || 'N/A'} sq.ft</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Floor No.:</span>
                                <span className="font-medium">{property.floorNo || 'N/A'}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Total Floors:</span>
                                <span className="font-medium">{property.totalFloors || 'N/A'}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Furnishing:</span>
                                <span className="font-medium">{property.furnishing || 'N/A'}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Maintenance Charges:</span>
                                <span className="font-medium">₹{property.maintenanceCharges || '0'}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Price:</span>
                                <span className="font-medium">₹{property.price || 'N/A'}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Location Info */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-orange-300 mb-2">Location</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li className="flex justify-between">
                            <span>Locality:</span>
                            <span className="font-medium">{property.locality || 'N/A'}</span>
                        </li>
                        <li className="flex justify-between">
                            <span>City:</span>
                            <span className="font-medium">{property.city || 'N/A'}</span>
                        </li>
                        <li className="flex justify-between">
                            <span>State:</span>
                            <span className="font-medium">{property.state || 'N/A'}</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Pin Code:</span>
                            <span className="font-medium">{property.pinCode || 'N/A'}</span>
                        </li>
                    </ul>
                </div>

                {/* Amenities */}
                {property.amenities?.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-orange-300 mb-2">Amenities</h3>
                        <ul className="flex flex-wrap gap-3 text-sm text-gray-300">
                            {property.amenities.map((item, index) => (
                                <li key={index} className="px-3 py-1 bg-gray-700 rounded-full border border-orange-500">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

        </div>
    );
};

export default PropertyDetails;