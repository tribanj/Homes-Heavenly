import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiChevronDown,
  FiShield,
  FiFileText,
  FiCheckCircle,
  FiHome,
  FiHelpCircle,
} from "react-icons/fi";
import { FaFire, FaUserShield, FaHandHoldingUsd } from "react-icons/fa";

const HomeInsurancePlans = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    email: "",
    propertyType: "",
    coverageInterest: "",
    address: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Insurance Interest Form Submitted:", formData);
    toast.success(
      "Your insurance inquiry has been submitted! Our partners will contact you with a personalized quote.",
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
      propertyType: "",
      coverageInterest: "",
      address: "",
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
            Home & Property Insurance Plans
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Protect your most valuable asset. Get comprehensive, affordable
            insurance plans tailored for homeowners and landlords in Hyderabad.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Comprehensive Coverage for Total Peace of Mind
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FaFire className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                Natural Calamities
              </h3>
              <p className="text-gray-400 mt-2">
                Protection against fire, flood, storms, and earthquakes.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FiShield className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">Theft & Burglary</h3>
              <p className="text-gray-400 mt-2">
                Coverage for loss of contents due to theft or burglary.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FaHandHoldingUsd className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                Rental Income Loss
              </h3>
              <p className="text-gray-400 mt-2">
                Secure your cash flow if your property becomes uninhabitable.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FaUserShield className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">Public Liability</h3>
              <p className="text-gray-400 mt-2">
                Protection against legal claims from accidents on your property.
              </p>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: Types of Insurance Plans --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Find the Right Plan for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
              <FiHome className="text-orange-400 mb-4" size={40} />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Homeowner's Policy
              </h3>
              <p className="text-base text-gray-400">
                A comprehensive plan covering both the structure of your home
                and its contents against a wide range of perils.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border-2 border-orange-500 ring-4 ring-orange-500/20">
              <FiUser className="text-orange-400 mb-4" size={40} />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Landlord's Policy
              </h3>
              <p className="text-base text-gray-400">
                Specifically designed for rental properties. Covers building
                damage, loss of rent, and public liability.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
              <FiFileText className="text-orange-400 mb-4" size={40} />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Contents Insurance
              </h3>
              <p className="text-base text-gray-400">
                Ideal for tenants or apartment owners, this policy protects your
                valuable belongings inside the home.
              </p>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: Claims Process --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-4">
            A Simple and Transparent Claims Process
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            In the event of a claim, we're here to support you every step of the
            way.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>1</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Immediate Intimation
              </h3>
              <p className="text-base text-gray-400 mt-2">
                Contact us on our dedicated claims support line to report the
                incident.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>2</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Survey & Assessment
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We arrange for a licensed surveyor to visit and assess the
                extent of the damage.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>3</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Document Submission
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We guide you in preparing and submitting all necessary documents
                for the claim.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>4</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Fast Settlement
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We work directly with the insurer to ensure your claim is
                processed and settled quickly.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Get a Personalized Insurance Quote
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Fill out the form below, and our insurance specialists will get in
            touch with competitive quotes from leading providers.
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
                  <option value="Rental Property">Rental Property</option>
                  <option value="Vacation Home">Vacation Home</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Coverage Interest *
              </label>
              <div className="relative">
                <FiCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="coverageInterest"
                  value={formData.coverageInterest}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select --</option>
                  <option value="Comprehensive">
                    Comprehensive (All-Inclusive)
                  </option>
                  <option value="Fire/Theft/Natural Disaster">
                    Structure & Disaster
                  </option>
                  <option value="Rental Income Protection">
                    Rental Income Protection
                  </option>
                  <option value="Liability Coverage">Landlord Liability</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Property Address *
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Full address of the property to be insured"
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Get My Free Quote
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Insurance FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "Is damage from monsoon flooding in Hyderabad covered?",
              a: "Yes, most standard fire and special perils policies in India cover damage caused by floods, inundation, and storms, which includes typical monsoon-related damage. We will help you verify the specific terms of your policy.",
            },
            {
              id: "faq2",
              q: "What is the difference between building and contents insurance?",
              a: "Building insurance covers the physical structure of your home (walls, roof, floors). Contents insurance covers your personal belongings inside the home (furniture, electronics, etc.). For complete protection, a comprehensive policy covering both is recommended.",
            },
            {
              id: "faq3",
              q: "How is my home insurance premium calculated?",
              a: "Premiums are based on several factors, including the property's location (city, area), construction type, age of the building, the sum insured (coverage amount), and any add-on covers you choose.",
            },
            {
              id: "faq4",
              q: "I am a tenant. Do I need insurance?",
              a: "While the landlord insures the building, it is highly recommended for tenants to get contents insurance. This protects your personal belongings against risks like theft, fire, or damage, which are not covered under the landlord's policy.",
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

export default HomeInsurancePlans;
