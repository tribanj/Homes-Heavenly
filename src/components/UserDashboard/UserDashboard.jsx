import React from 'react';
import { NavLink, Outlet, useLocation, Navigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const location = useLocation();

  // Redirect from /dashboard/user to /dashboard/user/overview
  if (location.pathname === '/dashboard/user') {
    return <Navigate to="/dashboard/user/overview" replace />;
  }

  return (
    <div className="user-dashboard d-flex">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h3>👤 User Panel</h3>
        <ul>
          <li>
            <NavLink to="/dashboard/user/overview" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Dashboard Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/user/properties" className={({ isActive }) => isActive ? 'active-link' : ''}>
              My Properties
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/user/messages" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Messages & Inquiries
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/user/analytics" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Property Analytics
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/user/settings" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/user/packages" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Listings & Packages
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/user/alerts" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Custom Alerts
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/user/bookings" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Services & Appointments
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/user/support" className={({ isActive }) => isActive ? 'active-link' : ''}>
              Support / Contact Us
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="main-content flex-grow-1 p-3">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
