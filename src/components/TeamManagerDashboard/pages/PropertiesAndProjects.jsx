import React, { useState } from "react";
import {
  FiHome,
  FiUser,
  FiEye,
  FiEdit,
  FiImage,
  FiX,
  FiSave,
  FiMapPin,
  FiDollarSign,
} from "react-icons/fi";

// Small mock data as requested
const properties = [
  {
    id: 1,
    name: "Green Valley Apartments",
    type: "Project",
    location: "Sector 15, Gurgaon",
    status: "Active",
    price: "₹45-65 Lakhs",
    assignedAgent: "Priya Sharma",
    units: "2-3 BHK",
    hasMedia: true,
  },
  {
    id: 2,
    name: "Luxury Villa - Plot 42",
    type: "Property",
    location: "DLF Phase 2",
    status: "Booked",
    price: "₹2.5 Crores",
    assignedAgent: "Rohan Verma",
    units: "4 BHK",
    hasMedia: false,
  },
  {
    id: 3,
    name: "Metro Heights Tower A",
    type: "Project",
    location: "Noida Extension",
    status: "Sold",
    price: "₹35-55 Lakhs",
    assignedAgent: "Amit Kumar",
    units: "1-2 BHK",
    hasMedia: true,
  },
];

const agents = ["Priya Sharma", "Rohan Verma", "Amit Kumar"];
const statusOptions = ["Active", "Booked", "Sold", "Rented"];

const PropertiesAndProjects = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [assignData, setAssignData] = useState({ propertyId: "", agent: "" });

  const handleAssignProperty = () => {
    console.log("Assigning property to agent:", assignData);
    setShowAssignModal(false);
    setAssignData({ propertyId: "", agent: "" });
  };

  const handleViewMedia = (property) => {
    setSelectedProperty(property);
    setShowMediaModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Booked":
        return "bg-yellow-100 text-yellow-800";
      case "Sold":
        return "bg-blue-100 text-blue-800";
      case "Rented":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FiHome className="me-3" /> Properties & Projects
        </h2>
        <button
          onClick={() => setShowAssignModal(true)}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Assign Property to Agent
        </button>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Property Header */}
            <div className="p-4 border-b">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{property.name}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    property.status
                  )}`}
                >
                  {property.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 flex items-center">
                <FiMapPin className="me-1" size={14} />
                {property.location}
              </p>
            </div>

            {/* Property Details */}
            <div className="p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Type:</span>
                <span className="text-sm font-medium">{property.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="text-sm font-medium text-green-600">
                  {property.price}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Units:</span>
                <span className="text-sm font-medium">{property.units}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Assigned to:</span>
                <span className="text-sm font-medium">
                  {property.assignedAgent}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t bg-gray-50 flex justify-between">
              <button
                onClick={() => handleViewMedia(property)}
                className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                disabled={!property.hasMedia}
              >
                <FiImage className="me-1" size={16} />
                {property.hasMedia ? "View Media" : "No Media"}
              </button>
              <div className="flex space-x-2">
                <button
                  className="text-gray-600 hover:text-gray-800 p-1"
                  title="View Details"
                >
                  <FiEye size={16} />
                </button>
                <button
                  className="text-yellow-600 hover:text-yellow-800 p-1"
                  title="Edit"
                >
                  <FiEdit size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assign Property Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Assign Property to Agent
              </h2>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Property
                </label>
                <select
                  value={assignData.propertyId}
                  onChange={(e) =>
                    setAssignData({ ...assignData, propertyId: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose property...</option>
                  {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.name} - {property.location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Agent
                </label>
                <select
                  value={assignData.agent}
                  onChange={(e) =>
                    setAssignData({ ...assignData, agent: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose agent...</option>
                  {agents.map((agent) => (
                    <option key={agent} value={agent}>
                      {agent}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignProperty}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                <FiUser className="me-2" /> Assign Property
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Modal */}
      {showMediaModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Media - {selectedProperty.name}
              </h2>
              <button
                onClick={() => setShowMediaModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <FiImage size={48} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">
                  Property media will be displayed here
                </p>
                <p className="text-sm text-gray-500">
                  Photos, floor plans, and videos
                </p>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowMediaModal(false)}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesAndProjects;
