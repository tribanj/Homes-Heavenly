import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEye, FiGrid, FiCheckCircle, FiArrowRight, FiMail, FiUser, FiPhone } from 'react-icons/fi';
import threeDimg1 from '../../assets/3d1.jpeg'
import threeDimg2 from '../../assets/3d2.jpeg' 
import ThreeDimg3 from '../../assets/office3d.jpg' 

const ThreeDVisualization = () => {
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
        console.log("📩 3D Visualization Request Submitted:", formData);
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
                        <FiEye className="mr-2" /> 3D Architectural Visualization Services
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        Experience your dream project before construction begins with our photorealistic 3D visualizations. Our advanced renderings bring your vision to life with stunning detail and realism.
                    </p>
                </div>

                {/* Services Overview */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
                        <FiGrid className="mr-2" /> What We Offer
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
                            <h3 className="text-lg font-medium text-orange-300">Photorealistic Renderings</h3>
                            <p className="text-gray-300 text-sm mt-2">
                                High-quality 3D visuals that capture every detail, from textures to lighting, for a lifelike preview.
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
                            <h3 className="text-lg font-medium text-orange-300">Virtual Walkthroughs</h3>
                            <p className="text-gray-300 text-sm mt-2">
                                Interactive 3D tours to explore your project’s interior and exterior spaces in real-time.
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
                            <h3 className="text-lg font-medium text-orange-300">Custom Design Iterations</h3>
                            <p className="text-gray-300 text-sm mt-2">
                                Tailored visualizations with multiple design options to perfect your project’s aesthetic.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Portfolio Gallery */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
                        <FiGrid className="mr-2" /> Our 3D Visualization Portfolio
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Luxury Residence', image:threeDimg1 },
                            { title: 'Modern Office', image: ThreeDimg3 },
                            { title: 'Retail Complex', image:threeDimg2  },
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
                            onClick={() => window.location.href = '/portfolio/3d-visualizations'}
                            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                            View Full Portfolio
                        </button>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
                        <FiCheckCircle className="mr-2" /> Why Choose Our 3D Visualization Services?
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                        <li className="flex items-start">
                            <span className="text-orange-500 mr-2">✅</span> Expert team skilled in advanced 3D rendering tools like Blender and Lumion.
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-500 mr-2">🌟</span> Photorealistic visuals with accurate lighting, textures, and materials.
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-500 mr-2">🔄</span> Unlimited revisions to ensure your vision is perfectly captured.
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-500 mr-2">📊</span> Transparent pricing with detailed project estimates.
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-500 mr-2">⚡</span> Quick delivery to align with your project timelines.
                        </li>
                        <li className="flex items-start">
                            <span className="text-orange-500 mr-2">🌐</span> Seamless integration with 2D plans and construction workflows.
                        </li>
                    </ul>
                </section>

                {/* Request Form Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
                        <FiEye className="mr-2" /> Request a 3D Visualization Consultation
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
                                    placeholder="Describe your 3D visualization requirements or preferences"
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

export default ThreeDVisualization;