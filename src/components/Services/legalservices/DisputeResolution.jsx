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
  FiShield,
  FiFileText,
  FiBriefcase,
  FiCheckSquare,
} from "react-icons/fi";
import { FaGavel, FaBalanceScale, FaHandshake } from "react-icons/fa";

const RentalDisputeResolution = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    issueType: "",
    propertyLocation: "",
    details: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📋 Dispute Resolution Request:", formData);
    toast.success(
      "Your dispute request has been submitted. Our legal team will contact you shortly.",
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
      phone: "",
      role: "",
      issueType: "",
      propertyLocation: "",
      details: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-8 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 mb-4">
            Landlord & Tenant Dispute Resolution
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Rental conflicts don’t need to escalate. We offer mediation and
            legal support to resolve disputes professionally and lawfully.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Common Disputes We Resolve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-4">
                For Landlords
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <FiCheckSquare className="text-green-400 mr-3 mt-1 shrink-0" />
                  <span>Non-payment or consistent delay of rent.</span>
                </li>
                <li className="flex items-start">
                  <FiCheckSquare className="text-green-400 mr-3 mt-1 shrink-0" />
                  <span>Property damage beyond normal wear and tear.</span>
                </li>
                <li className="flex items-start">
                  <FiCheckSquare className="text-green-400 mr-3 mt-1 shrink-0" />
                  <span>Lease violations like unauthorized subletting.</span>
                </li>
                <li className="flex items-start">
                  <FiCheckSquare className="text-green-400 mr-3 mt-1 shrink-0" />
                  <span>Initiating lawful eviction proceedings.</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-4">
                For Tenants
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <FiCheckSquare className="text-green-400 mr-3 mt-1 shrink-0" />
                  <span>Unfair or unlawful eviction notices.</span>
                </li>
                <li className="flex items-start">
                  <FiCheckSquare className="text-green-400 mr-3 mt-1 shrink-0" />
                  <span>Disputes over security deposit refunds.</span>
                </li>
                <li className="flex items-start">
                  <FiCheckSquare className="text-green-400 mr-3 mt-1 shrink-0" />
                  <span>Failure by landlord to perform essential repairs.</span>
                </li>
                <li className="flex items-start">
                  <FiCheckSquare className="text-green-400 mr-3 mt-1 shrink-0" />
                  <span>Harassment or breach of contract by the landlord.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Our Process as a Timeline --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our 4-Step Resolution Process
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-orange-500/30 pl-12 space-y-12">
              {[
                [
                  "Case Review & Consultation",
                  "We start with a detailed consultation to understand the facts of your dispute and review your rental agreement.",
                ],
                [
                  "Mediation & Negotiation",
                  "Our first step is always to attempt an amicable resolution through structured mediation, saving you time and legal costs.",
                ],
                [
                  "Legal Notice Issuance",
                  "If negotiation fails, we draft and send a formal, legally sound notice to the opposing party outlining your claims.",
                ],
                [
                  "Litigation & Representation",
                  "As a final step, we provide robust representation for your interests in the Rent Control Court or other appropriate legal forums.",
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

        {/* --- NEW SECTION: Know Your Rights --- */}
        <section className="my-16 bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Know Your Rights (Telangana Tenancy Act)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Security Deposit Cap
              </h3>
              <p className="text-gray-400 mt-2">
                A landlord cannot demand a security deposit exceeding two
                months' rent for residential properties.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Rent Increase Rules
              </h3>
              <p className="text-gray-400 mt-2">
                Rent cannot be increased during the agreement period unless
                explicitly stated in the registered contract.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Lawful Eviction
              </h3>
              <p className="text-gray-400 mt-2">
                A landlord must follow the legal process and cannot forcibly
                evict a tenant or cut essential services like water/power.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Get Expert Legal Help
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Facing a rental dispute? Fill out the form for a confidential
            consultation with our legal experts specializing in tenancy law.
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
                You Are A: *
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select --</option>
                  <option value="Landlord">Landlord</option>
                  <option value="Tenant">Tenant</option>
                  <option value="Property Manager">Property Manager</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Type of Dispute *
              </label>
              <div className="relative">
                <FaBalanceScale className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select --</option>
                  <option value="Eviction / Non-payment">
                    Eviction / Non-payment
                  </option>
                  <option value="Lease Violation">Lease Violation</option>
                  <option value="Security Deposit Issue">
                    Security Deposit Issue
                  </option>
                  <option value="Property Damage">Property Damage</option>
                  <option value="Other">Other</option>
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
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., Kondapur, Hyderabad"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Dispute Details *
              </label>
              <div className="relative">
                <FiEdit className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="details"
                  rows="4"
                  value={formData.details}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Please explain the situation in brief..."
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Request Legal Consultation
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Rental Dispute FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "What is the legal process for eviction in Hyderabad?",
              a: "The landlord must first send a legal notice to the tenant stating a valid reason for eviction (e.g., non-payment of rent). If the tenant does not comply, the landlord must file an eviction suit in the appropriate Rent Control Court. A court order is mandatory for a legal eviction.",
            },
            {
              id: "faq2",
              q: "How much notice period is required to vacate a property in Telangana?",
              a: "The notice period is determined by the rental agreement. As per the Telangana Tenancy Act, for a month-to-month tenancy, a notice period of at least one month is generally required, unless specified otherwise in the agreement.",
            },
            {
              id: "faq3",
              q: "Can a landlord enter a rented property without the tenant's permission?",
              a: "No. A landlord must provide at least 24 hours' notice to the tenant before entering the premises for non-emergency reasons, such as inspections or repairs, as per the Telangana Tenancy Act.",
            },
            {
              id: "faq4",
              q: "What can a tenant do if the landlord refuses to refund the security deposit?",
              a: "If the landlord wrongfully withholds the security deposit after the tenant has vacated and cleared all dues, the tenant can send a legal notice demanding the refund. If the landlord still doesn't comply, the tenant can file a case in the appropriate court to recover the amount.",
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

export default RentalDisputeResolution;
