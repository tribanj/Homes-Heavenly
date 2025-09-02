import React from "react";
import { FiFileText, FiClock } from "react-icons/fi";

// --- MOCK DATA (Replace with your Firebase data) ---
const mockTickets = [
  {
    id: "#TKT-001",
    user: "Anjali Desai",
    subject: "Issue with property photos upload",
    status: "Open",
    lastUpdate: "2h ago",
  },
  {
    id: "#TKT-002",
    user: "Prestige Group",
    subject: "Question about subscription invoice",
    status: "Pending",
    lastUpdate: "1d ago",
  },
  {
    id: "#TKT-003",
    user: "Rohan Verma",
    subject: "Unable to update lead status",
    status: "Closed",
    lastUpdate: "3d ago",
  },
];
// --- END MOCK DATA ---

const StatusBadge = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-block";
  switch (status) {
    case "Open":
      return (
        <span className={`${baseClasses} bg-red-100 text-red-800`}>
          {status}
        </span>
      );
    case "Pending":
      return (
        <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
          {status}
        </span>
      );
    case "Closed":
      return (
        <span className={`${baseClasses} bg-gray-200 text-gray-800`}>
          {status}
        </span>
      );
    default:
      return (
        <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
          {status}
        </span>
      );
  }
};

const Support = () => {
  return (
    <div>
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Support & Services
          </h1>
          <p className="text-gray-500 mt-1">
            Manage user support tickets and view service history.
          </p>
        </div>
        <button className="flex items-center mt-4 md:mt-0 px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
          <FiClock className="mr-2" /> View Service History
        </button>
      </div>

      {/* --- Tickets Table --- */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-xl font-bold text-gray-700 p-6">Support Tickets</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Ticket ID</th>
                <th className="p-4 font-semibold text-gray-600">User</th>
                <th className="p-4 font-semibold text-gray-600">Subject</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600">Last Update</th>
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="p-4 font-mono text-gray-600">{ticket.id}</td>
                  <td className="p-4 font-medium text-gray-800">
                    {ticket.user}
                  </td>
                  <td className="p-4 text-gray-700">{ticket.subject}</td>
                  <td className="p-4">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="p-4 text-gray-600">{ticket.lastUpdate}</td>
                  <td className="p-4">
                    <button className="text-amber-600 hover:text-amber-900 font-medium">
                      View Ticket
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Support;
