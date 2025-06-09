import React from 'react';
import './DashboardOverview.css';

const DashboardOverview = () => {
  return (
    <div className="dashboard-overview">
      <h2>📊 Dashboard Overview</h2>
      <div className="overview-cards">
        <div className="card">
          <h4>🏠 Properties Posted</h4>
          <p>3</p>
        </div>
        <div className="card">
          <h4>💬 Messages</h4>
          <p>5</p>
        </div>
        <div className="card">
          <h4>❤️ Saved Properties</h4>
          <p>2</p>
        </div>
        <div className="card">
          <h4>🔒 Account Status</h4>
          <p>Active</p>
        </div>
      </div>

      <div className="quick-links">
        <h3>⚡ Quick Links</h3>
        <ul>
          <li><a href="/user-dashboard/properties">➕ Post New Property</a></li>
          <li><a href="/user-dashboard/messages">📥 Check Messages</a></li>
          <li><a href="/user-dashboard/settings">⚙️ Edit Profile</a></li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardOverview;
