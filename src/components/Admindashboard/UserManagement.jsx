import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiKey, FiCheckCircle, FiXCircle, FiEye, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Toggle user active status
  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        status: currentStatus === 'active' ? 'inactive' : 'active'
      });

      setUsers(users.map(user =>
        user.id === userId
          ? { ...user, status: currentStatus === 'active' ? 'inactive' : 'active' }
          : user
      ));

      toast.success(`User ${currentStatus === 'active' ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status");
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        setUsers(users.filter(user => user.id !== userId));
        toast.success("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      }
    }
  };

  // View user details
  const viewUserDetails = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-6 font-sans">
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-xl shadow-2xl shadow-orange-500/20 border border-gray-700 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-white flex items-center">
              <FiUser className="mr-3 text-orange-500" size={28} />
              User Management
            </h2>
            <p className="text-gray-400 mt-1 text-sm">
              Manage user accounts, roles, and statuses with ease
            </p>
          </div>
          {/* <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg flex items-center transition-colors duration-200 shadow-md hover:shadow-orange-500/50"
            onClick={() => navigate('/admin/users/new')}
          >
            <FiUser className="mr-2" />
            Add New User
          </button> */}
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  <FiMail className="inline mr-2" /> Email
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  <FiKey className="inline mr-2" /> Role
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-right text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-700 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                          <FiUser size={20} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {user.username || user.displayName || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-900 text-purple-200' :
                          user.role === 'agent' ? 'bg-blue-900 text-blue-200' :
                            user.role === 'builder' ? 'bg-green-900 text-green-200' :
                              'bg-gray-700 text-gray-300'
                        }`}>
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${user.status === 'active' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                        }`}>
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => viewUserDetails(user.id)}
                          className="text-orange-400 hover:text-orange-300 p-2 rounded-full hover:bg-orange-500/20 transition-colors duration-150"
                          title="View Details"
                        >
                          <FiEye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(user.id, user.status)}
                          className={`p-2 rounded-full hover:bg-opacity-20 transition-colors duration-150 ${user.status === 'active' ? 'text-red-400 hover:bg-red-500' : 'text-green-400 hover:bg-green-500'
                            }`}
                          title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {user.status === 'active' ? <FiXCircle className="h-5 w-5" /> : <FiCheckCircle className="h-5 w-5" />}
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-500/20 transition-colors duration-150"
                          title="Delete User"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;