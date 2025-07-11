import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaLock, FaGlobe, FaBell, FaLink, FaCreditCard, FaShieldAlt, FaTrash } from 'react-icons/fa';
import { MdEmail, MdPhoneAndroid, MdPhotoCamera, MdCake, 
         MdDevices, MdLanguage, MdDarkMode, MdDashboard } from 'react-icons/md';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    language: 'en',
    timezone: 'UTC',
    theme: 'dark',
    dashboardView: 'default',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    propertyAlerts: true,
    twoFactorEnabled: false,
    dataSharing: false,
    adPersonalization: true
  });

  useEffect(() => {
    // Load user data
    if (user) {
      setFormData({
        ...formData,
        fullName: user.displayName || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic here
    alert('Settings saved successfully!');
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl text-gray-600">
                    {user?.displayName?.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm flex items-center gap-2">
                  <MdPhotoCamera /> Change Photo
                </button>
                <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. Max size 2MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                  disabled
                />
                <button className="text-blue-600 text-xs mt-1">Verify Email</button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Password</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                Change Password
              </button>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="twoFactorEnabled"
                    checked={formData.twoFactorEnabled}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Enable 2FA</span>
                </label>
                {formData.twoFactorEnabled && (
                  <span className="text-sm text-green-600">Active</span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Add an extra layer of security to your account
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Login Activity</h3>
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-sm">Last login: Today at 10:30 AM from Chrome on Windows</p>
                <button className="text-blue-600 text-sm mt-2">View all activity</button>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Language Preference</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Time Zone</label>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time (EST)</option>
                  <option value="PST">Pacific Time (PST)</option>
                  <option value="CET">Central European Time (CET)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Theme Mode</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      checked={formData.theme === 'light'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Light</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={formData.theme === 'dark'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Dark</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Default Dashboard View</label>
                <select
                  name="dashboardView"
                  value={formData.dashboardView}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-md"
                >
                  <option value="default">Default View</option>
                  <option value="properties">Properties</option>
                  <option value="analytics">Analytics</option>
                  <option value="recent">Recent Activity</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={formData.emailNotifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-gray-500">Receive updates via text message</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={formData.smsNotifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-gray-500">Receive browser/app notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      checked={formData.pushNotifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Property Alert Preferences</h3>
              <div className="space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="propertyAlerts"
                    checked={formData.propertyAlerts}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">New listings in my area</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="priceDrops"
                    checked={formData.priceDrops}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Price drops on saved properties</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="similarProperties"
                    checked={formData.similarProperties}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Similar properties to my searches</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'connected':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">G</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Google</h4>
                      <p className="text-sm text-gray-500">user@gmail.com</p>
                    </div>
                  </div>
                  <button className="text-red-600 text-sm">Disconnect</button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">f</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Facebook</h4>
                      <p className="text-sm text-gray-500">Not connected</p>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm">Connect</button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">A</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Apple ID</h4>
                      <p className="text-sm text-gray-500">Not connected</p>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm">Connect</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Subscription Plan</h3>
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Premium Plan</h4>
                    <p className="text-sm text-gray-600">$9.99/month</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Billing History</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Jun 15, 2023</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Monthly Subscription</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">$9.99</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">Paid</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">May 15, 2023</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Monthly Subscription</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">$9.99</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">Paid</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Data & Privacy</h3>
              <div className="space-y-4">
                <button className="w-full text-left p-4 border rounded-md hover:bg-gray-50 flex justify-between items-center">
                  <span>Download My Data</span>
                  <span className="text-blue-600">Download</span>
                </button>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Data Sharing Preferences</h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="dataSharing"
                        checked={formData.dataSharing}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Allow us to share your data with trusted partners to improve your experience
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Ad Personalization</h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="adPersonalization"
                        checked={formData.adPersonalization}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Allow personalized ads based on your activity and preferences
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'account':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Account Actions</h3>
              <div className="space-y-4">
                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md">
                  <h4 className="font-medium text-yellow-800 mb-2">Deactivate Account</h4>
                  <p className="text-sm text-yellow-700 mb-3">
                    Temporarily disable your account. You can reactivate it later by logging in.
                  </p>
                  <button className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md text-sm hover:bg-yellow-200">
                    Deactivate Account
                  </button>
                </div>

                <div className="p-4 border border-red-200 bg-red-50 rounded-md">
                  <h4 className="font-medium text-red-800 mb-2">Delete Account Permanently</h4>
                  <p className="text-sm text-red-700 mb-3">
                    This will permanently delete all your data and cannot be undone.
                  </p>
                  <button className="px-4 py-2 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FaUser className="text-lg" />
              <span>Profile Information</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 ${activeTab === 'security' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FaLock className="text-lg" />
              <span>Security</span>
            </button>

            <button
              onClick={() => setActiveTab('preferences')}
              className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 ${activeTab === 'preferences' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FaGlobe className="text-lg" />
              <span>Preferences</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FaBell className="text-lg" />
              <span>Notifications</span>
            </button>

            <button
              onClick={() => setActiveTab('connected')}
              className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 ${activeTab === 'connected' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FaLink className="text-lg" />
              <span>Connected Accounts</span>
            </button>

            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 ${activeTab === 'billing' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FaCreditCard className="text-lg" />
              <span>Subscription & Billing</span>
            </button>

            <button
              onClick={() => setActiveTab('privacy')}
              className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 ${activeTab === 'privacy' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FaShieldAlt className="text-lg" />
              <span>Data & Privacy</span>
            </button>

            <button
              onClick={() => setActiveTab('account')}
              className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 ${activeTab === 'account' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FaTrash className="text-lg" />
              <span>Account Actions</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg shadow-sm border">
            {renderTabContent()}

            {(activeTab !== 'account' && activeTab !== 'billing') && (
              <div className="mt-8 pt-6 border-t flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;