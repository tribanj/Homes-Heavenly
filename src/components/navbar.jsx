import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./modals/AuthModal";

const services = [
  {
    title: "Buy & Sell Properties",
    options: [
      {
        label: "Off-Plan & Pre-Launch Property Deals",
        path: "/services/buysale/OffPlanDeals",
      },
      {
        label: "Free Property Valuation & Market Appraisal",
        path: "/services/buysale/BookValuation",
      },
      {
        label: "Foreclosed & Distressed Property Sales",
        path: "/services/buysale/ForeclosedSales",
      },
      {
        label: "Auctions & Bidding Support",
        path: "/services/buysale/AuctionSupport",
      },
      {
        label: "Legal & Documentation Assistance for Transactions",
        path: "/services/buysale/TransactionLegalHelp",
      },
    ],
  },
  {
    title: "Rent & Lease Services",
    options: [
      {
        label: "Tenant Screening & Background Checks",
        path: "/services/RentLease/TenantScreening",
      },
      {
        label: "Lease Agreement Drafting & Renewal",
        path: "/services/RentLease/LeaseAgreement",
      },
      {
        label: "Co-Living & Shared Housing Solutions",
        path: "/services/RentLease/CoLivingSolutions",
      },
      {
        label: "Short-Term & Vacation Rentals",
        path: "/services/RentLease/VacationRentals",
      },
      {
        label: "Student Housing & PG Listings",
        path: "/services/RentLease/StudentHousing",
      },
    ],
  },
  {
    title: "Property Management Services",
    options: [
      {
        label: "Rent Collection & Tenant Management",
        path: "/services/propertymanagement/RentCollection",
      },
      {
        label: "Maintenance & Repairs Coordination",
        path: "/services/propertymanagement/MaintenanceRepairs",
      },
      {
        label: "Legal Dispute Resolution for Landlords & Tenants",
        path: "/services/propertymanagement/LegalDisputeResolution",
      },
      {
        label: "Home Insurance & Property Protection Plans",
        path: "/services/propertymanagement/HomeInsurancePlans",
      },
    ],
  },
  {
    title: "Real Estate Investment & Advisory",
    options: [
      {
        label: "Investment Planning & ROI Analysis",
        path: "/services/investmentadvisory/InvestmentPlanning",
      },
      {
        label: "Land & Plot Investment Services",
        path: "/services/investmentadvisory/LandPlotInvestment",
      },
      {
        label: "Fractional Ownership & REIT Investment",
        path: "/services/investmentadvisory/FractionalOwnership",
      },
      {
        label: "Market Trends & Price Forecasting",
        path: "/services/investmentadvisory/MarketTrends",
      },
    ],
  },
  {
    title: "Home Loans & Financial Services",
    options: [
      {
        label: "Home Loan & Mortgage Assistance",
        path: "/services/financialservices/HomeLoanAssistance",
      },
      {
        label: "Loan Refinancing & Balance Transfer",
        path: "/services/financialservices/LoanRefinancing",
      },
      {
        label: "Real Estate Tax & Investment Planning",
        path: "/services/financialservices/RealEstateTaxPlanning",
      },
    ],
  },
  {
    title: "Construction & Renovation Services",
    options: [
      {
        label: "Custom Home Construction & Architectural Design",
        path: "/services/constructionservices/CustomHomeConstruction",
      },
      {
        label: "Interior Designing & Home Furnishing",
        path: "/services/constructionservices/InteriorDesigning",
      },
      {
        label: "Smart Home & Automation Installations",
        path: "/services/constructionservices/SmartHomeInstallations",
      },
      {
        label: "Landscaping & Outdoor Living Solutions",
        path: "/services/constructionservices/LandscapingSolutions",
      },
    ],
  },
  {
    title: "Corporate & Commercial Real Estate Services",
    options: [
      {
        label: "Office Space Leasing & Business Relocation",
        path: "/services/corporateservices/OfficeSpaceLeasing",
      },
      {
        label: "Industrial, Warehouse & Retail Space Solutions",
        path: "/services/corporateservices/IndustrialRetailSolutions",
      },
      {
        label: "Real Estate Solutions for Corporates & Startups",
        path: "/services/corporateservices/CorporateRealEstate",
      },
    ],
  },
  {
    title: "Legal & Compliance Services",
    options: [
      {
        label: "Property Title Verification & Due Diligence",
        path: "/services/legalservices/TitleVerification",
      },
      {
        label: "RERA Compliance & Registration Assistance",
        path: "/services/legalservices/RERACompliance",
      },
      {
        label: "Landlord & Tenant Dispute Resolution",
        path: "/services/legalservices/DisputeResolution",
      },
      {
        label: "Stamp Duty & Property Registration Support",
        path: "/services/legalservices/StampDutySupport",
      },
    ],
  },
];

function Navbar() {
  const [showAccount, setShowAccount] = useState(false);
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
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      <nav className="bg-gray-800 text-white shadow-lg relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and main nav items */}
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-white">
                Real Estate
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex md:ml-10 md:space-x-8 mt-[30px] text-white">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Home
                </Link>
                <Link
                  to="/buy-page"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Buy
                </Link>
                <Link
                  to="/sale-page"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Sale
                </Link>
                <Link
                  to="/rent-page"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Rent
                </Link>
                <Link
                  to="/select-purpose"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Post ad
                </Link>
                <Link
                  to="/contactus-page"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Contact Us
                </Link>

                {/* Services Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowServices(true)}
                  onMouseLeave={() => {
                    setShowServices(false);
                    setActiveService(null);
                  }}
                >
                  <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center">
                    Services
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {showServices && (
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
                      <div className="py-1">
                        {services.map((service, index) => (
                          <div
                            key={index}
                            className="relative"
                            onMouseEnter={() => setActiveService(index)}
                          >
                            <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              {service.title}
                            </span>
                            {activeService === index && (
                              <div className="absolute left-full top-0 ml-1 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                                {service.options.map((option, idx) => (
                                  <Link
                                    key={idx}
                                    to={option.path}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {option.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      mobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>

            {/* Account dropdown */}
            <div className="hidden md:flex md:items-center">
              <div
                className="relative"
                onMouseEnter={() => setShowAccount(true)}
                onMouseLeave={() => setShowAccount(false)}
              >
                <button className="flex items-center space-x-2 text-sm rounded-full focus:outline-none">
                  {user ? (
                    <>
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {getInitials(user?.displayName)}
                      </div>
                      <span>My Profile</span>
                    </>
                  ) : (
                    <span>My Account</span>
                  )}
                </button>

                {showAccount && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50">
                    {user ? (
                      <>
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                          <p className="font-medium">
                            Welcome, {user.displayName || "User"}!
                          </p>
                          <p className="text-gray-500 text-xs">{user.email}</p>
                        </div>
                        <Link
                          to="/user-dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Dashboard
                        </Link>
                        <Link
                          to="/user-dashboard/messages"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Messages / Inbox
                        </Link>
                        <Link
                          to="/user-dashboard/edit-profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit Profile
                        </Link>
                        <Link
                          to="/user-dashboard/my-ads"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Ads
                        </Link>
                        <Link
                          to="/user-dashboard/user-dashboard/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Settings
                        </Link>
                        <Link
                          to="/user-dashboard/support"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Support
                        </Link>
                        <div className="border-t border-gray-200"></div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-3 text-center border-b">
                          <p className="text-sm font-medium text-gray-700">
                            Welcome Back!
                          </p>
                          <p className="text-xs text-gray-500">
                            Login with your personal info
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setAuthMode("login");
                            setShowAuthModal(true);
                            setShowAccount(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Login
                        </button>
                        <div className="border-t border-gray-200"></div>
                        <div className="px-4 py-3 text-center">
                          <p className="text-sm font-medium text-gray-700">
                            New User?
                          </p>
                          <p className="text-xs text-gray-500">
                            Start your journey with us
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setAuthMode("signup");
                            setShowAuthModal(true);
                            setShowAccount(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign Up
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/buy-page"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Buy
              </Link>
              <Link
                to="/sale-page"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sale
              </Link>
              <Link
                to="/rent-page"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rent
              </Link>
              <Link
                to="/select-purpose"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Post ad
              </Link>
              <Link
                to="/contactus-page"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              {/* Mobile Services Dropdown */}
              <div className="relative">
                <button
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 flex justify-between items-center"
                  onClick={() => setShowServices(!showServices)}
                >
                  Services
                  <svg
                    className={`ml-2 h-4 w-4 transform ${
                      showServices ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {showServices && (
                  <div className="pl-4">
                    {services.map((service, index) => (
                      <div key={index} className="mt-1">
                        <button
                          className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 flex justify-between items-center"
                          onClick={() =>
                            setActiveService(
                              activeService === index ? null : index
                            )
                          }
                        >
                          {service.title}
                          <svg
                            className={`ml-2 h-4 w-4 transform ${
                              activeService === index ? "rotate-180" : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {activeService === index && (
                          <div className="pl-4">
                            {service.options.map((option, idx) => (
                              <Link
                                key={idx}
                                to={option.path}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {option.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Account Dropdown */}
              <div className="pt-4 pb-3 border-t border-gray-700">
                {user ? (
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {getInitials(user?.displayName)}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">
                        {user.displayName || "User"}
                      </div>
                      <div className="text-sm font-medium text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="px-5 py-3">
                    <p className="text-base font-medium text-white">
                      My Account
                    </p>
                  </div>
                )}

                <div className="mt-3 px-2 space-y-1">
                  {user ? (
                    <>
                      <Link
                        to="/user-dashboard"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Dashboard
                      </Link>
                      <Link
                        to="/messages"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Messages / Inbox
                      </Link>
                      <Link
                        to="/edit-profile"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Edit Profile
                      </Link>
                      <Link
                        to="/my-ads"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Ads
                      </Link>
                      <Link
                        to="/user-dashboard/settings"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <Link
                        to="/support"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Support
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-white hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setAuthMode("login");
                          setShowAuthModal(true);
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          setAuthMode("signup");
                          setShowAuthModal(true);
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        show={showAuthModal}
        handleClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </>
  );
}

export default Navbar;
