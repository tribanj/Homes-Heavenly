import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Correctly import the styled sidebar

// Import all the components for the agent dashboard pages
import Overview from "./overview/Overview";
import ManageProperties from "./manageproperties/ManageProperties";
import LeadManagement from "./leads/LeadManagement";
import AppointmentManager from "./appointments/AppointmentManager";
import CommissionEarnings from "./commission/CommissionEarnings";
import MarketingPromotions from "./marketing/MarketingPromotions";
import TrainingCertification from "./training/TrainingCertification";
import AgentProfile from "./profile/AgentProfile";
import SupportHelpdesk from "./support/SupportHelpdesk";
import MessagesInbox from "./messages/MessagesInbox";
import AddEditProperty from "./manageproperties/AddEditProperty";
import UploadMedia from "./manageproperties/UploadMedia";
import SetOpenHouse from "./manageproperties/SetOpenHouse";

const AgentDashboardHome = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="manage-properties" element={<ManageProperties />} />
            <Route path="manage-properties/add" element={<AddEditProperty />} />
            <Route
              path="manage-properties/upload-media"
              element={<UploadMedia />}
            />
            <Route
              path="manage-properties/set-open-house"
              element={<SetOpenHouse />}
            />
            <Route path="lead-management" element={<LeadManagement />} />
            <Route path="appointments" element={<AppointmentManager />} />
            <Route
              path="commission-earnings"
              element={<CommissionEarnings />}
            />
            <Route path="marketing" element={<MarketingPromotions />} />
            <Route path="training" element={<TrainingCertification />} />
            <Route path="profile-settings" element={<AgentProfile />} />
            <Route path="support" element={<SupportHelpdesk />} />
            <Route path="messages" element={<MessagesInbox />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboardHome;
