import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import {
    FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiKey,
    FiCheckCircle, FiXCircle, FiEdit2, FiArrowLeft, FiFileText, FiShield
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const UserDetailsPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userRef = doc(db, 'users', userId);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setUser({ id: userSnap.id, ...userSnap.data() });
                } else {
                    toast.error('User not found');
                    navigate('/admin/users');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                toast.error('Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId, navigate]);

    const getStatusBadge = (status) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${status === 'active' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
            }`}>
            {status === 'active' ? <FiCheckCircle className="mr-1" /> : <FiXCircle className="mr-1" />}
            {status === 'active' ? 'Active' : 'Inactive'}
        </span>
    );

    const getRoleBadge = (role) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${role === 'admin' ? 'bg-purple-900 text-purple-200' :
                role === 'agent' ? 'bg-blue-900 text-blue-200' :
                    role === 'builder' ? 'bg-green-900 text-green-200' :
                        role === 'realestate' ? 'bg-orange-900 text-orange-200' :
                            'bg-gray-700 text-gray-300'
            }`}>
            <FiKey className="mr-1" />
            {role || 'user'}
        </span>
    );

    const getVerifiedBadge = (verified) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${verified ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
            }`}>
            <FiShield className="mr-1" />
            {verified ? 'Verified' : 'Not Verified'}
        </span>
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-10 text-gray-400 bg-gray-900">
                User data not available
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen p-6 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate('/admin-dashboard')}
                        className="flex items-center text-orange-400 hover:text-orange-300 transition-colors duration-200"
                    >
                        <FiArrowLeft className="mr-2" size={20} />
                        Back to Users
                    </button>
                    {/* <button
                        onClick={() => navigate(`/admin/users/${userId}/edit`)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg flex items-center transition-colors duration-200 shadow-md hover:shadow-orange-500/50"
                    >
                        <FiEdit2 className="mr-2" />
                        Edit User
                    </button> */}
                </div>

                {/* User Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800 rounded-xl shadow-2xl shadow-orange-500/20 border border-gray-700 mb-8 overflow-hidden"
                >
                    <div className="md:flex">
                        {/* Profile Image Section */}
                        <div className="md:w-1/3 p-8 bg-gray-700 flex flex-col items-center justify-center">
                            <div className="relative">
                                {user.licensePhotoURL ? (
                                    <img
                                        src={user.licensePhotoURL}
                                        alt="License"
                                        className="h-40 w-40 rounded-full object-cover border-4 border-orange-500/20"
                                    />
                                ) : (
                                    <div className="h-40 w-40 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                                        <FiUser className="h-20 w-20" />
                                    </div>
                                )}
                                {user.status === 'active' && (
                                    <div className="absolute bottom-4 right-0 bg-green-500 text-white rounded-full p-1">
                                        <FiCheckCircle className="h-5 w-5" />
                                    </div>
                                )}
                            </div>
                            <h2 className="text-2xl font-extrabold text-white mt-4">
                                {user.username || user.displayName || user.nameOnLicense ||user.name || 'N/A'}
                            </h2>
                            <p className="text-gray-300">{user.email}</p>
                            <div className="flex space-x-2 mt-4">
                                {getStatusBadge(user.status)}
                                {getRoleBadge(user.role)}
                                {getVerifiedBadge(user.verified)}
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="md:w-2/3 p-8">
                            <h3 className="text-xl font-semibold text-white mb-6 border-b pb-2 border-gray-700">
                                User Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Personal Info */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
                                        <FiUser className="mr-2" />
                                        PERSONAL INFORMATION
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-400">Name on License</p>
                                            <p className="text-white font-medium">
                                                {user.nameOnLicense || 'Not specified'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Authority</p>
                                            <p className="text-white font-medium">
                                                {user.authority || 'Not specified'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
                                        <FiMail className="mr-2" />
                                        CONTACT INFORMATION
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-400">Email</p>
                                            <p className="text-white font-medium">
                                                {user.email}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Phone</p>
                                            <p className="text-white font-medium">
                                                {user.number || 'Not specified'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Address</p>
                                            <p className="text-white font-medium">
                                                {user.address || 'Not specified'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Info */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
                                        <FiKey className="mr-2" />
                                        ACCOUNT INFORMATION
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-400">User ID</p>
                                            <p className="text-white font-medium">
                                                {user.id}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Account Created</p>
                                            <p className="text-white font-medium">
                                                {user.createdAt?.toDate?.().toLocaleDateString() || 'Not available'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Ad Limit</p>
                                            <p className="text-white font-medium">
                                                {user.adLimit || 'Not specified'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* License Info */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
                                        <FiFileText className="mr-2" />
                                        LICENSE INFORMATION
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-400">License Number</p>
                                            <p className="text-white font-medium">
                                                {user.licenseInfo?.number || 'Not specified'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">License Photo</p>
                                            {user.licensePhotoURL ? (
                                                <a
                                                    href={user.licensePhotoURL}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-orange-400 hover:text-orange-300 text-sm"
                                                >
                                                    View License Photo
                                                </a>
                                            ) : (
                                                <p className="text-white font-medium">Not provided</p>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Verification Status</p>
                                            {getVerifiedBadge(user.verified)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Activity Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="bg-gray-800 rounded-xl shadow-2xl shadow-orange-500/20 border border-gray-700"
                >
                    <div className="p-8">
                        <h3 className="text-xl font-semibold text-white mb-6 border-b pb-2 border-gray-700">
                            User Activity
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Recent Activities */}
                            <div className="col-span-2">
                                <h4 className="text-sm font-semibold text-gray-400 mb-3">
                                    RECENT ACTIVITIES
                                </h4>
                                <div className="space-y-4">
                                    {user.recentActivities?.length > 0 ? (
                                        user.recentActivities.map((activity, index) => (
                                            <div key={index} className="flex items-start">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 mr-3">
                                                    <FiCalendar />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">
                                                        {activity.action}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {activity.timestamp?.toDate?.().toLocaleString() || 'Recently'}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400">No recent activities found</p>
                                    )}
                                </div>
                            </div>

                            {/* Statistics */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-400 mb-3">
                                    STATISTICS
                                </h4>
                                <div className="space-y-4">
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <p className="text-xs text-gray-400">Total Logins</p>
                                        <p className="text-2xl font-bold text-orange-400">
                                            {user.loginCount || 0}
                                        </p>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <p className="text-xs text-gray-400">Properties Viewed</p>
                                        <p className="text-2xl font-bold text-orange-400">
                                            {user.propertiesViewed || 0}
                                        </p>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <p className="text-xs text-gray-400">Appointments Made</p>
                                        <p className="text-2xl font-bold text-orange-400">
                                            {user.appointmentsMade || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default UserDetailsPage;