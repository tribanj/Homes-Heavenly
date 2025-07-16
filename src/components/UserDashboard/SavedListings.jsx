import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaRupeeSign, FaBed, FaBath, FaRulerCombined, FaHeart } from 'react-icons/fa';

const SavedListings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savedListings, setSavedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedListings = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const savedProps = userSnap.data().savedProperties || [];
          const fetchedListings = [];

          for (const entry of savedProps) {
            try {
              const { id, collection } = entry;
              if (!id || !collection) continue;

              const listingRef = doc(db, collection, id);
              const listingSnap = await getDoc(listingRef);

              if (listingSnap.exists()) {
                const data = listingSnap.data();
                // Extract common property fields based on collection type
                const property = {
                  id,
                  collection,
                  title: data.basicDetails?.listingTitle || data.title || 'Untitled Property',
                  city: data.locationDetails?.city || data.city || 'Unknown City',
                  state: data.locationDetails?.state || data.state || '',
                  price: data.auctionDetails?.startingBidPrice ||
                    data.startPrice ||
                    data.priceRange ||
                    'Price on request',
                  type: data.basicDetails?.propertyType || data.type || 'Property',
                  bedrooms: data.propertyDetails?.bedrooms || data.bedrooms || 0,
                  bathrooms: data.propertyDetails?.bathrooms || data.bathrooms || 0,
                  area: data.propertyDetails?.builtUpArea || data.area || 0,
                  image: data.photos?.propertyImages?.[0] ||
                    data.imageUrls?.[0] ||
                    'https://via.placeholder.com/400x300?text=Property+Image'
                };
                fetchedListings.push(property);
              }
            } catch (error) {
              console.error(`Error fetching property ${entry.id}:`, error);
            }
          }

          setSavedListings(fetchedListings);
        }
      } catch (error) {
        console.error('Failed to fetch saved listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedListings();
  }, [user]);

  const handleViewDetails = (collection, id) => {
    // Navigate to the correct route based on collection type
    if (collection === 'property_for_auction') {
      navigate(`/auction-properties/${id}`);
    } else if (collection === 'prelaunchProjects') {
      navigate(`/prelaunch-properties/${id}`);
    } else {
      navigate(`/property/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-orange-500 mb-6">Loading your saved listings...</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-500 mb-6">Your Saved Properties</h2>

        {savedListings.length === 0 ? (
          <div className="bg-gray-800 p-8 rounded-xl text-center">
            <p className="text-xl text-gray-300 mb-4">You haven't saved any properties yet</p>
            <button
              onClick={() => navigate('/properties')}
              className="px-6 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedListings.map((property) => (
              <div
                key={`${property.collection}-${property.id}`}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={property.photos}
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-orange-400 truncate">{property.title}</h3>
                    <FaHeart className="text-red-500 text-xl" />
                  </div>

                  <div className="flex items-center text-gray-400 mb-3">
                    <FaMapMarkerAlt className="mr-2 text-orange-400" />
                    <span>{property.city}, {property.state}</span>
                  </div>

                  <div className="flex items-center text-lg font-bold text-orange-400 mb-4">
                    <FaRupeeSign className="mr-1" />
                    {typeof property.price === 'number'
                      ? property.price.toLocaleString('en-IN')
                      : property.price}
                  </div>

                  <div className="flex justify-between text-gray-400 mb-4">
                    <div className="flex items-center">
                      <FaBed className="mr-2 text-orange-400" />
                      <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                    </div>
                    <div className="flex items-center">
                      <FaBath className="mr-2 text-orange-400" />
                      <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                    </div>
                    <div className="flex items-center">
                      <FaRulerCombined className="mr-2 text-orange-400" />
                      <span>{property.area} sq.ft</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(property.collection, property.id)}
                    className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
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
};

export default SavedListings;