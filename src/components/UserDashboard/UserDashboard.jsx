// src/components/UserDashboard/UserDashboard.jsx

import React, { useState } from "react";
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
  const [activeTab, setActiveTab] = useState("overview");

  const tabMap = {
    overview: <Overview />,
    "my-ads": <MyAds />,
    "saved-listings": <SavedListings />,
    "my-service-requests": <MyServiceRequests />,
    "my-appointments": <MyAppointments />,
    "submit-inquiry-history": <SubmitInquiryHistory />,
    "recent-activity": <RecentActivity />,
    settings: <Settings />,
  };

  const linkStyle = (key) =>
    `block py-2 px-3 rounded transition font-medium ${activeTab === key
      ? "bg-blue-600 text-white"
      : "hover:bg-gray-700 text-gray-200"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-60 bg-gray-800 p-4 shadow-md">
        <h2 className="text-2xl font-semibold mb-6">User Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <button className={linkStyle("overview")} onClick={() => setActiveTab("overview")}>Overview</button>
          </li>
          <li>
            <button className={linkStyle("my-ads")} onClick={() => setActiveTab("my-ads")}>My Ads</button>
          </li>
          <li>
            <button className={linkStyle("saved-listings")} onClick={() => setActiveTab("saved-listings")}>Saved Listings</button>
          </li>
          <li>
            <button className={linkStyle("my-service-requests")} onClick={() => setActiveTab("my-service-requests")}>My Service Requests</button>
          </li>
          <li>
            <button className={linkStyle("my-appointments")} onClick={() => setActiveTab("my-appointments")}>My Appointments</button>
          </li>
          <li>
            <button className={linkStyle("submit-inquiry-history")} onClick={() => setActiveTab("submit-inquiry-history")}>Inquiry History</button>
          </li>
          <li>
            <button className={linkStyle("recent-activity")} onClick={() => setActiveTab("recent-activity")}>Recent Activity</button>
          </li>
          <li>
            <button className={linkStyle("settings")} onClick={() => setActiveTab("settings")}>Settings</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto bg-gray-950">
        {tabMap[activeTab] || <Overview />}
      </div>
    </div>
  );
};

export default UserDashboard;
