// src/components/AdminDashboard/SidebarMenu.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarMenu.css';  // Optional: style this separately

const SidebarMenu = ({ role }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3>
          {role === 'admin' ? 'Admin Menu' : role === 'user' ? 'User Menu' : role === 'builder' ? 'Builder Menu' : 'Agent Menu'}
        </h3>
      </div>
      <ul className="sidebar-links">
        {/* Admin Role Links */}
        {role === 'admin' && (
          <>
            <li>
              <NavLink to="/admin/users" activeClassName="active">User Management</NavLink>
            </li>
            <li>
              <NavLink to="/admin/properties" activeClassName="active">Properties & Listings</NavLink>
            </li>
            <li>
              <NavLink to="/admin/services" activeClassName="active">Service Management</NavLink>
            </li>
            <li className="nav-item">
          <NavLink to="/admin/analytics/search" className="nav-link">User Search Analytics</NavLink>
        </li>
            <li>
              <NavLink to="/admin/appointments" activeClassName="active">Appointments & Bookings</NavLink>
            </li>
            <li>
              <NavLink to="/admin/payments" activeClassName="active">Payments & Subscriptions</NavLink>
            </li>
            <li>
              <NavLink to="/admin/legal" activeClassName="active">Legal & Compliance</NavLink>
            </li>
            <li>
              <NavLink to="/admin/support" activeClassName="active">User Support & Complaints</NavLink>
            </li>
          </>
        )}

        {/* User Role Links */}
        {role === 'user' && (
          <>
            <li>
              <NavLink to="/user-dashboard" activeClassName="active">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/user-dashboard/properties" activeClassName="active">My Properties</NavLink>
            </li>
            <li>
              <NavLink to="/user-dashboard/messages" activeClassName="active">Messages</NavLink>
            </li>
            <li>
              <NavLink to="/user-dashboard/settings" activeClassName="active">Settings</NavLink>
            </li>
            <li>
              <NavLink to="/user-dashboard/support" activeClassName="active">Support</NavLink>
            </li>
          </>
        )}

        {/* Builder Role Links */}
        {role === 'builder' && (
          <>
            <li>
              <NavLink to="/builder-dashboard" activeClassName="active">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/builder-dashboard/properties" activeClassName="active">Manage Properties</NavLink>
            </li>
            <li>
              <NavLink to="/builder-dashboard/appointments" activeClassName="active">Appointments</NavLink>
            </li>
            <li>
              <NavLink to="/builder-dashboard/payments" activeClassName="active">Payments</NavLink>
            </li>
            <li>
              <NavLink to="/builder-dashboard/messages" activeClassName="active">Messages</NavLink>
            </li>
            <li>
              <NavLink to="/builder-dashboard/support" activeClassName="active">Support</NavLink>
            </li>
          </>
        )}

        {/* Agent Role Links */}
        {role === 'agent' && (
          <>
            <li>
              <NavLink to="/agent-dashboard" activeClassName="active">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/agent-dashboard/properties" activeClassName="active">My Properties</NavLink>
            </li>
            <li>
              <NavLink to="/agent-dashboard/appointments" activeClassName="active">Appointments</NavLink>
            </li>
            <li>
              <NavLink to="/agent-dashboard/messages" activeClassName="active">Messages</NavLink>
            </li>
            <li>
              <NavLink to="/agent-dashboard/support" activeClassName="active">Support</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default SidebarMenu;
