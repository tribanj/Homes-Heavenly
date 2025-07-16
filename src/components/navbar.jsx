import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoHome from '../assets/logo 2.jpg';
import services from "./constants/Services";

function Navbar() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showServices, setShowServices] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();

  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Set active tab based on current route
    const path = location.pathname;
    setActiveTab(path);

    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  if (loading) return null;

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
    if (user) {
      navigate("/user-dashboard");
    } else {
      navigate("/login");
    }
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Buy&Sale", path: "/buy&sale" },
    { label: "Rent", path: "/rent-page" },
    { label: "Post Ad", path: "/select-purpose" },
    { label: "Contact Us", path: "/contactus-page" },
  ];

  const isActive = (path) => {
    return activeTab === path ? "bg-blue-800 text-white" : "hover:bg-blue-800";
  };

  return (
    <>
      <nav className="bg-gray-900 text-white shadow z-50 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            {/* Logo + All Links */}
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <img src={logoHome} alt="Home Logo" className="h-15 w-auto object-contain" />
              </Link>

              <div className="hidden md:flex items-center text-white no-underline">
                {navLinks.map(({ label, path }) => (
                  <Link
                    key={label}
                    to={path}
                    className={`block m-2 p-1 text-sm no-underline rounded text-white ${isActive(path)}`}
                  >
                    {label}
                  </Link>
                ))}

                {/* Services Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowServices(true)}
                  onMouseLeave={() => {
                    setShowServices(false);
                    setActiveService(null);
                  }}
                >
                  <button
                    className={`text-sm px-3 py-2 rounded ${activeTab.startsWith('/services') ? 'bg-blue-800 text-white' : 'hover:bg-gray-700'}`}
                  >
                    Services
                  </button>

                  {showServices && (
                    <div className="absolute top-full left-0 mt-0 w-60 bg-white text-black shadow-lg rounded-md z-50">
                      {services.map((service, index) => (
                        <div
                          key={index}
                          className="group relative px-4 py-2 hover:bg-gray-100"
                          onMouseEnter={() => setActiveService(index)}
                          onClick={() => {
                            navigate(service.options[0].path);
                            setShowServices(false);
                          }}
                        >
                          <div className="flex justify-between items-center">
                            {service.title}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>

                          {activeService === index && (
                            <div className="absolute left-full top-0 ml-1 w-64 bg-white border border-gray-200 rounded shadow-lg z-50">
                              {service.options.map((opt, idx) => (
                                <Link
                                  key={idx}
                                  to={opt.path}
                                  className="block px-4 py-2 text-sm hover:bg-gray-100"
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

            {/* Right side: Account/Login */}
            <div className="hidden md:flex items-center">
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 my-25 hover:bg-gray-700 px-3 py-2 rounded"
              >
                {user ? (
                  <>
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {getInitials(user.displayName)}
                    </div>
                    <span className="text-sm">My Profile</span>
                  </>
                ) : (
                  <span className="text-sm">Login / Signup</span>
                )}
              </button>
            </div>

            {/* Mobile menu toggle */}
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
                  xmlns="http://www.w3.org/2000/svg"
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
          <div className="md:hidden px-4 pt-2 pb-4 space-y-1 bg-gray-800 text-white">
            {navLinks.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                className={`block px-3 py-2 rounded text-sm ${isActive(path)}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            <div className="border-t border-gray-700 pt-2">
              <button
                onClick={() => setShowServices(!showServices)}
                className={`w-full text-left px-3 py-2 rounded text-sm flex justify-between items-center ${activeTab.startsWith('/services') ? 'bg-blue-800 text-white' : 'hover:bg-gray-700'}`}
              >
                Services
                <svg
                  className={`w-4 h-4 transform transition-transform ${showServices ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {showServices && (
                <div className="pl-4 mt-1 space-y-1">
                  {services.map((service, index) => (
                    <div key={index}>
                      <button
                        onClick={() => setActiveService(activeService === index ? null : index)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-700 flex justify-between items-center"
                      >
                        {service.title}
                        <svg
                          className={`w-4 h-4 transform transition-transform ${activeService === index ? 'rotate-90' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {activeService === index && (
                        <div className="pl-4 space-y-1">
                          {service.options.map((opt, idx) => (
                            <Link
                              key={idx}
                              to={opt.path}
                              className="block px-3 py-2 text-sm hover:bg-gray-700 rounded"
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

            <div className="border-t border-gray-700 pt-2">
              <button
                onClick={() => {
                  handleProfileClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-700"
              >
                {user ? "My Profile" : "Login / Signup"}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;