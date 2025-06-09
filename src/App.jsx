import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import AuthForm from './AuthForm';
import Home from './pages/Home';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FirebaseAuthProvider } from './context/FirebaseAuthContext';

// Dashboards
import UserDashboard from './components/UserDashboard/UserDashboard';
import AdminDashboard from './components/Admindashboard/AdminDashboard';
import BuilderDashboard from './components/BuilderDashboard/layout/BuilderDashboard';
import CompanyDashboard from './components/RealEstateDashboard/layout/CompanyDashboard';
import AgentDashboard from './components/AgentDashboard/AgentDashboardHome';

// Buy Sell Services
import BookValuation from './components/Services/buysale/BookValuation';
import OffPlanDeals from './components/Services/buysale/OffPlanDeals';
import ForeclosedSales from './components/Services/buysale/ForeclosedSales';
import AuctionSupport from './components/Services/buysale/AuctionSupport';
import SubmitInquiry from './components/Services/buysale/SubmitInquiry';
import TransactionLegalHelp from './components/Services/buysale/TransactionLegalHelp';

// Rent & Lease Services
import TenantScreening from './components/Services/rentlease/TenantScreening';
import LeaseAgreement from './components/Services/rentlease/LeaseAgreement';
import CoLivingSolutions from './components/Services/rentlease/CoLivingSolutions';
import ShortTermRentals from './components/Services/rentlease/ShortTermRentals';
import StudentHousing from './components/Services/rentlease/StudentHousing';

// Property Management Services
import RentCollection from './components/Services/propertymanagement/RentCollection';
import MaintenanceRepairs from './components/Services/propertymanagement/MaintenanceRepairs';
import LegalDisputeResolution from './components/Services/propertymanagement/LegalDisputeResolution';
import HomeInsurancePlans from './components/Services/propertymanagement/HomeInsurancePlans';

// Investment & Advisory Services
import InvestmentPlanning from './components/Services/investmentadvisory/InvestmentPlanning';
import LandPlotInvestment from './components/Services/investmentadvisory/LandPlotInvestment';
import FractionalOwnership from './components/Services/investmentadvisory/FractionalOwnership';
import MarketTrends from './components/Services/investmentadvisory/MarketTrends';

// Financial Services
import HomeLoanAssistance from './components/Services/financialservices/HomeLoanAssistance';
import LoanRefinancing from './components/Services/financialservices/LoanRefinancing';
import RealEstateTaxPlanning from './components/Services/financialservices/RealEstateTaxPlanning';
// import LoansFinanceServices from './components/Services/financialservices/LoansFinanceServices';

// Construction Services
import CustomHomeConstruction from './components/Services/constructionservices/CustomHomeConstruction';
import InteriorDesigning from './components/Services/constructionservices/InteriorDesigning';
import SmartHomeInstallations from './components/Services/constructionservices/SmartHomeInstallations';
import LandscapingSolutions from './components/Services/constructionservices/LandscapingSolutions';

// Corporate Services
import OfficeSpaceLeasing from './components/Services/corporateservices/OfficeSpaceLeasing';
import IndustrialRetailSolutions from './components/Services/corporateservices/IndustrialRetailSolutions';
import CorporateRealEstate from './components/Services/corporateservices/CorporateRealEstate';

// Legal Services
import TitleVerification from './components/Services/legalservices/TitleVerification';
import RERACompliance from './components/Services/legalservices/RERACompliance';
import DisputeResolution from './components/Services/legalservices/DisputeResolution';
import StampDutySupport from './components/Services/legalservices/StampDutySupport';

// Property Posting
import SelectAdPurpose from './pages/SelectAdPurpose';
import PostPropertyPage from './components/PostProperty/Sale/PostPropertyPage';
import RentPropertyPage from './components/PostProperty/rent/RentPropertyPage';
import PreLaunchProjectPage from './components/PostProperty/PreLaunch/PreLaunchProjectPage';
import MortgagePropertyPage from './components/PostProperty/Mortgage/MortgagePropertyPage';
import CommercialLeasePage from './components/PostProperty/CommercialLease/CommercialLeasePage';
import PGHostelPage from './components/PostProperty/PGHostel/PGHostelPage';
import BuilderProjectPage from './components/PostProperty/BuilderProject/BuilderProjectPage';
import AuctionPage from './components/PostProperty/Auction/AuctionPage';
import OtherPage from './components/PostProperty/Other/OtherPage';

// Firebase Auth Forms
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';

// Pages
import Buy from './pages/Buy';
import Sale from './pages/Sale';
import Rent from './pages/Rent';
import ContactUs from './pages/Contact';
import SearchBar from './components/Home/SearchBar';
import SearchResults from './components/Home/SearchResults';

// Admin Subcomponents
import UserManagement from './components/Admindashboard/UserManagement';
import PropertiesManagement from './components/Admindashboard/PropertiesManagement';
import ServiceManagement from './components/Admindashboard/ServiceManagement';
import PaymentsManagement from './components/Admindashboard/PaymentsManagement';
import PaymentsOverview from './components/Admindashboard/PaymentsOverview';
import PendingSubscriptions from './components/Admindashboard/PendingSubscriptions';
import PaymentHistory from './components/Admindashboard/PaymentHistory';
import AppointmentsManagement from './components/Admindashboard/AppointmentsManagement';
import LegalComplianceManagement from './components/Admindashboard/LegalComplianceManagement';
import UserSearchAnalytics from './components/Admindashboard/UserSearchAnalytics';
import UserSupport from './components/Admindashboard/UserSupport';

// Main Content
const MainContent = () => {
  const location = useLocation();
  return location.pathname === '/' ? (
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

// 404 Page
const NotFound = () => (
  <div className="text-center mt-5">
    <h2>404 - Page Not Found</h2>
  </div>
);

// Role-based redirect
const RoleBasedDashboard = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin-dashboard" replace />;
    case 'builder':
      return <Navigate to="/builder-dashboard" replace />;
    case 'agent':
      return <Navigate to="/agent-dashboard" replace />;
    case 'user':
    case 'normal':
      return <Navigate to="/user-dashboard" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

function App() {
  return (
    <AuthProvider>
      <FirebaseAuthProvider>
        <Navbar />
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<><Home /><MainContent /></>} />
          <Route path="/login" element={<AuthForm mode="login" />} />
          <Route path="/signup" element={<AuthForm mode="signup" />} />

          {/* Firebase Login/Signup as fallback */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Role-based route */}
          <Route path="/dashboard" element={<RoleBasedDashboard />} />

          {/* Dashboards */}
          <Route path="/user-dashboard/*" element={<ProtectedRoute allowedRoles={['user', 'normal', 'builder', 'agent']}><UserDashboard /></ProtectedRoute>} />
          <Route path="/builder-dashboard/*" element={<ProtectedRoute allowedRoles={['builder']}><BuilderDashboard /></ProtectedRoute>} />
          <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/agent-dashboard/*" element={<ProtectedRoute allowedRoles={['agent']}><AgentDashboard /></ProtectedRoute>} />
          <Route path="/company-dashboard/*" element={<ProtectedRoute allowedRoles={['company']}><CompanyDashboard /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
          <Route path="/admin/properties" element={<ProtectedRoute allowedRoles={['admin']}><PropertiesManagement /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute allowedRoles={['admin']}><ServiceManagement /></ProtectedRoute>} />
          <Route path="/admin/payments" element={<ProtectedRoute allowedRoles={['admin']}><PaymentsManagement /></ProtectedRoute>} />
          <Route path="/admin/payments/overview" element={<ProtectedRoute allowedRoles={['admin']}><PaymentsOverview /></ProtectedRoute>} />
          <Route path="/admin/payments/pending" element={<ProtectedRoute allowedRoles={['admin']}><PendingSubscriptions /></ProtectedRoute>} />
          <Route path="/admin/payments/history" element={<ProtectedRoute allowedRoles={['admin']}><PaymentHistory /></ProtectedRoute>} />
          <Route path="/admin/appointments" element={<ProtectedRoute allowedRoles={['admin']}><AppointmentsManagement /></ProtectedRoute>} />
          <Route path="/admin/legal" element={<ProtectedRoute allowedRoles={['admin']}><LegalComplianceManagement /></ProtectedRoute>} />
          <Route path="/admin/analytics/search" element={<ProtectedRoute allowedRoles={['admin']}><UserSearchAnalytics /></ProtectedRoute>} />
          <Route path="/admin/support" element={<ProtectedRoute allowedRoles={['admin']}><UserSupport /></ProtectedRoute>} />

          {/* Property Posting */}
          <Route path="/select-purpose" element={<SelectAdPurpose />} />
          <Route path="/post-property/sale" element={<PostPropertyPage />} />
          <Route path="/post-property/rent" element={<RentPropertyPage />} />
          <Route path="/post-property/prelaunch" element={<PreLaunchProjectPage />} />
          <Route path="/post-property/mortgage" element={<MortgagePropertyPage />} />
          <Route path="/post-property/commercial-lease" element={<CommercialLeasePage />} />
          <Route path="/post-property/pg-hostel" element={<PGHostelPage />} />
          <Route path="/post-property/builder-project" element={<BuilderProjectPage />} />
          <Route path="/post-property/auction" element={<AuctionPage />} />
          <Route path="/post-property/other" element={<OtherPage />} />

          {/* Pages */}
          <Route path="/buy" element={<Buy />} />
          <Route path="/buy-page" element={<Buy />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/sale-page" element={<Sale />} />
          <Route path="/rent" element={<RentPropertyPage />} />
          <Route path="/rent-page" element={<Rent />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/contactus-page" element={<ContactUs />} />
          <Route path="/search-results" element={<SearchResults />} />

          {/* Services */}
          <Route path="/services/buysale/BookValuation" element={<BookValuation />} />
          <Route path="/services/buysale/OffPlanDeals" element={<OffPlanDeals />} />
          <Route path="/services/buysale/ForeclosedSales" element={<ForeclosedSales />} />
          <Route path="/services/buysale/AuctionSupport" element={<AuctionSupport />} />
          <Route path="/services/buysale/TransactionLegalHelp" element={<TransactionLegalHelp />} />
          <Route path="/submit-inquiry" element={<ProtectedRoute allowedRoles={['user', 'builder', 'agent', 'company', 'admin']}><SubmitInquiry /></ProtectedRoute>} />

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
          {/* <Route path="/services/financialservices/loansfinanceservices" element={<LoansFinanceServices />} /> */}
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

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </FirebaseAuthProvider>
    </AuthProvider>
  );
}

export default App;
