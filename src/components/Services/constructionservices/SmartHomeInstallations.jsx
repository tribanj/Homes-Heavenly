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
  FiZap,
  FiLock,
  FiSun,
  FiFilm,
} from "react-icons/fi";

const SmartHomeAutomation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    homeType: "",
    smartNeeds: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Smart Home Consultation Request Submitted:", formData);
    toast.success(
      "Your smart home consultation request has been submitted! Our experts will contact you.",
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
      homeType: "",
      smartNeeds: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const features = [
    { icon: FiZap, title: "Lighting & Appliance Control" },
    { icon: FiLock, title: "Smart Security & Locks" },
    { icon: FiSun, title: "Automated Curtains & Blinds" },
    { icon: FiFilm, title: "Home Theater & Audio" },
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
            Smart Home Automation
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Upgrade your living with intelligent solutions for security,
            convenience, and energy efficiency, seamlessly integrated into your
            lifestyle.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Experience the Future of Living
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center"
              >
                <feature.icon className="text-orange-400 text-4xl mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* --- NEW SECTION: Technology Partners --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            We Work With Leading Brands
          </h2>
          <div className="max-w-4xl mx-auto flex justify-around items-center gap-8 flex-wrap">
            <p className="text-2xl font-bold text-gray-500 filter grayscale">
              Google Nest
            </p>
            <p className="text-2xl font-bold text-gray-500 filter grayscale">
              Amazon Alexa
            </p>
            <p className="text-2xl font-bold text-gray-500 filter grayscale">
              Philips Hue
            </p>
            <p className="text-2xl font-bold text-gray-500 filter grayscale">
              Sonos
            </p>
            <p className="text-2xl font-bold text-gray-500 filter grayscale">
              Yale
            </p>
          </div>
        </section>

        {/* --- Installation Process as a Timeline --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Seamless Installation Process
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-orange-500/30 pl-12 space-y-12">
              {[
                [
                  "Consultation & Assessment",
                  "We visit your site to understand your needs, lifestyle, and existing infrastructure.",
                ],
                [
                  "Custom System Design",
                  "Our experts design a tailored automation plan and provide a detailed proposal and quote.",
                ],
                [
                  "Professional Installation",
                  "Our certified technicians install and configure all smart devices with minimal disruption.",
                ],
                [
                  "Training & Handover",
                  "We provide a complete demonstration and training so you can use your new smart home with confidence.",
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
            Book a Smart Home Consultation
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to upgrade your home? Fill out the form for a free
            consultation and quote from our automation experts.
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
                Home/Office Type *
              </label>
              <div className="relative">
                <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="homeType"
                  value={formData.homeType}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select Type --</option>
                  <option value="Apartment / Flat">Apartment / Flat</option>
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
                What would you like to automate? *
              </label>
              <div className="relative">
                <FiEdit className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="smartNeeds"
                  rows="4"
                  value={formData.smartNeeds}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., Lighting for all rooms, security cameras, smart lock for main door..."
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Book My Smart Home Consultation
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Smart Home FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "Do I need to rewire my entire house for smart automation?",
              a: "Not at all. Most modern smart home solutions are wireless and designed to work with your existing electrical wiring. Our systems are retrofittable, meaning they can be installed with minimal changes to your current setup.",
            },
            {
              id: "faq2",
              q: "What happens if the internet goes down?",
              a: "Many essential smart home functions, like turning lights on/off with smart switches, will continue to work manually. However, features that rely on cloud connectivity, such as voice commands or remote access via your phone, will be temporarily unavailable until the internet is restored.",
            },
            {
              id: "faq3",
              q: "Is it possible to automate just one or two rooms to start with?",
              a: "Absolutely. We specialize in creating scalable solutions. You can start with a basic setup for your living room or bedroom and easily expand the system to other parts of your home later as your needs and budget grow.",
            },
            {
              id: "faq4",
              q: "How much does a basic smart home setup cost in Hyderabad?",
              a: "A basic smart home package for a 2BHK or 3BHK, typically covering lighting and fan/AC control in a few rooms, can start from ₹50,000 to ₹1,50,000. The cost varies based on the number of devices, brand choices, and complexity.",
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

export default SmartHomeAutomation;
