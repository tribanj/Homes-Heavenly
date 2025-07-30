import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiMapPin,
  FiCheckCircle,
  FiChevronDown,
  FiArrowRight,
  FiTrendingUp,
  FiSend,
  FiFileText,
  FiAward,
} from "react-icons/fi";
import { FaRuler, FaCity, FaQuoteLeft, FaBuilding } from "react-icons/fa";
import { motion } from "framer-motion";

const FreeValuation = () => {
  // State updated to remove optional fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
    city: "", // This was an enhancement you approved, keeping it.
    location: "",
    propertySize: "",
    sizeUnit: "sq.ft",
  });
  const [activeAccordion, setActiveAccordion] = useState("collapseOne");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Valuation Request:", formData);
    toast.success("Your free valuation request has been submitted!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    // Reset state updated to remove optional fields
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      propertyType: "",
      city: "",
      location: "",
      propertySize: "",
      sizeUnit: "sq.ft",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-6 px-4 text-center h-48 flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 flex items-center justify-center">
            <FaRuler className="mr-3" /> Free Property Valuation & Appraisal
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
            Discover your property’s true market value with our professional,
            no-cost appraisal.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* What You Get Section */}
        <section className="my-16">
          <h2 className="text-3xl font-semibold text-orange-400 flex items-center mb-8">
            <FiCheckCircle className="mr-3" /> What You Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 hover:scale-105 transition-all">
              <h3 className="text-xl font-medium text-orange-300">
                Accurate Market Value
              </h3>
              <p className="text-base text-gray-400 mt-3">
                A precise valuation based on current market data and property
                specifics.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 hover:scale-105 transition-all">
              <h3 className="text-xl font-medium text-orange-300">
                Local Market Analysis
              </h3>
              <p className="text-base text-gray-400 mt-3">
                Insights into neighborhood price trends and comparable property
                sales (comps).
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 hover:scale-105 transition-all">
              <h3 className="text-xl font-medium text-orange-300">
                Investment Potential
              </h3>
              <p className="text-base text-gray-400 mt-3">
                Guidance on rental yield and future appreciation potential for
                investors.
              </p>
            </div>
          </div>
        </section>

        {/* Our Valuation Process Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-orange-400 flex items-center mb-8">
            <FiTrendingUp className="mr-3" /> Our Valuation Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-4 mb-4">
                <FiSend size={30} />
              </div>
              <h3 className="text-lg font-semibold text-white">
                1. Submit Details
              </h3>
              <p className="text-base text-gray-400 mt-2">
                Fill out the form below with your property and contact
                information.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-4 mb-4">
                <FiFileText size={30} />
              </div>
              <h3 className="text-lg font-semibold text-white">
                2. Data Analysis
              </h3>
              <p className="text-base text-gray-400 mt-2">
                Our system analyzes market trends, and recent sales in your
                locality.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-4 mb-4">
                <FiPhone size={30} />
              </div>
              <h3 className="text-lg font-semibold text-white">
                3. Expert Review
              </h3>
              <p className="text-base text-gray-400 mt-2">
                A local valuation expert will call you to verify details and ask
                any clarifying questions.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-4 mb-4">
                <FiAward size={30} />
              </div>
              <h3 className="text-lg font-semibold text-white">
                4. Receive Report
              </h3>
              <p className="text-base text-gray-400 mt-2">
                You receive a detailed, no-obligation valuation report via
                email.
              </p>
            </div>
          </div>
        </section>

        {/* Valuation Form Section - Optional fields removed */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-orange-400 flex items-center mb-8">
            <FaRuler className="mr-3" /> Get Your Free Valuation
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 rounded-xl p-8 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <FiUser className="absolute top-3.5 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <FiMail className="absolute top-3.5 left-3 text-orange-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone *
                </label>
                <div className="relative">
                  <FiPhone className="absolute top-3.5 left-3 text-orange-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="">Select Property Type...</option>
                  <option value="Apartment/Flat">Apartment / Flat</option>
                  <option value="Independent House/Villa">
                    Independent House / Villa
                  </option>
                  <option value="Builder Floor">Builder Floor</option>
                  <option value="Plot/Land">Plot / Land</option>
                  <option value="Farmhouse">Farmhouse</option>
                  <option value="Office Space">Office Space</option>
                  <option value="Shop/Showroom">Shop / Showroom</option>
                  <option value="Warehouse/Godown">Warehouse / Godown</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  City *
                </label>
                <div className="relative">
                  <FaCity className="absolute top-3.5 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="e.g., Mumbai, Bangalore"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location / Area *
                </label>
                <div className="relative">
                  <FiMapPin className="absolute top-3.5 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="e.g., Bandra West, Koramangala"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Property Size *
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-grow">
                    <FaRuler className="absolute top-3.5 left-3 text-orange-500" />
                    <input
                      type="number"
                      name="propertySize"
                      value={formData.propertySize}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      placeholder="Enter property size"
                    />
                  </div>
                  <select
                    name="sizeUnit"
                    value={formData.sizeUnit}
                    onChange={handleChange}
                    className="w-1/3 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  >
                    <option value="sq.ft">sq.ft</option>
                    <option value="sq.yd">sq.yd (Gaj)</option>
                    <option value="sq.m">sq.m</option>
                    <option value="acre">Acre</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
              >
                Request Free Valuation <FiArrowRight className="ml-2" />
              </button>
            </div>
          </form>
        </section>

        {/* Client Testimonials Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-orange-400 flex items-center mb-8">
            <FiAward className="mr-3" /> Trusted by Property Owners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
              <FaQuoteLeft className="text-orange-500 mb-4" size={24} />
              <p className="text-gray-300 italic">
                "The valuation was quick, professional, and incredibly accurate.
                It helped us set the right price for our flat in Hyderabad and
                we sold it within a month. Highly recommended!"
              </p>
              <div className="mt-4 text-right">
                <p className="font-bold text-orange-300">Priya Sharma</p>
                <p className="text-sm text-gray-500">Sold 3BHK in Gachibowli</p>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
              <FaQuoteLeft className="text-orange-500 mb-4" size={24} />
              <p className="text-gray-300 italic">
                "I needed a valuation for my ancestral property for family
                settlement purposes. The team was very understanding and their
                detailed report was accepted by everyone. Thank you!"
              </p>
              <div className="mt-4 text-right">
                <p className="font-bold text-orange-300">Arjun Desai</p>
                <p className="text-sm text-gray-500">
                  Valued ancestral property in Pune
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Areas We Serve Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-orange-400 flex items-center mb-8">
            <FaBuilding className="mr-3" /> Areas We Serve
          </h2>
          <div className="bg-gray-800 p-8 rounded-xl">
            <p className="text-center text-gray-400 mb-6">
              We provide expert valuation services across all major Indian metro
              cities and many more.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
              {[
                "Hyderabad",
                "Mumbai",
                "Delhi",
                "Bangalore",
                "Chennai",
                "Pune",
                "Kolkata",
                "Ahmedabad",
                "Jaipur",
                "Lucknow",
                "Chandigarh",
                "Noida",
              ].map((city) => (
                <span
                  key={city}
                  className="bg-gray-700/50 py-2 px-4 rounded-lg text-gray-300"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pb-20">
          <h2 className="text-3xl font-semibold text-orange-400 flex items-center mb-8">
            <FiCheckCircle className="mr-3" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                id: "collapseOne",
                question: "How long does the valuation process take?",
                answer:
                  "Our team will contact you within 24 hours. The full valuation report is typically ready in 2-3 business days, depending on property details.",
              },
              {
                id: "collapseTwo",
                question: "Is this valuation valid for bank loans?",
                answer:
                  "Our report provides a fair market value which is a great starting point. However, banks require their own authorized valuers for final loan processing. Our report can help you in negotiations.",
              },
              {
                id: "collapseThree",
                question: "What documents should I keep handy?",
                answer:
                  "Having a copy of the Sale Deed, latest property tax receipt, and building plan (if available) helps in a more accurate valuation, but they are not mandatory for this initial request.",
              },
              {
                id: "collapseFour",
                question: "Is this service truly free of charge?",
                answer:
                  "Yes, this initial online valuation and consultation with our expert is completely free and comes with no obligation.",
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
        </section>
      </div>
    </div>
  );
};

export default FreeValuation;
