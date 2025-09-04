import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiPlus,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiCheck,
  FiX,
  FiFilter,
  FiSearch,
} from "react-icons/fi";

// Mock Data for a more complete view
const initialAppointments = [
  {
    id: 1,
    clientName: "Jane Smith",
    property: "3 BHK Luxury Condo",
    dateTime: "2025-09-10T11:00",
    type: "Site Visit",
    status: "Confirmed",
  },
  {
    id: 2,
    clientName: "Rohan Verma",
    property: "Ocean View Apartments",
    dateTime: "2025-09-11T15:00",
    type: "Virtual Tour",
    status: "Pending",
  },
  {
    id: 3,
    clientName: "Priya Singh",
    property: "Green Meadows Plot",
    dateTime: "2025-09-12T14:30",
    type: "Final Discussion",
    status: "Pending",
  },
  {
    id: 4,
    clientName: "Amit Kumar",
    property: "Corporate Towers Office",
    dateTime: "2025-09-08T10:00",
    type: "Site Visit",
    status: "Completed",
  },
  {
    id: 5,
    clientName: "Sunita Williams",
    property: "Skyline Villa",
    dateTime: "2025-09-09T12:00",
    type: "Site Visit",
    status: "Cancelled",
  },
];

// Status Badge Component for consistent styling
const StatusBadge = ({ status }) => {
  const styles = {
    Confirmed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Completed: "bg-blue-100 text-blue-800",
    Cancelled: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        styles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

const AppointmentManager = () => {
  const [appointments, setAppointments] = useState(initialAppointments);

  const kpiData = {
    upcoming: appointments.filter(
      (a) =>
        new Date(a.dateTime) > new Date() &&
        (a.status === "Confirmed" || a.status === "Pending")
    ).length,
    pending: appointments.filter((a) => a.status === "Pending").length,
    completed: appointments.filter((a) => a.status === "Completed").length,
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Appointment Manager
          </h1>
          <p className="text-gray-500 mt-1">
            Schedule, view, and manage all client appointments.
          </p>
        </div>
        <Link
          to="add"
          className="flex items-center mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <FiPlus className="mr-2" /> Schedule New Appointment
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500">Upcoming Appointments</h3>
          <p className="text-3xl font-bold text-gray-800">{kpiData.upcoming}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
          <h3 className="text-gray-500">Pending Requests</h3>
          <p className="text-3xl font-bold text-gray-800">{kpiData.pending}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500">Completed This Month</h3>
          <p className="text-3xl font-bold text-gray-800">
            {kpiData.completed}
          </p>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 bg-gray-50 border-b">
          <h2 className="text-xl font-bold text-gray-700">All Appointments</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search client..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
              />
            </div>
            <select className="py-2 px-4 border rounded-lg bg-white">
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Client Name</th>
                <th className="p-4 font-semibold text-gray-600">Property</th>
                <th className="p-4 font-semibold text-gray-600">Date & Time</th>
                <th className="p-4 font-semibold text-gray-600">Type</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">
                    {appt.clientName}
                  </td>
                  <td className="p-4 text-gray-600">{appt.property}</td>
                  <td className="p-4 text-gray-600">
                    {new Date(appt.dateTime).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-4 text-gray-600">{appt.type}</td>
                  <td className="p-4">
                    <StatusBadge status={appt.status} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      {appt.status === "Pending" && (
                        <>
                          <button
                            className="p-2 text-green-600 bg-green-100 rounded-full hover:bg-green-200 transition"
                            title="Confirm"
                          >
                            <FiCheck size={14} />
                          </button>
                          <button
                            className="p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition"
                            title="Cancel"
                          >
                            <FiX size={14} />
                          </button>
                        </>
                      )}
                      <button
                        className="p-2 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition"
                        title="View Details"
                      >
                        <FiEye size={14} />
                      </button>
                    </div>
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

export default AppointmentManager;
