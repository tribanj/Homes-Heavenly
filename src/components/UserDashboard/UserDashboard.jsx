// src/components/UserDashboard/UserDashboard.js

import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const location = useLocation();

  // Redirect from /dashboard/user to /dashboard/user/overview
  if (location.pathname === '/dashboard/user') {
    return <Navigate to="/dashboard/user/overview" replace />;
  }

  return (
    <div className="user-dashboard d-flex">
      <aside className="sidebar">
        <h3>👤 User Panel</h3>
        <ul>
          <li>
            <NavLink to="/user-dashboard/overview" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Dashboard Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/user-dashboard/properties" className={({ isActive }) => isActive ? 'active-link' : ''}>
              My Properties
            </NavLink>
          </li>
          <li>
            <NavLink to="/user-dashboard/messages" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Messages & Inquiries
            </NavLink>
          </li>
          <li>
            <NavLink to="/user-dashboard/analytics" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Property Analytics
            </NavLink>
          </li>
          <li>
            <NavLink to="/user-dashboard/settings" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/user-dashboard/packages" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Listings & Packages
            </NavLink>
          </li>
          <li>
            <NavLink to="/user-dashboard/alerts" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Custom Alerts
            </NavLink>
          </li>
          <li>
            <NavLink to="/user-dashboard/bookings" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Services & Appointments
            </NavLink>
          </li>
          <li>
            <NavLink to="/user-dashboard/support" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Support / Contact Us
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Main Dashboard Content */}
      <main className="main-content flex-grow-1 p-3">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
