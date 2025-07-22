import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUniversity, FaMapMarkerAlt, FaCalendarAlt, FaBed, FaInfoCircle, FaSearch, FaArrowRight } from 'react-icons/fa';

const StudentHousing = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    preferredLocation: '',
    moveInDate: '',
    roomType: '',
    specialNeeds: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🏠 Student Housing Inquiry Submitted:", formData);
    toast.success("Your housing inquiry has been submitted!");
    setFormData({
      name: '',
      email: '',
      phone: '',
      institution: '',
      preferredLocation: '',
      moveInDate: '',
      roomType: '',
      specialNeeds: '',
    });
  };

  const handleBrowseListings = () => {
    navigate('/pgHostel');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-orange-400 mb-4">
            🎓 Premium Student Housing Solutions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover safe, affordable, and student-friendly PGs and hostels near top educational institutions.
          </p>
          <button
            onClick={handleBrowseListings}
            className="mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 flex items-center mx-auto"
          >
            Browse PG & Hostel Listings <FaArrowRight className="ml-2" />
          </button>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all">
            <div className="text-orange-400 text-3xl mb-4">
              <FaHome />
            </div>
            <h3 className="text-xl font-bold mb-3">Verified Listings</h3>
            <p className="text-gray-400">
              All properties include photos, house rules, and verified reviews from current residents.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all">
            <div className="text-orange-400 text-3xl mb-4">
              <FaUniversity />
            </div>
            <h3 className="text-xl font-bold mb-3">Campus Proximity</h3>
            <p className="text-gray-400">
              Locations within walking distance or short commute to major universities and colleges.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all">
            <div className="text-orange-400 text-3xl mb-4">
              <FaInfoCircle />
            </div>
            <h3 className="text-xl font-bold mb-3">All-Inclusive</h3>
            <p className="text-gray-400">
              Meals, laundry, housekeeping, Wi-Fi, and utilities included in most listings.
            </p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="bg-gray-800 rounded-xl shadow-xl p-8 border border-orange-500/20 mb-12">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Personalized Housing Assistance</h2>
          <p className="text-gray-300 mb-8">
            Complete this form and our housing specialists will match you with properties that meet your requirements.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-orange-500 focus:border-orange-500"
                value={formData.name}
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
              <label className="block text-gray-300 mb-2">Institution/College</label>
              <input
                type="text"
                name="institution"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-orange-500 focus:border-orange-500"
                value={formData.institution}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-orange-400" /> Preferred Location
              </label>
              <input
                type="text"
                name="preferredLocation"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-orange-500 focus:border-orange-500"
                value={formData.preferredLocation}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-orange-400" /> Move-In Date
              </label>
              <input
                type="date"
                name="moveInDate"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-orange-500 focus:border-orange-500"
                value={formData.moveInDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 flex items-center">
                <FaBed className="mr-2 text-orange-400" /> Room Type
              </label>
              <select
                name="roomType"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-orange-500 focus:border-orange-500"
                value={formData.roomType}
                onChange={handleChange}
                required
              >
                <option value="">Select Room Type</option>
                <option value="Private Room">Private Room</option>
                <option value="Shared Room">Shared Room (2-3 people)</option>
                <option value="Hostel Dorm">Hostel Dorm (4+ people)</option>
                <option value="Studio Apartment">Studio Apartment</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Special Requirements</label>
              <textarea
                name="specialNeeds"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-orange-500 focus:border-orange-500"
                rows="3"
                value={formData.specialNeeds}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
              >
                Submit Housing Request
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="bg-gray-800 rounded-xl shadow-xl p-8 border border-orange-500/20">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Student Housing Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-orange-500/10 p-3 rounded-lg mr-4">
                <FaSearch className="text-orange-400 text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Virtual Tours</h4>
                <p className="text-gray-400">
                  Always request a video tour or visit in person before committing to a property.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-orange-500/10 p-3 rounded-lg mr-4">
                <FaInfoCircle className="text-orange-400 text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Understand Policies</h4>
                <p className="text-gray-400">
                  Carefully review house rules, visitor policies, and notice period requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-orange-500/10 p-3 rounded-lg mr-4">
                <FaUniversity className="text-orange-400 text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Study Environment</h4>
                <p className="text-gray-400">
                  Look for quiet study areas and test Wi-Fi speeds during your visit.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-orange-500/10 p-3 rounded-lg mr-4">
                <FaMapMarkerAlt className="text-orange-400 text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Location Safety</h4>
                <p className="text-gray-400">
                  Prioritize secure neighborhoods with good lighting and campus proximity.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleBrowseListings}
              className="bg-transparent border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center mx-auto"
            >
              Explore Available Listings <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHousing;