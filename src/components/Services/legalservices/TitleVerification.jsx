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
  FiCheckSquare,
  FiUsers,
} from "react-icons/fi";

const TitleVerification = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    city: "Hyderabad",
    propertyType: "",
    documentAvailable: "",
    notes: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🔍 Title Verification Request:", formData);
    toast.success(
      "Verification request submitted! Our legal team will contact you shortly.",
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
      propertyAddress: "",
      city: "Hyderabad",
      propertyType: "",
      documentAvailable: "",
      notes: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const checks = [
    {
      icon: FiShield,
      title: "Clear & Marketable Title",
      description:
        "Confirming the seller's absolute legal right to sell the property.",
    },
    {
      icon: FiFileText,
      title: "Encumbrance & Liens",
      description:
        "Checking for any existing mortgages, loans, or legal claims against the property.",
    },
    {
      icon: FiCheckSquare,
      title: "Regulatory Compliance",
      description:
        "Verifying land use permissions, zoning laws, and local body approvals (GHMC/HMDA).",
    },
    {
      icon: FiUsers,
      title: "Ownership History",
      description:
        "Tracing the chain of ownership through all previous 'link documents' to ensure legitimacy.",
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
            Property Title Verification
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Invest with confidence. Our rigorous due diligence uncovers hidden
            risks, ensuring your property transaction is legally secure.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Comprehensive Verification Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {checks.map((check, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center"
              >
                <check.icon className="text-orange-400 text-4xl mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-white">{check.title}</h3>
                <p className="text-gray-400 mt-2">{check.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- NEW SECTION: Why it's crucial in Hyderabad --- */}
        <section className="my-16 bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Why Title Verification is Crucial in Hyderabad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Complex Land Records
              </h3>
              <p className="text-gray-400 mt-2">
                Navigating the transition from older manual records to the new
                Dharani portal requires expertise to avoid discrepancies.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                GO 111 & Restricted Zones
              </h3>
              <p className="text-gray-400 mt-2">
                We protect you from investing in properties located in
                environmentally protected or restricted development zones.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Illegal Layouts & Encroachments
              </h3>
              <p className="text-gray-400 mt-2">
                Our physical verification process helps identify unapproved
                layouts and encroachments on government or lake land.
              </p>
            </div>
          </div>
        </section>

        {/* --- Our Process as a Timeline --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our 5-Point Due Diligence Process
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-orange-500/30 pl-12 space-y-12">
              {[
                [
                  "Document Collection",
                  "We gather all essential documents like the sale deed, link documents, and tax receipts.",
                ],
                [
                  "Encumbrance Certificate (EC) Search",
                  "We conduct a 30-year search for any mortgages, loans, or legal claims against the property.",
                ],
                [
                  "Dharani Portal Verification",
                  "We cross-verify ownership, survey numbers, and land status on the official Telangana government portal.",
                ],
                [
                  "Physical Verification",
                  "Our team can visit the property to check boundaries and inquire about any local, unrecorded disputes.",
                ],
                [
                  "Final Legal Opinion",
                  "We provide a comprehensive report summarizing our findings with a clear legal opinion on the property's title.",
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
            Request a Title Verification Report
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't leave your investment to chance. Fill out the form below to
            initiate a professional title search and due diligence report.
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
                City / State *
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
                  placeholder="e.g., Hyderabad, Telangana"
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
                  <option value="Plot/Land">Plot/Land</option>
                  <option value="Industrial">Industrial</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Do You Have a Copy of the Sale Deed?
              </label>
              <div className="relative">
                <FiFileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="documentAvailable"
                  value={formData.documentAvailable}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select Status --</option>
                  <option value="Yes - Soft Copy">
                    Yes - I have a digital copy (PDF/Image)
                  </option>
                  <option value="Yes - Hard Copy Only">
                    Yes - I only have the physical document
                  </option>
                  <option value="Not Yet">No - I don't have it yet</option>
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
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., The property is ancestral, there are multiple owners..."
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Verify My Property Title
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Due Diligence FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "What is the Dharani portal and why is it important?",
              a: "Dharani is the official, integrated land records management system for the Government of Telangana. Verifying a property on Dharani is crucial as it provides the most up-to-date information on ownership, land type (agricultural/non-agricultural), and survey numbers, helping to prevent fraud.",
            },
            {
              id: "faq2",
              q: "How long does a title search typically take in Hyderabad?",
              a: "A comprehensive title search, which includes procuring the Encumbrance Certificate (EC) for up to 30 years and verifying all link documents, typically takes between 10 to 15 working days. This can vary based on the age of the property and the availability of records.",
            },
            {
              id: "faq3",
              q: "What is an Encumbrance Certificate (EC)?",
              a: 'An Encumbrance Certificate is a legal document that certifies whether a property has any pending loans, mortgages, or other legal liabilities. A "Nil Encumbrance Certificate" indicates that the property has a clear and marketable title, free from such claims for the specified period.',
            },
            {
              id: "faq4",
              q: "What happens if a dispute or issue is found during the verification?",
              a: "If our team discovers any issues like a break in the chain of ownership, an existing mortgage, or a legal dispute, we will detail it in our legal opinion report. We will then advise you on the severity of the risk and the potential steps to resolve it, if possible, before you proceed with the transaction.",
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

export default TitleVerification;
