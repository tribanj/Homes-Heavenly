import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiEdit,
  FiChevronDown,
  FiLayers,
  FiSun,
  FiAward,
} from "react-icons/fi";

const InteriorDesigning = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    propertyType: "",
    designPreferences: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Interior Design Consultation Request Submitted:", formData);
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
      propertyType: "",
      designPreferences: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const services = [
    {
      icon: FiLayers,
      title: "Space Planning",
      description:
        "Optimizing layouts for functionality, flow, and aesthetics.",
    },
    {
      icon: FiSun,
      title: "Lighting & Color",
      description:
        "Curating the perfect palette and lighting scheme for a vibrant ambiance.",
    },
    {
      icon: FiHome,
      title: "Furniture & Furnishing",
      description:
        "Sourcing and styling furniture, textiles, and decor to match your vision.",
    },
    {
      icon: FiAward,
      title: "Turnkey Execution",
      description:
        "End-to-end project management, from concept to final handover.",
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
            Interior Design & Furnishing
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We craft personalized sanctuaries and stylish, functional spaces.
            Our design team blends aesthetics with utility, tailored to your
            taste and lifestyle.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Design Services
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

        {/* --- NEW SECTION: Explore Design Styles --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Explore Our Design Styles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://via.placeholder.com/500x350/111827/FF9800?text=Modern+Minimalist"
                alt="Modern Minimalist"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-lg font-bold">
                  Modern & Minimalist
                </h3>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://via.placeholder.com/500x350/111827/FF9800?text=Contemporary+Indian"
                alt="Contemporary Indian"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-lg font-bold">
                  Contemporary Indian
                </h3>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://via.placeholder.com/500x350/111827/FF9800?text=Luxury+Opulent"
                alt="Luxury Opulent"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-lg font-bold">
                  Luxury & Opulent
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* --- Our Design Process as a Timeline --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Turnkey Design Process
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-orange-500/30 pl-12 space-y-12">
              {[
                [
                  "Consultation & Vision",
                  "We start with an in-depth discussion to understand your lifestyle, taste, and functional needs.",
                ],
                [
                  "Concept & 3D Modeling",
                  "Our designers create a tailored concept with 3D visualizations so you can see your space before it's built.",
                ],
                [
                  "Material & Furniture Selection",
                  "We help you choose the perfect materials, colors, furniture, and lighting to bring the design to life.",
                ],
                [
                  "Execution & Management",
                  "Our team manages the entire project, from civil work to final installation, ensuring quality and timeliness.",
                ],
                [
                  "Final Handover",
                  "We add the final touches and hand over a beautiful, ready-to-live-in space that is uniquely yours.",
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
            Book a Design Consultation
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to transform your space? Fill out the form below for a free,
            no-obligation consultation with our talented interior designers.
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
                Property Type *
              </label>
              <div className="relative">
                <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select Property Type --</option>
                  <option value="Residential Apartment">
                    Residential Apartment
                  </option>
                  <option value="Independent House / Villa">
                    Independent House / Villa
                  </option>
                  <option value="Commercial Office">Commercial Office</option>
                  <option value="Retail Space">Retail Space</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Your Design Preferences *
              </label>
              <div className="relative">
                <FiEdit className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="designPreferences"
                  rows="4"
                  value={formData.designPreferences}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., 3BHK, looking for a modern and minimalist style, need a home office setup..."
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
          Interior Design FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "What is the average cost of interior design per sq. ft. in Hyderabad?",
              a: "The cost can vary widely based on the scope and quality of materials. A typical range for good quality residential interiors in Hyderabad is between ₹1,800 to ₹3,000+ per square foot. We provide a detailed, itemized quote after our initial consultation.",
            },
            {
              id: "faq2",
              q: "How long does a typical 3BHK interior project take?",
              a: "A full turnkey interior project for a 3BHK apartment, from design finalization to handover, typically takes between 75 to 90 days. This timeline can vary based on the complexity of the design and scope of civil work.",
            },
            {
              id: "faq3",
              q: "Do you handle custom furniture and modular kitchens?",
              a: "Yes, absolutely. We have our own team of skilled carpenters and partner with top factories to provide high-quality, custom-made furniture, wardrobes, and modular kitchens tailored to your exact specifications and space.",
            },
            {
              id: "faq4",
              q: "What is the difference between a designer and a contractor?",
              a: "An interior designer focuses on the creative and planning aspects: space planning, design concepts, material selection, and 3D modeling. A contractor executes the plan. As a turnkey service, we act as both your designer and project manager, providing a single point of responsibility for a seamless experience.",
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

export default InteriorDesigning;
