import React from "react";
import { allServices } from "../data/servicesData"; // or wherever your services data is
import { motion } from "framer-motion";

const AllServicesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-[#101828] p-6 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">All Services</h2>
          <button
            className="text-white text-2xl hover:text-red-500"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {allServices.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-[#1E2939] text-white p-4 rounded-lg shadow-md cursor-pointer"
            >
              <h4 className="text-lg font-semibold">{service.label}</h4>
              <p className="text-sm text-gray-400 mt-1">
                Explore help in {service.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllServicesModal;
