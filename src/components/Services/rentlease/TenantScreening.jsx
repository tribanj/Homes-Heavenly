import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiFileText,
  FiChevronDown,
  FiArrowRight,
  FiShield,
  FiTrendingUp,
  FiCheckSquare,
} from "react-icons/fi";

const TenantScreening = () => {
  const [formData, setFormData] = useState({
    landlordName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    tenantName: "",
    screeningType: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🔍 Tenant Screening Request:", formData);
    toast.success(
      "Screening request submitted. Our team will contact you soon.",
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
      landlordName: "",
      email: "",
      phone: "",
      propertyAddress: "",
      tenantName: "",
      screeningType: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const screeningChecks = [
    "Identity & Aadhaar Verification",
    "Employment & Income Validation",
    "Past Rental History Check",
    "Credit History & Score Evaluation",
    "Criminal Background Check",
    "Court Records & Eviction History",
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
            <FiUser className="mr-3" /> Tenant Background Verification
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Secure your rental investment with comprehensive, reliable, and fast
            tenant screening. Make informed decisions, not guesses.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* --- NEW SECTION: Why Screen Tenants? --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Protect Your Peace of Mind & Your Property
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 text-center">
              <FiShield size={40} className="mx-auto text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Protect Your Investment
              </h3>
              <p className="text-base text-gray-400">
                Verified tenants are less likely to cause property damage,
                saving you from costly repairs and disputes.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 text-center">
              <FiTrendingUp
                size={40}
                className="mx-auto text-orange-400 mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                Ensure Consistent Rent
              </h3>
              <p className="text-base text-gray-400">
                Our financial checks confirm a tenant's ability to pay rent on
                time, securing your monthly cash flow.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 text-center">
              <FiCheckSquare
                size={40}
                className="mx-auto text-orange-400 mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                Maintain a Safe Community
              </h3>
              <p className="text-base text-gray-400">
                Background checks help ensure a safe and secure environment for
                all residents in your property.
              </p>
            </div>
          </div>
        </section>

        {/* What Our Screening Covers */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Comprehensive Verification Checklist
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {screeningChecks.map((check, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center"
              >
                <FiCheckSquare className="text-green-400 text-2xl mr-3 shrink-0" />
                <span className="text-lg text-gray-300">{check}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- NEW SECTION: Screening Packages --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Choose the Right Screening Package
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Basic Package */}
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 flex flex-col">
              <h3 className="text-2xl font-bold text-orange-300">
                Basic Check
              </h3>
              <p className="text-gray-400 mb-6">For initial peace of mind.</p>
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                {[
                  "ID & Address Verification",
                  "Employment Check",
                  "Rental History (Last 2 Landlords)",
                ].map((f) => (
                  <li key={f} className="flex items-start">
                    <FiCheckSquare className="text-green-400 mr-3 mt-1 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() =>
                  setFormData((f) => ({ ...f, screeningType: "Basic" }))
                }
                className="w-full mt-auto py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
              >
                Select Basic
              </button>
            </div>
            {/* Full Package - Highlighted */}
            <div className="bg-gray-800 p-8 rounded-2xl border-2 border-orange-500 ring-4 ring-orange-500/20 flex flex-col relative">
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-orange-400">
                Full Verification
              </h3>
              <p className="text-gray-400 mb-6">
                The complete 360-degree report.
              </p>
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                {[
                  "Everything in Basic, plus:",
                  "Credit History & CIBIL Score",
                  "Criminal Background Check",
                  "Court & Eviction Records",
                ].map((f) => (
                  <li key={f} className="flex items-start">
                    <FiCheckSquare className="text-green-400 mr-3 mt-1 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() =>
                  setFormData((f) => ({ ...f, screeningType: "Full" }))
                }
                className="w-full mt-auto py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors"
              >
                Select Full
              </button>
            </div>
            {/* Custom Package */}
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 flex flex-col">
              <h3 className="text-2xl font-bold text-orange-300">
                Custom Package
              </h3>
              <p className="text-gray-400 mb-6">
                Tailored to your specific needs.
              </p>
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                {[
                  "Choose any combination of checks",
                  "Ideal for commercial tenants",
                  "Corporate background verification",
                ].map((f) => (
                  <li key={f} className="flex items-start">
                    <FiCheckSquare className="text-green-400 mr-3 mt-1 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() =>
                  setFormData((f) => ({ ...f, screeningType: "Custom" }))
                }
                className="w-full mt-auto py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
              >
                Select Custom
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Request Screening Form */}
      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Request a Tenant Screening
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Fill in the details below to initiate a screening request. Our team
            will contact you to confirm and obtain the necessary consent forms.
          </p>
          <form
            onSubmit={handleSubmit}
            className="text-left bg-gray-800 rounded-2xl p-8 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Your Full Name (Landlord) *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="landlordName"
                  value={formData.landlordName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Your full name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Your Email *
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
                Your Phone *
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
                <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Address of the rental property"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Prospective Tenant’s Full Name *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="tenantName"
                  value={formData.tenantName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Full name of person to be screened"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Screening Package *
              </label>
              <div className="relative">
                <select
                  name="screeningType"
                  value={formData.screeningType}
                  onChange={handleChange}
                  required
                  className="w-full pl-4 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select a Package --</option>
                  <option value="Basic">Basic Check</option>
                  <option value="Full">Full Verification (Most Popular)</option>
                  <option value="Custom">Custom Package</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Submit Screening Request
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
              question: "Is tenant consent required for screening?",
              answer:
                "Yes, absolutely. Written consent from the prospective tenant is a mandatory legal requirement before we can conduct any background or credit checks. We provide a standard consent form for this purpose.",
            },
            {
              id: "faq2",
              question: "How long does the screening process take?",
              answer:
                "Basic checks are typically completed within 24-48 hours. The Full Verification package, which includes criminal and credit history, may take 3 to 5 business days depending on the speed of record retrieval.",
            },
            {
              id: "faq3",
              question: "Is police verification included in your packages?",
              answer:
                "Police verification is a separate process that must be initiated by the landlord at the local police station after the rental agreement is signed. While we do not do it for you, our report provides all the necessary documents and details required to make your police verification process smooth and fast.",
            },
            {
              id: "faq4",
              question: "Is this service available all over India?",
              answer:
                "Yes, we provide screening services across India. The depth of some checks, like local court records, may vary slightly based on the digitalization of records in a particular city, but our core verification services are available nationwide.",
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

export default TenantScreening;
