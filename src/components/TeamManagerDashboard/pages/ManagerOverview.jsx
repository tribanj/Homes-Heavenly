import React from "react";
import {
  FiHome,
  FiUsers,
  FiCheckCircle,
  FiTrendingUp,
  FiDollarSign,
  FiPlus,
  FiSend,
  FiCheck,
} from "react-icons/fi";

// Mock Data based on your document
const kpiData = [
  { title: "Total Properties Assigned", value: 45, icon: <FiHome /> },
  { title: "Active Leads", value: 128, icon: <FiUsers /> },
  { title: "Closed Deals (This Month)", value: 12, icon: <FiCheckCircle /> },
  {
    title: "Team Revenue (This Month)",
    value: "₹1.2 Cr",
    icon: <FiTrendingUp />,
  },
  { title: "Commissions Pending", value: "₹3.5 Lakh", icon: <FiDollarSign /> },
];

const ManagerOverview = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {kpiData.map((item) => (
          <div
            key={item.title}
            className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="text-3xl font-bold text-gray-800">{item.value}</p>
              </div>
              <div className="text-blue-500 text-3xl">{item.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-lg text-gray-700 mb-4">
              Deals Closed Per Agent
            </h3>
            <p className="text-gray-500 text-sm">
              Chart placeholder: A bar chart showing deals closed by each agent
              would go here.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-lg text-gray-700 mb-4">
              Team Revenue Trend
            </h3>
            <p className="text-gray-500 text-sm">
              Chart placeholder: A line chart showing the team's monthly revenue
              trend would go here.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-lg text-gray-700 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <FiPlus className="me-2" /> Add Team Member
            </button>
            <button className="w-full flex items-center justify-center py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              <FiSend className="me-2" /> Assign Property
            </button>
            <button className="w-full flex items-center justify-center py-3 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
              <FiCheck className="me-2" /> Approve Commission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerOverview;
