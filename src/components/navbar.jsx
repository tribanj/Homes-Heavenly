import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm";
import { useAuth } from "../context/AuthContext";
import "../App.css";
import "./navbar.css";

const services = [
  {
    title: "Buy & Sell Properties",
    options: [
      { label: "Off-Plan & Pre-Launch Property Deals", path: "/services/buysale/OffPlanDeals" },
      { label: "Free Property Valuation & Market Appraisal", path: "/services/buysale/BookValuation" },
      { label: "Foreclosed & Distressed Property Sales", path: "/services/buysale/ForeclosedSales" },
      { label: "Auctions & Bidding Support", path: "/services/buysale/AuctionSupport" },
      { label: "Legal & Documentation Assistance for Transactions", path: "/services/buysale/TransactionLegalHelp" },
    ]
  },
  {
    title: "Rent & Lease Services",
    options: [
      { label: "Tenant Screening & Background Checks", path: "/services/RentLease/TenantScreening" },
      { label: "Lease Agreement Drafting & Renewal", path: "/services/RentLease/LeaseAgreement" },
      { label: "Co-Living & Shared Housing Solutions", path: "/services/RentLease/CoLivingSolutions" },
      { label: "Short-Term & Vacation Rentals", path: "/services/RentLease/VacationRentals" },
      { label: "Student Housing & PG Listings", path: "/services/RentLease/StudentHousing" },
    ]
  },
  {
    title: "Property Management Services",
    options: [
      { label: "Rent Collection & Tenant Management", path: "/services/propertymanagement/RentCollection" },
      { label: "Maintenance & Repairs Coordination", path: "/services/propertymanagement/MaintenanceRepairs" },
      { label: "Legal Dispute Resolution for Landlords & Tenants", path: "/services/propertymanagement/LegalDisputeResolution" },
      { label: "Home Insurance & Property Protection Plans", path: "/services/propertymanagement/HomeInsurancePlans" },
    ]
  },
  {
    title: "Real Estate Investment & Advisory",
    options: [
      { label: "Investment Planning & ROI Analysis", path: "/services/investmentadvisory/InvestmentPlanning" },
      { label: "Land & Plot Investment Services", path: "/services/investmentadvisory/LandPlotInvestment" },
      { label: "Fractional Ownership & REIT Investment", path: "/services/investmentadvisory/FractionalOwnership" },
      { label: "Market Trends & Price Forecasting", path: "/services/investmentadvisory/MarketTrends" },
    ]
  },
  {
    title: "Home Loans & Financial Services",
    options: [
      { label: "Home Loan & Mortgage Assistance", path: "/services/financialservices/HomeLoanAssistance" },
      { label: "Loan Refinancing & Balance Transfer", path: "/services/financialservices/LoanRefinancing" },
      { label: "Real Estate Tax & Investment Planning", path: "/services/financialservices/RealEstateTaxPlanning" },
      // { label: "Loan Finance Services", path: "/services/financialservices/LoansFinanceServices" },
    ]
  },
  {
    title: "Construction & Renovation Services",
    options: [
      { label: "Custom Home Construction & Architectural Design", path: "/services/constructionservices/CustomHomeConstruction" },
      { label: "Interior Designing & Home Furnishing", path: "/services/constructionservices/InteriorDesigning" },
      { label: "Smart Home & Automation Installations", path: "/services/constructionservices/SmartHomeInstallations" },
      { label: "Landscaping & Outdoor Living Solutions", path: "/services/constructionservices/LandscapingSolutions" },
    ]
  },
  {
    title: "Corporate & Commercial Real Estate Services",
    options: [
      { label: "Office Space Leasing & Business Relocation", path: "/services/corporateservices/OfficeSpaceLeasing" },
      { label: "Industrial, Warehouse & Retail Space Solutions", path: "/services/corporateservices/IndustrialRetailSolutions" },
      { label: "Real Estate Solutions for Corporates & Startups", path: "/services/corporateservices/CorporateRealEstate" },
    ]
  },
  {
    title: "Legal & Compliance Services",
    options: [
      { label: "Property Title Verification & Due Diligence", path: "/services/legalservices/TitleVerification" },
      { label: "RERA Compliance & Registration Assistance", path: "/services/legalservices/RERACompliance" },
      { label: "Landlord & Tenant Dispute Resolution", path: "/services/legalservices/DisputeResolution" },
      { label: "Stamp Duty & Property Registration Support", path: "/services/legalservices/StampDutySupport" },
    ]
  }
];

function Navbar() {
  const [showAccount, setShowAccount] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const { user, logout, loading } = useAuth();
  if (loading) return null;

  const getDashboardPath = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "admin": return "/admin-dashboard";
      case "user":
      case "builder":
      case "agent": return "/company-dashboard";
      default: return "/dashboard";
    }
  };

  const collapseMenu = () => setExpanded(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-relative" style={{ zIndex: 1000 }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={collapseMenu}>Real Estate</Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-controls="navbarNav"
            aria-expanded={expanded}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/buy-page">Buy</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sale-page">Sale</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/rent-page">Rent</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/select-purpose">Post ad</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contactus-page">Contact Us</Link></li>

              <li
                className="nav-item position-relative"
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => {
                  setShowServices(false);
                  setActiveService(null);
                }}
              >
                <span className="nav-link text-white" style={{ cursor: "pointer" }} role="button">
                  Services
                </span>

                {showServices && (
                  <div className="nav-services-dropdown shadow bg-white position-absolute p-2 rounded" style={{ top: '100%', left: 0, zIndex: 999 }}>
                    {services.map((service, index) => (
                      <div
                        key={index}
                        className="nav-service-item px-2 py-1"
                        onMouseEnter={() => setActiveService(index)}
                        style={{ position: "relative" }}
                      >
                        <strong>{service.title}</strong>
                        {activeService === index && (
                          <div className="nav-service-submenu bg-light border rounded mt-2 p-2 position-absolute" style={{ left: '100%', top: 0, whiteSpace: 'nowrap', minWidth: '300px', zIndex: 1000 }}>
                            {service.options.map((option, idx) => (
                              <Link
                                key={idx}
                                to={option.path}
                                className="dropdown-item text-dark py-1 text-center"
                                onClick={collapseMenu}
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
              </li>
            </ul>

            <ul className="navbar-nav ms-auto d-flex align-items-center">
              {user ? (
                <li className="nav-item dropdown">
                  <button
                    className="nav-link btn btn-link text-white p-0 border-0 dropdown-toggle"
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                    <li><Link className="dropdown-item" to={getDashboardPath()} onClick={collapseMenu}>My Dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/messages" onClick={collapseMenu}>💬 Messages / Inbox</Link></li>
                    <li><Link className="dropdown-item" to="/profile" onClick={collapseMenu}>Edit Profile</Link></li>
                    <li><Link className="dropdown-item" to="/myads" onClick={collapseMenu}>💬 My Ads</Link></li>
                    <li><Link className="dropdown-item" to="/settings" onClick={collapseMenu}>⚙️ Settings</Link></li>
                    <li><Link className="dropdown-item" to="/support" onClick={collapseMenu}>📞 Support / Contact Us</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={() => { logout(); collapseMenu(); }}>Logout</button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li
                  className="nav-item position-relative"
                  onMouseEnter={() => setShowAccount(true)}
                  onMouseLeave={() => setShowAccount(false)}
                >
                  <span className="nav-link text-white" role="button">My Account</span>
                  {showAccount && (
                    <div className="p-3 shadow bg-white border rounded position-absolute" style={{ width: "350px", right: 0, top: "100%", zIndex: 1000 }}>
                      <div className="text-center mb-3">
                        <h5>Welcome Back!</h5>
                        <p>To keep connected with us please login with your personal info</p>
                        <button
                          className="btn btn-primary w-100"
                          onClick={() => {
                            setIsSignUp(false);
                            setShowAuthForm(true);
                            setShowAccount(false);
                          }}
                        >
                          Login
                        </button>
                      </div>
                      <hr />
                      <div className="text-center mt-3">
                        <h5>Hello, Friend!</h5>
                        <p>Enter your details and start your journey with us</p>
                        <button
                          className="btn btn-success w-100"
                          onClick={() => {
                            setIsSignUp(true);
                            setShowAuthForm(true);
                            setShowAccount(false);
                          }}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {showAuthForm && (
        <AuthForm isSignUp={isSignUp} onClose={() => setShowAuthForm(false)} />
      )}
    </>
  );
}

export default Navbar;
