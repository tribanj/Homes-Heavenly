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
        return <FaUser className="text-blue-500" />;
      case "builder":
        return <FaHome className="text-orange-500" />;
      case "realestate":
        return <FaBuilding className="text-purple-500" />;
      default:
        return <FaUser className="text-gray-500" />;
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
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="bg-gray-800 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                {getInitials(formData.displayName)}
              </div>
              {formData.role !== "user" && (
                <div className="absolute -bottom-2 -right-2 bg-gray-900 p-1 rounded-full">
                  {getRoleIcon()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {formData.displayName || "User"}
                  </h1>
                  <p className="text-gray-400 flex items-center gap-2 mt-1">
                    <MdEmail className="text-blue-400" />
                    {formData.email}
                  </p>
                </div>
                {formData.role !== "user" && (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${formData.verified ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"}`}>
                    {formData.verified ? <FaCheckCircle className="text-green-400" /> : <FaTimesCircle className="text-yellow-400" />}
                    <span className="text-sm font-medium">
                      {formData.verified ? "Verified Account" : "Pending Verification"}
                    </span>
                  </div>
                )}
              </div>
              {formData.bio && !editMode && (
                <p className="mt-4 text-gray-300 max-w-2xl">{formData.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-6">
        <div className="flex justify-end mb-4">
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">
            Logout
          </button>
        </div>
        {editMode ? (
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FaEdit /> Edit Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                <input type="text" name="displayName" value={formData.displayName} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">Bio</label>
                <textarea name="bio" rows="3" value={formData.bio} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg"></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">Address</label>
                <textarea name="address" rows="2" value={formData.address} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg"></textarea>
              </div>

              {formData.role === "user" && !showRoleChanger && (
                <div className="md:col-span-2">
                  <button type="button" onClick={() => setShowRoleChanger(true)} className="text-blue-400 hover:underline">Change Role</button>
                </div>
              )}

              {showRoleChanger && (
                <>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Select New Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg">
                      <option value="agent">Agent</option>
                      <option value="builder">Builder</option>
                      <option value="realestate">Real Estate Company</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" name="authority" placeholder="License Authority" onChange={handleLicenseChange} className="bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg" required />
                    <input type="text" name="number" placeholder="License Number" onChange={handleLicenseChange} className="bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg" required />
                    <input type="text" name="nameOnLicense" placeholder="Name on License" onChange={handleLicenseChange} className="bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg" required />
                    <input type="text" name="address" placeholder="License Address" onChange={handleLicenseChange} className="bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg" required />
                    <input type="file" name="photo" accept="image/*" onChange={handleLicenseChange} className="bg-gray-700 text-gray-300" required />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-gray-700">
              <button type="button" onClick={() => { setEditMode(false); setShowRoleChanger(false); }} className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-100">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Save Changes</button>
            </div>
          </form>
        ) : (
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              <button onClick={() => setEditMode(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                <FaEdit /> Edit Profile
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-700 rounded-lg text-blue-400">
                    <MdEmail className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Email</h3>
                    <p className="text-gray-100">{formData.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-700 rounded-lg text-blue-400">
                    <MdPhone className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Phone</h3>
                    <p className="text-gray-100">{formData.phone || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-700 rounded-lg text-blue-400">
                    <MdLocationOn className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Address</h3>
                    <p className="text-gray-100">{formData.address || "Not provided"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-700 rounded-lg text-blue-400">
                    <FaIdCard className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Account Type</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-100 capitalize">{formData.role}</span>
                      {formData.role !== "user" && (
                        <span className={`text-xs px-2 py-1 rounded-full ${formData.verified ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"}`}>
                          {formData.verified ? "Verified" : "Pending"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {formData.bio && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-700 rounded-lg text-blue-400">
                    <MdVerifiedUser className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400 mb-1">Bio</h3>
                    <p className="text-gray-100">{formData.bio}</p>
                  </div>
                </div>
              )}
              {formData.role !== "user" && !formData.verified && (
                <div className="mt-8 p-4 bg-gray-700 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex items-start gap-3">
                    <FaTimesCircle className="text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-yellow-400 mb-1">Account Verification Pending</h3>
                      <p className="text-sm text-gray-300">
                        Your {formData.role} account is under verification. You'll be able to access all features once our team verifies your documents.
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
