import React, { useState, useEffect } from "react";
import {
  FiHome,
  FiUsers,
  FiCheckCircle,
  FiTrendingUp,
  FiDollarSign,
  FiActivity,
  FiShield,
  FiEye,
  FiMessageSquare,
  FiHeadphones,
  FiUserPlus,
  FiMapPin,
  FiClock,
  FiArrowUpRight,
  FiArrowDownRight,
  FiMoreHorizontal,
  FiCalendar,
  FiStar,
  FiTarget,
  FiPieChart,
} from "react-icons/fi";

// Enhanced KPI Data with trends and additional metrics
const kpiData = [
  {
    title: "Total Listings",
    value: "482",
    subtitle: "Active Properties",
    trend: "+12%",
    trendUp: true,
    icon: <FiHome size={24} />,
    color: "from-blue-500 to-blue-400",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Active Agents",
    value: "32",
    subtitle: "Verified Agents",
    trend: "+3%",
    trendUp: true,
    icon: <FiUsers size={24} />,
    color: "from-green-500 to-green-400",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "Properties Sold",
    value: "15",
    subtitle: "This Month",
    trend: "+25%",
    trendUp: true,
    icon: <FiCheckCircle size={24} />,
    color: "from-emerald-500 to-emerald-400",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "New Leads",
    value: "28",
    subtitle: "This Week",
    trend: "-5%",
    trendUp: false,
    icon: <FiTrendingUp size={24} />,
    color: "from-orange-500 to-orange-400",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    title: "Sales Volume",
    value: "₹3.2 Cr",
    subtitle: "Monthly Revenue",
    trend: "+18%",
    trendUp: true,
    icon: <FiDollarSign size={24} />,
    color: "from-purple-500 to-purple-400",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "Verified Properties",
    value: "441",
    subtitle: "91.5% Verified",
    trend: "+8%",
    trendUp: true,
    icon: <FiShield size={24} />,
    color: "from-indigo-500 to-indigo-400",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
];

// Recent Activities Data
const recentActivities = [
  {
    id: 1,
    type: "login",
    icon: <FiUsers className="w-4 h-4" />,
    title: "New Agent Registration",
    description: "Rajesh Kumar joined as a verified agent",
    time: "2 minutes ago",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    type: "property",
    icon: <FiHome className="w-4 h-4" />,
    title: "New Property Listed",
    description: "3BHK Apartment in Banjara Hills - ₹85 Lakhs",
    time: "15 minutes ago",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    type: "message",
    icon: <FiMessageSquare className="w-4 h-4" />,
    title: "New Inquiry Received",
    description: "Customer interested in Gachibowli properties",
    time: "32 minutes ago",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    type: "sale",
    icon: <FiCheckCircle className="w-4 h-4" />,
    title: "Property Sold Successfully",
    description: "Villa in Jubilee Hills - ₹2.5 Crores",
    time: "1 hour ago",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 5,
    type: "support",
    icon: <FiHeadphones className="w-4 h-4" />,
    title: "Support Ticket Resolved",
    description: "Payment gateway issue fixed for Agent #A142",
    time: "2 hours ago",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 6,
    type: "engagement",
    icon: <FiActivity className="w-4 h-4" />,
    title: "High User Engagement",
    description: "Property viewing increased by 45% today",
    time: "3 hours ago",
    color: "bg-teal-100 text-teal-600",
  },
];

// Quick Stats Data
const quickStats = [
  { label: "Today's Visitors", value: "1,247", change: "+12%" },
  { label: "Property Views", value: "3,891", change: "+28%" },
  { label: "Inquiries", value: "156", change: "+5%" },
  { label: "Site Engagement", value: "4.2 min", change: "+15%" },
];

// Chart data (mock data for visualization)
const chartData = [
  { month: "Jan", sales: 45, listings: 120 },
  { month: "Feb", sales: 52, listings: 135 },
  { month: "Mar", sales: 48, listings: 128 },
  { month: "Apr", sales: 61, listings: 142 },
  { month: "May", sales: 55, listings: 138 },
  { month: "Jun", sales: 67, listings: 155 },
];

const KpiCard = ({ item, variant = "gradient" }) => {
  if (variant === "modern") {
    return (
      <div
        className={`${item.bgColor} border border-gray-100 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group`}
      >
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl ${item.iconColor} bg-white shadow-sm group-hover:scale-110 transition-transform`}
          >
            {item.icon}
          </div>
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              item.trendUp
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.trendUp ? (
              <FiArrowUpRight className="w-3 h-3" />
            ) : (
              <FiArrowDownRight className="w-3 h-3" />
            )}
            {item.trend}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {item.value}
          </h3>
          <p className="text-sm font-medium text-gray-600 mb-1">{item.title}</p>
          <p className="text-xs text-gray-500">{item.subtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`text-white p-6 rounded-2xl shadow-lg bg-gradient-to-br ${item.color} hover:scale-105 transition-transform duration-300`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-black bg-opacity-50 rounded-xl backdrop-blur-sm">
          {item.icon}
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-black bg-opacity-50`}
        >
          {item.trendUp ? (
            <FiArrowUpRight className="w-3 h-3" />
          ) : (
            <FiArrowDownRight className="w-3 h-3" />
          )}
          {item.trend}
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold mb-1">{item.value}</h3>
        <p className="text-sm opacity-90 mb-1">{item.title}</p>
        <p className="text-xs opacity-75">{item.subtitle}</p>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity }) => (
  <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
    <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
      {activity.icon}
    </div>
    <div className="flex-grow min-w-0">
      <h4 className="font-semibold text-gray-900 text-sm">{activity.title}</h4>
      <p className="text-gray-600 text-sm mt-1 truncate">
        {activity.description}
      </p>
      <p className="text-gray-400 text-xs mt-2 flex items-center gap-1">
        <FiClock className="w-3 h-3" />
        {activity.time}
      </p>
    </div>
  </div>
);

const QuickStatsCard = ({ stat }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-100">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
          {stat.label}
        </p>
        <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
      </div>
      <div className="text-green-600 text-sm font-medium">{stat.change}</div>
    </div>
  </div>
);

const SimpleChart = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-bold text-gray-900">
        Sales & Listings Trend
      </h3>
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <FiMoreHorizontal className="w-5 h-5 text-gray-500" />
      </button>
    </div>
    <div className="space-y-3">
      {chartData.map((data, index) => (
        <div key={data.month} className="flex items-center gap-4">
          <div className="w-8 text-xs font-medium text-gray-600">
            {data.month}
          </div>
          <div className="flex-grow flex gap-2">
            <div className="flex-grow bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000"
                style={{ width: `${(data.sales / 70) * 100}%` }}
              ></div>
            </div>
            <div className="flex-grow bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000"
                style={{ width: `${(data.listings / 160) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="text-xs text-gray-600 w-12 text-right">
            {data.sales}
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
        <span className="text-xs text-gray-600">Sales</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-400 rounded-full"></div>
        <span className="text-xs text-gray-600">Listings</span>
      </div>
    </div>
  </div>
);

const DashboardOverview = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewMode, setViewMode] = useState("gradient"); // 'gradient' or 'modern'

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <FiCalendar className="w-4 h-4" />
              {currentTime.toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <button
              onClick={() =>
                setViewMode(viewMode === "gradient" ? "modern" : "gradient")
              }
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              {viewMode === "gradient"
                ? "Switch to Modern View"
                : "Switch to Gradient View"}
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2">
              <FiPieChart className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {kpiData.map((item) => (
            <KpiCard key={item.title} item={item} variant={viewMode} />
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-100 p-6 rounded-2xl mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Today's Quick Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat) => (
              <QuickStatsCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <FiActivity className="w-5 h-5 text-blue-600" />
                      Recent Activities
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Latest updates and system activities
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-2">
                <div className="max-h-96 overflow-y-auto">
                  {recentActivities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Chart */}
          <div className="space-y-6">
            <SimpleChart />

            {/* Performance Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiTarget className="w-5 h-5 text-green-600" />
                Performance Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Monthly Target</span>
                  <span className="font-semibold text-gray-900">₹5 Cr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Achieved</span>
                  <span className="font-semibold text-green-600">
                    ₹3.2 Cr (64%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                    style={{ width: "64%" }}
                  ></div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-gray-600">Avg. Deal Size</span>
                  <span className="font-semibold text-gray-900">₹21.3 L</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Additional Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl">
            <FiStar className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-bold mb-2">Top Performing Agent</h3>
            <p className="text-indigo-100 text-sm mb-1">Rajesh Kumar</p>
            <p className="text-2xl font-bold">₹84 L This Month</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-2xl">
            <FiTrendingUp className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-bold mb-2">Growth Rate</h3>
            <p className="text-emerald-100 text-sm mb-1">
              Compared to last month
            </p>
            <p className="text-2xl font-bold">+23.5%</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-2xl">
            <FiEye className="w-8 h-8 mb-4" />
            <h3 className="text-lg font-bold mb-2">Most Viewed Property</h3>
            <p className="text-orange-100 text-sm mb-1">
              Luxury Villa, Jubilee Hills
            </p>
            <p className="text-2xl font-bold">1,247 Views</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
