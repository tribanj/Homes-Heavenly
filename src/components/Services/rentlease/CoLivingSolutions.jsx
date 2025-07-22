import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { FaBuilding, FaWifi, FaParking, FaSnowflake, FaShieldAlt, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';

const CoLivingSolutions = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    budget: '',
    occupation: '',
    moveInDate: '',
    preferences: '',
  });

  const [coworkingSpaces, setCoworkingSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoworkingSpaces = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'coworkingLeaseProperties'));
        const spaces = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCoworkingSpaces(spaces);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coworking spaces:', error);
        setLoading(false);
      }
    };

    fetchCoworkingSpaces();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🏠 Co-Living Inquiry Submitted:", formData);
    toast.success("Thanks! Our team will contact you shortly.");
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: '',
      budget: '',
      occupation: '',
      moveInDate: '',
      preferences: '',
    });
  };

  const handleViewDetails = (id) => {
    navigate(`/coworking-space/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-orange-400 mb-4">
            🏘️ Premium Co-Living & Shared Housing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover affordable, hassle-free shared housing and coworking spaces for students, professionals, and digital nomads.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all">
            <div className="text-orange-400 text-3xl mb-4">
              <FaBuilding />
            </div>
            <h3 className="text-xl font-bold mb-3">Fully Furnished</h3>
            <p className="text-gray-400">
              Move-in ready spaces with all necessary furniture and amenities included.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all">
            <div className="text-orange-400 text-3xl mb-4">
              <FaWifi />
            </div>
            <h3 className="text-xl font-bold mb-3">All-Inclusive</h3>
            <p className="text-gray-400">
              WiFi, utilities, housekeeping, and maintenance all covered in one simple payment.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all">
            <div className="text-orange-400 text-3xl mb-4">
              <FaShieldAlt />
            </div>
            <h3 className="text-xl font-bold mb-3">Flexible Terms</h3>
            <p className="text-gray-400">
              Weekly, monthly, or long-term stays available to suit your needs.
            </p>
          </div>
        </div>

        {/* Coworking Spaces Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Featured Coworking Spaces</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coworkingSpaces.slice(0, 3).map(space => (
                <div key={space.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-orange-500/20 hover:border-orange-500/40 transition-all">
                  {space.imageUrls && space.imageUrls.length > 0 && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={space.imageUrls[0]} 
                        alt={space.propertyTitle} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{space.propertyTitle}</h3>
                    <div className="flex items-center text-gray-400 mb-3">
                      <FaMapMarkerAlt className="mr-2 text-orange-400" />
                      {space.locality}, {space.city}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-gray-700 px-3 py-1 rounded-full flex items-center">
                        <FaBuilding className="mr-1" /> {space.spaceType}
                      </span>
                      {space.airConditioning && (
                        <span className="text-xs bg-gray-700 px-3 py-1 rounded-full flex items-center">
                          <FaSnowflake className="mr-1" /> AC
                        </span>
                      )}
                      {space.powerBackup && (
                        <span className="text-xs bg-gray-700 px-3 py-1 rounded-full flex items-center">
                          <FaShieldAlt className="mr-1" /> Power Backup
                        </span>
                      )}
                      <span className="text-xs bg-gray-700 px-3 py-1 rounded-full flex items-center">
                        <FaParking className="mr-1" /> {space.parkingSpaces} spots
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <span className="text-lg font-bold text-orange-400">₹{space.monthlyRent}</span>
                        <span className="text-gray-400 text-sm"> / month</span>
                      </div>
                      <button
                        onClick={() => handleViewDetails(space.id)}
                        className="text-orange-400 hover:text-white px-4 py-2 rounded-lg border border-orange-400 hover:bg-orange-500 transition-colors flex items-center"
                      >
                        View <FaArrowRight className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Inquiry Form */}
        <div className="bg-gray-800 rounded-xl shadow-xl p-8 border border-orange-500/20 mb-12">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Personalized Space Matching</h2>
          <p className="text-gray-300 mb-8">
            Tell us your preferences and we'll find the perfect co-living or coworking space for you.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-orange-500 focus:border-orange-500"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-orange-500 focus:border-orange-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-orange-500 focus:border-orange-500"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Preferred City</label>
              <input
                type="text"
                name="city"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-orange-500 focus:border-orange-500"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Monthly Budget (₹)</label>
              <input
                type="number"
                name="budget"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-orange-500 focus:border-orange-500"
                value={formData.budget}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Occupation</label>
              <select
                name="occupation"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-orange-500 focus:border-orange-500"
                value={formData.occupation}
                onChange={handleChange}
                required
              >
                <option value="">Select Occupation</option>
                <option value="Student">Student</option>
                <option value="Working Professional">Working Professional</option>
                <option value="Freelancer/Digital Nomad">Freelancer/Digital Nomad</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-2">Roommate or Space Preferences</label>
              <textarea
                name="preferences"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-orange-500 focus:border-orange-500"
                rows="3"
                value={formData.preferences}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-800 rounded-xl shadow-xl p-8 border border-orange-500/20">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="border-b border-gray-700 pb-4">
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-medium text-gray-200">Are utilities and WiFi included in the rent?</span>
                <span className="text-orange-400">+</span>
              </button>
              <div className="mt-2 text-gray-400">
                Yes, our pricing includes all major utilities, high-speed internet, housekeeping, and basic furnishings.
              </div>
            </div>

            <div className="border-b border-gray-700 pb-4">
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-medium text-gray-200">Can I choose my roommate or space preference?</span>
                <span className="text-orange-400">+</span>
              </button>
              <div className="mt-2 text-gray-400">
                Yes. You can mention your preferences in the form and we'll match you accordingly, subject to availability.
              </div>
            </div>

            <div className="border-b border-gray-700 pb-4">
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-medium text-gray-200">Is there a minimum stay period?</span>
                <span className="text-orange-400">+</span>
              </button>
              <div className="mt-2 text-gray-400">
                Most spaces require a minimum 1-month stay, but flexible plans are available based on location.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoLivingSolutions;