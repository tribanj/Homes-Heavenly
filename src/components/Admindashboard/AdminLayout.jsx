// src/components/Admindashboard/AdminLayout.js
import React from 'react';
import SidebarMenu from './SidebarMenu';
import { Outlet } from 'react-router-dom';
import './AdminLayout.css';  // Custom CSS for sticky sidebar

const AdminLayout = () => {
  return (
    <div className="admin-dashboard-container">
      <SidebarMenu />
      <div className="admin-dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
