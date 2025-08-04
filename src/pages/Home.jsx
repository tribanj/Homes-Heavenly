import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import AllServicesModal from "../components/Services/AllServicesModal";
import {
  FiSearch,
  FiHome,
  FiMapPin,
  FiCheckCircle,
  FiFilter,
  FiX,
} from "react-icons/fi";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaRegHeart,
  FaShareAlt,
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [auctionProperties, setAuctionProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // ✅ FIX 1: Renamed 'loading' to be specific to properties for better performance.
  const [isPropertiesLoading, setIsPropertiesLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    minArea: "",
    maxArea: "",
    amenities: [],
  });

  const topServices = [
    {
      label: "Off-Plan & Pre-Launch Property Deals",
      path: "/services/buysale/OffPlanDeals",
      image:
        "https://i.pinimg.com/1200x/b8/b7/61/b8b761004aa14e9b66c4e5745d146bc0.jpg",
    },
    {
      label: "Foreclosed & Distressed Property Sales",
      path: "/services/buysale/ForeclosedSales",
      image:
        "https://i.pinimg.com/736x/5c/d2/b1/5cd2b1ad00ac3cdb19d858e33b163ec8.jpg",
    },
    {
      label: "Tenant Screening & Background Checks",
      path: "/services/RentLease/TenantScreening",
      image:
        "https://images.unsplash.com/photo-1560184897-1e8b54d8d8df?auto=format&fit=crop&w=800&q=60",
    },
    {
      label: "Lease Agreement Drafting & Renewal",
      path: "/services/RentLease/LeaseAgreement",
      image:
        "https://navi.com/blog/wp-content/uploads/2022/12/Lease-Agreement.jpg",
    },
    {
      label: "Rent Collection & Tenant Management",
      path: "/services/propertymanagement/RentCollection",
      image:
        "https://th.bing.com/th/id/R.016bd747e5c96e25e7e12e44b7a4c712?rik=qw1JVUWK224Jcw&riu=http%3a%2f%2f10starshomes.com%2fwp-content%2fuploads%2f2021%2f08%2f236578449_1249180902187319_5408685416113932251_n.jpg&ehk=ZJMFwLVZ9SRK2cZiW3BFjjCQ8YF%2bSsUpxzeVQGzxqro%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      label: "Investment Planning & ROI Analysis",
      path: "/services/investmentadvisory/InvestmentPlanning",
      image:
        "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=60",
    },
    {
      label: "Home Loan & Mortgage Assistance",
      path: "/services/financialservices/HomeLoanAssistance",
      image:
        "https://finiscope.advertroindia.co.in/uploads-advertro-03-08-2019/FINISCOPE/products/55/housing-loan.jpg",
    },
    {
      label: "Interior Designing & Home Furnishing",
      path: "/services/constructionservices/InteriorDesigning",
      image:
        "https://th.bing.com/th/id/OIP.HrFZA38CXzWudIGQ0Dr-TQHaEj?w=246&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
  ];

  const propertyTypes = ["Apartment", "House", "Villa", "Plot", "Commercial"];
  const amenitiesList = [
    "Parking",
    "Garden",
    "Pool",
    "Furnished",
    "AC",
    "Security",
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsPropertiesLoading(true);
        const rentSaleQuery = query(
          collection(db, "property_for_rent_or_sale"),
          where("status", "==", "approved"),
          orderBy("timestamp", "desc"),
          limit(12)
        );
        const rentSaleSnapshot = await getDocs(rentSaleQuery);
        const rentSalePropertiesData = rentSaleSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          listingType: doc.data().listingType?.toLowerCase() || "rent",
        }));

        const auctionQuery = query(
          collection(db, "property_for_auction"),
          where("status", "==", "approved"),
          orderBy("updatedAt", "desc")
        );
        const auctionSnapshot = await getDocs(auctionQuery);
        const auctionPropertiesData = auctionSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.basicDetails?.listingTitle || "Auction Property",
            price: data.auctionDetails?.reservePrice || 0,
            locality: data.locationDetails?.locality || "",
            city: data.locationDetails?.city || "",
            bedrooms: data.propertyDetails?.bedrooms || "",
            bathrooms: data.propertyDetails?.bathrooms || "",
            builtupArea: data.propertyDetails?.builtUpArea || "",
            photos: data.mediaUploads?.propertyImages || [],
            listingType: "auction",
            auctionDetails: data.auctionDetails || {},
            propertyType: data.propertyDetails?.propertyType || "",
          };
        });

        setProperties(rentSalePropertiesData);
        setAuctionProperties(auctionPropertiesData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsPropertiesLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (amenity) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const resetFilters = () => {
    setFilters({
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      minArea: "",
      maxArea: "",
      amenities: [],
    });
    setSearchQuery("");
  };

  const filterProperties = (propertyList) => {
    return propertyList.filter((property) => {
      const matchesSearch =
        property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.locality?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPropertyType =
        !filters.propertyType ||
        property.propertyType?.toLowerCase() ===
          filters.propertyType.toLowerCase();
      const price = property.price || 0;
      const matchesPrice =
        (!filters.minPrice || price >= Number(filters.minPrice)) &&
        (!filters.maxPrice || price <= Number(filters.maxPrice));
      const matchesBedrooms =
        !filters.bedrooms || String(property.bedrooms) === filters.bedrooms;
      const matchesBathrooms =
        !filters.bathrooms || String(property.bathrooms) === filters.bathrooms;
      const area = property.builtupArea || 0;
      const matchesArea =
        (!filters.minArea || area >= Number(filters.minArea)) &&
        (!filters.maxArea || area <= Number(filters.maxArea));
      const matchesAmenities =
        filters.amenities.length === 0 ||
        filters.amenities.every((amenity) =>
          property.amenities?.includes(amenity.toLowerCase())
        );
      return (
        matchesSearch &&
        matchesPropertyType &&
        matchesPrice &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesArea &&
        matchesAmenities
      );
    });
  };

  const getVisibleProperties = () => {
    if (activeTab === "auction") {
      return filterProperties(auctionProperties);
    }
    const baseProperties = properties.filter((property) => {
      if (activeTab === "all") return true;
      return property.listingType === activeTab;
    });
    return filterProperties(baseProperties);
  };

  const visibleProperties = getVisibleProperties();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-4 px-4 text-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500"
          >
            Discover Your Dream Property
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Premium Homes And Apartments Curated For Your Perfect Lifestyle
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="flex shadow-2xl rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search by location, property, or type..."
                className="flex-1 px-4 py-3 focus:outline-none text-white bg-gray-800 border border-gray-700 rounded-l-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="bg-amber-500 hover:bg-amber-600 px-4 flex items-center transition text-white font-medium"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiFilter className="text-lg mr-2" />
                Filters
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800 p-6 shadow-xl border-t border-gray-700 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <FiFilter className="mr-2 text-amber-500" />
                  Advanced Filters
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={filters.propertyType}
                    onChange={handleFilterChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">All Types</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="w-1/2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="w-1/2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Bedrooms
                  </label>
                  <select
                    name="bedrooms"
                    value={filters.bedrooms}
                    onChange={handleFilterChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">Any</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}+
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Bathrooms
                  </label>
                  <select
                    name="bathrooms"
                    value={filters.bathrooms}
                    onChange={handleFilterChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">Any</option>
                    {[1, 2, 3].map((n) => (
                      <option key={n} value={n}>
                        {n}+
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium mb-2">
                    Area (sqft)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      name="minArea"
                      placeholder="Min"
                      value={filters.minArea}
                      onChange={handleFilterChange}
                      className="w-1/2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                    <input
                      type="number"
                      name="maxArea"
                      placeholder="Max"
                      value={filters.maxArea}
                      onChange={handleFilterChange}
                      className="w-1/2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium mb-2">
                    Amenities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {amenitiesList.map((amenity) => (
                      <button
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-3 py-1 rounded-full text-sm flex items-center transition-colors ${
                          filters.amenities.includes(amenity)
                            ? "bg-amber-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {filters.amenities.includes(amenity) && (
                          <FiCheckCircle className="mr-1" />
                        )}{" "}
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-4 flex justify-end items-end space-x-3 pt-4">
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-6 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg text-white transition flex-1 sm:flex-none"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ FIX 2: Main Content Area - No longer uses a global loading spinner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-800 rounded-xl shadow-lg p-1 space-x-1">
            {["all", "rent", "sale", "auction", "services"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg transition font-medium text-sm capitalize ${
                  activeTab === tab
                    ? "bg-amber-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                {tab === "all" ? "All Properties" : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {/* Services tab renders INSTANTLY because it does not depend on isPropertiesLoading */}
          {activeTab === "services" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {topServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    // ✅ FIX 3: Corrected typo 'leHover' to 'whileHover'
                    whileHover={{
                      y: -5,
                      boxShadow:
                        "0 10px 15px -3px rgba(245, 158, 11, 0.1), 0 4px 6px -2px rgba(245, 158, 11, 0.05)",
                    }}
                    className="bg-gray-800 rounded-xl shadow-xl p-4 cursor-pointer w-72 h-80 flex flex-col group"
                    onClick={() => navigate(service.path)}
                  >
                    <div className="h-48 w-full rounded-md overflow-hidden mb-4">
                      <img
                        src={service.image}
                        alt={service.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-md font-semibold text-white text-center flex-grow flex items-center justify-center">
                      {service.label}
                    </h3>
                  </motion.div>
                ))}
              </div>
              <div className="mt-16 mb-12 flex justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3 bg-amber-600 hover:bg-amber-700 rounded-lg text-white font-semibold text-lg transition-transform hover:scale-105"
                >
                  View All Services
                </button>
              </div>
              <AllServicesModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </>
          )}

          {/* Property tabs now have their OWN loading logic */}
          {["all", "rent", "sale", "auction"].includes(activeTab) && (
            <>
              {isPropertiesLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                </div>
              ) : visibleProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {visibleProperties.map((property) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                      className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                      onClick={() =>
                        activeTab === "auction"
                          ? navigate("/services/buysale/AuctionSupport")
                          : navigate(`/property/${property.id}`)
                      }
                    >
                      <div className="relative h-56 w-full">
                        <img
                          src={
                            property.photos?.[0] || "/images/placeholder.jpg"
                          }
                          alt={property.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-0 left-0 bg-amber-600 text-white px-3 py-1 text-sm font-medium rounded-br-lg capitalize">
                          {property.listingType}
                        </div>
                        <div className="absolute top-0 right-0 flex space-x-2 p-3">
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-gray-900/80 rounded-full backdrop-blur hover:bg-amber-600 transition"
                          >
                            <FaRegHeart className="text-white" />
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-gray-900/80 rounded-full backdrop-blur hover:bg-amber-600 transition"
                          >
                            <FaShareAlt className="text-white" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold truncate text-white">
                          {property.title}
                        </h3>
                        <p className="text-gray-400 mb-3 flex items-center text-sm">
                          <FiMapPin className="mr-2 text-amber-500" />
                          {[property.locality, property.city]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                        <p className="text-amber-500 font-bold text-xl mb-3">
                          ₹{property.price?.toLocaleString("en-IN")}
                          {property.listingType === "rent" && "/mo"}
                        </p>
                        <div className="flex justify-between border-t border-gray-700 pt-3 text-gray-400 text-sm">
                          <div className="flex items-center">
                            <FaBed className="mr-2 text-amber-500" />
                            <span>{property.bedrooms || "N/A"} Beds</span>
                          </div>
                          <div className="flex items-center">
                            <FaBath className="mr-2 text-amber-500" />
                            <span>{property.bathrooms || "N/A"} Baths</span>
                          </div>
                          <div className="flex items-center">
                            <FaRulerCombined className="mr-2 text-amber-500" />
                            <span>{property.builtupArea || "N/A"} sqft</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-800 rounded-xl">
                  <FiHome className="mx-auto text-5xl text-amber-500 mb-4" />
                  <h3 className="text-2xl font-medium text-white mb-2">
                    No Properties Found
                  </h3>
                  <p className="text-gray-400">
                    Try adjusting your search or filters.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg text-white transition"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
