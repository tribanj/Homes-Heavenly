// src/component/agentdashboard/overview/Overview.js
import React from 'react';

const Overview = () => {
  return (
    <div className="overview-page">
      <h2>Dashboard Overview</h2>

      <div className="overview-cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
        
        <div className="card" style={{ flex: '1', minWidth: '250px', background: '#e3f2fd', padding: '20px', borderRadius: '10px' }}>
          <h4>Today's New Leads</h4>
          <p>15 Leads</p>
        </div>

        <div className="card" style={{ flex: '1', minWidth: '250px', background: '#fff3e0', padding: '20px', borderRadius: '10px' }}>
          <h4>Pending Calls/Meetings</h4>
          <p>3 Scheduled</p>
        </div>

        <div className="card" style={{ flex: '1', minWidth: '250px', background: '#e8f5e9', padding: '20px', borderRadius: '10px' }}>
          <h4>Listings Performance</h4>
          <p>2,300 Views</p>
        </div>

        <div className="card" style={{ flex: '1', minWidth: '250px', background: '#f3e5f5', padding: '20px', borderRadius: '10px' }}>
          <h4>Commission Summary</h4>
          <p>$4,500 Earned</p>
        </div>

      </div>

      <div className="notifications-section" style={{ marginTop: '40px' }}>
        <h3>Notifications</h3>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>New site visit scheduled for Property A</li>
          <li>Reminder: Submit updated certifications</li>
          <li>Lead #5423 requested a callback</li>
        </ul>
      </div>

    </div>
  );
};

export default Overview;
