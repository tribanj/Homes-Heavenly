import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiHome,
  FiMapPin,
  FiEdit,
  FiArrowRight,
  FiGrid,
  FiLayers,
  FiZap,
  FiCheckCircle,
  FiChevronDown,
  FiAward,
  FiUsers,
  FiClipboard,
} from "react-icons/fi";
import { motion } from "framer-motion";

const CustomHomeConstruction = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    serviceInterested: "",
    propertyLocation: "",
    designPreferences: "",
  });
  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Service Request Submitted:", formData);
    toast.success(
      "Your request has been submitted successfully! Our design team will contact you shortly.",
      {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      }
    );
    setFormData({
      name: "",
      email: "",
      contact: "",
      serviceInterested: "",
      propertyLocation: "",
      designPreferences: "",
    });
  };

  const toggleAccordion = (id) =>
    setActiveAccordion(activeAccordion === id ? null : id);

  const goToPortfolio = (section) => navigate(`/portfolio/${section}`);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-8 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 flex items-center justify-center">
            <FiHome className="mr-3" /> Custom Home Construction & Design
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Build your dream home with our expert-driven, end-to-end solutions.
            From architectural planning to final handover, we craft spaces that
            inspire.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Core Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <FiEdit />,
                title: "Architectural Design",
                desc: "Detailed 2D floor plans and photorealistic 3D visualizations to plan and preview your dream home with precision.",
                actions: [
                  ["View 2D Designs", "2d-designs", true],
                  ["View 3D Visuals", "3d-visualization", false],
                ],
              },
              {
                icon: <FiLayers />,
                title: "Structural Planning",
                desc: "Certified civil engineers ensure safety with robust foundations, load-bearing designs, and soil testing.",
                actions: [
                  ["View Structural Projects", "structural-planning", true],
                ],
              },
              {
                icon: <FiZap />,
                title: "Sustainable & Smart Homes",
                desc: "Eco-friendly designs with solar panels, rainwater harvesting, and IoT devices for a smart, sustainable lifestyle.",
                actions: [["View Smart Home Projects", "smart-homes", true]],
              },
              {
                icon: <FiCheckCircle />,
                title: "Turnkey Project Management",
                desc: "End-to-end management with weekly photo/video updates, ensuring quality and transparency throughout.",
                actions: [
                  ["View Completed Projects", "completed-projects", true],
                ],
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-orange-500/50 transition-colors"
              >
                <h3 className="text-2xl font-semibold text-orange-400 flex items-center mb-3">
                  {item.icon} <span className="ml-3">{item.title}</span>
                </h3>
                <p className="text-gray-400 text-base mb-6">{item.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {item.actions.map(([label, slug, isPrimary], idx) => (
                    <button
                      key={idx}
                      onClick={() => goToPortfolio(slug)}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                        isPrimary
                          ? "bg-orange-600 text-white hover:bg-orange-700"
                          : "bg-gray-700 text-orange-400 border border-orange-500 hover:bg-orange-500 hover:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://via.placeholder.com/500x350/111827/FF9800?text=Modern+Villa"
                alt="Modern Villa"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-lg font-bold">
                  Modern Villa, Jubilee Hills
                </h3>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://via.placeholder.com/500x350/111827/FF9800?text=Farmhouse"
                alt="Farmhouse"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-lg font-bold">
                  Sustainable Farmhouse, Moinabad
                </h3>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://via.placeholder.com/500x350/111827/FF9800?text=Duplex+Home"
                alt="Duplex Home"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-lg font-bold">
                  Gated Community Duplex, Tellapur
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* --- Why Choose Us - Upgraded to Cards --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <FiAward className="text-3xl text-orange-400 mr-4 shrink-0 mt-1" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-white">
                  All-in-One Service
                </h3>
                <p className="text-gray-400">
                  We manage architects, engineers, and contractors so you don't
                  have to.
                </p>
              </div>
            </div>
            <div className="flex items-start bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <FiClipboard className="text-3xl text-orange-400 mr-4 shrink-0 mt-1" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-white">
                  Transparent Updates
                </h3>
                <p className="text-gray-400">
                  Track progress via our dashboard, email, or direct WhatsApp
                  updates.
                </p>
              </div>
            </div>
            <div className="flex items-start bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <FiUsers className="text-3xl text-orange-400 mr-4 shrink-0 mt-1" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-white">
                  Experienced Team
                </h3>
                <p className="text-gray-400">
                  Our professionals have extensive experience in luxury, budget,
                  and sustainable projects.
                </p>
              </div>
            </div>
            <div className="flex items-start bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <FiZap className="text-3xl text-orange-400 mr-4 shrink-0 mt-1" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-white">
                  Modern Technology
                </h3>
                <p className="text-gray-400">
                  We use BIM modeling, 3D rendering, and smart tracking for
                  precision and efficiency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Our Turnkey Process as an Enhanced Timeline --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Turnkey Construction Process
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-orange-500/30 pl-12 space-y-12">
              {[
                [
                  "Free Consultation & Site Visit",
                  "We assess your land, vision, budget, and lifestyle needs.",
                ],
                [
                  "Planning & 3D Designs",
                  "Multiple layout options, 2D plans, and 3D renders tailored to your feedback.",
                ],
                [
                  "Budget & Contract",
                  "Transparent Bill of Quantities (BOQ), phased payments, and clear contract documents.",
                ],
                [
                  "Construction & Execution",
                  "Our site engineers manage all operations, quality control, and material procurement.",
                ],
                [
                  "Progress Tracking",
                  "Receive regular photo and video updates directly via WhatsApp or email.",
                ],
                [
                  "Final Handover",
                  "We conduct final quality audits and address any snag lists to deliver a ready-to-live-in home.",
                ],
              ].map(([title, desc], i) => (
                <div key={i} className="relative">
                  <div className="absolute flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full -left-[64px] ring-4 ring-gray-900 border-2 border-orange-500/50">
                    <span className="text-orange-400 font-bold text-lg">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <p className="text-gray-400 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Build Your Dream Home With Us
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to start planning? Fill out the form below for a free,
            no-obligation consultation with our design and construction experts.
          </p>
          <form
            onSubmit={handleSubmit}
            className="text-left bg-gray-800 rounded-2xl p-8 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Contact Number *
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  placeholder="Your 10-digit mobile number"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Interested Service *
              </label>
              <div className="relative">
                <FiGrid className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="serviceInterested"
                  value={formData.serviceInterested}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select Service --</option>
                  <option value="Architectural Design">
                    Architectural Design
                  </option>
                  <option value="Structural Planning">
                    Structural Planning
                  </option>
                  <option value="Smart Home Solutions">
                    Smart Home Solutions
                  </option>
                  <option value="End-to-End Project Management">
                    End-to-End Project Management
                  </option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Property Location *
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="propertyLocation"
                  value={formData.propertyLocation}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Jubilee Hills, Hyderabad"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Design Preferences / Notes
              </label>
              <div className="relative">
                <FiEdit className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="designPreferences"
                  rows="4"
                  value={formData.designPreferences}
                  onChange={handleChange}
                  placeholder="e.g., 4 BHK, modern style, vastu compliant..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg flex items-center justify-center"
              >
                Submit Request <FiArrowRight className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Construction FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "What is the average construction cost per sq. ft. in Hyderabad?",
              a: "Construction costs in Hyderabad typically range from ₹1,800 to ₹2,500+ per square foot, depending on the quality of materials, finishes, and complexity of the design. We provide a detailed Bill of Quantities (BOQ) for full transparency.",
            },
            {
              id: "faq2",
              q: "How long does it take to build a custom home?",
              a: "For a standard G+1 residential home of about 2,500-3,000 sq. ft., the process from design approval to handover typically takes 9 to 12 months, barring any unforeseen delays.",
            },
            {
              id: "faq3",
              q: "Do you handle all government approvals (GHMC/HMDA)?",
              a: "Yes, as part of our turnkey project management service, we handle the entire process of obtaining necessary approvals from government bodies like GHMC or HMDA, ensuring your construction is fully compliant.",
            },
            {
              id: "faq4",
              q: "What materials do you use for construction?",
              a: "We use high-quality, branded materials and adhere to strict quality standards. We provide a detailed material specification sheet in our contract, covering everything from the steel and cement for the foundation to the brand of tiles and paint for the finishes.",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <button
                className="w-full px-4 py-3 text-left flex justify-between items-center bg-gray-700 hover:bg-gray-600 transition-colors"
                onClick={() => toggleAccordion(item.id)}
              >
                <span className="text-lg font-medium text-orange-300">
                  {item.q}
                </span>
                <FiChevronDown
                  size={22}
                  className={`text-orange-500 transform transition-transform ${
                    activeAccordion === item.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: activeAccordion === item.id ? "auto" : 0,
                  opacity: activeAccordion === item.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-3 pt-2 text-base text-gray-300">
                  {item.a}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomHomeConstruction;
