import React, { useState, useEffect } from "react";
import {
  FiPlusCircle,
  FiMail,
  FiMessageSquare,
  FiBell,
  FiUsers,
  FiClock,
  FiSend,
  FiX,
} from "react-icons/fi";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig"; // Adjust path if needed
import { toast } from "react-toastify";

// --- MODAL COMPONENT (with Firebase logic) ---
const AddCampaignModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    channel: "Email",
    targetAudience: "All Users",
    scheduleDate: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.targetAudience ||
      !formData.scheduleDate ||
      !formData.message
    ) {
      toast.error("Please fill all required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "campaigns"), {
        ...formData,
        status: "Scheduled", // Campaigns are scheduled by default
        sent: 0,
        openRate: "0%",
        createdAt: serverTimestamp(),
        scheduleDate: new Date(formData.scheduleDate), // Store as a proper timestamp
      });
      toast.success(`Campaign "${formData.name}" has been scheduled!`);
      onClose();
    } catch (error) {
      toast.error("Failed to create campaign.");
      console.error("Error creating campaign:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Create & Schedule Campaign
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Campaign Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="mt-1 w-full input"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Channel
              </label>
              <select
                value={formData.channel}
                onChange={(e) =>
                  setFormData({ ...formData, channel: e.target.value })
                }
                className="mt-1 w-full input"
              >
                <option>Email</option>
                <option>WhatsApp</option>
                <option>Social Media</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Target Audience
              </label>
              <select
                value={formData.targetAudience}
                onChange={(e) =>
                  setFormData({ ...formData, targetAudience: e.target.value })
                }
                className="mt-1 w-full input"
              >
                <option>All Users</option>
                <option>New Leads</option>
                <option>Agents & Brokers</option>
                <option>Property Owners</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Schedule Date & Time
            </label>
            <input
              type="datetime-local"
              value={formData.scheduleDate}
              onChange={(e) =>
                setFormData({ ...formData, scheduleDate: e.target.value })
              }
              required
              className="mt-1 w-full input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message / Content
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              rows="5"
              className="mt-1 w-full input resize-none"
              placeholder="Compose your campaign message here..."
            ></textarea>
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 disabled:bg-amber-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
            >
              <FiSend /> {isSubmitting ? "Scheduling..." : "Schedule Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- UI COMPONENTS ---
const CampaignCard = ({ campaign }) => (
  <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 flex flex-col">
    <div className="flex-grow">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-gray-800 pr-4">
          {campaign.name}
        </h3>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
            campaign.status === "Active" || campaign.status === "Sent"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {campaign.status}
        </span>
      </div>
      <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
        <div className="flex items-center gap-2">
          <FiUsers size={14} />
          <span>{campaign.targetAudience}</span>
        </div>
        <div className="flex items-center gap-2">
          {campaign.channel === "Email" ? (
            <FiMail size={14} />
          ) : (
            <FiMessageSquare size={14} />
          )}
          <span>{campaign.channel}</span>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-500 mt-2 gap-2">
        <FiClock size={14} />
        <span>
          Scheduled for:{" "}
          {campaign.scheduleDate
            ? new Date(campaign.scheduleDate.seconds * 1000).toLocaleString()
            : "N/A"}
        </span>
      </div>
    </div>
    <div className="flex justify-between items-end mt-4 pt-4 border-t">
      <div>
        <p className="text-sm text-gray-500">Sent</p>
        <p className="font-bold text-gray-800">
          {campaign.sent.toLocaleString()}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Open Rate</p>
        <p className="font-bold text-gray-800">{campaign.openRate}</p>
      </div>
      <button className="px-4 py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm">
        View Details
      </button>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
const Marketing = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "campaigns"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const campaignsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCampaigns(campaignsData);
        setLoading(false);
      },
      (err) => {
        setError("Failed to fetch campaigns.");
        console.error(err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "notifications"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const notificationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsData);
      },
      (err) => {
        console.error("Failed to fetch notification settings:", err);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleToggleNotification = async (id, currentStatus) => {
    const notifDocRef = doc(db, "notifications", id);
    try {
      await updateDoc(notifDocRef, { enabled: !currentStatus });
      toast.success("Notification setting updated!");
    } catch (error) {
      toast.error("Failed to update setting.");
      console.error("Error toggling notification:", error);
    }
  };

  return (
    <div>
      <AddCampaignModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Marketing & Campaigns
          </h1>
          <p className="text-gray-500 mt-1">
            Create, schedule, and run marketing campaigns and automated alerts.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
        >
          <FiPlusCircle /> Create New Campaign
        </button>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Campaign Manager
        </h2>
        {loading && <p>Loading campaigns...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Automated Notifications
        </h2>
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 divide-y divide-gray-200">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex justify-between items-center pt-4 first:pt-0"
            >
              <div>
                <h4 className="font-semibold text-gray-800">{notif.name}</h4>
                <p className="text-sm text-gray-500">{notif.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notif.enabled}
                  onChange={() =>
                    handleToggleNotification(notif.id, notif.enabled)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-amber-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketing;
