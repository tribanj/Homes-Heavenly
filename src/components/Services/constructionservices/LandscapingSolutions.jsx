import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiEdit,
  FiChevronDown,
  FiSun,
  FiDroplet,
  FiAward,
} from "react-icons/fi";
import { FaTree, FaUtensils } from "react-icons/fa";

const LandscapingOutdoorLiving = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    projectType: "",
    specificNeeds: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Landscaping Consultation Request Submitted:", formData);
    toast.success(
      "Your consultation request has been submitted! Our design team will contact you shortly.",
      {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }
    );
    setFormData({
      name: "",
      email: "",
      contact: "",
      projectType: "",
      specificNeeds: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const services = [
    {
      icon: FaTree,
      title: "Garden & Lawn Design",
      description: "Lush gardens, turfing, and automated irrigation systems.",
    },
    {
      icon: FiSun,
      title: "Decks, Patios & Pergolas",
      description:
        "Beautifully crafted wooden decks, stone patios, and shaded pergolas.",
    },
    {
      icon: FiDroplet,
      title: "Water Features & Lighting",
      description:
        "Serene water features and ambient lighting to transform your evenings.",
    },
    {
      icon: FaUtensils,
      title: "Outdoor Kitchens",
      description:
        "Custom-built barbecue areas and fully functional outdoor kitchens.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-8 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 mb-4">
            Landscaping & Outdoor Living
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Create beautiful, functional outdoor environments that complement
            your home. We turn unused space into your private oasis.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            What We Create
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center"
              >
                <service.icon className="text-orange-400 text-4xl mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400 mt-2">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- NEW SECTION: Inspiration Gallery --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Inspiration Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative group overflow-hidden rounded-xl shadow-lg h-64">
              <img
                src="https://via.placeholder.com/400x500/111827/FF9800?text=Terrace+Garden"
                alt="Terrace Garden"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-lg font-bold">
                  Lush Terrace Garden
                </h3>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl shadow-lg h-64 lg:col-span-2">
              <img
                src="https://via.placeholder.com/800x500/111827/FF9800?text=Modern+Patio+with+Pergola"
                alt="Modern Patio"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-lg font-bold">
                  Modern Patio with Pergola
                </h3>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl shadow-lg h-64">
              <img
                src="https://via.placeholder.com/400x500/111827/FF9800?text=Outdoor+Kitchen"
                alt="Outdoor Kitchen"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-lg font-bold">
                  Outdoor Kitchen & Barbecue
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* --- Our Design Process as a Timeline --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Design & Build Process
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-orange-500/30 pl-12 space-y-12">
              {[
                [
                  "Consultation & Vision",
                  "We discuss your ideas, lifestyle needs, and budget to create a tailored design brief.",
                ],
                [
                  "Concept & 3D Design",
                  "Our landscape architects create detailed 2D plans and 3D models of your future outdoor space.",
                ],
                [
                  "Material & Plant Selection",
                  "We help you choose the best climate-appropriate plants, durable materials, and lighting fixtures.",
                ],
                [
                  "Execution & Installation",
                  "Our skilled team brings the design to life, handling everything from civil work to planting and installation.",
                ],
                [
                  "Handover & Care Guide",
                  "We hand over your beautiful new space with a personalized guide on how to care for it.",
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
            Create Your Outdoor Oasis
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to transform your outdoor space? Fill out the form below for a
            free consultation with our landscape designers.
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
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Your full name"
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
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Your 10-digit mobile number"
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
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Project Type *
              </label>
              <div className="relative">
                <FiAward className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select Project Type --</option>
                  <option value="Terrace Garden Design">
                    Terrace Garden Design
                  </option>
                  <option value="Balcony Garden">Balcony Garden</option>
                  <option value="Full Villa Landscaping">
                    Full Villa Landscaping
                  </option>
                  <option value="Decks & Patios">Decks & Patios</option>
                  <option value="Outdoor Kitchens">Outdoor Kitchens</option>
                  <option value="Other">Other</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Specific Needs or Ideas *
              </label>
              <div className="relative">
                <FiEdit className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="specificNeeds"
                  rows="4"
                  value={formData.specificNeeds}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., Low-maintenance plants, a small water feature, seating for 6 people..."
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Book My Design Consultation
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Landscaping FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "How much does professional landscaping cost in Hyderabad?",
              a: "Landscaping costs vary greatly based on the area size, complexity, and materials used. A simple terrace garden might start from ₹50,000, while a full villa landscape with hardscaping can run into several lakhs. We provide a detailed, itemized quote after the initial design consultation.",
            },
            {
              id: "faq2",
              q: "What kind of plants are best for Hyderabad's climate?",
              a: "We specialize in selecting beautiful, hardy plants that thrive in Hyderabad's semi-arid climate. This includes a mix of native flowering plants like bougainvillea and hibiscus, succulents, and drought-tolerant grasses to ensure a lush garden with efficient water usage.",
            },
            {
              id: "faq3",
              q: "Do you provide low-maintenance garden options?",
              a: "Yes, this is one of our specialties. We can design beautiful landscapes using slow-growing plants, automated drip irrigation systems, and durable hardscaping materials to minimize the need for daily upkeep, perfect for busy homeowners.",
            },
            {
              id: "faq4",
              q: "Can you incorporate Vastu principles into the garden design?",
              a: "Absolutely. Our designers are experienced in Vastu-compliant landscaping. We can advise on the placement of water features, selection of auspicious plants, and overall layout to enhance positive energy and harmony.",
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

export default LandscapingOutdoorLiving;
