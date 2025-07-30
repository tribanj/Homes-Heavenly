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
  FiShield,
  FiFileText,
  FiAward,
  FiBriefcase,
  FiCheckSquare,
  FiMapPin,
} from "react-icons/fi";
import { FaBalanceScale, FaBuilding } from "react-icons/fa";

const RERACompliance = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    state: "Telangana",
    projectName: "",
    serviceType: "",
    message: "",
  });
  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📋 RERA Assistance Request:", formData);
    toast.success(
      "Your RERA request has been submitted successfully. Our compliance team will contact you.",
      {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      }
    );
    setFormData({
      name: "",
      email: "",
      phone: "",
      userType: "",
      state: "Telangana",
      projectName: "",
      serviceType: "",
      message: "",
    });
  };

  const toggleAccordion = (id) =>
    setActiveAccordion(activeAccordion === id ? null : id);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-8 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 mb-4">
            RERA Compliance & Advisory
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Navigate the Real Estate (Regulation and Development) Act with
            confidence. We provide end-to-end RERA services for developers,
            agents, and homebuyers.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            RERA Services for Every Stakeholder
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <FaBuilding className="text-orange-400 text-4xl mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                For Developers
              </h3>
              <p className="text-gray-400">
                Project registration, compliance management, and quarterly
                update filings to keep your project on the right side of the
                law.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <FiBriefcase className="text-orange-400 text-4xl mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                For Real Estate Agents
              </h3>
              <p className="text-gray-400">
                Mandatory RERA registration and renewal, plus guidance on
                ethical practices and compliance requirements.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <FiUser className="text-orange-400 text-4xl mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                For Homebuyers
              </h3>
              <p className="text-gray-400">
                Protecting your investment by verifying project registration,
                understanding your rights, and assisting with complaint
                resolution.
              </p>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: Key Provisions --- */}
        <section className="my-16 bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Key Provisions of the RERA Act
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex items-start">
              <FiCheckSquare className="text-green-400 text-2xl mr-4 mt-1 shrink-0" />
              <span className="text-lg text-gray-300">
                <strong>70/30 Rule:</strong> 70% of project funds must be in a
                separate escrow account.
              </span>
            </div>
            <div className="flex items-start">
              <FiCheckSquare className="text-green-400 text-2xl mr-4 mt-1 shrink-0" />
              <span className="text-lg text-gray-300">
                <strong>Carpet Area Standard:</strong> A standardized definition
                of carpet area to prevent misleading sales.
              </span>
            </div>
            <div className="flex items-start">
              <FiCheckSquare className="text-green-400 text-2xl mr-4 mt-1 shrink-0" />
              <span className="text-lg text-gray-300">
                <strong>5-Year Defect Liability:</strong> Developers are liable
                for structural defects for five years after possession.
              </span>
            </div>
            <div className="flex items-start">
              <FiCheckSquare className="text-green-400 text-2xl mr-4 mt-1 shrink-0" />
              <span className="text-lg text-gray-300">
                <strong>Timely Completion:</strong> Strict penalties for project
                delays, protecting buyers' interests.
              </span>
            </div>
          </div>
        </section>

        {/* --- Our Process as a Timeline --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our RERA Registration Process
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-orange-500/30 pl-12 space-y-12">
              {[
                [
                  "Document Collation",
                  "We help you gather all necessary documents, from project plans and legal titles to financial statements and approvals.",
                ],
                [
                  "Application Filing",
                  "Our team accurately fills and submits the complex registration forms on the state's RERA portal (e.g., TS-RERA).",
                ],
                [
                  "Query Resolution",
                  "We efficiently manage and respond to any queries or requests for additional information from the RERA authority.",
                ],
                [
                  "Certificate Issuance",
                  "We follow up diligently to ensure the official RERA registration number and certificate are issued promptly.",
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
            Request RERA Assistance
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're registering a project, filing a complaint, or need
            compliance advice, our experts are here to help.
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
                I am a... *
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select --</option>
                  <option value="Developer">Developer</option>
                  <option value="Real Estate Agent">Real Estate Agent</option>
                  <option value="Property Buyer">Property Buyer</option>
                  <option value="Investor">Investor</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                State / RERA Jurisdiction *
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., Telangana"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Project Name (if applicable)
              </label>
              <div className="relative">
                <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Project name"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Required Service *
              </label>
              <div className="relative">
                <FiAward className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select a Service --</option>
                  <option value="RERA Registration (Project)">
                    RERA Registration (Project)
                  </option>
                  <option value="RERA Registration (Agent)">
                    RERA Registration (Agent)
                  </option>
                  <option value="Compliance Advisory">
                    Compliance Advisory
                  </option>
                  <option value="Complaint Filing / Resolution">
                    Complaint Filing / Resolution
                  </option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Additional Notes
              </label>
              <div className="relative">
                <FiEdit className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Briefly describe your requirement..."
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Request RERA Support
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          RERA FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "Is RERA applicable for all real estate projects in Telangana?",
              a: "RERA is mandatory for all commercial and residential projects where the land area is over 500 square meters or the number of apartments is more than eight. It applies to both new projects and projects that were ongoing and had not received a completion certificate when RERA came into force.",
            },
            {
              id: "faq2",
              q: "How can I check if a project is registered with TS-RERA?",
              a: "You can verify the registration status of any project on the official Telangana State RERA (TS-RERA) website. Every registered project is assigned a unique RERA registration number, which the promoter is legally required to display in all marketing materials.",
            },
            {
              id: "faq3",
              q: "What can I do if my builder is not complying with RERA?",
              a: "If a builder violates the RERA Act (e.g., delays in possession, changes to the plan without consent), a homebuyer can file a complaint with the TS-RERA authority or the adjudicating officer. We can assist you with the entire complaint filing and resolution process.",
            },
            {
              id: "faq4",
              q: "What is the penalty for non-registration of a project under RERA?",
              a: "Promoters of projects that are not registered with RERA can face a penalty of up to 10% of the estimated project cost. For continued violation, this can extend to imprisonment for up to three years.",
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

export default RERACompliance;
