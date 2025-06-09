import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import BuilderSidebar from './BuilderSidebar';
import BuilderTopbar from './BuilderTopbar';

// Dashboard Sections
import DashboardOverview from '../overview/DashboardOverview';
import AddProject from '../projects/AddProject';
import InventoryManagement from '../projects/InventoryManagement';
import AgentManagement from '../agents/AgentManagement';
import BookingAppointments from '../appointments/BookingAppointments';
import LegalCompliance from '../legal/LegalCompliance';
import ReportsAnalytics from '../analytics/ReportsAnalytics';
import AdsPackages from '../ads/AdsPackages';
import BuilderSettings from '../settings/BuilderSettings';
import BuilderSupport from '../support/BuilderSupport';

const BuilderDashboard = () => {
  return (
    <div className="d-flex">
      <BuilderSidebar />
      <div className="flex-grow-1">
        <BuilderTopbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<DashboardOverview />} />
            <Route path="add-project" element={<AddProject />} />
            <Route path="inventory" element={<InventoryManagement />} />
            <Route path="agents" element={<AgentManagement />} />
            <Route path="appointments" element={<BookingAppointments />} />
            <Route path="legal" element={<LegalCompliance />} />
            <Route path="analytics" element={<ReportsAnalytics />} />
            <Route path="ads" element={<AdsPackages />} />
            <Route path="settings" element={<BuilderSettings />} />
            <Route path="support" element={<BuilderSupport />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default BuilderDashboard;
