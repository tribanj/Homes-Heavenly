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
  FiShield,
  FiBriefcase,
  FiHome,
  FiEdit,
} from "react-icons/fi";
import { FaGavel, FaBalanceScale, FaHandshake } from "react-icons/fa";

const LegalDisputeResolution = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    email: "",
    role: "",
    disputeType: "",
    propertyAddress: "",
    caseDetails: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📑 Legal Dispute Form Submitted:", formData);
    toast.success(
      "Your request for legal support has been submitted. Our team will contact you shortly.",
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
      contact: "",
      email: "",
      role: "",
      disputeType: "",
      propertyAddress: "",
      caseDetails: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const services = [
    {
      icon: FaGavel,
      title: "Tenant Evictions",
      description:
        "Handling legal procedures for eviction due to non-payment or breach of contract.",
    },
    {
      icon: FaBalanceScale,
      title: "Rent Disputes",
      description:
        "Resolving conflicts related to rent arrears, unfair increases, or deposit claims.",
    },
    {
      icon: FiFileText,
      title: "Breach of Agreement",
      description:
        "Addressing violations of the lease agreement by either the landlord or the tenant.",
    },
    {
      icon: FiShield,
      title: "Legal Notices",
      description:
        "Drafting, sending, and responding to formal legal notices as per Indian law.",
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
            Legal Dispute Resolution
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Expert legal support for landlords and tenants in Hyderabad. We help
            you navigate property disputes efficiently and effectively.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-1">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Disputes We Handle
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

        {/* --- NEW SECTION: Our Approach to Resolution --- */}
        <section className="my-10">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-4">
            Our Approach to Resolution
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            We follow a structured process to ensure the best possible outcome
            for your case.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <FiFileText size={30} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                1. Case Assessment
              </h3>
              <p className="text-base text-gray-400 mt-2">
                A detailed consultation to understand your situation and review
                all documents.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <FaHandshake size={30} />
              </div>
              <h3 className="text-xl font-semibold text-white">2. Mediation</h3>
              <p className="text-base text-gray-400 mt-2">
                We attempt to find an amicable solution through negotiation,
                saving you time and money.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <FiShield size={30} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                3. Legal Notice
              </h3>
              <p className="text-base text-gray-400 mt-2">
                If mediation fails, we draft and send formal legal notices to
                the opposing party.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <FaGavel size={30} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                4. Litigation
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We provide robust representation for you in rent control courts
                and other legal forums.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Request a Legal Consultation
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Facing a property dispute? Describe your situation below, and our
            legal experts will contact you for a confidential consultation.
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
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                I am a... *
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
                  <option value="">Select Role</option>
                  <option value="Landlord">Landlord</option>
                  <option value="Tenant">Tenant</option>
                  <option value="Property Manager">Property Manager</option>
                  <option value="Other">Other</option>
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
                  name="disputeType"
                  value={formData.disputeType}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">Select Dispute</option>
                  <option value="Eviction">Eviction Issue</option>
                  <option value="Rent Dispute">Rent Dispute</option>
                  <option value="Contract Breach">Breach of Agreement</option>
                  <option value="Legal Notice">
                    Legal Notice / Court Order
                  </option>
                  <option value="Other">Other</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
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
                  placeholder="Full address of the property in question"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Briefly Describe Your Case *
              </label>
              <div className="relative">
                <FiEdit className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="caseDetails"
                  rows="4"
                  value={formData.caseDetails}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Please provide a summary of the dispute..."
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Submit for Consultation
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Dispute Resolution FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "How long does an eviction process take in Hyderabad?",
              a: "The duration can vary. After sending a legal notice, a petition is filed in the Rent Control Court. The process can take anywhere from a few months to over a year, depending on the complexity of the case and the court's schedule.",
            },
            {
              id: "faq2",
              q: "What is the first step I should take in a dispute?",
              a: "The first step is always to communicate with the other party in writing, clearly stating the issue. If that fails, the next step is typically to send a formal legal notice through a lawyer. This often resolves the issue without needing to go to court.",
            },
            {
              id: "faq3",
              q: "Can a landlord cut off essential services like water or electricity?",
              a: "No. Under the Telangana Tenancy Act, it is illegal for a landlord to cut off essential services to a tenant's premises, even in the case of non-payment of rent. Doing so can lead to legal penalties for the landlord.",
            },
            {
              id: "faq4",
              q: "What happens if a tenant doesn't pay the security deposit?",
              a: "Failure to pay the agreed-upon security deposit is a breach of the rental agreement. The landlord can send a legal notice to the tenant demanding payment and can initiate legal proceedings if the tenant fails to comply.",
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

export default LegalDisputeResolution;
