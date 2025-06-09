// 📁 src/components/admindashboard/AdminDashboard.js

import React from 'react';
import SummaryCards from './SummaryCards';  // 📊 New component for summary stats
import SidebarMenu from './SidebarMenu';    // ✅ SidebarMenu imported

function AdminDashboard() {
  return (
    <div className="admin-dashboard-wrapper d-flex" style={{ display: 'flex', minHeight: '100vh' }}> {/* 💡 Flex layout wrapper */}

      {/* 🧭 Sidebar Navigation */}
      <div style={{
        width: '220px',
        backgroundColor: '#111c44',
        color: 'white',
        padding: '20px 15px',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        overflowY: 'auto',
      }}>
        <SidebarMenu role="admin" />
      </div>

      {/* 🖼️ Main Admin Dashboard Content */}
      <div className="container mt-5 admin-dashboard-content" style={{ marginLeft: '220px', padding: '30px 20px', flex: 1 }}>
        <h1>🔧 Admin Dashboard</h1>
        <p>Welcome, Admin! You have full control over the system.</p>

        {/* 📊 Top Summary Stats using separate component */}
        <h4 className="mt-4 mb-3">📊 Top Summary Stats</h4>
        <SummaryCards />

        {/* ⚙️ System Management - Removed the Quick Access and Buttons */}

        {/* You can add additional sections or components as needed here */}
      </div> {/* End of Main Content */}
    </div>
  );
}

export default AdminDashboard;
