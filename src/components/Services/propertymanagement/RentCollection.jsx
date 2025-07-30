import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit,
  FiChevronDown,
  FiTrendingUp,
  FiShield,
  FiUsers,
  FiMessageSquare,
  FiHome,
  FiBarChart2,
  FiCheck,
} from "react-icons/fi";

const TenantManagement = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    phone: "",
    propertyLocation: "",
    unitsCount: "",
    servicesNeeded: [],
    notes: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedServices = checked
        ? [...formData.servicesNeeded, value]
        : formData.servicesNeeded.filter((service) => service !== value);
      setFormData({ ...formData, servicesNeeded: updatedServices });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📋 Tenant Management Request:", formData);
    toast.success(
      "Your management request has been submitted! Our team will contact you shortly.",
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
      ownerName: "",
      email: "",
      phone: "",
      propertyLocation: "",
      unitsCount: "",
      servicesNeeded: [],
      notes: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const services = [
    {
      icon: FiTrendingUp,
      title: "Rent Collection",
      description: "Automated, timely rent collection and deposit tracking.",
    },
    {
      icon: FiMessageSquare,
      title: "Tenant Communication",
      description:
        "A single point of contact for all tenant queries and issue resolution.",
    },
    {
      icon: FiShield,
      title: "Lease Compliance",
      description:
        "Ensuring all agreements are legally compliant and handling renewals.",
    },
    {
      icon: FiUsers,
      title: "Vacancy Management",
      description:
        "Effective marketing and thorough tenant screening to fill vacancies fast.",
    },
  ];

  const serviceOptions = [
    "Rent Collection",
    "Tenant Communication",
    "Lease Compliance",
    "Vacancy Management",
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
            Effortless Tenant & Rent Management
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Maximize your rental income and minimize the hassle. Our
            professional property management services for Hyderabad landlords
            cover everything from rent collection to tenant support.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Comprehensive Management Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 text-center"
              >
                <service.icon
                  className="text-orange-400 mb-4 mx-auto"
                  size={40}
                />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-base text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- NEW SECTION: Technology Platform --- */}
        <section className="my-20 bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-orange-400 mb-4">
                Technology at Your Fingertips
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Our secure online landlord portal gives you a 24/7 view of your
                property's performance. No more guesswork, just clear,
                actionable insights.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-lg">
                  <FiBarChart2 className="text-green-400 mr-3 shrink-0" />
                  Real-time Rent Payment Status
                </li>
                <li className="flex items-center text-lg">
                  <FiTrendingUp className="text-green-400 mr-3 shrink-0" />
                  Monthly Financial Statements
                </li>
                <li className="flex items-center text-lg">
                  <FiUsers className="text-green-400 mr-3 shrink-0" />
                  Occupancy & Vacancy Reports
                </li>
                <li className="flex items-center text-lg">
                  <FiCheck className="text-green-400 mr-3 shrink-0" />
                  Maintenance Request Tracking
                </li>
              </ul>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://via.placeholder.com/500x350/111827/FF9800?text=Landlord+Dashboard+UI"
                alt="Landlord Dashboard Preview"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Request Form Section */}
      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Get a Free Management Quote
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Tell us about your property, and we'll provide a no-obligation quote
            for our management services tailored to your needs.
          </p>
          <form
            onSubmit={handleSubmit}
            className="text-left bg-gray-800 rounded-2xl p-8 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Owner Name *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Your full name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email *
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
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone *
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Your 10-digit mobile number"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Property Location in Hyderabad *
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="propertyLocation"
                  value={formData.propertyLocation}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., Kondapur"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Number of Rental Units *
              </label>
              <div className="relative">
                <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="unitsCount"
                  min="1"
                  value={formData.unitsCount}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., 5"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Services You're Interested In:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {serviceOptions.map((service) => (
                  <label
                    key={service}
                    className="flex items-center text-gray-300 p-3 bg-gray-700/50 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-700"
                  >
                    <input
                      type="checkbox"
                      className="absolute opacity-0 h-0 w-0"
                      name="servicesNeeded"
                      value={service}
                      onChange={handleChange}
                      checked={formData.servicesNeeded.includes(service)}
                    />
                    <div
                      className={`w-5 h-5 flex items-center justify-center rounded border-2 ${
                        formData.servicesNeeded.includes(service)
                          ? "bg-orange-500 border-orange-500"
                          : "bg-gray-600 border-gray-500"
                      }`}
                    >
                      {formData.servicesNeeded.includes(service) && (
                        <FiCheck className="text-white" size={14} />
                      )}
                    </div>
                    <span className="ml-3 select-none">{service}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Additional Notes
              </label>
              <div className="relative">
                <FiEdit className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Any specific requirements or questions..."
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Request My Free Quote
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Common Landlord Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "What are your management fees?",
              a: "Our fees are typically a small percentage of the monthly rent collected, making it a performance-based partnership. We offer customized quotes based on the number of units and services required. Contact us for a precise, no-obligation quote.",
            },
            {
              id: "faq2",
              q: "How do you handle late rent payments or evictions?",
              a: "We have a systematic process starting with automated reminders, followed by direct communication. If necessary, we handle all legal formalities for eviction in compliance with Telangana's tenancy laws, saving you the legal headache.",
            },
            {
              id: "faq3",
              q: "How do you manage emergency maintenance requests?",
              a: "We provide tenants with a 24/7 support line for emergencies. We have a network of verified vendors (plumbers, electricians, etc.) in Hyderabad to address urgent issues promptly, and we keep you informed every step of the way.",
            },
            {
              id: "faq4",
              q: "How often will I receive updates and reports?",
              a: "You will receive a detailed financial statement at the end of each month. You can also log into your landlord dashboard at any time for real-time updates on rent payments, maintenance requests, and occupancy status.",
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

export default TenantManagement;
