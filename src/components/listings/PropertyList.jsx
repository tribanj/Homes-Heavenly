import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, collection, getDocs, query, where, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PropertyList = ({ type = 'all', limit = 12 }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [savedProperties, setSavedProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties with filters
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        let q;

        // Base query
        if (type === 'all') {
          q = query(
            collection(db, 'property_for_rent_or_sale'),
            where('status', '==', 'approved'),
            orderBy('timestamp', 'desc'),
            firestoreLimit(limit)
          );
        } else {
          q = query(
            collection(db, 'property_for_rent_or_sale'),
            where('listingType', '==', type),
            where('status', '==', 'approved'),
            orderBy('timestamp', 'desc'),
            firestoreLimit(limit)
          );
        }

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          listingType: doc.data().listingType?.toLowerCase() || 'rent'
        }));

        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [type, limit]);

  // Fetch saved properties
  useEffect(() => {
    if (user) {
      const fetchSavedProperties = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setSavedProperties(userDoc.data().savedProperties || []);
        }
      };
      fetchSavedProperties();
    }
  }, [user]);

  const isPropertySaved = (propertyId) => savedProperties.includes(propertyId);

  const toggleSaveProperty = async (propertyId, e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      if (isPropertySaved(propertyId)) {
        await updateDoc(userRef, {
          savedProperties: arrayRemove(propertyId)
        });
        setSavedProperties(savedProperties.filter(id => id !== propertyId));
      } else {
        await updateDoc(userRef, {
          savedProperties: arrayUnion(propertyId)
        });
        setSavedProperties([...savedProperties, propertyId]);
      }
    } catch (error) {
      console.error('Error updating saved properties:', error);
    }
  };

  const shareProperty = (e, propertyId) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/property/${propertyId}`);
    alert('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 shadow animate-pulse">
            <div className="h-48 w-full bg-gray-200 rounded-lg mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all"
          onClick={() => navigate(`/property/${property.id}`)}
        >
          {/* Property Image */}
          <div className="relative h-48 w-full">
            <img
              src={property.photos?.[0] || '/images/placeholder.jpg'}
              alt={property.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 text-sm font-medium">
              {property.listingType === 'rent' ? 'FOR RENT' : 'FOR SALE'}
            </div>
            <div className="absolute top-0 right-0 flex space-x-2 p-3">
              <button
                onClick={(e) => toggleSaveProperty(property.id, e)}
                className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
                aria-label={isPropertySaved(property.id) ? "Unsave property" : "Save property"}
              >
                {isPropertySaved(property.id) ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-500 hover:text-red-500" />
                )}
              </button>
              <button
                onClick={(e) => shareProperty(e, property.id)}
                className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
                aria-label="Share property"
              >
                <FaShareAlt className="text-gray-500 hover:text-blue-500" />
              </button>
            </div>
          </div>

          {/* Property Details */}
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold truncate">{property.title}</h3>
              <p className="text-blue-600 font-bold text-lg whitespace-nowrap">
                ₹{property.price?.toLocaleString('en-IN')}
                {property.listingType === 'rent' && '/mo'}
              </p>
            </div>

            <p className="text-gray-600 mb-4 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              {[property.locality, property.city].filter(Boolean).join(', ')}
            </p>

            {/* Property Features */}
            <div className="flex justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center">
                <FaBed className="mr-2 text-gray-500" />
                <span>{property.bedrooms || 'N/A'} Beds</span>
              </div>
              <div className="flex items-center">
                <FaBath className="mr-2 text-gray-500" />
                <span>{property.bathrooms || 'N/A'} Baths</span>
              </div>
              <div className="flex items-center">
                <FaRulerCombined className="mr-2 text-gray-500" />
                <span>{property.builtupArea || 'N/A'} sqft</span>
              </div>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                      +{property.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}

      {properties.length === 0 && !loading && (
        <div className="col-span-full text-center py-12">
          <h3 className="text-xl font-medium text-gray-700">No properties found</h3>
          <p className="text-gray-500 mt-2">
            {type === 'all' ? 'Check back later for new listings' : `No ${type} properties available`}
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyList;