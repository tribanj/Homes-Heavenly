// src/components/UserDashboard/UserDashboard.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

import Overview from './Overview';
import MyAds from './MyAds';
import SavedListings from './SavedListings';
import MyServiceRequests from './MyServiceRequests';
import MyAppointments from './MyAppointments';
import SubmitInquiryHistory from './SubmitInquiryHistory';
import RecentActivity from './RecentActivity';
import Settings from './Settings';

import './UserDashboard.css';

const UserDashboard = () => {
  const location = useLocation();
  const path = location.pathname;

  // Map current path to component
  const renderContent = () => {
    if (path.includes('my-ads')) return <MyAds />;
    if (path.includes('saved-listings')) return <SavedListings />;
    if (path.includes('my-service-requests')) return <MyServiceRequests />;
    if (path.includes('my-appointments')) return <MyAppointments />;
    if (path.includes('submit-inquiry-history')) return <SubmitInquiryHistory />;
    if (path.includes('recent-activity')) return <RecentActivity />;
    if (path.includes('settings')) return <Settings />;
    return <Overview />; // Default page
  };

  return (
    <div className="user-dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default UserDashboard;
