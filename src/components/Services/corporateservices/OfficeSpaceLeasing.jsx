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
  FiMapPin,
  FiBriefcase,
  FiBarChart2,
  FiUsers,
  FiFileText,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

const CorporateSolutions = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    contactPerson: "",
    email: "",
    phone: "",
    serviceInterest: "",
    city: "Hyderabad",
    employeeCount: "",
    notes: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🏢 Corporate Real Estate Inquiry:", formData);
    toast.success(
      "Your request has been submitted! Our corporate advisory team will reach out shortly.",
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
      companyName: "",
      industry: "",
      contactPerson: "",
      email: "",
      phone: "",
      serviceInterest: "",
      city: "Hyderabad",
      employeeCount: "",
      notes: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const services = [
    {
      icon: FiBarChart2,
      title: "Portfolio Strategy",
      description:
        "Multi-location expansion planning and real estate portfolio optimization.",
    },
    {
      icon: FiHome,
      title: "Built-to-Suit",
      description:
        "Custom-developed facilities aligned to your brand, operations, and culture.",
    },
    {
      icon: FiFileText,
      title: "Lease Advisory",
      description:
        "Expert negotiation for new leases, renewals, and strategic exit planning.",
    },
    {
      icon: FiUsers,
      title: "Workplace Consulting",
      description:
        "Space utilization audits and hybrid workplace strategy implementation.",
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
            Corporate Real Estate Solutions
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Strategic advisory for office space, expansion, and workplace
            optimization—built around your business goals.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Corporate Services
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

        {/* --- NEW SECTION: Solutions for Every Business Stage --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Solutions for Every Business Stage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Startups & SMEs
              </h3>
              <p className="text-base text-gray-400">
                Flexible, scalable workspaces, co-working solutions, and
                cost-effective leasing strategies to support your initial growth
                phase.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Growth-Stage Companies
              </h3>
              <p className="text-base text-gray-400">
                Multi-location expansion planning, built-to-suit office options,
                and employee-centric workplace design to attract and retain
                talent.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Large Enterprises
              </h3>
              <p className="text-base text-gray-400">
                Real estate portfolio optimization, lease administration,
                facility management integration, and ESG-compliant building
                solutions.
              </p>
            </div>
          </div>
        </section>

        {/* --- Our Process as a Timeline --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Strategic Advisory Process
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-orange-500/30 pl-12 space-y-12">
              {[
                [
                  "Requirement Mapping",
                  "We conduct a deep dive into your business goals, headcount projections, and brand identity.",
                ],
                [
                  "Market Intelligence",
                  "Leveraging our data, we identify optimal locations and properties in Hyderabad's key business districts.",
                ],
                [
                  "Financial Analysis & Negotiation",
                  "We perform detailed lease vs. buy analysis and negotiate best-in-class commercial and legal terms.",
                ],
                [
                  "Transaction Management",
                  "We manage the entire process, from legal paperwork to project fit-outs, ensuring a seamless transition.",
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
            Request a Corporate Consultation
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your company's real estate goals. Fill out the form
            for a confidential, no-obligation consultation with our corporate
            advisory team.
          </p>
          <form
            onSubmit={handleSubmit}
            className="text-left bg-gray-800 rounded-2xl p-8 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Company Name *
              </label>
              <div className="relative">
                <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Your company's name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Industry *
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., IT, Pharma, Logistics"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Contact Person *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Your full name"
                />
              </div>
            </div>
            <div>
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
                  placeholder="your.email@company.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number *
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
                Approx. No. of Employees
              </label>
              <div className="relative">
                <FiUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="employeeCount"
                  value={formData.employeeCount}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., 100"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Service of Interest *
              </label>
              <div className="relative">
                <FiFileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="serviceInterest"
                  value={formData.serviceInterest}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select --</option>
                  <option value="Built-to-Suit Office">
                    Built-to-Suit Office
                  </option>
                  <option value="Expansion Planning">Expansion Planning</option>
                  <option value="Lease Advisory">Lease Advisory</option>
                  <option value="Workplace Consultancy">
                    Workplace Consultancy
                  </option>
                  <option value="Other">Other</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                City/Region *
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., Hyderabad"
                />
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
                  placeholder="e.g., Timeline, specific requirements, confidentiality..."
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Request Consultation
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Corporate Real Estate FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "What is a 'built-to-suit' lease model?",
              a: "A built-to-suit (BTS) lease is a commercial real estate arrangement where a developer builds a property to the exact specifications of a corporate tenant. The tenant then leases the property long-term. It's ideal for companies with unique operational needs, such as R&D labs or custom manufacturing facilities.",
            },
            {
              id: "faq2",
              q: "Can you help us find an office in an SEZ to avail tax benefits?",
              a: "Absolutely. We specialize in identifying and securing office spaces within Special Economic Zones (SEZs) in Hyderabad. We guide you through the eligibility criteria and help you leverage the tax and operational benefits offered to SEZ units.",
            },
            {
              id: "faq3",
              q: "What is CAM (Common Area Maintenance) and what does it include?",
              a: "CAM charges are additional costs paid by tenants in a commercial building for the upkeep of common areas. This typically includes maintenance of lobbies, elevators, parking lots, security, and landscaping. In Hyderabad's Grade-A buildings, CAM charges usually range from ₹8 to ₹15 per sq. ft. per month.",
            },
            {
              id: "faq4",
              q: "How do you help with workplace strategy and space optimization?",
              a: "We analyze your current workspace usage, employee workflow, and future business goals. Based on this, we provide data-driven recommendations to create more efficient, collaborative, and employee-friendly office layouts, often helping companies reduce their real estate footprint and costs.",
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

export default CorporateSolutions;
