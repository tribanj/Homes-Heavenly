import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const PropertyList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [savedProperties, setSavedProperties] = useState([]);
  const [properties, setProperties] = useState([]);

  // ✅ FETCH PROPERTY DATA
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'property_for_rent_or_sale')); // ✅ Correct collection name
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  // ✅ FETCH SAVED PROPERTIES
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

  const toggleSaveProperty = async (propertyId) => {
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

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow relative">
          {/* Save Button */}
          <button
            onClick={() => toggleSaveProperty(property.id)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100"
            aria-label={isPropertySaved(property.id) ? "Unsave property" : "Save property"}
          >
            {isPropertySaved(property.id) ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-500 text-xl hover:text-red-500" />
            )}
          </button>

          <img
            src={property.photos?.[0] || '/images/placeholder.jpg'}
            alt={property.title}
            className="h-48 w-full object-cover mb-3 rounded-lg"
          />
          <h3 className="text-lg font-semibold">{property.title}</h3>
          <p className="text-sm text-gray-600">{property.locality}, {property.city}</p>
          <p className="text-blue-700 font-bold mt-1">₹ {property.price?.toLocaleString('en-IN')}</p>

          <button
            onClick={() => navigate(`/property/${property.id}`)}
            className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
