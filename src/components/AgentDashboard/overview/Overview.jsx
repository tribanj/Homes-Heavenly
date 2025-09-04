import React from "react";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiCalendar,
  FiEye,
  FiDollarSign,
  FiPlus,
  FiMessageSquare,
  FiFileText,
} from "react-icons/fi";

const Overview = () => {
  const overviewCards = [
    {
      title: "Today's New Leads",
      value: "15",
      icon: <FiUsers className="text-blue-500" />,
      bgColor: "bg-blue-100",
    },
    {
      title: "Pending Appointments",
      value: "3",
      icon: <FiCalendar className="text-yellow-500" />,
      bgColor: "bg-yellow-100",
    },
    {
      title: "Total Listings Views",
      value: "2,300",
      icon: <FiEye className="text-green-500" />,
      bgColor: "bg-green-100",
    },
    {
      title: "Commission Earned (Month)",
      value: "₹4,50,000",
      icon: <FiDollarSign className="text-purple-500" />,
      bgColor: "bg-purple-100",
    },
  ];

  const notifications = [
    {
      icon: <FiCalendar className="text-blue-600" />,
      text: "New site visit scheduled for Property A - 2 PM today",
      time: "15m ago",
    },
    {
      icon: <FiFileText className="text-yellow-600" />,
      text: "Reminder: Submit updated certifications by end of week",
      time: "1h ago",
    },
    {
      icon: <FiMessageSquare className="text-purple-600" />,
      text: "Lead #5423 requested a callback regarding Luxury Villa listing",
      time: "3h ago",
    },
    {
      icon: <FiEye className="text-green-600" />,
      text: "Your listing 'Ocean View Condo' received 100+ views this week!",
      time: "1d ago",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, here's a summary of your activity.
          </p>
        </div>
        <Link
          to="../manage-properties/add"
          className="flex items-center mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <FiPlus className="mr-2" /> Add New Property
        </Link>
      </div>

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {overviewCards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {card.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${card.bgColor}`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Activities & Notifications
        </h2>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="p-2 bg-white rounded-full border mr-4">
                {notification.icon}
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-700">
                  {notification.text}
                </p>
              </div>
              <span className="text-xs text-gray-400 ml-4 whitespace-nowrap">
                {notification.time}
              </span>
            </div>
          ))}
        </div>
        <div className="text-right mt-4">
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
