import React, { useState, useEffect } from "react";
import { FiUpload, FiSave } from "react-icons/fi";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig"; // Adjust path if needed
import { toast } from "react-toastify";

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "",
    logoUrl: "",
    currency: "INR",
  });
  const [modules, setModules] = useState({
    Auctions: true,
    "Legal Help": true,
    "Mortgage Assistance": true,
    "Vastu Services": true,
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Use a single document for all platform settings for efficiency
  const settingsDocRef = doc(db, "settings", "platformConfig");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      settingsDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setGeneralSettings(
            data.general || { companyName: "Prop-Wise", currency: "INR" }
          );
          setModules(
            data.modules || {
              Auctions: true,
              "Legal Help": true,
              "Mortgage Assistance": true,
              "Vastu Services": true,
            }
          );
        } else {
          // If the document doesn't exist, you can use default values
          console.log("No settings document found, using defaults.");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load settings.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleModuleToggle = async (moduleName) => {
    const newModulesState = { ...modules, [moduleName]: !modules[moduleName] };
    setModules(newModulesState); // Optimistic UI update
    try {
      await setDoc(
        settingsDocRef,
        { modules: newModulesState },
        { merge: true }
      );
      toast.success(`'${moduleName}' module status updated!`);
    } catch (error) {
      toast.error(`Failed to update '${moduleName}' status.`);
      console.error("Error updating module:", error);
      // Revert UI on error
      setModules((prev) => ({ ...prev, [moduleName]: !prev[moduleName] }));
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await setDoc(
        settingsDocRef,
        { general: generalSettings },
        { merge: true }
      );
      toast.success("General settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings.");
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading settings...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Customization & Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- General Settings Column --- */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              General Settings
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={generalSettings.companyName}
                  onChange={handleGeneralSettingsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Logo
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    {generalSettings.logoUrl ? (
                      <img
                        src={generalSettings.logoUrl}
                        alt="logo"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">Logo</span>
                    )}
                  </div>
                  <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300">
                    <FiUpload className="mr-2" /> Upload New Logo
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Currency
                </label>
                <select
                  name="currency"
                  value={generalSettings.currency}
                  onChange={handleGeneralSettingsChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option>INR</option>
                  <option>USD</option>
                </select>
              </div>
              <div className="pt-4 border-t">
                <button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-amber-600 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:bg-amber-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FiSave />
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Custom Modules Column --- */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Custom Modules
            </h2>
            <div className="space-y-4">
              {Object.keys(modules).map((moduleName) => (
                <div
                  key={moduleName}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                >
                  <span className="font-medium text-gray-700">
                    {moduleName}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={modules[moduleName]}
                      onChange={() => handleModuleToggle(moduleName)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-amber-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
