import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FirebaseAuthProvider } from "./context/FirebaseAuthContext";

// --- NEW REAL ESTATE DASHBOARD IMPORTS (Using Default Imports) ---
import DashboardLayout from "./components/RealEstateDashboard/layout/DashboardLayout";
import DashboardOverview from "./components/RealEstateDashboard/pages/DashboardOverview";
import UserManagement from "./components/RealEstateDashboard/pages/UserManagement";
import PropertyManagement from "./components/RealEstateDashboard/pages/PropertyManagement";
import LeadManagement from "./components/RealEstateDashboard/pages/LeadManagement";
import TeamManagement from "./components/RealEstateDashboard/pages/TeamManagement";
import FinancialManagement from "./components/RealEstateDashboard/pages/FinancialManagement";
import Marketing from "./components/RealEstateDashboard/pages/Marketing";
import Support from "./components/RealEstateDashboard/pages/Support";
import Settings from "./components/RealEstateDashboard/pages/Settings";

// Other Dashboards
import UserDashboard from "./components/UserDashboard/UserDashboard";
import AdminDashboard from "./components/Admindashboard/AdminDashboard";
import AgentDashboard from "./components/AgentDashboard/AgentDashboardHome";

// All other component and page imports...
import BookValuation from "./components/Services/buysale/BookValuation";
import OffPlanDeals from "./components/Services/buysale/OffPlanDeals";
import ForeclosedSales from "./components/Services/buysale/ForeclosedSales";
import AuctionSupport from "./components/Services/buysale/AuctionSupport";
import SubmitInquiry from "./components/Services/buysale/SubmitInquiry";
import TransactionLegalHelp from "./components/Services/buysale/TransactionLegalHelp";
import TenantScreening from "./components/Services/rentlease/TenantScreening";
import LeaseAgreement from "./components/Services/rentlease/LeaseAgreement";
import CoLivingSolutions from "./components/Services/rentlease/CoLivingSolutions";
import ShortTermRentals from "./components/Services/rentlease/ShortTermRentals";
import StudentHousing from "./components/Services/rentlease/StudentHousing";
import RentCollection from "./components/Services/propertymanagement/RentCollection";
import MaintenanceRepairs from "./components/Services/propertymanagement/MaintenanceRepairs";
import LegalDisputeResolution from "./components/Services/propertymanagement/LegalDisputeResolution";
import HomeInsurancePlans from "./components/Services/propertymanagement/HomeInsurancePlans";
import InvestmentPlanning from "./components/Services/investmentadvisory/InvestmentPlanning";
import LandPlotInvestment from "./components/Services/investmentadvisory/LandPlotInvestment";
import FractionalOwnership from "./components/Services/investmentadvisory/FractionalOwnership";
import MarketTrends from "./components/Services/investmentadvisory/MarketTrends";
import HomeLoanAssistance from "./components/Services/financialservices/HomeLoanAssistance";
import LoanRefinancing from "./components/Services/financialservices/LoanRefinancing";
import RealEstateTaxPlanning from "./components/Services/financialservices/RealEstateTaxPlanning";
import CustomHomeConstruction from "./components/Services/constructionservices/CustomHomeConstruction";
import InteriorDesigning from "./components/Services/constructionservices/InteriorDesigning";
import SmartHomeInstallations from "./components/Services/constructionservices/SmartHomeInstallations";
import LandscapingSolutions from "./components/Services/constructionservices/LandscapingSolutions";
import OfficeSpaceLeasing from "./components/Services/corporateservices/OfficeSpaceLeasing";
import IndustrialRetailSolutions from "./components/Services/corporateservices/IndustrialRetailSolutions";
import CorporateRealEstate from "./components/Services/corporateservices/CorporateRealEstate";
import TitleVerification from "./components/Services/legalservices/TitleVerification";
import RERACompliance from "./components/Services/legalservices/RERACompliance";
import DisputeResolution from "./components/Services/legalservices/DisputeResolution";
import StampDutySupport from "./components/Services/legalservices/StampDutySupport";
import SelectAdPurpose from "./pages/SelectAdPurpose";
import PostPropertyPage from "./components/PostProperty/Sale/PostPropertyPage";
import RentPropertyPage from "./components/PostProperty/rent/RentPropertyPage";
import PreLaunchProjectPage from "./components/PostProperty/PreLaunch/PreLaunchProjectPage";
import MortgagePropertyPage from "./components/PostProperty/Mortgage/MortgagePropertyPage";
import CommercialLeasePage from "./components/PostProperty/CommercialLease/CommercialLeasePage";
import PGHostelPage from "./components/PostProperty/PGHostel/PGHostelPage";
import BuilderProjectPage from "./components/PostProperty/BuilderProject/BuilderProjectPage";
import AuctionPage from "./components/PostProperty/Auction/AuctionPage";
import OtherPage from "./components/PostProperty/Other/OtherPage";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import Buy from "./pages/Buy";
import Success from "./pages/SuccessPage";
import Rent from "./pages/Rent";
import ContactUs from "./pages/Contact";
import Unauthorized from "./pages/Unauthorized";
import PropertyDetails from "./components/listings/PropertyDetails";
import Footer from "./components/Footer";
import PrelaunchPropertyDetails from "./components/PostProperty/PreLaunch/PrelaunchPropertyDetails";
import AuctionPropertyDetails from "./components/PostProperty/Auction/AuctionPropertyDetails";
import TwoDDesign from "./pages/portfolio/2DDesign";
import ThreeDVisualization from "./pages/portfolio/ThreeDDesign";
import PgHostel from "./pages/PgHostel";
import PgHostelDetails from "./pages/PgHostelDetails";
import CoworkingSpaceDetails from "./components/Services/rentlease/CoworkingSpaceDetails";
import UserDetailsPage from "./pages/UserDetailsPage";

const NotFound = () => (
  <div className="text-center p-8">
    <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
    <h2 className="text-2xl font-semibold text-gray-700 mb-6">
      Page Not Found
    </h2>
  </div>
);

const RoleBasedDashboard = () => {
  const { user, userRole } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  switch (userRole) {
    case "Admin":
      return <Navigate to="/admin-dashboard" replace />;
    case "Builder":
      return <Navigate to="/builder-dashboard" replace />;
    case "Agent":
      return <Navigate to="/agent-dashboard" replace />;
    case "realestate":
      return <Navigate to="/company-dashboard/overview" replace />;
    case "Normal User":
      return <Navigate to="/user-dashboard" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

const AppInner = () => {
  const location = useLocation();

  const isDashboardRoute =
    location.pathname.startsWith("/company-dashboard") ||
    location.pathname.startsWith("/user-dashboard") ||
    location.pathname.startsWith("/admin-dashboard") ||
    location.pathname.startsWith("/agent-dashboard");

  return (
    <>
      {!isDashboardRoute && <Navbar />}
      <main>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<RoleBasedDashboard />} />

          {/* --- NEW REAL ESTATE DASHBOARD (DEVELOPER MODE) --- */}
          {/* I have temporarily removed the <ProtectedRoute> so you can access the routes */}
          {/* To re-enable protection, wrap <DashboardLayout /> in the ProtectedRoute again */}
          <Route path="/company-dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<DashboardOverview />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route
              path="property-management"
              element={<PropertyManagement />}
            />
            <Route path="lead-management" element={<LeadManagement />} />
            <Route path="team-management" element={<TeamManagement />} />
            <Route path="financials" element={<FinancialManagement />} />
            <Route path="marketing" element={<Marketing />} />
            <Route path="support" element={<Support />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* --- OTHER DASHBOARDS --- */}
          <Route path="/user-dashboard/*" element={<UserDashboard />} />
          <Route
            path="/admin-dashboard"
            element={
              // <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/agent-dashboard/*"
            element={
              <ProtectedRoute allowedRoles={["Agent"]}>
                <AgentDashboard />
              </ProtectedRoute>
            }
          />

          {/* --- ALL OTHER EXISTING ROUTES --- */}
          <Route path="/select-purpose" element={<SelectAdPurpose />} />
          {/* (Keep all your other service and property posting routes here...) */}
          <Route path="/post-property/sale" element={<PostPropertyPage />} />
          <Route path="/success" element={<Success />} />
          <Route
            path="/post-property/prelaunch"
            element={<PreLaunchProjectPage />}
          />
          <Route
            path="/services/buysale/OffPlanDeals"
            element={<OffPlanDeals />}
          />
          <Route
            path="/services/buysale/OffPlanDeals/:projectId"
            element={<PrelaunchPropertyDetails />}
          />
          <Route
            path="/post-property/mortgage"
            element={<MortgagePropertyPage />}
          />
          <Route
            path="/post-property/commercial-lease"
            element={<CommercialLeasePage />}
          />
          <Route path="/post-property/pg-hostel" element={<PGHostelPage />} />
          <Route
            path="/post-property/builder-project"
            element={<BuilderProjectPage />}
          />
          <Route path="/post-property/auction" element={<AuctionPage />} />
          <Route path="/post-property/other" element={<OtherPage />} />
          <Route path="/buy&sale" element={<Buy />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/pgHostel" element={<PgHostel />} />
          <Route path="/pg-hostel-details/:id" element={<PgHostelDetails />} />
          <Route path="/rent" element={<RentPropertyPage />} />
          <Route path="/rent-page" element={<Rent />} />
          <Route path="/contactus-page" element={<ContactUs />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/services/buysale/BookValuation"
            element={<BookValuation />}
          />
          <Route
            path="/services/buysale/ForeclosedSales"
            element={<ForeclosedSales />}
          />
          <Route
            path="/services/buysale/AuctionSupport"
            element={<AuctionSupport />}
          />
          <Route
            path="/services/buysale/AuctionSupport/:id"
            element={<AuctionPropertyDetails />}
          />
          <Route
            path="/services/buysale/TransactionLegalHelp"
            element={<TransactionLegalHelp />}
          />
          <Route
            path="/submit-inquiry"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Normal User",
                  "Builder",
                  "Agent",
                  "Real Estate Company",
                  "Admin",
                ]}
              >
                <SubmitInquiry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/rentlease/tenantscreening"
            element={<TenantScreening />}
          />
          <Route
            path="/services/rentlease/leaseagreement"
            element={<LeaseAgreement />}
          />
          <Route
            path="/services/rentlease/colivingsolutions"
            element={<CoLivingSolutions />}
          />
          <Route
            path="/coworking-space/:id"
            element={<CoworkingSpaceDetails />}
          />
          <Route
            path="/services/rentlease/shorttermrentals"
            element={<ShortTermRentals />}
          />
          <Route
            path="/services/rentlease/studenthousing"
            element={<StudentHousing />}
          />
          <Route
            path="/services/propertymanagement/RentCollection"
            element={<RentCollection />}
          />
          <Route
            path="/services/propertymanagement/MaintenanceRepairs"
            element={<MaintenanceRepairs />}
          />
          <Route
            path="/services/propertymanagement/LegalDisputeResolution"
            element={<LegalDisputeResolution />}
          />
          <Route
            path="/services/propertymanagement/HomeInsurancePlans"
            element={<HomeInsurancePlans />}
          />
          <Route
            path="/services/investmentadvisory/investmentplanning"
            element={<InvestmentPlanning />}
          />
          <Route
            path="/services/investmentadvisory/landplotinvestment"
            element={<LandPlotInvestment />}
          />
          <Route
            path="/services/investmentadvisory/fractionalownership"
            element={<FractionalOwnership />}
          />
          <Route
            path="/services/investmentadvisory/markettrends"
            element={<MarketTrends />}
          />
          <Route
            path="/services/financialservices/homeloanassistance"
            element={<HomeLoanAssistance />}
          />
          <Route
            path="/services/financialservices/loanrefinancing"
            element={<LoanRefinancing />}
          />
          <Route
            path="/services/financialservices/realestatetaxplanning"
            element={<RealEstateTaxPlanning />}
          />
          <Route
            path="/services/constructionservices/customhomeconstruction"
            element={<CustomHomeConstruction />}
          />
          <Route
            path="/services/constructionservices/interiordesigning"
            element={<InteriorDesigning />}
          />
          <Route
            path="/services/constructionservices/smarthomeinstallations"
            element={<SmartHomeInstallations />}
          />
          <Route
            path="/services/constructionservices/landscapingsolutions"
            element={<LandscapingSolutions />}
          />
          <Route
            path="/services/corporateservices/officespaceleasing"
            element={<OfficeSpaceLeasing />}
          />
          <Route
            path="/services/corporateservices/industrialretailsolutions"
            element={<IndustrialRetailSolutions />}
          />
          <Route
            path="/services/corporateservices/realestatesolutions"
            element={<CorporateRealEstate />}
          />
          <Route
            path="/services/legalservices/titleverification"
            element={<TitleVerification />}
          />
          <Route
            path="/services/legalservices/reracompliance"
            element={<RERACompliance />}
          />
          <Route
            path="/services/legalservices/disputeresolution"
            element={<DisputeResolution />}
          />
          <Route
            path="/services/legalservices/stampdutysupport"
            element={<StampDutySupport />}
          />
          <Route path="/portfolio/2d-designs" element={<TwoDDesign />} />
          <Route
            path="/portfolio/3d-visualization"
            element={<ThreeDVisualization />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isDashboardRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <FirebaseAuthProvider>
        <ToastContainer position="top-center" autoClose={3000} />
        <AppInner />
      </FirebaseAuthProvider>
    </AuthProvider>
  );
}

export default App;
