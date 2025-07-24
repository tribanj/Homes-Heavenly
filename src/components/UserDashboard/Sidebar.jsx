import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaRegNewspaper,
  FaHeart,
  FaTools,
  FaCalendarAlt,
  FaHistory,
  FaBell,
  FaCog,
  FaChevronRight
} from "react-icons/fa";

const Sidebar = () => {
  const linkStyle = ({ isActive }) =>
    isActive
      ? "flex items-center py-3 px-4 bg-gradient-to-r from-amber-700 to-amber-600 text-white rounded-lg shadow-md transition-all duration-300"
      : "flex items-center py-3 px-4 hover:bg-amber-900/50 text-amber-100 rounded-lg transition-all duration-300";

  return (
    <div className="h-full p-4 bg-gradient-to-b from-gray-900 to-amber-900/30 rounded-xl border border-amber-900/50 shadow-lg">
      <h4 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
        <span className="bg-amber-600 p-2 rounded-lg">
          <FaHome className="text-white" />
        </span>
        User Dashboard
      </h4>

      <ul className="space-y-2">
        <li>
          <NavLink to="/user-dashboard/overview" className={linkStyle}>
            <FaHome className="mr-3" />
            Overview
            <FaChevronRight className="ml-auto text-xs opacity-70" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/user-dashboard/my-ads" className={linkStyle}>
            <FaRegNewspaper className="mr-3" />
            My Ads
            <FaChevronRight className="ml-auto text-xs opacity-70" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/user-dashboard/saved-listings" className={linkStyle}>
            <FaHeart className="mr-3" />
            Saved Listings
            <FaChevronRight className="ml-auto text-xs opacity-70" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/user-dashboard/my-service-requests" className={linkStyle}>
            <FaTools className="mr-3" />
            Service Requests
            <FaChevronRight className="ml-auto text-xs opacity-70" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/user-dashboard/my-appointments" className={linkStyle}>
            <FaCalendarAlt className="mr-3" />
            Appointments
            <FaChevronRight className="ml-auto text-xs opacity-70" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/user-dashboard/submit-inquiry-history" className={linkStyle}>
            <FaHistory className="mr-3" />
            Inquiry History
            <FaChevronRight className="ml-auto text-xs opacity-70" />
          </NavLink>
        </li>

        <li>
          <NavLink to="/user-dashboard/recent-activity" className={linkStyle}>
            <FaBell className="mr-3" />
            Recent Activity
            <FaChevronRight className="ml-auto text-xs opacity-70" />
          </NavLink>
          
        </li>

        <li>
          <NavLink to="/user-dashboard/settings" className={linkStyle}>
            <FaCog className="mr-3" />
            Settings
            <FaChevronRight className="ml-auto text-xs opacity-70" />
          </NavLink>
        </li>
      </ul>

      <div className="mt-8 pt-4 border-t border-amber-900/50">
        <div className="text-xs text-amber-200/70 mb-2">Current Plan</div>
        <div className="p-3 bg-amber-900/30 rounded-lg border border-amber-800/50">
          <div className="font-medium text-white">Premium Member</div>
          <div className="text-xs text-amber-200/70 mt-1">Full access until Jan 2026</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;