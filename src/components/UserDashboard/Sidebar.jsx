// src/components/UserDashboard/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './UserDashboard.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h4 className="sidebar-title">User Menu</h4>
      <ul className="sidebar-list">
        <li><NavLink to="/user-dashboard/overview">Dashboard Overview</NavLink></li>
        <li><NavLink to="/user-dashboard/properties">My Properties</NavLink></li>
        <li><NavLink to="/user-dashboard/messages">Messages & Inquiries</NavLink></li>
        <li><NavLink to="/user-dashboard/analytics">Property Analytics</NavLink></li>
        <li><NavLink to="/user-dashboard/settings">Settings</NavLink></li>
        <li><NavLink to="/user-dashboard/listings">Listings & Packages</NavLink></li>
        <li><NavLink to="/user-dashboard/alerts">Custom Alerts</NavLink></li>
        <li><NavLink to="/user-dashboard/rewards">Rewards & Loyalty</NavLink></li>
        <li><NavLink to="/user-dashboard/support">Support / Contact Us</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;
