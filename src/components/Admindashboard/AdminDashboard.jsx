import React, { useState } from 'react';
import { FiUsers, FiHome, FiTool, FiBarChart2, FiCalendar, FiCreditCard, FiShield, FiHelpCircle, FiChevronRight } from 'react-icons/fi';
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
  { label: 'User Management', id: 'users', icon: <FiUsers className="text-lg" /> },
  { label: 'Properties & Listings', id: 'properties', icon: <FiHome className="text-lg" /> },
  { label: 'Service Management', id: 'services', icon: <FiTool className="text-lg" /> },
  { label: 'User Analytics', id: 'analytics', icon: <FiBarChart2 className="text-lg" /> },
  { label: 'Appointments', id: 'appointments', icon: <FiCalendar className="text-lg" /> },
  { label: 'Payments', id: 'payments', icon: <FiCreditCard className="text-lg" /> },
  { label: 'Legal & Compliance', id: 'legal', icon: <FiShield className="text-lg" /> },
  { label: 'Support Center', id: 'support', icon: <FiHelpCircle className="text-lg" /> },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users': return <UserManagement />;
      case 'properties': return <PropertiesManagement />;
      case 'services': return <ServiceManagement />;
      case 'analytics': return <UserSearchAnalytics />;
      case 'appointments': return <AppointmentsManagement />;
      case 'payments': return <PaymentsManagement />;
      case 'legal': return <LegalComplianceManagement />;
      case 'support': return <UserSupport />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 dark:bg-gray-900 text-white transition-all duration-300 ease-in-out border-r border-gray-700`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && <h2 className="text-xl font-bold text-orange-400">Admin Panel</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-700"
          >
            <FiChevronRight className={`text-gray-400 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full p-3 rounded-lg transition-all ${activeTab === tab.id
                ? 'bg-gradient-to-r from-orange-500/20 to-orange-500/10 text-orange-400 border-l-4 border-orange-500'
                : 'text-gray-300 hover:bg-gray-700/50'}`}
            >
              <span className={`${activeTab === tab.id ? 'text-orange-400' : 'text-gray-400'}`}>
                {tab.icon}
              </span>
              {sidebarOpen && (
                <span className="ml-3 font-medium">{tab.label}</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-orange-600 flex items-center">
                {tabs.find(t => t.id === activeTab)?.icon}
                <span className="ml-2">{tabs.find(t => t.id === activeTab)?.label}</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {activeTab === 'users' && 'Manage user accounts and permissions'}
                {activeTab === 'properties' && 'Oversee all property listings'}
                {activeTab === 'services' && 'Manage service offerings and providers'}
                {activeTab === 'analytics' && 'View user search patterns and behavior'}
                {activeTab === 'appointments' && 'Schedule and track property viewings'}
                {activeTab === 'payments' && 'Monitor transactions and financials'}
                {activeTab === 'legal' && 'Handle compliance and legal matters'}
                {activeTab === 'support' && 'Respond to user inquiries and issues'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                AD
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          {activeTab === 'users' && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📊 Dashboard Overview</h2>
              <SummaryCards />
            </div>
          )}

          {/* Content Area */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;