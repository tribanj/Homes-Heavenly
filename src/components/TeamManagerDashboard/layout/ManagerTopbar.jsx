import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ManagerTopbar = ({ isSidebarCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header
      className={`fixed top-0 right-0 bg-white border-b border-gray-200 p-2 flex justify-between items-center z-30 transition-all duration-300 ${
        isSidebarCollapsed ? "left-30" : "left-60"
      }`}
    >
      <h1 className="text-xl font-bold text-gray-800">
        Team Manager Dashboard
      </h1>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-semibold text-gray-700 text-sm">
            {user?.displayName || "Manager"}
          </p>
          <p className="text-xs text-gray-500">Team Manager Role</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default ManagerTopbar;
