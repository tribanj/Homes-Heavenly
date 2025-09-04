import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiHome,
  FiTrendingUp,
  FiCalendar,
  FiDollarSign,
  FiAward,
  FiBookOpen,
  FiUser,
  FiHelpCircle,
  FiMessageSquare,
} from "react-icons/fi";

const Sidebar = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center p-3 my-1 rounded-lg transition-colors duration-200 group ${
      isActive
        ? "bg-orange-600 text-white shadow-lg"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const menuItems = [
    {
      to: "/agent-dashboard/overview",
      icon: <FiGrid />,
      text: "Dashboard Overview",
    },
    {
      to: "/agent-dashboard/manage-properties",
      icon: <FiHome />,
      text: "Manage Properties",
    },
    {
      to: "/agent-dashboard/lead-management",
      icon: <FiTrendingUp />,
      text: "Lead Management (CRM)",
    },
    {
      to: "/agent-dashboard/appointments",
      icon: <FiCalendar />,
      text: "Appointment Manager",
    },
    {
      to: "/agent-dashboard/commission-earnings",
      icon: <FiDollarSign />,
      text: "Commission & Earnings",
    },
    {
      to: "/agent-dashboard/marketing",
      icon: <FiAward />,
      text: "Marketing & Promotions",
    },
    {
      to: "/agent-dashboard/training",
      icon: <FiBookOpen />,
      text: "Training & Certification",
    },
    {
      to: "/agent-dashboard/profile-settings",
      icon: <FiUser />,
      text: "Profile & Settings",
    },
    {
      to: "/agent-dashboard/support",
      icon: <FiHelpCircle />,
      text: "Support & Helpdesk",
    },
    {
      to: "/agent-dashboard/messages",
      icon: <FiMessageSquare />,
      text: "Messages / Inbox",
    },
  ];

  return (
    <aside className="w-72 bg-gray-900 text-white flex flex-col h-screen sticky top-0 border-r border-gray-700">
      <div className="p-6 text-center border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white">Agent Panel</h2>
      </div>
      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={navLinkClasses}>
            <span className="mr-3 text-lg">{item.icon}</span>
            <span>{item.text}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
