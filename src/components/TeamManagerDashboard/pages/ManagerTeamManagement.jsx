import React, { useState } from "react";
import {
  FiUserPlus,
  FiTarget,
  FiEdit,
  FiActivity,
  FiX,
  FiSave,
  FiTrash2,
  FiEye,
  FiPercent,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

// Mock data for the team
const initialTeamMembers = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@company.com",
    phone: "+91 98765 43210",
    role: "Senior Broker",
    target: 8000000,
    progress: 75,
    commissionPercentage: 2.5,
    lastActivity: "Logged in 2 hours ago",
    loginActivity: "Active - Last login: 2:30 PM today",
    siteVisits: 12,
    leadFollowUps: 8,
    joinDate: "2023-06-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Rohan Verma",
    email: "rohan.verma@company.com",
    phone: "+91 87654 32109",
    role: "Junior Broker",
    target: 5000000,
    progress: 40,
    commissionPercentage: 2.0,
    lastActivity: "Followed up on lead #004",
    loginActivity: "Last login: Yesterday 6:45 PM",
    siteVisits: 8,
    leadFollowUps: 15,
    joinDate: "2023-09-10",
    status: "Active",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.kumar@company.com",
    phone: "+91 76543 21098",
    role: "Sales Executive",
    target: 3000000,
    progress: 90,
    commissionPercentage: 1.5,
    lastActivity: "Scheduled site visit",
    loginActivity: "Active - Last login: 10 minutes ago",
    siteVisits: 20,
    leadFollowUps: 25,
    joinDate: "2023-11-20",
    status: "Active",
  },
];

const roles = ["Senior Broker", "Junior Broker", "Sales Executive"];

const TeamManagementDashboard = () => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Form states
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Sales Executive",
    target: "",
    commissionPercentage: 1.5,
  });

  const [editingMember, setEditingMember] = useState({});
  const [targetData, setTargetData] = useState({
    target: "",
    period: "monthly",
  });

  // Handle Add Member
  const handleAddMember = () => {
    if (
      !newMember.name ||
      !newMember.email ||
      !newMember.phone ||
      !newMember.target
    ) {
      alert("Please fill all required fields");
      return;
    }

    const member = {
      id: Date.now(),
      ...newMember,
      target: parseInt(newMember.target),
      progress: 0,
      lastActivity: "Just joined",
      loginActivity: "Not logged in yet",
      siteVisits: 0,
      leadFollowUps: 0,
      joinDate: new Date().toISOString().split("T")[0],
      status: "Active",
    };

    setTeamMembers([...teamMembers, member]);
    setNewMember({
      name: "",
      email: "",
      phone: "",
      role: "Sales Executive",
      target: "",
      commissionPercentage: 1.5,
    });
    setShowAddForm(false);

    // Here you would integrate with Firebase
    console.log("Adding member to Firebase:", member);
  };

  // Handle Edit Member
  const handleEditMember = (member) => {
    setEditingMember({ ...member });
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const handleUpdateMember = () => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === editingMember.id ? editingMember : member
      )
    );
    setShowEditModal(false);

    // Here you would integrate with Firebase
    console.log("Updating member in Firebase:", editingMember);
  };

  // Handle Assign Target
  const handleAssignTarget = (member) => {
    setSelectedMember(member);
    setTargetData({ target: member.target.toString(), period: "monthly" });
    setShowTargetModal(true);
  };

  const handleUpdateTarget = () => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === selectedMember.id
          ? { ...member, target: parseInt(targetData.target) }
          : member
      )
    );
    setShowTargetModal(false);

    // Here you would integrate with Firebase
    console.log("Updating target in Firebase:", {
      memberId: selectedMember.id,
      ...targetData,
    });
  };

  // Handle Remove Member
  const handleRemoveMember = (memberId) => {
    if (window.confirm("Are you sure you want to remove this team member?")) {
      setTeamMembers(teamMembers.filter((member) => member.id !== memberId));

      // Here you would integrate with Firebase
      console.log("Removing member from Firebase:", memberId);
    }
  };

  // Handle View Activity
  const handleViewActivity = (member) => {
    setSelectedMember(member);
    setShowActivityModal(true);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Team Management</h1>
          <p className="text-gray-500 mt-1">
            Manage team members, roles, and sales targets.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <FiUserPlus className="me-2" /> Add Team Member
        </button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Members</h3>
          <p className="text-2xl font-bold text-blue-600">
            {teamMembers.length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Active Members
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {teamMembers.filter((m) => m.status === "Active").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Target</h3>
          <p className="text-2xl font-bold text-purple-600">
            {formatCurrency(
              teamMembers.reduce((sum, member) => sum + member.target, 0)
            )}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Avg. Progress</h3>
          <p className="text-2xl font-bold text-orange-600">
            {Math.round(
              teamMembers.reduce((sum, member) => sum + member.progress, 0) /
                teamMembers.length
            )}
            %
          </p>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Member Info</th>
                <th className="p-4 font-semibold text-gray-600">Role</th>
                <th className="p-4 font-semibold text-gray-600">
                  Target (Monthly)
                </th>
                <th className="p-4 font-semibold text-gray-600">Progress</th>
                <th className="p-4 font-semibold text-gray-600">
                  Commission %
                </th>
                <th className="p-4 font-semibold text-gray-600">
                  Last Activity
                </th>
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-800">
                        {member.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.email}
                      </div>
                      <div className="text-xs text-gray-400">
                        {member.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.role === "Senior Broker"
                          ? "bg-purple-100 text-purple-800"
                          : member.role === "Junior Broker"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">
                    {formatCurrency(member.target)}
                  </td>
                  <td className="p-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                      <div
                        className={`h-2.5 rounded-full ${
                          member.progress >= 80
                            ? "bg-green-600"
                            : member.progress >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${member.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {member.progress}% achieved
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">
                    {member.commissionPercentage}%
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {member.lastActivity}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAssignTarget(member)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Assign Target"
                      >
                        <FiTarget />
                      </button>
                      <button
                        onClick={() => handleEditMember(member)}
                        className="text-yellow-600 hover:text-yellow-800 p-1"
                        title="Edit Member"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleViewActivity(member)}
                        className="text-green-600 hover:text-green-800 p-1"
                        title="View Activity Log"
                      >
                        <FiActivity />
                      </button>
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Remove Member"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-3 w-full max-w-md mx-2">
            <div className="flex justify-between items-center ">
              <h2 className="text-xl font-bold text-gray-800">
                Add Team Member
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={newMember.phone}
                  onChange={(e) =>
                    setNewMember({ ...newMember, phone: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={newMember.role}
                  onChange={(e) =>
                    setNewMember({ ...newMember, role: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Target (₹) *
                </label>
                <input
                  type="number"
                  value={newMember.target}
                  onChange={(e) =>
                    setNewMember({ ...newMember, target: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter target amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commission Percentage (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={newMember.commissionPercentage}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      commissionPercentage: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter commission percentage"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                <FiSave className="me-2" /> Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Target Assignment Modal */}
      {showTargetModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Assign Target - {selectedMember.name}
              </h2>
              <button
                onClick={() => setShowTargetModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Amount (₹)
                </label>
                <input
                  type="number"
                  value={targetData.target}
                  onChange={(e) =>
                    setTargetData({ ...targetData, target: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter target amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Period
                </label>
                <select
                  value={targetData.period}
                  onChange={(e) =>
                    setTargetData({ ...targetData, period: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowTargetModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTarget}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                <FiTarget className="me-2" /> Update Target
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && editingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Edit Member - {editingMember.name}
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={editingMember.role}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, role: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commission Percentage (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={editingMember.commissionPercentage}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      commissionPercentage: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={editingMember.status}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      status: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateMember}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                <FiSave className="me-2" /> Update Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity Modal */}
      {showActivityModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Activity Log - {selectedMember.name}
              </h2>
              <button
                onClick={() => setShowActivityModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <FiActivity className="me-2" /> Login Activity
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedMember.loginActivity}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <FiEye className="me-2" /> Site Visits
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedMember.siteVisits} site visits conducted
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <FiCheckCircle className="me-2" /> Lead Follow-ups
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedMember.leadFollowUps} lead follow-ups completed
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <FiAlertCircle className="me-2" /> Member Info
                </h3>
                <p className="text-sm text-gray-600">
                  Joined:{" "}
                  {new Date(selectedMember.joinDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Current Target: {formatCurrency(selectedMember.target)}
                </p>
                <p className="text-sm text-gray-600">
                  Progress: {selectedMember.progress}%
                </p>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowActivityModal(false)}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagementDashboard;
