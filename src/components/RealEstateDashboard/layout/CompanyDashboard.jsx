import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import CompanySidebar from '../layout/CompanySidebar';
import CompanyTopbar from './CompanyTopbar';

// Dashboard Pages
import CompanyDashboardOverview from '../overview/CompanyDashboardOverview';
import AddProperty from '../listings/AddNewProperty';
import MyListings from '../listings/MyListings';
import ProjectPartnerships from '../partnerships/ProjectPartnerships';
import BrokerManagement from '../brokers/BrokerManagement';
import BookingRequests from '../appointments/BookingRequests';  
import LeadsCRM from '../crm/LeadsCRM';  
import ReportsInsights from '../reports/ReportsInsights';
import AdsPromotions from '../ads/AdsPromotions';
import BranchManagement from '../branches/BranchManagement';
import PaymentCenter from '../payments/PaymentCenter';
import LegalDocsVault from '../legal/LegalDocsVault';
import CompanySettings from '../settings/CompanySettings';
import HelpSupportCenter from '../support/HelpSupportCenter';

const CompanyDashboard = () => {
  return (
    <div className="d-flex">
      <CompanySidebar />
      <div className="flex-grow-1">
        <CompanyTopbar />
        <div className="p-4">
          <Routes>
            {/* Redirect /company-dashboard to /company-dashboard/overview */}
            <Route path="/" element={<Navigate to="overview" replace />} />

            {/* Company Dashboard Routes */}
            <Route path="overview" element={<CompanyDashboardOverview />} />
            <Route path="add-property" element={<AddProperty />} />
            <Route path="my-listings" element={<MyListings />} />
            <Route path="project-partnerships" element={<ProjectPartnerships />} />
            <Route path="brokers" element={<BrokerManagement />} />
            <Route path="booking-requests" element={<BookingRequests />} />
            <Route path="crm" element={<LeadsCRM />} />
            <Route path="reports" element={<ReportsInsights />} />
            <Route path="ads" element={<AdsPromotions />} />
            <Route path="branches" element={<BranchManagement />} />
            <Route path="payments" element={<PaymentCenter />} />
            <Route path="legal-docs" element={<LegalDocsVault />} />
            <Route path="company-settings" element={<CompanySettings />} />
            <Route path="help-support" element={<HelpSupportCenter />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
