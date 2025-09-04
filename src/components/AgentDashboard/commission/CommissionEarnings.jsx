import React, { useState } from "react";
import {
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiDownload,
  FiFilter,
} from "react-icons/fi";

// Mock Data for a more complete view
const initialDeals = [
  {
    id: 1,
    property: "Luxury Villa - Downtown",
    client: "John Doe",
    dealValue: 5000000,
    commissionRate: 2,
    status: "Paid",
  },
  {
    id: 2,
    property: "Ocean View Apartments",
    client: "Jane Smith",
    dealValue: 7500000,
    commissionRate: 1.5,
    status: "Approved",
  },
  {
    id: 3,
    property: "Green Meadows Plot",
    client: "Vikram Singh",
    dealValue: 3000000,
    commissionRate: 3,
    status: "Pending",
  },
  {
    id: 4,
    property: "Corporate Towers Office",
    client: "Amit Kumar",
    dealValue: 12000000,
    commissionRate: 1,
    status: "Paid",
  },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

const StatusBadge = ({ status }) => {
  const styles = {
    Paid: "bg-green-100 text-green-800",
    Approved: "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
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

const CommissionEarnings = () => {
  const [deals, setDeals] = useState(initialDeals);

  const totalEarnings = deals
    .filter((d) => d.status === "Paid")
    .reduce(
      (acc, deal) => acc + deal.dealValue * (deal.commissionRate / 100),
      0
    );
  const pendingPayouts = deals
    .filter((d) => d.status === "Approved")
    .reduce(
      (acc, deal) => acc + deal.dealValue * (deal.commissionRate / 100),
      0
    );
  const dealsClosed = deals.length;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Commission & Earnings
          </h1>
          <p className="text-gray-500 mt-1">
            Track your closed deals, commissions, and payout status.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 flex items-center">
            <FiDollarSign className="mr-2" /> Total Earnings (Paid)
          </h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {formatCurrency(totalEarnings)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
          <h3 className="text-gray-500 flex items-center">
            <FiClock className="mr-2" /> Pending Payouts
          </h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {formatCurrency(pendingPayouts)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 flex items-center">
            <FiCheckCircle className="mr-2" /> Deals Closed (Total)
          </h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{dealsClosed}</p>
        </div>
      </div>

      {/* Deals Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 bg-gray-50 border-b">
          <h2 className="text-xl font-bold text-gray-700">Earnings History</h2>
          <div className="flex items-center space-x-4">
            <select className="py-2 px-4 border rounded-lg bg-white">
              <option value="all">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
              <FiDownload className="mr-2" /> Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Property</th>
                <th className="p-4 font-semibold text-gray-600">Client</th>
                <th className="p-4 font-semibold text-gray-600">Deal Value</th>
                <th className="p-4 font-semibold text-gray-600">
                  Commission %
                </th>
                <th className="p-4 font-semibold text-gray-600">
                  Commission Earned
                </th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">
                    {deal.property}
                  </td>
                  <td className="p-4 text-gray-600">{deal.client}</td>
                  <td className="p-4 text-gray-600">
                    {formatCurrency(deal.dealValue)}
                  </td>
                  <td className="p-4 text-gray-600">{deal.commissionRate}%</td>
                  <td className="p-4 font-bold text-green-600">
                    {formatCurrency(
                      deal.dealValue * (deal.commissionRate / 100)
                    )}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={deal.status} />
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

export default CommissionEarnings;
