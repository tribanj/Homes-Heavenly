// ✅ Cleaned-up Navbar with left-aligned navlinks and structured layout
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import AuthModal from "./modals/AuthModal";
import logoHome from '../assets/logo 2.jpg'
import services from "./constants/Services";

function Navbar() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showServices, setShowServices] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
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
                {[
                  { label: "Home", path: "/" },
                  { label: "Buy&Sale", path: "/buy&sale" },
                  { label: "Rent", path: "/rent-page" },
                  { label: "Post Ad", path: "/select-purpose" },
                  { label: "Contact Us", path: "/contactus-page" },
                ].map(({ label, path }) => (
                  <Link
                    key={label}
                    to={path}
                    className="block m-2 p-1 text-sm text-white no-underline hover:bg-blue-800"
                  >
                    {label}
                  </Link>
                ))}

                {/* Services Dropdown */}
                <div
                  className=""
                  onMouseEnter={() => setShowServices(true)}
                  onMouseLeave={() => {
                    setShowServices(false);
                    setActiveService(null);
                  }}
                >
                  <button className="text-sm hover:bg-gray-700 px-3 py-2 my-25 rounded-md">
                    Services
                  </button>

                  {showServices && (
                    <div className="absolute top-full mt-2 w-60 bg-white text-black shadow rounded-md">
                      {services.map((service, index) => (
                        <div
                          key={index}
                          className="group relative px-4 py-2 hover:bg-gray-100"
                          onMouseEnter={() => setActiveService(index)}
                        >
                          {service.title}
                          {activeService === index && (
                            <div className="absolute left-full top-0 ml-1 w-64 bg-white border rounded shadow-lg">
                              {service.options.map((opt, idx) => (
                                <Link
                                  key={idx}
                                  to={opt.path}
                                  className="block px-4 py-2 text-sm hover:bg-gray-100"
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

            {/* Right side: Account/Login - Now clickable */}
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
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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

        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-4 pb-6 space-y-2 bg-gray-800 text-white">
            {["Home", "Buy/Sale", "Rent", "Post Ad", "Contact Us"].map(
              (label, idx) => (
                <Link
                  key={idx}
                  to={`/${label.toLowerCase().replace(" ", "-")}`}
                  className="block px-3 py-2 text-sm rounded hover:bg-gray-700"
                >
                  {label}
                </Link>
              )
            )}
            <button
              onClick={() => setShowServices(!showServices)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-700"
            >
              Services
            </button>
            {showServices && (
              <div className="pl-3">
                {services.map((s, i) => (
                  <div key={i} className="mt-1">
                    <p className="text-sm font-semibold">{s.title}</p>
                    {s.options.map((o, j) => (
                      <Link
                        key={j}
                        to={o.path}
                        className="block text-sm px-2 py-1 hover:bg-gray-700"
                      >
                        {o.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={handleProfileClick}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-700"
            >
              {user ? "My Profile" : "Login / Signup"}
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;