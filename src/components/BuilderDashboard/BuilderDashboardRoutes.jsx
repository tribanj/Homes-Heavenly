import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import all your builder dashboard pages
import DashboardOverview from './DashboardOverview';
import AddNewProject from './AddNewProject';
import InventoryManagement from './InventoryManagement';
import AgentManagement from './AgentManagement';
import BookingAppointments from './BookingAppointments';
import LegalCompliance from './LegalCompliance';
import ReportsAnalytics from './analytics/ReportsAnalytics';
import AdsPackages from './ads/AdsPackages';
import BuilderProfile from './BuilderProfile';
import SupportContact from './SupportContact';

const BuilderDashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<DashboardOverview />} />
      <Route path="add-project" element={<AddNewProject />} />
      <Route path="inventory" element={<InventoryManagement />} />
      <Route path="agents" element={<AgentManagement />} />
      <Route path="bookings" element={<BookingAppointments />} />
      <Route path="legal" element={<LegalCompliance />} />
      <Route path="analytics" element={<ReportsAnalytics />} />
      <Route path="ads" element={<AdsPackages />} />
      <Route path="profile" element={<BuilderProfile />} />
      <Route path="support" element={<SupportContact />} />
    </Routes>
  );
};

export default BuilderDashboardRoutes;
