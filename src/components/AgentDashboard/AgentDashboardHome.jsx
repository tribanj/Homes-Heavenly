// src/component/agentdashboard/AgentDashboard.js
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Overview from './overview/Overview';
import ManageProperties from './manageproperties/ManageProperties';
import LeadManagement from './leads/LeadManagement';
import AppointmentManager from './appointments/AppointmentManager';
import CommissionEarnings from './commission/CommissionEarnings';
import MarketingPromotions from './marketing/MarketingPromotions';
import TrainingCertification from './training/TrainingCertification';
import AgentProfile from './profile/AgentProfile';
import SupportHelpdesk from './support/SupportHelpdesk';
import MessagesInbox from './messages/MessagesInbox';
import AddEditProperty from './manageproperties/AddEditProperty';
import SetOpenHouse from './manageproperties/SetOpenHouse';
import AddEditListing from './manageproperties/AddEditListing'; 
import UploadMedia from './manageproperties/UploadMedia';
import OpenHouseTimings from './manageproperties/OpenHouseTimings';

const AgentDashboard = () => {
  return (
    <div className="agent-dashboard" style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div className="sidebar" style={{ width: '250px', background: '#f5f5f5', padding: '20px', minHeight: '100vh' }}>
        <div className="sidebar-title" style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>Agent Panel</div>
        <nav className="sidebar-nav" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/agent-dashboard/overview" className="nav-link">Dashboard Overview</Link>
          <Link to="/agent-dashboard/manage-properties" className="nav-link">Manage Properties</Link>
          <Link to="/agent-dashboard/lead-management" className="nav-link">Lead Management (CRM)</Link>
          <Link to="/agent-dashboard/appointments" className="nav-link">Appointment Manager</Link>
          <Link to="/agent-dashboard/commission-earnings" className="nav-link">Commission & Earnings</Link>
          <Link to="/agent-dashboard/marketing" className="nav-link">Marketing & Promotions</Link>
          <Link to="/agent-dashboard/training" className="nav-link">Training & Certification</Link>
          <Link to="/agent-dashboard/profile-settings" className="nav-link">Agent Profile & Settings</Link>
          <Link to="/agent-dashboard/support" className="nav-link">Support & Helpdesk</Link>
          <Link to="/agent-dashboard/messages" className="nav-link">📩 Messages / Inbox</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content" style={{ flex: 1, padding: '30px' }}>
        <Routes>
          <Route path="/overview" element={<Overview />} />
          <Route path="/manage-properties" element={<ManageProperties />} />
          <Route path="/lead-management" element={<LeadManagement />} />
          <Route path="/appointments" element={<AppointmentManager />} />
          <Route path="/commission-earnings" element={<CommissionEarnings />} />
          <Route path="/marketing" element={<MarketingPromotions />} />
          <Route path="/training" element={<TrainingCertification />} />
          <Route path="/profile-settings" element={<AgentProfile />} />
          <Route path="/support" element={<SupportHelpdesk />} />
          <Route path="/messages" element={<MessagesInbox />} />
          <Route path="manage-properties/add" element={<AddEditProperty />} />
          <Route path="manage-properties/upload-media" element={<UploadMedia />} />
          <Route path="manage-properties/set-open-house" element={<SetOpenHouse />} />
          <Route path="manage-properties/add" element={<AddEditListing />} />
          <Route path="manage-properties/open-house" element={<OpenHouseTimings />} />
          <Route path="lead-management" element={<LeadManagement />} />
          <Route path="appointments" element={<AppointmentManager />} />
          <Route path="commission-earnings" element={<CommissionEarnings />} />
          <Route path="marketing" element={<MarketingPromotions />} />
          <Route path="training" element={<TrainingCertification />} />
          <Route path="profile-settings" element={<AgentProfile />} />
          <Route path="support" element={<SupportHelpdesk />} />
          <Route path="messages" element={<MessagesInbox />} />

        </Routes>
      </div>
    </div>
  );
};

export default AgentDashboard;
