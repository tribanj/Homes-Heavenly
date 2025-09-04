import React from "react";
import { Link } from "react-router-dom";
import {
  FiUserPlus,
  FiPhone,
  FiMail,
  FiEye,
  FiMessageSquare,
  FiEdit,
} from "react-icons/fi";

// Mock Data (can be replaced with Firebase data later)
const mockLeads = {
  new: [
    {
      id: "lead_001",
      name: "Aarav Patel",
      source: "Website Inquiry",
      property: "Skyline Villa",
      phone: "9876543210",
      email: "aarav.p@example.com",
    },
    {
      id: "lead_002",
      name: "Sanya Gupta",
      source: "Social Media",
      property: "Ocean View Apartments",
      phone: "9123456789",
      email: "sanya.g@example.com",
    },
  ],
  contacted: [
    {
      id: "lead_003",
      name: "Vikram Singh",
      source: "Referral",
      property: "Green Meadows Plot",
      phone: "9988776655",
      email: "vikram.s@example.com",
    },
  ],
  viewing: [
    {
      id: "lead_004",
      name: "Neha Reddy",
      source: "Website Inquiry",
      property: "Corporate Towers",
      phone: "9765432109",
      email: "neha.r@example.com",
    },
  ],
  closed: [
    {
      id: "lead_005",
      name: "Amit Kumar",
      source: "Walk-in",
      property: "Skyline Villa",
      phone: "9654321098",
      email: "amit.k@example.com",
    },
  ],
};

const LeadCard = ({ lead }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 hover:shadow-md transition-shadow">
    <h4 className="font-bold text-gray-800 text-base">{lead.name}</h4>
    <p className="text-sm text-gray-600 truncate">{lead.property}</p>
    <p className="text-xs text-gray-400 mt-1">Source: {lead.source}</p>

    <div className="mt-3 pt-3 border-t border-gray-100 space-y-1 text-xs text-gray-500">
      <p className="flex items-center">
        <FiPhone size={12} className="mr-2" /> {lead.phone}
      </p>
      <p className="flex items-center">
        <FiMail size={12} className="mr-2" /> {lead.email}
      </p>
    </div>

    <div className="flex justify-end items-center mt-3 space-x-1">
      <button
        className="p-1.5 text-gray-500 hover:bg-gray-100 hover:text-blue-600 rounded-full transition"
        title="View Details"
      >
        <FiEye size={14} />
      </button>
      <button
        className="p-1.5 text-gray-500 hover:bg-gray-100 hover:text-green-600 rounded-full transition"
        title="Add Note"
      >
        <FiEdit size={14} />
      </button>
      <button
        className="p-1.5 text-gray-500 hover:bg-gray-100 hover:text-purple-600 rounded-full transition"
        title="Follow-up"
      >
        <FiMessageSquare size={14} />
      </button>
    </div>
  </div>
);

const LeadColumn = ({ title, leads, color }) => (
  <div
    className={`bg-gray-100 rounded-xl p-4 w-full md:w-80 flex-shrink-0 border-t-4 ${color}`}
  >
    <h3 className="font-bold text-lg text-gray-700 mb-4 flex justify-between items-center">
      {title}
      <span className="text-sm bg-gray-200 text-gray-600 font-semibold px-2 py-0.5 rounded-full">
        {leads.length}
      </span>
    </h3>
    <div className="space-y-4">
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} />
      ))}
      {leads.length === 0 && (
        <div className="text-center text-gray-400 py-8 text-sm">
          No leads in this stage.
        </div>
      )}
    </div>
  </div>
);

const LeadManagement = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Lead Management (CRM)
          </h1>
          <p className="text-gray-500 mt-1">
            Track and manage your sales pipeline visually.
          </p>
        </div>
        <Link
          to="add"
          className="flex items-center mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <FiUserPlus className="mr-2" /> Add New Lead
        </Link>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-4">
        <LeadColumn
          title="New Leads"
          leads={mockLeads.new}
          color="border-blue-500"
        />
        <LeadColumn
          title="Contacted"
          leads={mockLeads.contacted}
          color="border-yellow-500"
        />
        <LeadColumn
          title="Viewing Scheduled"
          leads={mockLeads.viewing}
          color="border-purple-500"
        />
        <LeadColumn
          title="Deal Closed"
          leads={mockLeads.closed}
          color="border-green-500"
        />
      </div>
    </div>
  );
};

export default LeadManagement;
