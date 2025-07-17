import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
// import AuthForm from "./components/AuthForm";
import Home from "./pages/Home";
import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FirebaseAuthProvider } from "./context/FirebaseAuthContext";
// import RoleSelectionModal from "./components/modals/RoleSelectionModal";

// Dashboards
import UserDashboard from "./components/UserDashboard/UserDashboard";

// Buy Sell Services
import BookValuation from "./components/Services/buysale/BookValuation";
import OffPlanDeals from "./components/Services/buysale/OffPlanDeals";
import ForeclosedSales from "./components/Services/buysale/ForeclosedSales";
import AuctionSupport from "./components/Services/buysale/AuctionSupport";
import SubmitInquiry from "./components/Services/buysale/SubmitInquiry";
import TransactionLegalHelp from "./components/Services/buysale/TransactionLegalHelp";

// Rent & Lease Services
import TenantScreening from "./components/Services/rentlease/TenantScreening";
import LeaseAgreement from "./components/Services/rentlease/LeaseAgreement";
import CoLivingSolutions from "./components/Services/rentlease/CoLivingSolutions";
import ShortTermRentals from "./components/Services/rentlease/ShortTermRentals";
import StudentHousing from "./components/Services/rentlease/StudentHousing";

// Property Management Services
import RentCollection from "./components/Services/propertymanagement/RentCollection";
import MaintenanceRepairs from "./components/Services/propertymanagement/MaintenanceRepairs";
import LegalDisputeResolution from "./components/Services/propertymanagement/LegalDisputeResolution";
import HomeInsurancePlans from "./components/Services/propertymanagement/HomeInsurancePlans";

// Investment & Advisory Services
import InvestmentPlanning from "./components/Services/investmentadvisory/InvestmentPlanning";
import LandPlotInvestment from "./components/Services/investmentadvisory/LandPlotInvestment";
import FractionalOwnership from "./components/Services/investmentadvisory/FractionalOwnership";
import MarketTrends from "./components/Services/investmentadvisory/MarketTrends";

// Financial Services
import HomeLoanAssistance from "./components/Services/financialservices/HomeLoanAssistance";
import LoanRefinancing from "./components/Services/financialservices/LoanRefinancing";
import RealEstateTaxPlanning from "./components/Services/financialservices/RealEstateTaxPlanning";
// import LoansFinanceServices from './components/Services/financialservices/LoansFinanceServices';

// Construction Services
import CustomHomeConstruction from "./components/Services/constructionservices/CustomHomeConstruction";
import InteriorDesigning from "./components/Services/constructionservices/InteriorDesigning";
import SmartHomeInstallations from "./components/Services/constructionservices/SmartHomeInstallations";
import LandscapingSolutions from "./components/Services/constructionservices/LandscapingSolutions";

// Corporate Services
import OfficeSpaceLeasing from "./components/Services/corporateservices/OfficeSpaceLeasing";
import IndustrialRetailSolutions from "./components/Services/corporateservices/IndustrialRetailSolutions";
import CorporateRealEstate from "./components/Services/corporateservices/CorporateRealEstate";

// Legal Services
import TitleVerification from "./components/Services/legalservices/TitleVerification";
import RERACompliance from "./components/Services/legalservices/RERACompliance";
import DisputeResolution from "./components/Services/legalservices/DisputeResolution";
import StampDutySupport from "./components/Services/legalservices/StampDutySupport";

// Property Posting
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

// Firebase Auth Forms
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";

// Pages
import Buy from "./pages/Buy";
import Sale from "./pages/Sale";
import Rent from "./pages/Rent";
import ContactUs from "./pages/Contact";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./components/Admindashboard/AdminDashboard";
import PropertyDetails from "./components/listings/PropertyDetails";
import AgentDashboard from "./components/AgentDashboard/AgentDashboardHome";
import Footer from "./components/Footer";
import PrelaunchPropertyDetails from "./components/PostProperty/PreLaunch/PrelaunchPropertyDetails";
import AuctionPropertyDetails from "./components/PostProperty/Auction/AuctionPropertyDetails";
import TwoDDesign from "./pages/portfolio/2DDesign";
import ThreeDVisualization from "./pages/portfolio/ThreeDDesign";

// Main Landing Section for Home
const MainContent = () => {
  const location = useLocation();
  return location.pathname === "/" ? (
    <div className="container mt-4">
      <SearchBar />
      <div className="row mb-4">
        <div className="col">
          <h2>Properties for Sale</h2>
          <p>Explore our latest listings for houses, apartments, and more.</p>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <h2>Properties for Rent</h2>
          <p>Find the perfect rental property to suit your needs and budget.</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Our Services</h2>
          <p>We offer legal, financial, and inspection services.</p>
        </div>
      </div>
    </div>
  ) : null;
};

const NotFound = () => (
  <div className="text-center mt-5">
    <h2>404 - Page Not Found</h2>
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
    case "Real Estate Company":
      return <Navigate to="/company-dashboard" replace />;
    case "Normal User":
      return <Navigate to="/user-dashboard" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

// ✅ This safely accesses useAuth only after context is initialized
const AppInner = () => {
  const { showRoleModal } = useAuth();

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Home />
              {/* <MainContent /> */}
            </>
          }
        />
        {/* <Route path="/login" element={<AuthForm mode="login" />} />
          <Route path="/signup" element={<AuthForm mode="signup" />} /> */}

        {/* OR if you want to use Firebase forms instead: */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/dashboard" element={<RoleBasedDashboard />} />

        {/* Protected Dashboards
          <Route path="/user-dashboard/*" element={
  <ProtectedRoute allowedRoles={['Normal User', 'Builder', 'Agent', 'Company']}>
    <UserDashboard />
  </ProtectedRoute>
}>
  <Route index element={<Navigate to="overview" replace />} />
  <Route path="overview" element={<Overview />} />
  <Route path="my-properties" element={<MyProperties />} />
  <Route path="saved" element={<SavedListings />} />
  <Route path="service-requests" element={<MyServiceRequests />} />
  <Route path="appointments" element={<MyAppointments />} />
  <Route path="inquiry-history" element={<SubmitInquiryHistory />} />
  <Route path="recent-activity" element={<RecentActivity />} />
  <Route path="settings" element={<Settings />} />
</Route> */}

        {/* <Route path="/builder-dashboard/*" element={
          <ProtectedRoute allowedRoles={['Builder']}>
            <BuilderDashboard />
          </ProtectedRoute>
        } /> */}

        <Route path="/admin-dashboard" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/agent-dashboard/*" element={
          <ProtectedRoute allowedRoles={['Agent']}>
            <AgentDashboard />
          </ProtectedRoute>
        } />

        {/* <Route path="/company-dashboard/*" element={
          <ProtectedRoute allowedRoles={['Real Estate Company']}>
            <CompanyDashboard />
          </ProtectedRoute>
        } /> */}



        {/* User dashboard */}
        <Route path="/user-dashboard/*" element={<UserDashboard />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Property Posting */}
        <Route path="/select-purpose" element={<SelectAdPurpose />} />
        <Route path="/post-property/sale" element={<PostPropertyPage />} />
        <Route path="/post-property/prelaunch" element={<PreLaunchProjectPage />} />
        <Route path="/services/buysale/OffPlanDeals" element={<OffPlanDeals />} />
        <Route path="/services/buysale/OffPlanDeals/:projectId" element={<PrelaunchPropertyDetails />} />
        <Route path="/post-property/mortgage" element={<MortgagePropertyPage />} />
        <Route path="/post-property/commercial-lease" element={<CommercialLeasePage />} />
        <Route path="/post-property/pg-hostel" element={<PGHostelPage />} />
        <Route path="/post-property/builder-project" element={<BuilderProjectPage />} />
        <Route path="/post-property/auction" element={<AuctionPage />} />
        <Route path="/post-property/other" element={<OtherPage />} />
        <Route path="/buy&sale" element={<Buy />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/rent" element={<RentPropertyPage />} />
        <Route path="/rent-page" element={<Rent />} />
        <Route path="/contactus-page" element={<ContactUs />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/services/buysale/BookValuation" element={<BookValuation />} />
        <Route path="/services/buysale/ForeclosedSales" element={<ForeclosedSales />} />
        <Route path="/services/buysale/AuctionSupport" element={<AuctionSupport />} />
        <Route path="/services/buysale/AuctionSupport/:id" element={<AuctionPropertyDetails />} />
        <Route path="/services/buysale/TransactionLegalHelp" element={<TransactionLegalHelp />} />
        <Route path="/submit-inquiry" element={<ProtectedRoute allowedRoles={["Normal User", "Builder", "Agent", "Real Estate Company", "Admin"]}><SubmitInquiry /></ProtectedRoute>} />
        <Route path="/services/rentlease/tenantscreening" element={<TenantScreening />} />
        <Route path="/services/rentlease/leaseagreement" element={<LeaseAgreement />} />
        <Route path="/services/rentlease/colivingsolutions" element={<CoLivingSolutions />} />
        <Route path="/services/rentlease/shorttermrentals" element={<ShortTermRentals />} />
        <Route path="/services/rentlease/studenthousing" element={<StudentHousing />} />
        <Route path="/services/propertymanagement/RentCollection" element={<RentCollection />} />
        <Route path="/services/propertymanagement/MaintenanceRepairs" element={<MaintenanceRepairs />} />
        <Route path="/services/propertymanagement/LegalDisputeResolution" element={<LegalDisputeResolution />} />
        <Route path="/services/propertymanagement/HomeInsurancePlans" element={<HomeInsurancePlans />} />
        <Route path="/services/investmentadvisory/investmentplanning" element={<InvestmentPlanning />} />
        <Route path="/services/investmentadvisory/landplotinvestment" element={<LandPlotInvestment />} />
        <Route path="/services/investmentadvisory/fractionalownership" element={<FractionalOwnership />} />
        <Route path="/services/investmentadvisory/markettrends" element={<MarketTrends />} />
        <Route path="/services/financialservices/homeloanassistance" element={<HomeLoanAssistance />} />
        <Route path="/services/financialservices/loanrefinancing" element={<LoanRefinancing />} />
        <Route path="/services/financialservices/realestatetaxplanning" element={<RealEstateTaxPlanning />} />
        <Route path="/services/constructionservices/customhomeconstruction" element={<CustomHomeConstruction />} />
        <Route path="/services/constructionservices/interiordesigning" element={<InteriorDesigning />} />
        <Route path="/services/constructionservices/smarthomeinstallations" element={<SmartHomeInstallations />} />
        <Route path="/services/constructionservices/landscapingsolutions" element={<LandscapingSolutions />} />
        <Route path="/services/corporateservices/officespaceleasing" element={<OfficeSpaceLeasing />} />
        <Route path="/services/corporateservices/industrialretailsolutions" element={<IndustrialRetailSolutions />} />
        <Route path="/services/corporateservices/realestatesolutions" element={<CorporateRealEstate />} />
        <Route path="/services/legalservices/titleverification" element={<TitleVerification />} />
        <Route path="/services/legalservices/reracompliance" element={<RERACompliance />} />
        <Route path="/services/legalservices/disputeresolution" element={<DisputeResolution />} />
        <Route path="/services/legalservices/stampdutysupport" element={<StampDutySupport />} />
        <Route path="/portfolio/2d-designs" element={<TwoDDesign />} />
        <Route path="/portfolio/3d-visualization" element={<ThreeDVisualization />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showRoleModal && <RoleSelectionModal />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <FirebaseAuthProvider>
        <Navbar />
        <ToastContainer position="top-center" autoClose={3000} />
        <AppInner />
        <Footer />
      </FirebaseAuthProvider>
    </AuthProvider>
  );
}

export default App;
