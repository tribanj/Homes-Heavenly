import React from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEdit, FiCamera, FiCalendar, FiTrash2 } from "react-icons/fi";

const ManageProperties = () => {
  const navigate = useNavigate();

  // --- CHANGE: Updated navigate calls to use relative paths ---
  const handleAddNew = () => {
    navigate("add");
  };

  const handleEdit = (propertyId) => {
    // Later this can be navigate(`edit/${propertyId}`)
    navigate("add");
  };

  const handleUploadMedia = (propertyId) => {
    navigate("upload-media");
  };

  const handleOpenHouse = (propertyId) => {
    navigate("set-open-house");
  };

  const handleDelete = (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      // Logic for deleting property (when backend ready)
      alert(`Property ID ${propertyId} deleted (dummy alert for now)`);
    }
  };

  return (
    <div className="manage-properties">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Manage Properties
          </h1>
          <p className="text-gray-500 mt-1">
            Add, edit, and oversee all your property listings.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <FiPlus className="mr-2" /> Add New Listing
        </button>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold text-gray-600 tracking-wider">
                  Image
                </th>
                <th className="p-3 text-sm font-semibold text-gray-600 tracking-wider">
                  Title
                </th>
                <th className="p-3 text-sm font-semibold text-gray-600 tracking-wider">
                  Price
                </th>
                <th className="p-3 text-sm font-semibold text-gray-600 tracking-wider">
                  Status
                </th>
                <th className="p-3 text-sm font-semibold text-gray-600 tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Dummy Example Row */}
              <tr className="hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="property"
                    className="rounded-md w-20 h-16 object-cover"
                  />
                </td>
                <td className="p-3 font-medium text-gray-700 align-middle">
                  Luxury Apartment in City Center
                </td>
                <td className="p-3 text-gray-700 align-middle">$500,000</td>
                <td className="p-3 align-middle">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="p-3 align-middle">
                  <div className="flex items-center justify-end space-x-1">
                    <button
                      onClick={() => handleEdit(1)}
                      className="p-2 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition"
                      title="Edit"
                    >
                      <FiEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleUploadMedia(1)}
                      className="p-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                      title="Upload Media"
                    >
                      <FiCamera size={14} />
                    </button>
                    <button
                      onClick={() => handleOpenHouse(1)}
                      className="p-2 text-yellow-600 bg-yellow-100 rounded-full hover:bg-yellow-200 transition"
                      title="Set Open House"
                    >
                      <FiCalendar size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(1)}
                      className="p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition"
                      title="Delete"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
              {/* More rows will be mapped here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProperties;
