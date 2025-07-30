import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiCheckCircle,
  FiChevronDown,
  FiArrowRight,
  FiShield,
  FiBriefcase,
  FiAward,
} from "react-icons/fi";
import { FaGavel, FaStamp, FaSearchLocation } from "react-icons/fa";
import { motion } from "framer-motion";

const LegalAssistance = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceRequired: "",
    propertyLocation: "",
  });
  const [activeAccordion, setActiveAccordion] = useState("collapse1");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📝 Legal Assistance Request:", formData);
    toast.success(
      "Your request has been submitted. Our legal team will contact you shortly.",
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
      serviceRequired: "",
      propertyLocation: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const services = [
    {
      icon: FaGavel,
      title: "Sale/Rental Agreements",
      description:
        "Drafting and verifying robust agreements to protect your interests.",
    },
    {
      icon: FaSearchLocation,
      title: "Title Due Diligence",
      description:
        "Thorough title searches to ensure clear ownership and no hidden claims.",
    },
    {
      icon: FaStamp,
      title: "Registration & Stamp Duty",
      description:
        "Handling property registration, stamp duty calculation, and payment seamlessly.",
    },
    {
      icon: FiFileText,
      title: "POA & Affidavits",
      description:
        "Expert assistance with Power of Attorney and other legal affidavits.",
    },
    {
      icon: FiBriefcase,
      title: "RERA Compliance",
      description:
        "Ensuring your property transactions are fully compliant with RERA regulations.",
    },
    {
      icon: FiShield,
      title: "Dispute Resolution",
      description:
        "Expert legal support and representation for any property-related disputes.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-8 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 mb-4 flex items-center justify-center">
            <FiShield className="mr-3" /> Legal & Documentation Assistance
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Navigate complex property paperwork with confidence. Our legal
            experts ensure every transaction is secure, compliant, and seamless.
          </p>
        </div>
      </motion.div>

      {/* Centered Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* What We Help With Section */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Comprehensive Legal Services for Your Property
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-orange-500/50 transition-colors"
              >
                <service.icon className="text-orange-400 mb-4" size={40} />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-base text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- NEW SECTION: The Process Simplified --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-4">
            Our Simple 4-Step Process
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            We make obtaining expert legal help straightforward and transparent.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <FiArrowRight size={30} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                1. Submit Your Query
              </h3>
              <p className="text-base text-gray-400 mt-2">
                Fill out the consultation form below with your specific legal
                need.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <FiPhone size={30} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                2. Free Consultation
              </h3>
              <p className="text-base text-gray-400 mt-2">
                Our legal expert will call you for a free initial consultation
                to understand your case.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <FiFileText size={30} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                3. Document Review
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We analyze your documents and propose a clear strategy and scope
                of work.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <FaGavel size={30} />
              </div>
              <h3 className="text-xl font-semibold text-white">4. Execution</h3>
              <p className="text-base text-gray-400 mt-2">
                Upon your approval, we execute the required legal services with
                precision.
              </p>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: Meet Our Legal Experts --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Meet Our Legal Experts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-800 text-center p-8 rounded-2xl border border-gray-700">
              <img
                src="https://via.placeholder.com/150/FF9800/FFFFFF?text=RS"
                alt="Legal Expert"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-700"
              />
              <h3 className="text-xl font-bold text-white">Rohan Sharma</h3>
              <p className="text-orange-400 font-semibold">
                Senior Property Lawyer
              </p>
              <p className="text-gray-400 mt-2 text-sm">
                12+ years of experience in real estate litigation and
                documentation, specializing in Hyderabad's property laws.
              </p>
            </div>
            <div className="bg-gray-800 text-center p-8 rounded-2xl border border-gray-700">
              <img
                src="https://via.placeholder.com/150/FF9800/FFFFFF?text=AM"
                alt="Legal Expert"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-700"
              />
              <h3 className="text-xl font-bold text-white">Anjali Mehta</h3>
              <p className="text-orange-400 font-semibold">
                RERA & Compliance Expert
              </p>
              <p className="text-gray-400 mt-2 text-sm">
                Specializes in RERA compliance for developers and homebuyers,
                ensuring all transactions meet regulatory standards.
              </p>
            </div>
            <div className="bg-gray-800 text-center p-8 rounded-2xl border border-gray-700">
              <img
                src="https://via.placeholder.com/150/FF9800/FFFFFF?text=VK"
                alt="Legal Expert"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-700"
              />
              <h3 className="text-xl font-bold text-white">Vikram Kumar</h3>
              <p className="text-orange-400 font-semibold">
                Due Diligence Specialist
              </p>
              <p className="text-gray-400 mt-2 text-sm">
                Expert in conducting comprehensive title searches and due
                diligence across Telangana and Andhra Pradesh.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Legal Assistance Form Section */}
      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Request a Free Legal Consultation
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Facing a legal hurdle or just need clarification? Fill out the form
            below, and our team will get in touch for a no-obligation
            consultation.
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
                Location of Property *
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
                  placeholder="e.g., Jubilee Hills, Hyderabad"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                What Help Do You Need? *
              </label>
              <div className="relative">
                <select
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  required
                  className="w-full pl-4 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select a Service --</option>
                  {services.map((s) => (
                    <option key={s.title} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Speak to Our Legal Team
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
              id: "collapse1",
              question:
                "Is title verification mandatory before buying property?",
              answer:
                "Absolutely. It is the most critical step to ensure the seller has clear and marketable title to the property, and that it is free from any legal disputes, mortgages, or other liabilities.",
            },
            {
              id: "collapse2",
              question:
                "What is the difference between a Sale Agreement and a Sale Deed?",
              answer:
                "A Sale Agreement (or Agreement to Sell) is a promise for a future transfer of property, outlining terms and conditions. A Sale Deed is the final legal document that actually transfers ownership from the seller to the buyer. The Sale Deed is registered at the sub-registrar's office.",
            },
            {
              id: "collapse3",
              question:
                "How long does a title search take in a city like Hyderabad?",
              answer:
                "A thorough title search, including an Encumbrance Certificate (EC) for the last 15-30 years, typically takes between 7 to 15 working days, depending on the availability of records at the sub-registrar office.",
            },
            {
              id: "collapse4",
              question: "Do you provide services across India?",
              answer:
                "Yes, while our main office is in Hyderabad, we have a network of trusted legal partners and associates across all major metros and Tier-2 cities in India to assist with your property needs.",
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

export default LegalAssistance;
