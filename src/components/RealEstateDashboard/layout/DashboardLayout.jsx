import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiHome,
  FiTrendingUp,
  FiDollarSign,
  FiSettings,
  FiFileText,
  FiLogOut,
  FiBriefcase,
  FiAward,
} from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext"; // Verify this path is correct for your structure

// Reusable Sidebar Link Component with active styling
const SidebarLink = ({ to, icon, children }) => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center p-3 text-base font-normal rounded-lg transition duration-75 group hover:bg-amber-500 hover:text-white ${
      isActive ? "bg-amber-600 text-white shadow-lg" : "text-gray-400"
    }`;

  return (
    <NavLink to={to} className={navLinkClass} end>
      {icon}
      <span className="ml-3">{children}</span>
    </NavLink>
  );
};

const DashboardLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ===== Sidebar ===== */}
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-gray-900 border-r border-gray-700">
        <div className="h-full flex flex-col">
          <div className="p-6 text-center border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white">Prop-Wise</h1>
            <p className="text-sm text-gray-400">Real Estate Panel</p>
          </div>

          <nav className="flex-grow px-3 py-4 overflow-y-auto bg-gray-900">
            <ul className="space-y-2 font-medium">
              {/* These links match your XLSX requirements */}
              <li>
                <SidebarLink to="overview" icon={<FiGrid />}>
                  Dashboard
                </SidebarLink>
              </li>
              {/* <li>
                <SidebarLink to="user-management" icon={<FiUsers />}>
                  User Management
                </SidebarLink>
              </li> */}
              <li>
                <SidebarLink to="property-management" icon={<FiHome />}>
                  Property Management
                </SidebarLink>
              </li>
              <li>
                <SidebarLink to="lead-management" icon={<FiTrendingUp />}>
                  Lead Management
                </SidebarLink>
              </li>
              <li>
                <SidebarLink to="team-management" icon={<FiBriefcase />}>
                  Team & Brokers
                </SidebarLink>
              </li>
              <li>
                <SidebarLink to="financials" icon={<FiDollarSign />}>
                  Finance & Payments
                </SidebarLink>
              </li>
              {/* <li>
                <SidebarLink to="marketing" icon={<FiAward />}>
                  Marketing
                </SidebarLink>
              </li> */}
              <li>
                <SidebarLink to="support" icon={<FiFileText />}>
                  Support & Services
                </SidebarLink>
              </li>
              {/* ✅ FIX: Corrected the closing tag here */}
              <li>
                <SidebarLink to="settings" icon={<FiSettings />}>
                  Settings
                </SidebarLink>
              </li>
            </ul>
          </nav>

          <div className="p-4 mt-auto border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center p-3 w-full text-base font-normal text-gray-400 rounded-lg hover:bg-red-600 hover:text-white group"
            >
              <FiLogOut />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="relative w-full ml-64">
        {/* Your main <Navbar> is in App.jsx, so we don't need another one here */}
        <div className="p-8">
          {/* The <Outlet> will render the specific dashboard page */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
