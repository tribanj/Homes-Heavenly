// src/components/AdminDashboard/SidebarMenu.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarMenu = ({ role }) => {
  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-900 text-white shadow-lg z-40 p-4">
      <h3 className="text-xl font-semibold mb-6">
        {role === 'admin' && 'Admin Menu'}
        {role === 'user' && 'User Menu'}
        {role === 'builder' && 'Builder Menu'}
        {role === 'agent' && 'Agent Menu'}
      </h3>

      <ul className="space-y-3">
        {/* Admin Role Links */}
        {role === 'admin' && (
          <>
            <li><NavLink className="block hover:text-yellow-400" to="/admin/users">User Management</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/admin/properties">Properties & Listings</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/admin/services">Service Management</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/admin/analytics/search">User Search Analytics</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/admin/appointments">Appointments</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/admin/payments">Payments</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/admin/legal">Legal & Compliance</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/admin/support">Support</NavLink></li>
          </>
        )}

        {/* User Role Links */}
        {role === 'user' && (
          <>
            <li><NavLink className="block hover:text-yellow-400" to="/user-dashboard">Dashboard</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/user-dashboard/properties">My Properties</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/user-dashboard/messages">Messages</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/user-dashboard/settings">Settings</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/user-dashboard/support">Support</NavLink></li>
          </>
        )}

        {/* Builder Role Links */}
        {role === 'builder' && (
          <>
            <li><NavLink className="block hover:text-yellow-400" to="/builder-dashboard">Dashboard</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/builder-dashboard/properties">Manage Properties</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/builder-dashboard/appointments">Appointments</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/builder-dashboard/payments">Payments</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/builder-dashboard/messages">Messages</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/builder-dashboard/support">Support</NavLink></li>
          </>
        )}

        {/* Agent Role Links */}
        {role === 'agent' && (
          <>
            <li><NavLink className="block hover:text-yellow-400" to="/agent-dashboard">Dashboard</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/agent-dashboard/properties">My Properties</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/agent-dashboard/appointments">Appointments</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/agent-dashboard/messages">Messages</NavLink></li>
            <li><NavLink className="block hover:text-yellow-400" to="/agent-dashboard/support">Support</NavLink></li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default SidebarMenu;
