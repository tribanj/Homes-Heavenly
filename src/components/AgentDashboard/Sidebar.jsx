import React from 'react';
import { NavLink } from 'react-router-dom';
import './AgentDashboard.css'; // We'll use same css for now

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Agent Dashboard</h2>
      <nav className="sidebar-nav">
        <NavLink to="/agent/dashboard" className="nav-link">Dashboard Overview</NavLink>
        <NavLink to="/agent/manage-properties" className="nav-link">Manage Properties</NavLink>
        <NavLink to="/agent/lead-management" className="nav-link">Lead Management</NavLink>
        <NavLink to="/agent/appointments" className="nav-link">Appointment Manager</NavLink>
        <NavLink to="/agent/commissions" className="nav-link">Commission & Earnings</NavLink>
        <NavLink to="/agent/marketing" className="nav-link">Marketing & Promotions</NavLink>
        <NavLink to="/agent/training" className="nav-link">Training & Certification</NavLink>
        <NavLink to="/agent/profile-settings" className="nav-link">Profile & Settings</NavLink>
        <NavLink to="/agent/support" className="nav-link">Support & Helpdesk</NavLink>
        <NavLink to="/agent/messages" className="nav-link">📩 Messages / Inbox</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
