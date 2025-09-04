import React from "react";
import {
  FiZap,
  FiShare2,
  FiMessageSquare,
  FiTrendingUp,
  FiMousePointer,
  FiUserPlus,
} from "react-icons/fi";

const MarketingPromotions = () => {
  const marketingActions = [
    {
      icon: <FiZap className="text-yellow-500" />,
      title: "Boost Your Listings",
      description:
        "Reach more buyers and tenants by boosting your listings. Highlight your properties at the top of search results!",
      buttonText: "🚀 Boost a Property",
      buttonClass: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      icon: <FiShare2 className="text-blue-500" />,
      title: "Share on Social Media",
      description:
        "Promote your properties easily via Facebook, Instagram, LinkedIn, and WhatsApp to expand your reach.",
      buttonText: "📤 Share Now",
      buttonClass: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: <FiMessageSquare className="text-green-500" />,
      title: "WhatsApp Broadcast",
      description:
        "Send property updates and new listing alerts directly to your clients through WhatsApp Broadcast lists.",
      buttonText: "📲 Start Broadcast",
      buttonClass: "bg-green-500 hover:bg-green-600",
    },
  ];

  const performanceStats = [
    {
      icon: <FiTrendingUp className="text-indigo-500" />,
      label: "Total Impressions",
      value: "25,800",
    },
    {
      icon: <FiMousePointer className="text-sky-500" />,
      label: "Total Clicks",
      value: "1,245",
    },
    {
      icon: <FiUserPlus className="text-emerald-500" />,
      label: "Leads Generated",
      value: "78",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Marketing & Promotions
        </h1>
        <p className="text-gray-500 mt-1">
          Boost your property visibility and engage with potential clients.
        </p>
      </div>

      {/* Performance Metrics Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Campaign Performance (This Month)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {performanceStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500"
            >
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-full mr-4">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marketing Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {marketingActions.map((action, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-5xl mb-4 mx-auto">{action.icon}</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {action.title}
            </h3>
            <p className="text-gray-600 mb-6 flex-grow">{action.description}</p>
            <button
              className={`w-full mt-auto py-3 px-6 text-white font-bold rounded-lg shadow-md transition-all duration-300 ${action.buttonClass}`}
            >
              {action.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingPromotions;
