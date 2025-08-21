import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiEdit,
  FiCheck,
  FiXCircle,
  FiSearch,
  FiMapPin,
  FiHome,
  FiGrid,
  FiCalendar,
  FiUsers,
  FiTrendingUp,
  FiEye,
  FiClock,
  FiTrash2,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig"; // Adjust path if needed
import { toast } from "react-toastify";

// --- MODAL with REFINED CARD STYLING ---
const SelectPurposeModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const purposes = [
    { title: "Sale or Rent Property", icon: "🏠", path: "/post-property/sale" },
    {
      title: "Pre-Launch Project",
      icon: "🚧",
      path: "/post-property/prelaunch",
    },
    { title: "Mortgage Listing", icon: "💰", path: "/post-property/mortgage" },
    {
      title: "Commercial",
      icon: "🏢",
      path: "/post-property/commercial-lease",
    },
    { title: "PG/Hostel", icon: "🛏️", path: "/post-property/pg-hostel" },
    { title: "Auction Property", icon: "🔨", path: "/post-property/auction" },
    {
      title: "Builder Project",
      icon: "🏗️",
      path: "/post-property/builder-project",
    },
    { title: "Other", icon: "📝", path: "/post-property/other" },
  ];

  const handlePurposeClick = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-5 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Add a New Listing</h2>
                <p className="text-gray-400 mt-1">
                  What type of property would you like to post?
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <FiXCircle size={24} />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {purposes.map((purpose) => (
                  <button
                    key={purpose.title}
                    onClick={() => handlePurposeClick(purpose.path)}
                    // --- REFINED STYLING for the cards as per your request ---
                    className="bg-gradient-to-br from-white to-gray-100 border border-gray-200 rounded-xl p-3 text-center hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <div className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-110">
                      {purpose.icon}
                    </div>
                    <h3 className="font-medium text-sm text-gray-800">
                      {purpose.title}
                    </h3>
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 bg-gray-100 border-t flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- UI COMPONENTS ---
const StatusBadge = ({ status }) => {
  const styles = {
    Live: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    "Pending Approval": "bg-amber-100 text-amber-700 border border-amber-200",
    Rejected: "bg-red-100 text-red-700 border border-red-200",
  };
  const icon = {
    Live: <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>,
    "Pending Approval": <FiClock className="w-3 h-3" />,
    Rejected: <FiXCircle className="w-3 h-3" />,
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full inline-flex items-center gap-1 ${
        styles[status] || "bg-gray-100 text-gray-700 border border-gray-200"
      }`}
    >
      {icon[status]}
      {status}
    </span>
  );
};

// --- This large modal remains commented out and has been restyled for future use ---
/*
const AddListingModal = ({ isOpen, onClose }) => { ... };
*/

const ManageInventoryModal = ({ isOpen, onClose, property }) => {
  if (!isOpen || !property) return null;

  const handleUnitStatusChange = async (unitIndex, newStatus) => {
    const propertyDocRef = doc(db, "properties", property.id);
    const updatedInventory = [...property.inventory];

    // This logic assumes a simple structure. Adjust if your inventory structure is different.
    const actualIndex = property.inventory.findIndex(
      (item) =>
        item.unitNumber === updatedInventory[unitIndex].unitNumber &&
        item.typeName === updatedInventory[unitIndex].typeName
    );

    if (actualIndex !== -1) {
      updatedInventory[actualIndex].status = newStatus;
      try {
        await updateDoc(propertyDocRef, { inventory: updatedInventory });
        toast.success(`Unit status updated!`);
      } catch (error) {
        toast.error("Failed to update unit status.");
        console.error("Error updating inventory:", error);
      }
    }
  };

  const groupedInventory =
    property.listingType === "Project"
      ? property.unitTypes.map((type) => ({
          ...type,
          units: property.inventory.filter(
            (inv) => inv.typeName === type.typeName
          ),
        }))
      : [{ typeName: "Single Unit", units: property.inventory }];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
          >
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-5 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                Inventory: {property.propertyTitle || property.projectName}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <FiXCircle size={24} />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {groupedInventory.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">
                    {group.typeName} ({group.units.length} units)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {group.units.map((unit, index) => (
                      <div
                        key={index}
                        className="p-4 border bg-white rounded-xl"
                      >
                        <p className="font-bold text-gray-800">
                          {unit.unitNumber || `Unit ${index + 1}`}
                        </p>
                        <select
                          value={unit.status}
                          onChange={(e) =>
                            handleUnitStatusChange(index, e.target.value)
                          }
                          className="mt-2 w-full p-2 border-gray-300 rounded-md text-sm"
                        >
                          <option>Available</option>
                          <option>Booked</option>
                          <option>Sold</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-100 border-t flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ReviewPropertyModal = ({ isOpen, onClose, property }) => {
  if (!isOpen || !property) return null;
  const handleStatusUpdate = async (newStatus) => {
    const propertyDocRef = doc(db, "properties", property.id);
    try {
      await updateDoc(propertyDocRef, { status: newStatus });
      toast.success(`Property has been ${newStatus.toLowerCase()}.`);
      onClose();
    } catch (error) {
      toast.error("Failed to update property status.");
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Review Listing
              </h2>
              <p className="text-gray-600 mb-6">
                Approve or reject this property listing submission.
              </p>
              <div className="bg-gray-50 p-4 rounded-xl space-y-2 border">
                <p>
                  <strong>Property Title:</strong>{" "}
                  {property.propertyTitle || property.projectName}
                </p>
                <p>
                  <strong>Location:</strong> {property.location}
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  {property.listingType === "Project"
                    ? "Project"
                    : property.propertyType}
                </p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusUpdate("Rejected")}
                className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <FiXCircle />
                Reject
              </button>
              <button
                onClick={() => handleStatusUpdate("Live")}
                className="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <FiCheck />
                Approve
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const PropertyCard = ({ property, onManageInventory, onReview }) => {
  const soldCount =
    property.inventory?.filter((u) => u.status === "Sold").length || 0;
  const bookedCount =
    property.inventory?.filter((u) => u.status === "Booked").length || 0;
  const progressPercentage =
    ((soldCount + bookedCount) / (property.totalUnits || 1)) * 100;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight line-clamp-2">
              {property.propertyTitle ||
                property.projectName ||
                "Untitled Property"}
            </h3>
            <p className="text-sm text-gray-600 flex items-center gap-1.5">
              <FiMapPin className="w-3.5 h-3.5 text-gray-400" />
              <span className="truncate">{property.location}</span>
            </p>
          </div>
          <div className="flex-shrink-0">
            <StatusBadge status={property.status} />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Units Progress
            </span>
            <span className="text-sm font-semibold text-gray-800">
              {soldCount + bookedCount} / {property.totalUnits}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
            <span>100%</span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-1">
              {property.listingType === "Project" ? "Starts from" : "Price"}
            </p>
            <p className="text-xl font-bold text-gray-900">
              ₹
              {property.basePrice
                ? Number(property.basePrice).toLocaleString("en-IN")
                : "N/A"}
            </p>
          </div>
          <div className="flex-shrink-0 ml-4">
            {property.status === "Pending Approval" ? (
              <button
                onClick={() => onReview(property)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <FiEye className="w-4 h-4" /> Review
              </button>
            ) : (
              <button
                onClick={() => onManageInventory(property)}
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <FiEdit className="w-4 h-4" /> Manage
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [isPurposeModalOpen, setPurposeModalOpen] = useState(false);
  const [isInventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const q = query(collection(db, "properties"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const propsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(propsData);
        setLoading(false);
      },
      (err) => {
        setError("Failed to fetch properties.");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleManageInventory = (property) => {
    setSelectedProperty(property);
    setInventoryModalOpen(true);
  };

  const handleReviewProperty = (property) => {
    setSelectedProperty(property);
    setReviewModalOpen(true);
  };

  const filteredProperties = properties.filter((prop) => {
    const matchesTab = activeTab === "All" || prop.status === activeTab;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      (prop.propertyTitle &&
        prop.propertyTitle.toLowerCase().includes(searchLower)) ||
      (prop.projectName &&
        prop.projectName.toLowerCase().includes(searchLower)) ||
      (prop.location && prop.location.toLowerCase().includes(searchLower));
    return matchesTab && matchesSearch;
  });

  const stats = {
    total: properties.length,
    live: properties.filter((p) => p.status === "Live").length,
    pending: properties.filter((p) => p.status === "Pending Approval").length,
    totalUnits: properties.reduce((sum, p) => sum + (p.totalUnits || 0), 0),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <SelectPurposeModal
        isOpen={isPurposeModalOpen}
        onClose={() => setPurposeModalOpen(false)}
      />
      <ManageInventoryModal
        isOpen={isInventoryModalOpen}
        onClose={() => setInventoryModalOpen(false)}
        property={selectedProperty}
      />
      <ReviewPropertyModal
        isOpen={isReviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        property={selectedProperty}
      />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Property & Project Management
          </h1>
          <p className="text-gray-600 mt-2">
            Add, verify, and manage all property listings and projects.
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-3 rounded-t-2xl shadow-lg">
          <button
            onClick={() => setPurposeModalOpen(true)}
            className="px-5 py-2.5 bg-white text-blue-600 font-semibold rounded-lg shadow-inner hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <FiPlus /> Add New Listing
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Listings
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats.total}
              </p>
            </div>
            <FiGrid className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Live</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {stats.live}
              </p>
            </div>
            <FiTrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Approval
              </p>
              <p className="text-3xl font-bold text-amber-600 mt-1">
                {stats.pending}
              </p>
            </div>
            <FiCalendar className="w-8 h-8 text-amber-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Units</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {stats.totalUnits}
              </p>
            </div>
            <FiUsers className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <nav className="flex flex-wrap gap-2">
            {["All", "Live", "Pending Approval", "Rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full sm:w-80"
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12 text-gray-600">
          Loading Properties...
        </div>
      )}
      {error && <div className="text-center py-12 text-red-600">{error}</div>}
      {!loading && filteredProperties.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
          <FiHome className="mx-auto text-5xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No properties found
          </h3>
          <p className="text-gray-500">
            There are no properties matching your current filters.
          </p>
        </div>
      )}

      {!loading && filteredProperties.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onManageInventory={handleManageInventory}
              onReview={handleReviewProperty}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;
