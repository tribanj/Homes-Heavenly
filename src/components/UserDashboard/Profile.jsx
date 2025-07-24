import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import {
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaBuilding,
  FaHome,
  FaIdCard,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdVerifiedUser,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const roleLimits = {
  user: 2,
  agent: 5,
  builder: 10,
  realestate: 10,
};

const Profile = () => {
  const { user, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [showRoleChanger, setShowRoleChanger] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    bio: "",
    phone: "",
    address: "",
    role: "user",
    verified: false,
  });

  const [licenseData, setLicenseData] = useState({
    authority: "",
    number: "",
    nameOnLicense: "",
    address: "",
    photo: null,
  });

  const [loading, setLoading] = useState(true);

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const getRoleIcon = () => {
    switch (formData.role) {
      case "agent":
        return <FaUser className="text-amber-400" />;
      case "builder":
        return <FaHome className="text-amber-500" />;
      case "realestate":
        return <FaBuilding className="text-amber-600" />;
      default:
        return <FaUser className="text-gray-400" />;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setFormData({
          displayName: user.displayName || "",
          email: user.email || "",
          bio: userDoc.data().bio || "",
          phone: userDoc.data().phone || "",
          address: userDoc.data().address || "",
          role: userDoc.data().role || "user",
          verified: userDoc.data().verified || false,
        });
      }
      setLoading(false);
    };
    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLicenseChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setLicenseData({ ...licenseData, photo: files[0] });
    } else {
      setLicenseData({ ...licenseData, [name]: value });
    }
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "homeHeavenlyImage");
    data.append("folder", "LicenseUploads");
    data.append("cloud_name", "de56w4x21");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/de56w4x21/image/upload",
      data
    );
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, { displayName: formData.displayName });
      const updatePayload = {
        bio: formData.bio,
        phone: formData.phone,
        address: formData.address,
        updatedAt: new Date(),
      };

      if (showRoleChanger && formData.role !== "user") {
        let photoURL = "";
        if (licenseData.photo) {
          photoURL = await uploadToCloudinary(licenseData.photo);
        }
        updatePayload.role = formData.role;
        updatePayload.verified = false;
        updatePayload.adLimit = roleLimits[formData.role];
        updatePayload.licenseInfo = {
          authority: licenseData.authority,
          number: licenseData.number,
          nameOnLicense: licenseData.nameOnLicense,
          address: licenseData.address,
          photoURL,
        };
      }

      await updateDoc(doc(db, "users", user.uid), updatePayload);
      setEditMode(false);
      setShowRoleChanger(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-amber-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-amber-900 text-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-amber-900/80 to-amber-800/90 py-8 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-amber-800 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
                {getInitials(formData.displayName)}
              </div>
              {formData.role !== "user" && (
                <div className="absolute -bottom-2 -right-2 bg-amber-800 p-2 rounded-full shadow-md">
                  {getRoleIcon()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {formData.displayName || "User"}
                  </h1>
                  <p className="text-amber-100 flex items-center gap-2 mt-1">
                    <MdEmail className="text-amber-300" />
                    {formData.email}
                  </p>
                </div>
                {formData.role !== "user" && (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md ${formData.verified ? "bg-emerald-900/80 text-emerald-200" : "bg-amber-900/80 text-amber-200"}`}>
                    {formData.verified ? <FaCheckCircle className="text-emerald-400" /> : <FaTimesCircle className="text-amber-400" />}
                    <span className="text-sm font-medium">
                      {formData.verified ? "Verified Account" : "Pending Verification"}
                    </span>
                  </div>
                )}
              </div>
              {formData.bio && !editMode && (
                <p className="mt-4 text-amber-100 max-w-2xl">{formData.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {editMode ? (
          <form onSubmit={handleSubmit} className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-amber-900/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <FaEdit className="text-amber-400" /> Edit Profile
              </h2>
              <div className="text-sm text-amber-300">
                {showRoleChanger ? "Upgrading Account" : "Editing Basic Info"}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-amber-200 mb-2">Full Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full bg-gray-700/70 border border-amber-900/50 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-amber-200 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-700/70 border border-amber-900/50 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-amber-200 mb-2">Bio</label>
                <textarea
                  name="bio"
                  rows="3"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full bg-gray-700/70 border border-amber-900/50 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-amber-200 mb-2">Address</label>
                <textarea
                  name="address"
                  rows="2"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-gray-700/70 border border-amber-900/50 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                ></textarea>
              </div>

              {formData.role === "user" && !showRoleChanger && (
                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={() => setShowRoleChanger(true)}
                    className="text-amber-400 hover:text-amber-300 underline transition-colors duration-300"
                  >
                    Upgrade to Professional Account
                  </button>
                </div>
              )}

              {showRoleChanger && (
                <>
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium text-amber-300 mb-4 flex items-center gap-2">
                      <FaUser className="text-amber-400" /> Professional Account Setup
                    </h3>
                    <p className="text-sm text-amber-100 mb-4">
                      Please provide your professional details and license information for verification.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm text-amber-200 mb-2">Select Professional Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full bg-gray-700/70 border border-amber-900/50 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="agent">Real Estate Agent</option>
                      <option value="builder">Builder/Developer</option>
                      <option value="realestate">Real Estate Company</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-amber-200 mb-2">License Authority</label>
                      <input
                        type="text"
                        name="authority"
                        placeholder="e.g. State Real Estate Board"
                        onChange={handleLicenseChange}
                        className="w-full bg-gray-700/70 border border-amber-900/50 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-amber-200 mb-2">License Number</label>
                      <input
                        type="text"
                        name="number"
                        placeholder="Your professional license number"
                        onChange={handleLicenseChange}
                        className="w-full bg-gray-700/70 border border-amber-900/50 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-amber-200 mb-2">Name on License</label>
                      <input
                        type="text"
                        name="nameOnLicense"
                        placeholder="Name as it appears on license"
                        onChange={handleLicenseChange}
                        className="w-full bg-gray-700/70 border border-amber-900/50 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-amber-200 mb-2">License Address</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Address on license documents"
                        onChange={handleLicenseChange}
                        className="w-full bg-gray-700/70 border border-amber-900/50 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-amber-200 mb-2">License Photo/Scan</label>
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer">
                          <div className="border-2 border-dashed border-amber-700 rounded-lg p-4 text-center hover:bg-amber-900/20 transition-colors duration-300">
                            <span className="text-amber-300">Click to upload license document</span>
                            <input
                              type="file"
                              name="photo"
                              accept="image/*"
                              onChange={handleLicenseChange}
                              className="hidden"
                              required
                            />
                          </div>
                        </label>
                        {licenseData.photo && (
                          <span className="text-sm text-amber-300">{licenseData.photo.name}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-amber-900/50">
              <button
                type="button"
                onClick={() => { setEditMode(false); setShowRoleChanger(false); }}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-100 transition-colors duration-300 shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-amber-900/50">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-white">Profile Information</h2>
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FaEdit /> Edit Profile
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-800/70 to-amber-900/20 rounded-xl border border-amber-900/30 hover:border-amber-700/50 transition-all duration-300">
                  <div className="p-3 bg-amber-900/50 rounded-lg text-amber-300">
                    <MdEmail className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm text-amber-200 mb-1">Email</h3>
                    <p className="text-white">{formData.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-800/70 to-amber-900/20 rounded-xl border border-amber-900/30 hover:border-amber-700/50 transition-all duration-300">
                  <div className="p-3 bg-amber-900/50 rounded-lg text-amber-300">
                    <MdPhone className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm text-amber-200 mb-1">Phone</h3>
                    <p className="text-white">{formData.phone || "Not provided"}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-800/70 to-amber-900/20 rounded-xl border border-amber-900/30 hover:border-amber-700/50 transition-all duration-300">
                  <div className="p-3 bg-amber-900/50 rounded-lg text-amber-300">
                    <MdLocationOn className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm text-amber-200 mb-1">Address</h3>
                    <p className="text-white">{formData.address || "Not provided"}</p>
                  </div>
                </div>

                {/* Account Type */}
                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-800/70 to-amber-900/20 rounded-xl border border-amber-900/30 hover:border-amber-700/50 transition-all duration-300">
                  <div className="p-3 bg-amber-900/50 rounded-lg text-amber-300">
                    <FaIdCard className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm text-amber-200 mb-1">Account Type</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-white capitalize">{formData.role}</span>
                      {formData.role !== "user" && (
                        <span className={`text-xs px-2 py-1 rounded-full ${formData.verified ? "bg-emerald-900/80 text-emerald-200" : "bg-amber-900/80 text-amber-200"}`}>
                          {formData.verified ? "Verified" : "Pending"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              {formData.bio && (
                <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-800/70 to-amber-900/20 rounded-xl border border-amber-900/30 hover:border-amber-700/50 transition-all duration-300">
                  <div className="p-3 bg-amber-900/50 rounded-lg text-amber-300">
                    <MdVerifiedUser className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm text-amber-200 mb-1">Bio</h3>
                    <p className="text-white">{formData.bio}</p>
                  </div>
                </div>
              )}

              {/* Verification Notice */}
              {formData.role !== "user" && !formData.verified && (
                <div className="mt-8 p-4 bg-gradient-to-r from-amber-900/50 to-amber-800/60 rounded-lg border-l-4 border-amber-500 shadow-md">
                  <div className="flex items-start gap-3">
                    <FaTimesCircle className="text-amber-400 mt-1 flex-shrink-0 text-xl" />
                    <div>
                      <h3 className="font-medium text-amber-300 mb-1">Account Verification Pending</h3>
                      <p className="text-sm text-amber-100">
                        Your {formData.role} account is under verification. You'll be able to access all professional features once our team verifies your documents. This process typically takes 1-2 business days.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;