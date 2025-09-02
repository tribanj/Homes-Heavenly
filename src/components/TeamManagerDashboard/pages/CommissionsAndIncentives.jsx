import React, { useState } from "react";
import {
  FiDollarSign,
  FiCheck,
  FiX,
  FiEye,
  FiDownload,
  FiTrendingUp,
  FiUser,
  FiCalendar,
} from "react-icons/fi";

// Mock Data
const deals = [
  {
    id: "deal_001",
    agentName: "Priya Sharma",
    clientName: "Aarav Patel",
    property: "Skyline Villa",
    dealValue: 5500000,
    commissionRate: 2.5,
    commissionAmount: 137500,
    status: "Pending Approval",
    dealDate: "2024-08-25",
    project: "Green Valley Apartments",
  },
  {
    id: "deal_002",
    agentName: "Rohan Verma",
    clientName: "Sanya Gupta",
    property: "Ocean View Apartment 2B",
    dealValue: 4200000,
    commissionRate: 2.0,
    commissionAmount: 84000,
    status: "Approved",
    dealDate: "2024-08-20",
    project: "Ocean View Apartments",
  },
  {
    id: "deal_003",
    agentName: "Amit Kumar",
    clientName: "Vikram Singh",
    property: "Corporate Tower Office",
    dealValue: 3800000,
    commissionRate: 1.5,
    commissionAmount: 57000,
    status: "Paid",
    dealDate: "2024-08-15",
    project: "Corporate Towers",
  },
];

const teamTargets = [
  {
    agentName: "Priya Sharma",
    monthlyTarget: 8000000,
    achieved: 5500000,
    progress: 69,
    incentiveEligible: true,
    totalCommissions: 275000,
    pendingCommissions: 137500,
  },
  {
    agentName: "Rohan Verma",
    monthlyTarget: 5000000,
    achieved: 4200000,
    progress: 84,
    incentiveEligible: true,
    totalCommissions: 168000,
    pendingCommissions: 0,
  },
  {
    agentName: "Amit Kumar",
    monthlyTarget: 3000000,
    achieved: 3800000,
    progress: 127,
    incentiveEligible: true,
    totalCommissions: 95000,
    pendingCommissions: 0,
  },
];

const CommissionsAndIncentives = () => {
  const [activeTab, setActiveTab] = useState("deals");
  const [showDealModal, setShowDealModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Paid":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleApprove = (dealId) => {
    console.log("Approving commission for deal:", dealId);
    // Here you would update the deal status to approved
  };

  const handleReject = (dealId) => {
    console.log("Rejecting commission for deal:", dealId);
    // Here you would update the deal status to rejected
  };

  const handleViewDeal = (deal) => {
    setSelectedDeal(deal);
    setShowDealModal(true);
  };

  const generateTeamSummary = () => {
    console.log("Generating team commission summary...");
    // Here you would generate and download a PDF/Excel report
  };

  const totalPendingCommissions = deals
    .filter((deal) => deal.status === "Pending Approval")
    .reduce((sum, deal) => sum + deal.commissionAmount, 0);

  const totalApprovedCommissions = deals
    .filter((deal) => deal.status === "Approved" || deal.status === "Paid")
    .reduce((sum, deal) => sum + deal.commissionAmount, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FiDollarSign className="me-3" /> Commissions & Incentives
          </h1>
          <p className="text-gray-500 mt-1">
            Manage team commissions & performance-based incentives.
          </p>
        </div>
        <button
          onClick={generateTeamSummary}
          className="flex items-center mt-4 md:mt-0 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
        >
          <FiDownload className="me-2" /> Generate Team Summary
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Deals</h3>
          <p className="text-2xl font-bold text-blue-600">{deals.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Pending Approval
          </h3>
          <p className="text-2xl font-bold text-yellow-600">
            {formatCurrency(totalPendingCommissions)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Approved Commissions
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(totalApprovedCommissions)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Incentive Eligible
          </h3>
          <p className="text-2xl font-bold text-purple-600">
            {teamTargets.filter((t) => t.incentiveEligible).length}
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("deals")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "deals"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Deal Commissions
            </button>
            <button
              onClick={() => setActiveTab("targets")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "targets"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Targets & Incentives
            </button>
          </nav>
        </div>
      </div>

      {/* Deal Commissions Tab */}
      {activeTab === "deals" && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="p-4 font-semibold text-gray-600">Agent</th>
                  <th className="p-4 font-semibold text-gray-600">
                    Deal Details
                  </th>
                  <th className="p-4 font-semibold text-gray-600">
                    Deal Value
                  </th>
                  <th className="p-4 font-semibold text-gray-600">
                    Commission
                  </th>
                  <th className="p-4 font-semibold text-gray-600">Status</th>
                  <th className="p-4 font-semibold text-gray-600">Date</th>
                  <th className="p-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {deals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-800">
                        {deal.agentName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {deal.clientName}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-800">
                        {deal.property}
                      </div>
                      <div className="text-sm text-gray-500">
                        {deal.project}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {formatCurrency(deal.dealValue)}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-800">
                        {formatCurrency(deal.commissionAmount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {deal.commissionRate}%
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          deal.status
                        )}`}
                      >
                        {deal.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {new Date(deal.dealDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDeal(deal)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="View Details"
                        >
                          <FiEye size={16} />
                        </button>
                        {deal.status === "Pending Approval" && (
                          <>
                            <button
                              onClick={() => handleApprove(deal.id)}
                              className="text-green-600 hover:text-green-800 p-1"
                              title="Approve"
                            >
                              <FiCheck size={16} />
                            </button>
                            <button
                              onClick={() => handleReject(deal.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Reject"
                            >
                              <FiX size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Targets & Incentives Tab */}
      {activeTab === "targets" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {teamTargets.map((target) => (
            <div
              key={target.agentName}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 flex items-center">
                  <FiUser className="me-2" />
                  {target.agentName}
                </h3>
                {target.incentiveEligible && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Incentive Eligible
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Target Progress</span>
                    <span className="font-medium">{target.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        target.progress >= 100
                          ? "bg-green-600"
                          : target.progress >= 75
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${Math.min(target.progress, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Monthly Target</p>
                    <p className="font-medium">
                      {formatCurrency(target.monthlyTarget)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Achieved</p>
                    <p className="font-medium">
                      {formatCurrency(target.achieved)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Total Commissions</p>
                    <p className="font-medium text-green-600">
                      {formatCurrency(target.totalCommissions)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pending</p>
                    <p className="font-medium text-yellow-600">
                      {formatCurrency(target.pendingCommissions)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Deal Details Modal */}
      {showDealModal && selectedDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Deal Details</h2>
              <button
                onClick={() => setShowDealModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Agent Name</p>
                  <p className="font-medium">{selectedDeal.agentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Client Name</p>
                  <p className="font-medium">{selectedDeal.clientName}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Property</p>
                <p className="font-medium">{selectedDeal.property}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Project</p>
                <p className="font-medium">{selectedDeal.project}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Deal Value</p>
                  <p className="font-medium text-green-600">
                    {formatCurrency(selectedDeal.dealValue)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Commission Rate</p>
                  <p className="font-medium">{selectedDeal.commissionRate}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Commission Amount</p>
                  <p className="font-medium text-blue-600">
                    {formatCurrency(selectedDeal.commissionAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Deal Date</p>
                  <p className="font-medium">
                    {new Date(selectedDeal.dealDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    selectedDeal.status
                  )}`}
                >
                  {selectedDeal.status}
                </span>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowDealModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Close
              </button>
              {selectedDeal.status === "Pending Approval" && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedDeal.id);
                      setShowDealModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedDeal.id);
                      setShowDealModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionsAndIncentives;
