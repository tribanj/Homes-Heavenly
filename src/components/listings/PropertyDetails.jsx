import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
                const propertyDoc = await getDoc(doc(db, 'property_for_rent_or_sale', id)); // ✅ fixed collection
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

    // Toggle save property
    const toggleSave = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const userRef = doc(db, 'users', user.uid);
            if (saved) {
                await updateDoc(userRef, {
                    savedProperties: arrayRemove(id)
                });
            } else {
                await updateDoc(userRef, {
                    savedProperties: arrayUnion(id)
                });
            }
            setSaved(!saved);
        } catch (error) {
            console.error('Error updating saved properties:', error);
        }
    };

    if (loading) {
        return <div className="text-center py-10 text-white">Loading property details...</div>;
    }

    if (!property) {
        return <div className="text-center py-10 text-red-400">Property not found</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 text-slate-800">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Property Images */}
                <div>
                    <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                            src={property.photos?.[0] || '/images/placeholder.jpg'}
                            alt={property.title}
                            className="w-full h-96 object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {property.photos?.slice(1, 4).map((photo, index) => (
                            <img
                                key={index}
                                src={photo}
                                alt={`${property.title} ${index + 2}`}
                                className="w-full h-32 object-cover rounded"
                            />
                        ))}
                    </div>
                </div>

                {/* Property Details */}
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-2xl font-bold">{property.title}</h1>
                        <div className="flex gap-2">
                            <button
                                onClick={toggleSave}
                                className="p-2 rounded-full hover:bg-gray-800"
                                title={saved ? "Remove from saved" : "Save property"}
                            >
                                {saved ? (
                                    <FaHeart className="text-red-500 text-xl" />
                                ) : (
                                    <FaRegHeart className="text-gray-400 text-xl" />
                                )}
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-800" title="Share">
                                <FaShare className="text-gray-400 text-xl" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center text-gray-800 mb-4">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{property.locality}, {property.city}, {property.state}</span>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg mb-6">
                        <p className="text-2xl font-bold text-blue-400 mb-2">
                            ₹ {property.price?.toLocaleString('en-IN')}
                            {property.type === 'rent' && <span className="text-sm font-normal"> / month</span>}
                        </p>
                        <div className="flex gap-4 text-gray-400">
                            <span className="flex items-center">
                                <FaBed className="mr-1" /> {property.bedrooms} Beds
                            </span>
                            <span className="flex items-center">
                                <FaBath className="mr-1" /> {property.bathrooms} Baths
                            </span>
                            <span className="flex items-center">
                                <FaRulerCombined className="mr-1" /> {property.area} sq.ft
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                        <p className="text-gray-800">{property.description}</p>
                    </div>

                    {property.amenities?.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Amenities</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {property.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center text-gray-600">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                        Contact Owner
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
