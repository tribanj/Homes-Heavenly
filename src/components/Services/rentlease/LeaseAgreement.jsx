import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiChevronDown,
  FiArrowRight,
  FiHome,
  FiBriefcase,
  FiCalendar,
  FiEdit3,
  FiCheckSquare,
} from "react-icons/fi";
import { FaGavel, FaStamp, FaSearch, FaRedoAlt } from "react-icons/fa";

const LeaseDrafting = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
    requestType: "",
    propertyAddress: "",
    preferredDate: "",
    notes: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📄 Lease Service Request:", formData);
    toast.success(
      "Lease request submitted. Our legal team will reach out shortly.",
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
      fullName: "",
      email: "",
      phone: "",
      propertyType: "",
      requestType: "",
      propertyAddress: "",
      preferredDate: "",
      notes: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  // Get today's date in YYYY-MM-DD format for the date picker min attribute
  const today = new Date().toISOString().split("T")[0];

  const services = [
    {
      icon: FaGavel,
      title: "New Lease Drafting",
      description: "Custom-drafted residential or commercial lease agreements.",
    },
    {
      icon: FaRedoAlt,
      title: "Lease Renewals",
      description:
        "Seamless extension and renewal of your existing lease agreements.",
    },
    {
      icon: FiEdit3,
      title: "Lease Modification",
      description:
        "Amending specific clauses in your current lease with legal precision.",
    },
    {
      icon: FaSearch,
      title: "Legal Scrutiny",
      description:
        "Thorough review of third-party agreements to protect your interests.",
    },
    {
      icon: FaStamp,
      title: "Notary & Registration",
      description:
        "End-to-end support for notarization, e-stamping, and registration.",
    },
    {
      icon: FiHome,
      title: "Tenant/Landlord Advisory",
      description:
        "Expert advice on tenancy laws, rights, and responsibilities.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-8 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 mb-4 flex items-center justify-center">
            <FiFileText className="mr-3" /> Lease Agreement Services
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Secure, compliant, and customized lease agreements for landlords and
            tenants across India.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Services We Provide Section */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Lease Management Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700"
              >
                <service.icon className="text-orange-400 mb-4" size={36} />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-base text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- NEW SECTION: Key Clauses --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Ensuring Your Agreement is Ironclad
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex items-center p-3">
              <FiCheckSquare className="text-green-400 text-2xl mr-3 shrink-0" />
              <span className="text-lg text-gray-300">
                Rent, Security Deposit & Maintenance
              </span>
            </div>
            <div className="flex items-center p-3">
              <FiCheckSquare className="text-green-400 text-2xl mr-3 shrink-0" />
              <span className="text-lg text-gray-300">
                Lock-in Period & Notice Period
              </span>
            </div>
            <div className="flex items-center p-3">
              <FiCheckSquare className="text-green-400 text-2xl mr-3 shrink-0" />
              <span className="text-lg text-gray-300">
                Clear Roles & Responsibilities
              </span>
            </div>
            <div className="flex items-center p-3">
              <FiCheckSquare className="text-green-400 text-2xl mr-3 shrink-0" />
              <span className="text-lg text-gray-300">
                Fit-out & Furnishing Details
              </span>
            </div>
            <div className="flex items-center p-3">
              <FiCheckSquare className="text-green-400 text-2xl mr-3 shrink-0" />
              <span className="text-lg text-gray-300">
                Dispute Resolution & Jurisdiction
              </span>
            </div>
            <div className="flex items-center p-3">
              <FiCheckSquare className="text-green-400 text-2xl mr-3 shrink-0" />
              <span className="text-lg text-gray-300">
                Governing Law & Compliance
              </span>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: Residential vs Commercial --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Tailored for Every Property Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-orange-300 flex items-center mb-4">
                <FiHome className="mr-3" /> Residential Leases
              </h3>
              <p className="text-gray-400 mb-4">
                Drafted in compliance with local tenancy acts, focusing on the
                rights and duties of both landlord and tenant for a harmonious
                living arrangement.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  Commonly for 11-month terms.
                </li>
                <li className="flex items-center">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  Clear clauses on maintenance and utility payments.
                </li>
                <li className="flex items-center">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  Fair terms for security deposit refund.
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-orange-300 flex items-center mb-4">
                <FiBriefcase className="mr-3" /> Commercial Leases
              </h3>
              <p className="text-gray-400 mb-4">
                Robust agreements designed to protect business interests, with
                clauses covering specific commercial needs and long-term
                stability.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  Longer terms with rent escalation clauses.
                </li>
                <li className="flex items-center">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  Detailed terms for fit-outs, signage, and operations.
                </li>
                <li className="flex items-center">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  Stronger lock-in periods and exit options.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Request Form Section */}
      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Get Started with Your Lease Agreement
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Fill in the details below. Our legal team will review your request
            and contact you for a consultation to understand your requirements
            in detail.
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
                  name="fullName"
                  value={formData.fullName}
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
                Property Address *
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Full address of the property"
                />
              </div>
            </div>
            <div>
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
                  <option value="">-- Select --</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Service Type *
              </label>
              <div className="relative">
                <FiFileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="requestType"
                  value={formData.requestType}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select --</option>
                  <option value="Draft New Lease">Draft New Lease</option>
                  <option value="Lease Renewal">Lease Renewal</option>
                  <option value="Modify Existing Lease">
                    Modify Existing Lease
                  </option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Preferred Service Date
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  min={today}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Additional Notes
              </label>
              <textarea
                name="notes"
                rows="3"
                className="w-full p-3 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any specific clauses, terms, or questions you have..."
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Submit Lease Request
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              question: "Is it mandatory to register a lease agreement?",
              answer:
                "In Hyderabad and most other Indian states, it is mandatory to register any lease agreement for a term longer than 11 months. An 11-month agreement is the most common for residential properties to avoid the complexities of registration, but it offers less legal protection for long-term tenancies.",
            },
            {
              id: "faq2",
              question: "What is E-Stamping?",
              answer:
                "E-Stamping is a computer-based, secure way of paying stamp duty to the government. We help generate the e-stamp paper with the correct value for your agreement, which is a mandatory prerequisite for it to be legally valid.",
            },
            {
              id: "faq3",
              question: "Can I include a lock-in period in my agreement?",
              answer:
                "Yes, absolutely. A lock-in period prevents either party from terminating the lease for a specified duration. We can help you draft a fair and legally enforceable lock-in clause that balances the interests of both the landlord and the tenant.",
            },
          ].map((faq) => (
            <div
              key={faq.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <button
                className="w-full px-4 py-3 text-left flex justify-between items-center bg-gray-700 hover:bg-gray-600 transition-colors"
                onClick={() => toggleAccordion(faq.id)}
              >
                <span className="text-lg font-medium text-orange-300">
                  {faq.question}
                </span>
                <FiChevronDown
                  size={22}
                  className={`text-orange-500 transform transition-transform ${
                    activeAccordion === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: activeAccordion === faq.id ? "auto" : 0,
                  opacity: activeAccordion === faq.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-3 pt-2 text-base text-gray-300">
                  {faq.answer}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaseDrafting;
