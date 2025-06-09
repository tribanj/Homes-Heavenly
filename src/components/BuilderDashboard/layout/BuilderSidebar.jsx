import React from 'react';
import { NavLink } from 'react-router-dom';

const BuilderSidebar = () => {
  return (
    <div className="bg-dark text-white p-3 min-vh-100" style={{ width: '250px' }}>
      <h5 className="mb-4">🏢 Builder Dashboard</h5>
      <nav className="nav flex-column">
        <NavLink to="/builder-dashboard" end className="nav-link text-white">Dashboard Overview</NavLink>
        <NavLink to="/builder-dashboard/add-project" className="nav-link text-white">Add New Project</NavLink>
        <NavLink to="/builder-dashboard/inventory" className="nav-link text-white">Inventory Management</NavLink>
        <NavLink to="/builder-dashboard/agents" className="nav-link text-white">Agent Management</NavLink>
        <NavLink to="/builder-dashboard/appointments" className="nav-link text-white">Appointments</NavLink>
        <NavLink to="/builder-dashboard/legal" className="nav-link text-white">Legal & Compliance</NavLink>
        <NavLink to="/builder-dashboard/analytics" className="nav-link text-white">Reports & Analytics</NavLink>
        <NavLink to="/builder-dashboard/ads" className="nav-link text-white">Ads & Packages</NavLink>
        <NavLink to="/builder-dashboard/settings" className="nav-link text-white">Profile & Settings</NavLink>
        <NavLink to="/builder-dashboard/support" className="nav-link text-white">Support</NavLink>
      </nav>
    </div>
  );
};

export default BuilderSidebar;
