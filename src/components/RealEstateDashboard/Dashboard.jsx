import React, { useState } from 'react';
import { FiHome, FiUsers, FiMapPin, FiDollarSign, FiMail, FiSettings, FiFileText, FiUserPlus, FiList } from 'react-icons/fi';
import { FaBuilding } from 'react-icons/fa';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

// Dummy data for visualizations
const kpiData = [
    { name: 'Total Listings', value: 120 },
    { name: 'Active Users', value: 80 },
    { name: 'New Leads', value: 45 },
    { name: 'Total Earnings', value: 50000 },
];
const leadSources = [
    { name: 'Website', value: 40 },
    { name: 'Social', value: 30 },
    { name: 'Referrals', value: 20 },
    { name: 'Others', value: 10 },
];
const recentActivities = [
    { id: 1, activity: 'New login by Agent John', time: '2025-08-01 09:00' },
    { id: 2, activity: 'Property #123 listed', time: '2025-08-01 08:45' },
    { id: 3, activity: 'Support ticket #456 created', time: '2025-08-01 08:30' },
];
const users = [
    { id: 1, name: 'John Doe', role: 'Agent', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'Builder', status: 'Pending' },
];
const transactions = [
    { id: 1, type: 'Sale', amount: 100000, date: '2025-07-30' },
    { id: 2, type: 'Rental', amount: 5000, date: '2025-07-29' },
];
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
// Sidebar component
const Sidebar = ({ setActiveSection }) => {
    const sections = [
        { name: 'Overview Metrics', icon: <FiHome /> },
        { name: 'Recent Activities', icon: <FiList /> },
        { name: 'User Management', icon: <FiUsers /> },
        { name: 'Property Management', icon: <FiMapPin /> },
        { name: 'Leads & CRM', icon: <FiMail /> },
        { name: 'Marketing & Campaigns', icon: <FiMail /> },
        { name: 'Team Management', icon: <FiUserPlus /> },
        { name: 'Finance & Payments', icon: <FiDollarSign /> },
        { name: 'Support & Services', icon: <FiFileText /> },
        { name: 'Settings', icon: <FiSettings /> },
    ];

    return (
        <div className="bg-gray-800 w-64 h-screen p-4">
            <h2 className="text-2xl font-bold text-orange-400 mb-6">HomeHeavenly</h2>
            <ul>
                {sections.map((section) => (
                    <li key={section.name} className="mb-2">
                        <button
                            onClick={() => setActiveSection(section.name)}
                            className="flex items-center w-full p-2 text-gray-300 hover:bg-orange-500/20 hover:text-orange-400 rounded transition-colors duration-200"
                        >
                            {section.icon}
                            <span className="ml-2">{section.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Main Dashboard component
const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('Overview Metrics');
    const [propertyForm, setPropertyForm] = useState({ name: '', units: '', price: '', location: '' });
    const [teamForm, setTeamForm] = useState({ name: '', role: '', id: '' });
    const [campaignForm, setCampaignForm] = useState({ name: '', type: '', schedule: '' });

    const handlePropertySubmit = (e) => {
        e.preventDefault();
        toast.success('Property added successfully!');
        setPropertyForm({ name: '', units: '', price: '', location: '' });
    };

    const handleTeamSubmit = (e) => {
        e.preventDefault();
        toast.success('Team member added successfully!');
        setTeamForm({ name: '', role: '', id: '' });
    };

    const handleCampaignSubmit = (e) => {
        e.preventDefault();
        toast.success('Campaign created successfully!');
        setCampaignForm({ name: '', type: '', schedule: '' });
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'Overview Metrics':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Overview Metrics</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={kpiData}>
                                <XAxis dataKey="name" stroke="#fff" />
                                <YAxis stroke="#fff" />
                                <Tooltip contentStyle={{ background: '#1F2937', border: 'none' }} />
                                <Bar dataKey="value">
                                    {kpiData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {kpiData.map((item, index) => (
                                <div key={item.name} className="bg-gray-700 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                                    <p className="text-2xl" style={{ color: COLORS[index % COLORS.length] }}>
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'Recent Activities':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Recent Activities</h2>
                        <table className="w-full text-left text-gray-300">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="p-2">Activity</th>
                                    <th className="p-2">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentActivities.map((activity) => (
                                    <tr key={activity.id} className="border-b border-gray-600">
                                        <td className="p-2">{activity.activity}</td>
                                        <td className="p-2">{activity.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'User Management':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">User Management</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">User Roles & Access</h3>
                                <table className="w-full text-left text-gray-300">
                                    <thead>
                                        <tr className="bg-gray-700">
                                            <th className="p-2">Name</th>
                                            <th className="p-2">Role</th>
                                            <th className="p-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id} className="border-b border-gray-600">
                                                <td className="p-2">{user.name}</td>
                                                <td className="p-2">{user.role}</td>
                                                <td className="p-2">{user.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">User Profile & KYC</h3>
                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <input type="file" className="text-gray-300" />
                                    <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded">Upload KYC</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Property Management':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Property & Project Management</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">Add Property</h3>
                                <form onSubmit={handlePropertySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Project Name"
                                        value={propertyForm.name}
                                        onChange={(e) => setPropertyForm({ ...propertyForm, name: e.target.value })}
                                        className="p-2 bg-gray-700 text-white rounded"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Units"
                                        value={propertyForm.units}
                                        onChange={(e) => setPropertyForm({ ...propertyForm, units: e.target.value })}
                                        className="p-2 bg-gray-700 text-white rounded"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        value={propertyForm.price}
                                        onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
                                        className="p-2 bg-gray-700 text-white rounded"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Geo-location"
                                        value={propertyForm.location}
                                        onChange={(e) => setPropertyForm({ ...propertyForm, location: e.target.value })}
                                        className="p-2 bg-gray-700 text-white rounded"
                                    />
                                    <button type="submit" className="p-2 bg-orange-500 text-white rounded col-span-2">Add Property</button>
                                </form>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">Inventory Management</h3>
                                <table className="w-full text-left text-gray-300">
                                    <thead>
                                        <tr className="bg-gray-700">
                                            <th className="p-2">Property</th>
                                            <th className="p-2">Status</th>
                                            <th className="p-2">Units</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-600">
                                            <td className="p-2">Project A</td>
                                            <td className="p-2">Available</td>
                                            <td className="p-2">50</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            case 'Leads & CRM':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Leads & CRM</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">Leads Dashboard</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie data={leadSources} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                            {leadSources.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ background: '#1F2937', border: 'none' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">Customer Interaction</h3>
                                <table className="w-full text-left text-gray-300">
                                    <thead>
                                        <tr className="bg-gray-700">
                                            <th className="p-2">Lead</th>
                                            <th className="p-2">Interaction</th>
                                            <th className="p-2">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-600">
                                            <td className="p-2">Lead #1</td>
                                            <td className="p-2">Email sent</td>
                                            <td className="p-2">2025-07-30</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            case 'Marketing & Campaigns':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Marketing & Campaigns</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">Campaign Manager</h3>
                                <form onSubmit={handleCampaignSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Campaign Name"
                                        value={campaignForm.name}
                                        onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                                        className="p-2 bg-gray-700 text-white rounded"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Type (Email/WhatsApp)"
                                        value={campaignForm.type}
                                        onChange={(e) => setCampaignForm({ ...campaignForm, type: e.target.value })}
                                        className="p-2 bg-gray-700 text-white rounded"
                                    />
                                    <input
                                        type="datetime-local"
                                        value={campaignForm.schedule}
                                        onChange={(e) => setCampaignForm({ ...campaignForm, schedule: e.target.value })}
                                        className="p-2 bg-gray-700 text-white rounded"
                                    />
                                    <button type="submit" className="p-2 bg-orange-500 text-white rounded col-span-2">Create Campaign</button>
                                </form>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">Auto Notifications</h3>
                                <label className="flex items-center text-gray-300">
                                    <input type="checkbox" className="mr-2" />
                                    Enable Auto Notifications
                                </label>
                            </div>
                        </div>
                    </div>
                );
            case 'Team Management':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Team & Broker Management</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">Add Team Member</h3>
                                <form onSubmit={handleTeamSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={teamForm.name}
                                        onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                                        className="p-2 bg-gray-700 text-white rounded"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Role"
                                        value={teamForm.role}
                                        onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                                        className="p-2 bg-gray-700 text-white rounded"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Unique ID"
                                        value={teamForm.id}
                                        onChange={(e) => setTeamForm({ ...teamForm, id: e.target.value })}
                                        className="p-2 bg-gray-700 text-white rounded"
                                    />
                                    <button type="submit" className="p-2 bg-orange-500 text-white rounded col-span-2">Add Team Member</button>
                                </form>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">Roles & Task Assign</h3>
                                <table className="w-full text-left text-gray-300">
                                    <thead>
                                        <tr className="bg-gray-700">
                                            <th className="p-2">Name</th>
                                            <th className="p-2">Task</th>
                                            <th className="p-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-600">
                                            <td className="p-2">John Doe</td>
                                            <td className="p-2">Follow up leads</td>
                                            <td className="p-2">In Progress</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            case 'Finance & Payments':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Finance & Payments</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">Transaction History</h3>
                                <table className="w-full text-left text-gray-300">
                                    <thead>
                                        <tr className="bg-gray-700">
                                            <th className="p-2">Type</th>
                                            <th className="p-2">Amount</th>
                                            <th className="p-2">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((txn) => (
                                            <tr key={txn.id} className="border-b border-gray-600">
                                                <td className="p-2">{txn.type}</td>
                                                <td className="p-2">${txn.amount}</td>
                                                <td className="p-2">{txn.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">Commission Tracker</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={transactions}>
                                        <XAxis dataKey="type" stroke="#fff" />
                                        <YAxis stroke="#fff" />
                                        <Tooltip contentStyle={{ background: '#1F2937', border: 'none' }} />
                                        <Bar dataKey="amount" fill="#4ECDC4" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                );
            case 'Support & Services':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Support & Services</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">Ticketing System</h3>
                                <table className="w-full text-left text-gray-300">
                                    <thead>
                                        <tr className="bg-gray-700">
                                            <th className="p-2">Ticket ID</th>
                                            <th className="p-2">Issue</th>
                                            <th className="p-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-600">
                                            <td className="p-2">#456</td>
                                            <td className="p-2">Payment issue</td>
                                            <td className="p-2">Open</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">Service History</h3>
                                <table className="w-full text-left text-gray-300">
                                    <thead>
                                        <tr className="bg-gray-700">
                                            <th className="p-2">Service</th>
                                            <th className="p-2">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-600">
                                            <td className="p-2">Legal Check</td>
                                            <td className="p-2">2025-07-28</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            case 'Settings':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Customization & Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">Custom Modules</h3>
                                <div className="flex space-x-4">
                                    <label className="flex items-center text-gray-300">
                                        <input type="checkbox" className="mr-2" />
                                        Auctions
                                    </label>
                                    <label className="flex items-center text-gray-300">
                                        <input type="checkbox" className="mr-2" />
                                        Legal Help
                                    </label>
                                    <label className="flex items-center text-gray-300">
                                        <input type="checkbox" className="mr-2" />
                                        Mortgage
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300">General Settings</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Branding" className="p-2 bg-gray-700 text-white rounded" />
                                    <input type="text" placeholder="Email Template" className="p-2 bg-gray-700 text-white rounded" />
                                    <input type="text" placeholder="Language" className="p-2 bg-gray-700 text-white rounded" />
                                    <input type="text" placeholder="Currency" className="p-2 bg-gray-700 text-white rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex bg-gray-900 min-h-screen font-sans">
            <Sidebar setActiveSection={setActiveSection} />
            <div className="flex-1 p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800 rounded-xl p-6 shadow-2xl shadow-orange-500/20 border border-gray-700"
                >
                    {renderSection()}
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;