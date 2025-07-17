import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiPhone, FiMail, FiHome, FiMapPin, FiEdit, FiArrowRight, FiGrid, FiLayers, FiZap, FiCheckCircle } from 'react-icons/fi';

const CustomHomeConstruction = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    serviceInterested: '',
    propertyLocation: '',
    designPreferences: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Service Request Submitted:", formData);
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
      serviceInterested: '',
      propertyLocation: '',
      designPreferences: '',
    });
  };

  const goToPortfolio = (section) => {
    navigate(`/portfolio/${section}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-500 flex items-center justify-center">
            <FiHome className="mr-2" /> Custom Home Construction & Design
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Build your dream home with our expert-driven, end-to-end solutions. From architectural planning to final handover, we craft spaces that inspire.
          </p>
        </div>

        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiGrid className="mr-2" /> Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300 flex items-center">
                <FiEdit className="mr-2" /> Architectural Design
              </h3>
              <p className="text-gray-300 text-sm mt-2">
                Detailed 2D floor plans and photorealistic 3D visualizations to plan and preview your dream home with precision.
              </p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => goToPortfolio('2d-designs')}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  View 2D Designs
                </button>
                <button
                  onClick={() => goToPortfolio('3d-visualization')}
                  className="px-4 py-2 bg-gray-700 text-orange-300 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-colors"
                >
                  View 3D Visuals
                </button>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300 flex items-center">
                <FiLayers className="mr-2" /> Structural Planning
              </h3>
              <p className="text-gray-300 text-sm mt-2">
                Certified civil engineers ensure safety with robust foundations, load-bearing designs, and soil testing.
              </p>
              <div className="mt-4">
                <button
                  onClick={() => goToPortfolio('structural-planning')}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  View Structural Projects
                </button>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300 flex items-center">
                <FiZap className="mr-2" /> Sustainable & Smart Homes
              </h3>
              <p className="text-gray-300 text-sm mt-2">
                Eco-friendly designs with solar panels, rainwater harvesting, and IoT devices for a smart, sustainable lifestyle.
              </p>
              <div className="mt-4">
                <button
                  onClick={() => goToPortfolio('smart-homes')}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  View Smart Home Projects
                </button>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300 flex items-center">
                <FiCheckCircle className="mr-2" /> Project Management
              </h3>
              <p className="text-gray-300 text-sm mt-2">
                End-to-end management with weekly photo/video updates, ensuring quality and transparency throughout.
              </p>
              <div className="mt-4">
                <button
                  onClick={() => goToPortfolio('completed-projects')}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  View Completed Projects
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiCheckCircle className="mr-2" /> Why Choose Us?
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✅</span> All-in-one service: We manage architects, engineers, and contractors.
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">📊</span> Transparent updates via email, dashboard, or WhatsApp.
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">🛠️</span> Experienced team for luxury, budget, and sustainable projects.
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">🌐</span> Modern tech: BIM modeling, 3D rendering, and smart tracking.
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">📍</span> Compliant with local building codes and high-quality standards.
            </li>
          </ul>
        </section>

        {/* Turnkey Process Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiLayers className="mr-2" /> Our Turnkey Process
          </h2>
          <ol className="space-y-4 text-gray-300">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2 font-bold">1.</span>
              <div>
                <strong>Free Consultation & Site Visit:</strong> We assess your land, vision, budget, and lifestyle needs.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2 font-bold">2.</span>
              <div>
                <strong>Planning & Designs:</strong> Multiple layout options, 2D plans, and 3D renders tailored to you.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2 font-bold">3.</span>
              <div>
                <strong>Structural Engineering:</strong> Complete load calculations, reinforcements, and safety approvals.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2 font-bold">4.</span>
              <div>
                <strong>Budget & Contract:</strong> Transparent BOQs, phased payments, and clear contract documents.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2 font-bold">5.</span>
              <div>
                <strong>Construction Execution:</strong> Site engineers manage operations, quality, and procurement.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2 font-bold">6.</span>
              <div>
                <strong>Progress Tracking:</strong> Regular visual and financial updates via email or WhatsApp.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2 font-bold">7.</span>
              <div>
                <strong>Final Handover:</strong> Quality audits and snag lists ensure a ready-to-live-in home.
              </div>
            </li>
          </ol>
        </section>

        {/* Request Form Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiEdit className="mr-2" /> Request a Service or Consultation
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
              <div>
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
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Interested Service *</label>
                <select
                  name="serviceInterested"
                  value={formData.serviceInterested}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="">Select Service</option>
                  <option value="Architectural Design">Architectural Design</option>
                  <option value="Structural Planning">Structural Planning</option>
                  <option value="Smart Home Solutions">Smart Home Solutions</option>
                  <option value="Cost Estimation & Timeline">Cost Estimation & Timeline</option>
                  <option value="End-to-End Project Management">End-to-End Project Management</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Property Location *</label>
                <div className="relative">
                  <FiMapPin className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="propertyLocation"
                    value={formData.propertyLocation}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter property location"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Design Preferences / Notes</label>
                <textarea
                  name="designPreferences"
                  rows="4"
                  value={formData.designPreferences}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="Share your design preferences or additional notes"
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

export default CustomHomeConstruction;