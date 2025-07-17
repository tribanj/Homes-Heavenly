import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit, FiGrid, FiCheckCircle, FiArrowRight, FiMail, FiUser, FiPhone } from 'react-icons/fi';
import twoDimg1 from '../../assets/2d design.webp'
import twoDimg2 from '../../assets/2d design2.webp'
import twoDimg3 from '../../assets/2d design2.webp'

const TwoDDesign = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        projectDetails: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("📩 2D Design Request Submitted:", formData);
        toast.success("Your request has been submitted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
        setFormData({
            name: '',
            email: '',
            contact: '',
            projectDetails: '',
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-orange-500 flex items-center justify-center">
                        <FiEdit className="mr-2" /> 2D Architectural Design Services
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        Transform your vision into precise, detailed 2D floor plans. Our expert architects create layouts that optimize space, functionality, and aesthetics for your dream home or commercial project.
                    </p>
                </div>

                {/* Services Overview */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
                        <FiGrid className="mr-2" /> What We Offer
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
                            <h3 className="text-lg font-medium text-orange-300">Detailed Floor Plans</h3>
                            <p className="text-gray-300 text-sm mt-2">
                                Precision-crafted 2D layouts tailored to your needs, ensuring optimal space utilization and flow.
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
                            <h3 className="text-lg font-medium text-orange-300">Custom Design Solutions</h3>
                            <p className="text-gray-300 text-sm mt-2">
                                Personalized designs for residential, commercial, or industrial projects, reflecting your unique style.
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
                            <h3 className="text-lg font-medium text-orange-300">Compliance & Approvals</h3>
                            <p className="text-gray-300 text-sm mt-2">
                                Plans designed to meet local building codes, ready for municipal approvals and construction.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Portfolio Gallery */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
                        <FiGrid className="mr-2" /> Our 2D Design Portfolio
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Modern Villa', image: twoDimg1 },
                            { title: 'Urban Apartment', image: twoDimg2 },
                            { title: 'Commercial Complex', image: twoDimg3 },
                        ].map((item, index) => (
                            <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-4">
                                    <h3 className="text-orange-300 font-medium">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => window.location.href = '/portfolio/2d-designs'}
                            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                            View Full Portfolio
                        </button>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
                        <FiCheckCircle className="mr-2" /> Why Choose Our 2D Design Services?
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                        <li className="flex items-start">
                            <span className="text-orange-500 mr-2">✅</span> Expert architects with years of experience in diverse projects.
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-500 mr-2">📐</span> High-precision plans using advanced CAD software.
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-500 mr-2">🔄</span> Unlimited revisions until you're fully satisfied.
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-500 mr-2">📊</span> Transparent pricing with no hidden costs.
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-500 mr-2">⚡</span> Fast turnaround times to keep your project on schedule.
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-500 mr-2">🌐</span> Integration with 3D visualization for a complete design experience.
                        </li>
                    </ul>
                </section>

                {/* Request Form Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
                        <FiEdit className="mr-2" /> Request a 2D Design Consultation
                    </h2>
                    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-8 shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                                <div className="relative">
                                    <FiUser className="absolute top-3 left-3 text-orange-500" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Contact Number *</label>
                                <div className="relative">
                                    <FiPhone className="absolute top-3 left-3 text-orange-500" />
                                    <input
                                        type="tel"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                        placeholder="Enter your contact number"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                                <div className="relative">
                                    <FiMail className="absolute top-3 left-3 text-orange-500" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Project Details</label>
                                <textarea
                                    name="projectDetails"
                                    rows="4"
                                    value={formData.projectDetails}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                    placeholder="Describe your project requirements or preferences"
                                />
                            </div>
                        </div>
                        <div className="mt-6 text-right">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center"
                            >
                                <FiArrowRight className="mr-2" /> Submit Request
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default TwoDDesign;