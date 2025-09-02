import React, { useState } from "react";
import { FiUserPlus, FiPhone, FiMail, FiX, FiSave } from "react-icons/fi";

// Mock Data
const initialMockLeads = {
  new: [
    {
      id: "lead_001",
      name: "Aarav Patel",
      phone: "+91 98765 43210",
      email: "aarav.patel@email.com",
      source: "Website Inquiry",
      property: "Skyline Villa",
      agent: "Unassigned",
      priority: "High",
    },
    {
      id: "lead_002",
      name: "Sanya Gupta",
      phone: "+91 87654 32109",
      email: "sanya.gupta@email.com",
      source: "Social Media",
      property: "Ocean View Apartments",
      agent: "Unassigned",
      priority: "Medium",
    },
  ],
  contacted: [
    {
      id: "lead_003",
      name: "Vikram Singh",
      phone: "+91 76543 21098",
      email: "vikram.singh@email.com",
      source: "Referral",
      property: "Green Meadows Plot",
      agent: "Priya Sharma",
      priority: "High",
    },
  ],
  viewing: [
    {
      id: "lead_004",
      name: "Neha Reddy",
      phone: "+91 65432 10987",
      email: "neha.reddy@email.com",
      source: "Website Inquiry",
      property: "Corporate Towers",
      agent: "Rohan Verma",
      priority: "High",
    },
  ],
  closed: [
    {
      id: "lead_005",
      name: "Amit Kumar",
      phone: "+91 54321 09876",
      email: "amit.kumar@email.com",
      source: "Walk-in",
      property: "Skyline Villa",
      agent: "Priya Sharma",
      priority: "High",
    },
  ],
};

const teamAgents = ["Priya Sharma", "Rohan Verma", "Amit Kumar"];
const properties = [
  "Skyline Villa",
  "Ocean View Apartments",
  "Green Meadows Plot",
  "Corporate Towers",
];

const LeadCard = ({ lead, isNew = false, onAssign }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-gray-800">{lead.name}</h4>
        <span
          className={`text-xs px-2 py-1 rounded ${getPriorityColor(
            lead.priority
          )}`}
        >
          {lead.priority}
        </span>
      </div>

      <p className="text-sm text-gray-600">{lead.property}</p>
      <p className="text-xs text-gray-500 mb-2">{lead.source}</p>

      <div className="text-xs text-gray-600 mb-3">
        <div className="flex items-center mb-1">
          <FiPhone className="mr-1" size={12} />
          {lead.phone}
        </div>
        <div className="flex items-center">
          <FiMail className="mr-1" size={12} />
          {lead.email}
        </div>
      </div>

      <div>
        {isNew ? (
          <select
            className="w-full text-sm p-2 border rounded"
            onChange={(e) => onAssign && onAssign(lead.id, e.target.value)}
          >
            <option value="">Assign to Agent</option>
            {teamAgents.map((agent) => (
              <option key={agent} value={agent}>
                {agent}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {lead.agent}
          </span>
        )}
      </div>
    </div>
  );
};

const LeadColumn = ({ title, leads, onAssign }) => (
  <div className="bg-gray-100 rounded-lg p-2 min-w-0 flex-1">
    <h3 className="font-bold text-gray-700 mb-2">
      {title} ({leads.length})
    </h3>
    <div className="min-h-[200px] grid grid-cols-3 gap-3">
      {leads.map((lead) => (
        <LeadCard
          key={lead.id}
          lead={lead}
          isNew={title === "New Leads"}
          onAssign={onAssign}
        />
      ))}
      {leads.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p className="text-sm">No leads</p>
        </div>
      )}
    </div>
  </div>
);

const ManagerLeadsCRM = () => {
  const [leads, setLeads] = useState(initialMockLeads);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    email: "",
    source: "Website Inquiry",
    property: "",
    priority: "Medium",
  });

  const handleAssignLead = (leadId, agent) => {
    if (!agent) return;

    const leadToMove = leads.new.find((lead) => lead.id === leadId);
    if (leadToMove) {
      const updatedLead = { ...leadToMove, agent };
      setLeads({
        ...leads,
        new: leads.new.filter((lead) => lead.id !== leadId),
        contacted: [...leads.contacted, updatedLead],
      });

      console.log("Assigning lead to agent:", { leadId, agent });
    }
  };

  const handleAddLead = () => {
    if (
      !newLead.name ||
      !newLead.phone ||
      !newLead.email ||
      !newLead.property
    ) {
      alert("Please fill all required fields");
      return;
    }

    const lead = {
      id: `lead_${Date.now()}`,
      ...newLead,
      agent: "Unassigned",
    };

    setLeads({
      ...leads,
      new: [...leads.new, lead],
    });

    setNewLead({
      name: "",
      phone: "",
      email: "",
      source: "Website Inquiry",
      property: "",
      priority: "Medium",
    });
    setShowAddModal(false);

    console.log("Adding new lead:", lead);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Leads (Team CRM)</h1>
          <p className="text-gray-500 mt-1">
            Manage and distribute incoming leads among the team.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <FiUserPlus className="me-2" /> Add New Lead
        </button>
      </div>

      {/* Lead Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Leads</h3>
          <p className="text-2xl font-bold text-blue-600">
            {Object.values(leads).flat().length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">New Leads</h3>
          <p className="text-2xl font-bold text-green-600">
            {leads.new.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">In Progress</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {leads.contacted.length + leads.viewing.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Closed</h3>
          <p className="text-2xl font-bold text-purple-600">
            {leads.closed.length}
          </p>
        </div>
      </div>

      {/* --- MODIFIED: Changed to a single-column grid for vertical stacking --- */}
      <div className="grid grid-cols-1 gap-6">
        <LeadColumn
          title="New Leads"
          leads={leads.new}
          onAssign={handleAssignLead}
        />
        <LeadColumn title="Contacted" leads={leads.contacted} />
        <LeadColumn title="Viewing Scheduled" leads={leads.viewing} />
        <LeadColumn title="Deal Closed" leads={leads.closed} />
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Add New Lead</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={newLead.name}
                  onChange={(e) =>
                    setNewLead({ ...newLead, name: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter lead name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={newLead.phone}
                  onChange={(e) =>
                    setNewLead({ ...newLead, phone: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={newLead.email}
                  onChange={(e) =>
                    setNewLead({ ...newLead, email: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Interest *
                </label>
                <select
                  value={newLead.property}
                  onChange={(e) =>
                    setNewLead({ ...newLead, property: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select property...</option>
                  {properties.map((property) => (
                    <option key={property} value={property}>
                      {property}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Source
                  </label>
                  <select
                    value={newLead.source}
                    onChange={(e) =>
                      setNewLead({ ...newLead, source: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Homes Heavenly">Homes Heavenly</option>
                    <option value="Website Inquiry">Website</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Referral">Referral</option>
                    <option value="Walk-in">Walk-in</option>
                    <option value="Phone Call">Phone Call</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newLead.priority}
                    onChange={(e) =>
                      setNewLead({ ...newLead, priority: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLead}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                <FiSave className="me-2" /> Add Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerLeadsCRM;
