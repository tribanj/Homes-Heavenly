import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TeamManagerSidebar from "./TeamManagerSidebar";
import ManagerTopbar from "./ManagerTopbar";

// Import all the pages for the dashboard
import ManagerOverview from "../pages/ManagerOverview";
import ManagerTeamManagement from "../pages/ManagerTeamManagement";
import PropertiesAndProjects from "../pages/PropertiesAndProjects";
import ManagerLeadsCRM from "../pages/ManagerLeadsCRM";
import CommissionsAndIncentives from "../pages/CommissionsAndIncentives";
import ClientCommunication from "../pages/ClientCommunication";
import ReportsAndAnalytics from "../pages/ReportsAndAnalytics";

const TeamManagerDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeamManagerSidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-30" : "ml-60"
        }`}
      >
        <ManagerTopbar isSidebarCollapsed={isSidebarCollapsed} />

        <main className="p-6 mt-20">
          <Routes>
            <Route path="/" element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<ManagerOverview />} />
            <Route path="team-management" element={<ManagerTeamManagement />} />
            <Route path="properties" element={<PropertiesAndProjects />} />
            <Route path="leads" element={<ManagerLeadsCRM />} />
            <Route path="commissions" element={<CommissionsAndIncentives />} />
            <Route path="communication" element={<ClientCommunication />} />
            <Route path="reports" element={<ReportsAndAnalytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default TeamManagerDashboard;
