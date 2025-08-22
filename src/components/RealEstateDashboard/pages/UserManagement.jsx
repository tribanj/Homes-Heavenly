import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiUserPlus,
  FiFilter,
  FiX,
  FiCheck,
  FiAlertTriangle,
  FiEye,
  FiDownload,
  FiShield,
  FiClock,
  FiMail,
  FiUser,
  FiFileText,
  FiSettings,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi"; // ✅ Corrected: Using react-icons/fi
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../../firebase/firebaseConfig"; // Adjust path if needed
import { toast } from "react-toastify";

// --- UI COMPONENTS (Preserved from your design) ---

const StatusBadge = ({ status }) => {
  const baseClasses =
    "px-3 py-1.5 text-xs font-semibold rounded-full inline-flex items-center gap-1";
  switch (status) {
    case "Verified":
      return (
        <span
          className={`${baseClasses} bg-emerald-100 text-emerald-700 border border-emerald-200`}
        >
          <FiCheckCircle size={12} />
          Verified
        </span>
      );
    case "Pending":
      return (
        <span
          className={`${baseClasses} bg-amber-100 text-amber-700 border border-amber-200`}
        >
          <FiClock size={12} />
          Pending Review
        </span>
      );
    default:
      return (
        <span
          className={`${baseClasses} bg-red-100 text-red-700 border border-red-200`}
        >
          <FiXCircle size={12} />
          Not Uploaded
        </span>
      );
  }
};

const RoleBadge = ({ role }) => {
  const configs = {
    Admin: "bg-purple-100 text-purple-700 border-purple-200",
    Agent: "bg-blue-100 text-blue-700 border-blue-200",
    Builder: "bg-green-100 text-green-700 border-green-200",
    Broker: "bg-orange-100 text-orange-700 border-orange-200",
    "Normal User": "bg-gray-100 text-gray-700 border-gray-200",
  };
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-md border ${
        configs[role] || configs["Normal User"]
      }`}
    >
      {role}
    </span>
  );
};

const DocumentStatusIcon = ({ document }) => {
  if (!document?.uploaded)
    return <FiXCircle className="text-red-500" size={16} />;
  if (document.verified)
    return <FiCheckCircle className="text-green-500" size={16} />;
  return <FiAlertTriangle className="text-amber-500" size={16} />;
};

// --- MODAL COMPONENTS (Now with Firebase functionality) ---

const AddUserModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    role: "Normal User",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.displayName) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const newUserFirestore = {
        uid: user.uid,
        displayName: formData.displayName,
        email: formData.email,
        role: formData.role,
        kycStatus: "Not Uploaded",
        createdAt: serverTimestamp(),
        lastLogin: null,
        permissions:
          formData.role === "Admin"
            ? ["read", "write", "delete", "manage_users"]
            : ["read"],
        kycDocuments: {
          aadhar: { uploaded: false, verified: false, url: null },
          gst: { uploaded: false, verified: false, url: null },
          rera: { uploaded: false, verified: false, url: null },
          contract: { uploaded: false, verified: false, url: null },
        },
      };

      await addDoc(collection(db, "users"), newUserFirestore);
      toast.success(`User ${formData.displayName} created successfully!`);
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to create user.");
      console.error("Error creating user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <FiUserPlus className="text-amber-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Add New User</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiX size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) =>
                  setFormData({ ...formData, displayName: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                User Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              >
                <option value="Normal User">Normal User</option>
                <option value="Agent">Agent</option>
                <option value="Broker">Broker</option>
                <option value="Builder">Builder</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 disabled:bg-amber-300 transition-colors"
            >
              {isSubmitting ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ViewUserModal = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState("profile");
  if (!isOpen || !user) return null;

  const handleUpdateKyc = async (newStatus) => {
    const userDocRef = doc(db, "users", user.id);
    try {
      await updateDoc(userDocRef, { kycStatus: newStatus });
      toast.success(`User KYC status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update KYC status.");
      console.error("Error updating KYC status:", error);
    }
  };

  const documentTypes = [
    { key: "aadhar", label: "Aadhar Card", icon: FiFileText },
    { key: "gst", label: "GST Certificate", icon: FiFileText },
    { key: "rera", label: "RERA Certificate", icon: FiShield },
    { key: "contract", label: "Digital Contract", icon: FiFileText },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiUser className="text-blue-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.displayName}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiX size={24} className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "profile"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Profile & Permissions
          </button>
          <button
            onClick={() => setActiveTab("kyc")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "kyc"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            KYC Documents
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    User Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FiUser size={18} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{user.displayName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiMail size={18} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiShield size={18} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <RoleBadge role={user.role} />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiClock size={18} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Last Login</p>
                        <p className="font-medium">
                          {user.lastLogin
                            ? user.lastLogin.toLocaleDateString()
                            : "Never"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Permissions
                  </h3>
                  <div className="space-y-2">
                    {user.permissions?.map((permission) => (
                      <div key={permission} className="flex items-center gap-2">
                        <FiCheckCircle size={16} className="text-green-500" />
                        <span className="text-sm capitalize">
                          {permission.replace("_", " ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    KYC Status
                  </h3>
                  <StatusBadge status={user.kycStatus} />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleUpdateKyc("Pending")}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    <FiAlertTriangle size={16} /> Mark as Pending
                  </button>
                  <button
                    onClick={() => handleUpdateKyc("Verified")}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <FiCheck size={16} /> Approve & Verify
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "kyc" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  KYC Documents
                </h3>
                <p className="text-gray-600 mb-6">
                  Review and verify uploaded documents for compliance and
                  authentication.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentTypes.map(({ key, label, icon: Icon }) => {
                  const doc = user.kycDocuments[key];
                  return (
                    <div
                      key={key}
                      className="border border-gray-200 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Icon size={20} className="text-gray-500" />
                          <h4 className="font-medium text-gray-900">{label}</h4>
                        </div>
                        <DocumentStatusIcon document={doc} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Status:</span>
                          <span
                            className={`font-medium ${
                              !doc.uploaded
                                ? "text-red-600"
                                : doc.verified
                                ? "text-green-600"
                                : "text-amber-600"
                            }`}
                          >
                            {!doc.uploaded
                              ? "Not Uploaded"
                              : doc.verified
                              ? "Verified"
                              : "Pending Review"}
                          </span>
                        </div>
                        {doc.uploaded && (
                          <div className="flex gap-2 mt-3">
                            <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                              <FiEye size={12} />
                              View
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                              <FiDownload size={12} />
                              Download
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [kycFilter, setKycFilter] = useState("All");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          lastLogin: doc.data().lastLogin?.toDate(),
        }));
        setUsers(usersData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users.");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const handleAddUser = (newUser) => {
    // Optimistically add to UI, Firestore listener will sync it
    setUsers((prev) => [...prev, { ...newUser, id: "temp-id" }]);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesKyc = kycFilter === "All" || user.kycStatus === kycFilter;
    return matchesSearch && matchesRole && matchesKyc;
  });

  const stats = {
    total: users.length,
    verified: users.filter((u) => u.kycStatus === "Verified").length,
    pending: users.filter((u) => u.kycStatus === "Pending").length,
    notUploaded: users.filter((u) => u.kycStatus === "Not Uploaded").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddUser={handleAddUser}
      />
      <ViewUserModal
        isOpen={isViewModalOpen}
        onClose={() => setViewModalOpen(false)}
        user={selectedUser}
        onUpdateKyc={(userId, newStatus) => {
          const userDocRef = doc(db, "users", userId);
          updateDoc(userDocRef, { kycStatus: newStatus });
        }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-gray-600 mt-2">
              Define user types, manage permissions, and track KYC status for
              all platform users.
            </p>
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl shadow-lg hover:bg-amber-700 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <FiUserPlus size={20} />
            Add New User
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FiUser className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <FiCheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Verified</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.verified}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <FiClock className="text-amber-600" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-2xl font-bold text-amber-600">
                  {stats.pending}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <FiXCircle className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Not Uploaded</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.notUploaded}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <FiFilter
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white min-w-[140px]"
                >
                  <option value="All">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="Agent">Agent</option>
                  <option value="Broker">Broker</option>
                  <option value="Builder">Builder</option>
                  <option value="Normal User">Normal User</option>
                </select>
              </div>
              <div className="relative">
                <FiSettings
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  value={kycFilter}
                  onChange={(e) => setKycFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white min-w-[140px]"
                >
                  <option value="All">All KYC Status</option>
                  <option value="Verified">Verified</option>
                  <option value="Pending">Pending</option>
                  <option value="Not Uploaded">Not Uploaded</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-6 font-semibold text-gray-900">
                    User
                  </th>
                  <th className="text-left p-6 font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="text-left p-6 font-semibold text-gray-900">
                    KYC Status
                  </th>
                  <th className="text-left p-6 font-semibold text-gray-900">
                    Last Login
                  </th>
                  <th className="text-left p-6 font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading && (
                  <tr>
                    <td colSpan="5" className="text-center p-12">
                      <div className="inline-flex items-center gap-2 text-gray-500">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-600"></div>
                        Loading users...
                      </div>
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan="5" className="text-center p-12 text-red-500">
                      {error}
                    </td>
                  </tr>
                )}
                {!loading && filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center p-12">
                      <div className="text-gray-500">
                        <FiUser
                          size={48}
                          className="mx-auto mb-4 text-gray-300"
                        />
                        <p className="text-lg font-medium">No users found</p>
                        <p className="text-sm">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
                {!loading &&
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-white font-semibold">
                            {user.displayName?.charAt(0) || "U"}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {user.displayName || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <RoleBadge role={user.role || "N/A"} />
                      </td>
                      <td className="p-6">
                        <StatusBadge
                          status={user.kycStatus || "Not Uploaded"}
                        />
                      </td>
                      <td className="p-6 text-gray-600">
                        {user.lastLogin
                          ? user.lastLogin.toLocaleDateString()
                          : "Never"}
                      </td>
                      <td className="p-6">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="flex items-center gap-2 px-4 py-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg font-medium transition-all"
                        >
                          <FiEye size={16} />
                          View & Verify
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
