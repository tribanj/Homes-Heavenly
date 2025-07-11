import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    bio: "",
    phone: "",
    address: "",
  });

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
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
        });
      }
    };
    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, { displayName: formData.displayName });
      await updateDoc(doc(db, "users", user.uid), {
        bio: formData.bio,
        phone: formData.phone,
        address: formData.address,
        updatedAt: new Date(),
      });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="text-gray-50 min-h-screen px-6 py-10 bg-gray-800">
      {/* Top Strip */}
      <div className="flex items-center gap-5 border-b border-gray-300 pb-6 mb-10">
        <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
          {getInitials(formData.displayName)}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">
            {formData.displayName || "User"}
          </h1>
          <p className="text-sm text-gray-600">{formData.email}</p>
        </div>
      </div>

      {/* Content Area */}
      {editMode ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1 font-medium">Bio</label>
              <textarea
                name="bio"
                rows="3"
                value={formData.bio}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1 font-medium">Address</label>
              <textarea
                name="address"
                rows="2"
                value={formData.address}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-8">
          <div>
            <h3 className="text-sm text-gray-500 mb-1">Bio</h3>
            <p>{formData.bio || "No bio provided"}</p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mb-1">Phone</h3>
            <p>{formData.phone || "No phone number"}</p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mb-1">Address</h3>
            <p>{formData.address || "No address available"}</p>
          </div>

          <div>
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md text-sm"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
