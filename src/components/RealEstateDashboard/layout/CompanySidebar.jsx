import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPlus, FaList, FaHandshake, FaUsers, FaCalendarAlt, FaChartLine, FaBullhorn, FaBuilding, FaMoneyCheckAlt, FaFileAlt, FaCog, FaQuestionCircle } from 'react-icons/fa';

const CompanySidebar = () => {
  return (
    <div className="sidebar bg-dark text-white p-3" style={{ width: '250px', minHeight: '100vh' }}>
      <h4 className="text-center mb-4">🏢 Company Panel</h4>
      <ul className="nav flex-column">
        <li><NavLink to="overview" className="nav-link text-white"><FaHome /> Dashboard</NavLink></li>
        <li><NavLink to="add-property" className="nav-link text-white"><FaPlus /> Add Property</NavLink></li>
        <li><NavLink to="my-listings" className="nav-link text-white"><FaList /> My Listings</NavLink></li>
        <li><NavLink to="project-partnerships" className="nav-link text-white"><FaHandshake /> Project Partnerships</NavLink></li>
        <li><NavLink to="brokers" className="nav-link text-white"><FaUsers /> Broker Management</NavLink></li>
        <li><NavLink to="appointments" className="nav-link text-white"><FaCalendarAlt /> Appointments</NavLink></li>
        <li><NavLink to="crm" className="nav-link text-white"><FaChartLine /> CRM / Leads</NavLink></li>
        <li><NavLink to="reports" className="nav-link text-white"><FaChartLine /> Reports</NavLink></li>
        <li><NavLink to="ads" className="nav-link text-white"><FaBullhorn /> Ads & Promotions</NavLink></li>
        <li><NavLink to="branches" className="nav-link text-white"><FaBuilding /> Branch Management</NavLink></li>
        <li><NavLink to="payments" className="nav-link text-white"><FaMoneyCheckAlt /> Payments</NavLink></li>
        <li><NavLink to="legal" className="nav-link text-white"><FaFileAlt /> Legal Vault</NavLink></li>
        <li><NavLink to="settings" className="nav-link text-white"><FaCog /> Settings</NavLink></li>
        <li><NavLink to="support" className="nav-link text-white"><FaQuestionCircle /> Support</NavLink></li>
      </ul>
    </div>
  );
};

export default CompanySidebar;
