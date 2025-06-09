// src/components/UserDashboard/UserDashboard.js

import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './UserDashboard.css';
import DashboardOverview from './DashboardOverview';
import MyProperties from './MyProperties';
import MessagesInquiries from './MessagesInquiries';
import PropertyAnalytics from './PropertyAnalytics';
import Settings from './Settings';
import ListingsPackages from './ListingsPackages';
import CustomAlerts from './CustomAlerts';
import Bookings from './Bookings';
import SupportContact from './SupportContact';

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h3>👤 User Panel</h3>
        <ul>
          <li><NavLink to="/user-dashboard/overview" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard Overview</NavLink></li>
          <li><NavLink to="/user-dashboard/properties" className={({ isActive }) => isActive ? 'active-link' : ''}>My Properties</NavLink></li>
          <li><NavLink to="/user-dashboard/messages" className={({ isActive }) => isActive ? 'active-link' : ''}>Messages & Inquiries</NavLink></li>
          <li><NavLink to="/user-dashboard/analytics" className={({ isActive }) => isActive ? 'active-link' : ''}>Property Analytics</NavLink></li>
          <li><NavLink to="/user-dashboard/settings" className={({ isActive }) => isActive ? 'active-link' : ''}>Settings</NavLink></li>
          <li><NavLink to="/user-dashboard/packages" className={({ isActive }) => isActive ? 'active-link' : ''}>Listings & Packages</NavLink></li>
          <li><NavLink to="/user-dashboard/alerts" className={({ isActive }) => isActive ? 'active-link' : ''}>Custom Alerts</NavLink></li>
          <li><NavLink to="/user-dashboard/bookings" className={({ isActive }) => isActive ? 'active-link' : ''}>Services & Appointments</NavLink></li>
          <li><NavLink to="/user-dashboard/support" className={({ isActive }) => isActive ? 'active-link' : ''}>Support / Contact Us</NavLink></li>
        </ul>
      </div>

      {/* Main Dashboard Area */}
      <div className="main-content">
        <Routes>
          {/* Corrected default index route */}
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<DashboardOverview />} />
          <Route path="properties" element={<MyProperties />} />
          <Route path="messages" element={<MessagesInquiries />} />
          <Route path="analytics" element={<PropertyAnalytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="packages" element={<ListingsPackages />} />
          <Route path="alerts" element={<CustomAlerts />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="support" element={<SupportContact />} />
          </Routes>
      </div>
    </div>
  );
};

export default UserDashboard;
