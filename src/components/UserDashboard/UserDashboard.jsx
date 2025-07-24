import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Overview from "./Overview";
import MyAds from "./MyAds";
import SavedListings from "./SavedListings";
import MyServiceRequests from "./MyServiceRequests";
import MyAppointments from "./MyAppointments";
import SubmitInquiryHistory from "./SubmitInquiryHistory";
import RecentActivity from "./RecentActivity";
import Settings from "./Settings";

const UserDashboard = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-amber-900/20">
      {/* Sidebar - Fixed width */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content - Flexible width */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="overview" element={<Overview />} />
            <Route path="my-ads" element={<MyAds />} />
            <Route path="saved-listings" element={<SavedListings />} />
            <Route path="my-service-requests" element={<MyServiceRequests />} />
            <Route path="my-appointments" element={<MyAppointments />} />
            <Route path="submit-inquiry-history" element={<SubmitInquiryHistory />} />
            <Route path="recent-activity" element={<RecentActivity />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Overview />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;