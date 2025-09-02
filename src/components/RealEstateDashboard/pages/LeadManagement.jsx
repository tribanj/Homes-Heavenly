import React from "react";
import { FiUserPlus, FiPhone, FiMail } from "react-icons/fi";

// --- MOCK DATA (Replace with your Firebase data) ---
const mockLeads = {
  new: [
    {
      id: "lead_001",
      name: "Aarav Patel",
      source: "Website Inquiry",
      property: "Skyline Villa",
      agent: "Unassigned",
    },
    {
      id: "lead_002",
      name: "Sanya Gupta",
      source: "Social Media",
      property: "Ocean View Apartments",
      agent: "Unassigned",
    },
  ],
  contacted: [
    {
      id: "lead_003",
      name: "Vikram Singh",
      source: "Referral",
      property: "Green Meadows Plot",
      agent: "Priya Sharma",
    },
  ],
  viewing: [
    {
      id: "lead_004",
      name: "Neha Reddy",
      source: "Website Inquiry",
      property: "Corporate Towers",
      agent: "Rohan Verma",
    },
  ],
  closed: [
    {
      id: "lead_005",
      name: "Amit Kumar",
      source: "Walk-in",
      property: "Skyline Villa",
      agent: "Priya Sharma",
    },
  ],
};
// --- END MOCK DATA ---

const LeadCard = ({ lead }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-4">
    <h4 className="font-bold text-gray-800">{lead.name}</h4>
    <p className="text-sm text-gray-600">{lead.property}</p>
    <p className="text-xs text-gray-400 mt-1">Source: {lead.source}</p>
    <div className="flex justify-between items-center mt-3">
      <span className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 py-1 rounded-full">
        {lead.agent}
      </span>
      <div className="flex space-x-2 text-gray-500">
        <FiPhone className="cursor-pointer hover:text-amber-600" />
        <FiMail className="cursor-pointer hover:text-amber-600" />
      </div>
    </div>
  </div>
);

const LeadColumn = ({ title, leads }) => (
  <div className="bg-gray-100 rounded-xl p-4 w-72 md:w-80 flex-shrink-0">
    <h3 className="font-bold text-lg text-gray-700 mb-4">
      {title} ({leads.length})
    </h3>
    <div>
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} />
      ))}
    </div>
  </div>
);

const LeadManagement = () => {
  return (
    <div>
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Leads & CRM</h1>
          <p className="text-gray-500 mt-1">
            Track and manage leads through your sales pipeline.
          </p>
        </div>
        <button className="flex items-center mt-4 md:mt-0 px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 transition">
          <FiUserPlus className="mr-2" /> Add New Lead
        </button>
      </div>

      {/* --- Kanban Board --- */}
      <div className="flex space-x-6 overflow-x-auto pb-4">
        <LeadColumn title="New Leads" leads={mockLeads.new} />
        <LeadColumn title="Contacted" leads={mockLeads.contacted} />
        <LeadColumn title="Viewing Scheduled" leads={mockLeads.viewing} />
        <LeadColumn title="Deal Closed" leads={mockLeads.closed} />
      </div>
    </div>
  );
};

export default LeadManagement;
