import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const purposes = [
  { title: 'Sale or Rent Property', icon: '🏠', path: '/post-property/sale' },
  { title: 'Pre-Launch Project', icon: '🚧', path: '/post-property/prelaunch' },
  { title: 'Mortgage Listing', icon: '💰', path: '/post-property/mortgage' },
  { title: 'Other', icon: '📝', path: '/post-property/other' },
  { title: 'Commercial and Co-working', icon: '🏢', path: '/post-property/commercial-lease' },
  { title: 'PG/Hostel', icon: '🛏️', path: '/post-property/pg-hostel' },
  { title: 'Auction Property', icon: '🔨', path: '/post-property/auction' },
  { title: 'Builder Project', icon: '🏗️', path: '/post-property/builder-project' },
];

const SelectAdPurpose = () => {
  const navigate = useNavigate();

  const handlePurposeClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500"
        >
          Select Ad Purpose
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Choose the category that best fits your property listing
        </motion.p>
      </div>

      {/* Purpose Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {purposes.map((purpose, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer border border-gray-700 hover:border-amber-500 transition-all"
            onClick={() => handlePurposeClick(purpose.path)}
          >
            <div className="p-6 text-center h-full flex flex-col items-center">
              <div className="text-5xl mb-4">{purpose.icon}</div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">{purpose.title}</h3>
              <div className="mt-auto pt-4 w-full">
                <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center text-gray-400 text-sm"
      >
        <p>Can't find the right category? <span className="text-amber-500 cursor-pointer">Contact our support team</span></p>
      </motion.div>
    </div>
  );
};

export default SelectAdPurpose;