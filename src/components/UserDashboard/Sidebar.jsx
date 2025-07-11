// src/components/UserDashboard/Sidebar.jsx

import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkStyle = ({ isActive }) =>
    isActive
      ? "block py-2 px-3 bg-blue-600 rounded text-white"
      : "block py-2 px-3 hover:bg-gray-700 rounded";

  return (
    <div>
      <h4 className="text-xxl font-bold mb-4">User Dashboard</h4>
      <ul className="space-y-2">
        <li><NavLink to="/user-dashboard/overview" className={linkStyle}>Overview</NavLink></li>
        <li><NavLink to="/user-dashboard/my-ads" className={linkStyle}>My Ads</NavLink></li>
        <li><NavLink to="/user-dashboard/saved-listings" className={linkStyle}>Saved Listings</NavLink></li>
        <li><NavLink to="/user-dashboard/my-service-requests" className={linkStyle}>My Service Requests</NavLink></li>
        <li><NavLink to="/user-dashboard/my-appointments" className={linkStyle}>My Appointments</NavLink></li>
        <li><NavLink to="/user-dashboard/submit-inquiry-history" className={linkStyle}>Inquiry History</NavLink></li>
        <li><NavLink to="/user-dashboard/recent-activity" className={linkStyle}>Recent Activity</NavLink></li>
        <li><NavLink to="/user-dashboard/settings" className={linkStyle}>Settings</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;
