import React, { useState } from 'react';
import SummaryCards from './SummaryCards';
import UserManagement from './UserManagement';
import PropertiesManagement from './PropertiesManagement';
import ServiceManagement from './ServiceManagement';
import UserSearchAnalytics from './UserSearchAnalytics';
import AppointmentsManagement from './AppointmentsManagement';
import PaymentsManagement from './PaymentsManagement';
import LegalComplianceManagement from './LegalComplianceManagement';
import UserSupport from './UserSupport';

const tabs = [
  { label: 'User Management', id: 'users' },
  { label: 'Properties & Listings', id: 'properties' },
  { label: 'Service Management', id: 'services' },
  { label: 'User Search Analytics', id: 'analytics' },
  { label: 'Appointments', id: 'appointments' },
  { label: 'Payments', id: 'payments' },
  { label: 'Legal & Compliance', id: 'legal' },
  { label: 'Support', id: 'support' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <div><UserManagement /> </div>;
      case 'properties':
        return <div><PropertiesManagement /></div>;
      case 'services':
        return <div><ServiceManagement /></div>;
      case 'analytics':
        return <div><UserSearchAnalytics /></div>;
      case 'appointments':
        return <div><AppointmentsManagement /></div>;
      case 'payments':
        return <div><PaymentsManagement /></div>;
      case 'legal':
        return <div><LegalComplianceManagement /></div>;
      case 'support':
        return <div><UserSupport /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`block w-full text-left px-3 py-2 rounded-md hover:bg-gray-700 transition ${activeTab === tab.id ? 'bg-gray-700' : ''
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-4">🔧 Admin Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome! Use the sidebar to manage system modules.</p>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2">📊 Top Summary Stats</h2>
          <SummaryCards />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">{tabs.find(t => t.id === activeTab)?.label}</h2>
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
