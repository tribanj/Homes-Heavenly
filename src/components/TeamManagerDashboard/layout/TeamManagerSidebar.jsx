import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiHome,
  FiTrendingUp,
  FiDollarSign,
  FiMessageSquare,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const TeamManagerSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { to: "/team-manager-dashboard/overview", icon: FiGrid, text: "Overview" },
    {
      to: "/team-manager-dashboard/team-management",
      icon: FiUsers,
      text: "Team Management",
    },
    {
      to: "/team-manager-dashboard/properties",
      icon: FiHome,
      text: "Properties & Projects",
    },
    {
      to: "/team-manager-dashboard/leads",
      icon: FiTrendingUp,
      text: "Leads (Team CRM)",
    },
    {
      to: "/team-manager-dashboard/commissions",
      icon: FiDollarSign,
      text: "Commissions",
    },
    {
      to: "/team-manager-dashboard/communication",
      icon: FiMessageSquare,
      text: "Client Communication",
    },
    {
      to: "/team-manager-dashboard/reports",
      icon: FiBarChart2,
      text: "Reports & Analytics",
    },
  ];

  const baseLinkClasses =
    "flex items-center p-3 my-1 rounded-lg text-gray-200 transition-colors duration-200 group";
  const activeLinkClasses = "bg-orange-600 text-white shadow-lg";
  const inactiveLinkClasses = "hover:bg-gray-700 hover:text-white";

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-gray-900 border-r border-gray-700 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-30" : "w-60"
      }`}
    >
      <div className="flex flex-col h-full">
        <div
          className={`flex items-center justify-center h-20 border-b border-gray-700 relative ${
            isCollapsed ? "px-1" : "px-6"
          }`}
        >
          <span
            className={`text-2xl font-bold text-white transition-opacity duration-300 ${
              isCollapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            Manager
          </span>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
          >
            {isCollapsed ? (
              <FiChevronRight size={10} />
            ) : (
              <FiChevronLeft size={10} />
            )}
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.text}
                to={item.to}
                className={({ isActive }) =>
                  `${baseLinkClasses} ${
                    isActive ? activeLinkClasses : inactiveLinkClasses
                  }`
                }
              >
                <Icon size={22} className="flex-shrink-0" />
                <span
                  className={`ml-4 transition-opacity duration-300 ${
                    isCollapsed ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {item.text}
                </span>
                {isCollapsed && (
                  <span className="absolute left-full ml-4 w-auto p-2 min-w-max rounded-md shadow-md text-white bg-gray-800 text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100 z-50">
                    {item.text}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default TeamManagerSidebar;
