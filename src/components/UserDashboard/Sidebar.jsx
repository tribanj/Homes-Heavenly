// src/components/UserDashboard/Sidebar.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h4>User Dashboard</h4>
      <ul>
        <li><NavLink to="/user-dashboard/overview">Overview</NavLink></li>
        <li><NavLink to="/user-dashboard/my-ads">My Ads</NavLink></li>
        <li><NavLink to="/user-dashboard/saved-listings">Saved Listings</NavLink></li>
        <li><NavLink to="/user-dashboard/my-service-requests">My Service Requests</NavLink></li>
        <li><NavLink to="/user-dashboard/my-appointments">My Appointments</NavLink></li>
        <li><NavLink to="/user-dashboard/submit-inquiry-history">Inquiry History</NavLink></li>
        <li><NavLink to="/user-dashboard/recent-activity">Recent Activity</NavLink></li>
        <li><NavLink to="/user-dashboard/settings">Settings</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;
