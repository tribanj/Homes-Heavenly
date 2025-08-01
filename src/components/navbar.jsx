import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import logoHome from "../assets/logo 2.jpg";
import services from "./constants/Services";
import {
  FaAd,
  FaHome,
  FaNewspaper,
  FaHeart,
  FaTools,
  FaCalendarAlt,
  FaHistory,
  FaBell,
  FaCog,
  FaSignInAlt,
  FaUser,
} from "react-icons/fa";
import { Tooltip } from "@mui/material";

function Navbar() {
  const [showServices, setShowServices] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [adLimit, setAdLimit] = useState(2);
  const [adsUsed, setAdsUsed] = useState(0);
  const [loadingAdData, setLoadingAdData] = useState(false);
  const location = useLocation();

  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  // Set active tab based on route
  useEffect(() => {
    setActiveTab(location.pathname);
    setMobileMenuOpen(false);
  }, [location]);

  // Fetch user's ad limit data from Firestore
  useEffect(() => {
    const fetchAdLimitData = async () => {
      if (user) {
        setLoadingAdData(true);
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setAdLimit(userData.adLimit || 2);
            setAdsUsed(userData.adsUsed || 0);
          }
        } catch (error) {
          console.error("Error fetching ad limit data:", error);
        } finally {
          setLoadingAdData(false);
        }
      } else {
        // Reset to defaults when logged out
        setAdLimit(2);
        setAdsUsed(0);
      }
    };

    fetchAdLimitData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getInitials = (name) => {
    if (!name) return "US";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleProfileClick = () => {
    navigate(user ? "/user-dashboard" : "/login");
  };

  const navLinks = [
    { label: "Home", path: "/", icon: <FaHome /> },
    { label: "Buy&Sale", path: "/buy&sale", icon: <FaNewspaper /> },
    { label: "Rent", path: "/rent-page", icon: <FaHome /> },
    { label: "PG/Hostels", path: "/pgHostel", icon: <FaUser /> },
    { label: "Post Ad", path: "/select-purpose", icon: <FaAd /> },
    { label: "Contact Us", path: "/contactus-page", icon: <FaBell /> },
  ];

  const isActive = (path) => {
    return activeTab === path
      ? "bg-orange-600 text-white"
      : "hover:bg-gray-700";
  };

  // Calculate ad limit metrics
  const adLimitPercentage = Math.min(
    Math.round((adsUsed / adLimit) * 100),
    100
  );
  const adsRemaining = adLimit - adsUsed;
  const isLimitCritical = adsRemaining <= 0;
  const isLimitWarning = adsRemaining <= 2 && !isLimitCritical;

  if (loading) return null;

  return (
    <nav className="bg-gray-900 text-white shadow-lg z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logoHome} alt="Logo" className="h-15 w-auto" />
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map(({ label, path, icon }) => (
                <Link
                  key={label}
                  to={path}
                  className={`flex items-center px-2 py-2 no-underline text-white rounded-md text-sm font-medium ${isActive(
                    path
                  )}`}
                >
                  <span className="mr-2">{icon}</span>
                  {label}
                </Link>
              ))}

              {/* Services Dropdown - Restored Original Functionality */}
              <div
                className="relative"
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => {
                  setShowServices(false);
                  setActiveService(null);
                }}
              >
                <button
                  className={`flex items-center text-sm px-3 py-2 rounded ${
                    activeTab.startsWith("/services")
                      ? "bg-orange-600 text-white"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <FaTools className="mr-2" />
                  Services
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      showServices ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showServices && (
                  <div className="absolute top-full left-0 mt-0 w-64 bg-gray-800 text-white shadow-xl rounded-lg border border-gray-600 z-50">
                    {services.map((service, svcIndex) => (
                      <div
                        key={svcIndex}
                        className="group relative px-4 py-3 hover:bg-gray-700 transition-colors duration-200"
                        onMouseEnter={() => setActiveService(svcIndex)}
                      >
                        <div className="flex justify-between items-center cursor-default">
                          <span className="text-sm font-medium text-white">
                            {service.title}
                          </span>
                          <svg
                            className="w-4 h-4 text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>

                        {activeService === svcIndex && (
                          <div className="absolute left-full top-0 w-64 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50">
                            {service.options.map((opt, optIndex) => (
                              <Link
                                key={optIndex}
                                to={opt.path}
                                className="block px-4 py-3 text-sm text-white hover:bg-blue-600 hover:text-white transition-colors duration-200"
                                onClick={() => setShowServices(false)}
                              >
                                {opt.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* User Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {user && !loadingAdData && (
              <Tooltip
                title={
                  <div className="p-3">
                    <div className="font-bold text-sm mb-2">
                      Ad Posting Status
                    </div>
                    <div className="text-xs mb-1">
                      Used {adsUsed} of {adLimit} ads ({adLimitPercentage}%)
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          isLimitCritical
                            ? "bg-red-500"
                            : isLimitWarning
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${adLimitPercentage}%` }}
                      ></div>
                    </div>
                    {isLimitCritical ? (
                      <div className="text-xs mt-2 text-red-400">
                        You've reached your ad limit
                      </div>
                    ) : isLimitWarning ? (
                      <div className="text-xs mt-2 text-yellow-400">
                        Only {adsRemaining} ad{adsRemaining === 1 ? "" : "s"}{" "}
                        remaining
                      </div>
                    ) : (
                      <div className="text-xs mt-2 text-green-400">
                        {adsRemaining} ads available
                      </div>
                    )}
                    {user.role === "user" && (
                      <div className="text-xs mt-2 text-blue-400">
                        Upgrade for higher limits
                      </div>
                    )}
                  </div>
                }
                arrow
                placement="bottom"
              >
                <div className="relative cursor-pointer">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      isLimitCritical
                        ? "bg-red-900/30 border-red-500"
                        : isLimitWarning
                        ? "bg-amber-900/30 border-amber-500"
                        : "bg-gray-800 border-amber-500"
                    }`}
                  >
                    <FaAd
                      className={
                        isLimitCritical
                          ? "text-red-400"
                          : isLimitWarning
                          ? "text-amber-400"
                          : "text-amber-400"
                      }
                    />
                  </div>
                  <div
                    className={`absolute -top-2 -right-2 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold ${
                      isLimitCritical
                        ? "bg-red-600"
                        : isLimitWarning
                        ? "bg-amber-600"
                        : "bg-amber-600"
                    }`}
                  >
                    {adsRemaining}
                  </div>
                </div>
              </Tooltip>
            )}

            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              {user ? (
                <>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {getInitials(user.displayName)}
                  </div>
                  <span className="text-sm hidden lg:inline">My Profile</span>
                </>
              ) : (
                <>
                  <FaSignInAlt />
                  <span className="text-sm hidden lg:inline">Login</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map(({ label, path, icon }) => (
              <Link
                key={label}
                to={path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${isActive(
                  path
                )}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mr-3">{icon}</span>
                {label}
              </Link>
            ))}

            {/* Services Dropdown in Mobile - Restored Original Style */}
            <div className="border-t border-gray-700 pt-3 mt-3">
              <button
                onClick={() => setShowServices(!showServices)}
                className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium flex justify-between items-center transition-colors duration-200 ${
                  activeTab.startsWith("/services")
                    ? "bg-orange-600 text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <FaTools className="mr-3" />
                  Services
                </div>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-200 ${
                    showServices ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showServices && (
                <div className="pl-4 mt-2 space-y-1">
                  {services.map((service, index) => (
                    <div key={index}>
                      <button
                        onClick={() =>
                          setActiveService(
                            activeService === index ? null : index
                          )
                        }
                        className="w-full text-left px-3 py-2 text-sm font-medium hover:bg-gray-700 rounded-lg flex justify-between items-center transition-colors duration-200"
                      >
                        {service.title}
                        <svg
                          className={`w-4 h-4 transform transition-transform duration-200 ${
                            activeService === index ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {activeService === index && (
                        <div className="pl-4 mt-2 space-y-1">
                          {service.options.map((opt, idx) => (
                            <Link
                              key={idx}
                              to={opt.path}
                              className="block px-3 py-2 text-sm hover:bg-gray-700 rounded-lg transition-colors duration-200"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {opt.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ad Limit in Mobile */}
            {user && !loadingAdData && (
              <div className="px-3 py-2 border-t border-gray-700">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center text-sm font-medium">
                    <FaAd className="mr-2 text-amber-400" />
                    Ad Limit
                  </div>
                  <span className="text-xs font-semibold">
                    {adsUsed}/{adLimit} ({adLimitPercentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                  <div
                    className={`h-2 rounded-full ${
                      isLimitCritical
                        ? "bg-red-500"
                        : isLimitWarning
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${adLimitPercentage}%` }}
                  ></div>
                </div>
                {isLimitCritical ? (
                  <div className="text-xs text-red-400">
                    Limit reached - upgrade to post more
                  </div>
                ) : isLimitWarning ? (
                  <div className="text-xs text-yellow-400">
                    Only {adsRemaining} remaining
                  </div>
                ) : (
                  <div className="text-xs text-green-400">
                    {adsRemaining} ads available
                  </div>
                )}
              </div>
            )}

            {/* Profile/Login in Mobile */}
            <div className="border-t border-gray-700 pt-2">
              <button
                onClick={() => {
                  handleProfileClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              >
                {user ? (
                  <>
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                      {getInitials(user.displayName)}
                    </div>
                    My Profile
                  </>
                ) : (
                  <>
                    <FaSignInAlt className="mr-3" />
                    Login / Signup
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
