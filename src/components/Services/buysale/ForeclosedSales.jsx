import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiDollarSign,
  FiMapPin,
  FiCheckCircle,
  FiChevronDown,
  FiArrowRight,
  FiHome,
  FiTrendingUp,
  FiShield,
  FiShieldOff,
  FiList,
} from "react-icons/fi";
import { FaLandmark, FaHardHat } from "react-icons/fa";
import { motion } from "framer-motion";

const DistressedSales = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    investmentBudget: "",
    preferredLocation: "",
  });
  const [activeAccordion, setActiveAccordion] = useState("collapse1");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📥 Distressed Sales Inquiry:", formData);
    toast.success(
      "Your inquiry has been submitted! Our team will contact you shortly.",
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
      investmentBudget: "",
      preferredLocation: "",
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
            <FiHome className="mr-3" /> Foreclosed & Distressed Properties
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
            Unlock incredible investment opportunities with verified properties
            below market value.
          </p>
        </div>
      </motion.div>

      {/* Centered Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Why Choose Distressed Properties Section */}
        <section className="my-16">
          <h2 className="text-3xl font-semibold text-orange-400 flex items-center mb-8">
            <FiCheckCircle className="mr-3" /> The Investor's Advantage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:bg-gray-700 hover:scale-105 transition-all">
              <h3 className="text-xl font-medium text-orange-300">
                Below Market Value
              </h3>
              <p className="text-base text-gray-400 mt-3">
                Purchase properties at 10% to 40% below current market rates for
                instant equity.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:bg-gray-700 hover:scale-105 transition-all">
              <h3 className="text-xl font-medium text-orange-300">
                High ROI Potential
              </h3>
              <p className="text-base text-gray-400 mt-3">
                Capitalize on value-add opportunities through renovation, rental
                income, or quick resale.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:bg-gray-700 hover:scale-105 transition-all">
              <h3 className="text-xl font-medium text-orange-300">
                Exclusive Access
              </h3>
              <p className="text-base text-gray-400 mt-3">
                Gain access to off-market deals and bank auction properties not
                available to the general public.
              </p>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: Types of Distressed Properties --- */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-orange-400 flex items-center mb-8">
            <FiList className="mr-3" /> Types of Properties We Handle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
              <FaLandmark className="text-orange-400 mb-4" size={40} />
              <h3 className="text-xl font-medium text-orange-300">
                Bank Auction Properties
              </h3>
              <p className="text-base text-gray-400 mt-3">
                Properties auctioned by banks under the SARFAESI Act, offering
                clear titles and significant discounts.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
              <FaHardHat className="text-orange-400 mb-4" size={40} />
              <h3 className="text-xl font-medium text-orange-300">
                Developer Distress Sales
              </h3>
              <p className="text-base text-gray-400 mt-3">
                New or under-construction units sold by developers needing to
                liquidate inventory quickly.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
              <FiUser className="text-orange-400 mb-4" size={40} />
              <h3 className="text-xl font-medium text-orange-300">
                Individual Distress Sales
              </h3>
              <p className="text-base text-gray-400 mt-3">
                Properties from individual owners facing financial hardship who
                need to sell urgently, often below market rate.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Listings Preview Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-orange-400 flex items-center mb-8">
            <FiHome className="mr-3" /> Featured Listings Preview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "2BHK Apartment, Bangalore",
                price: "₹45 Lakh",
                market: "₹62 Lakh",
                image:
                  "https://via.placeholder.com/400x240/111827/FF9800?text=Apartment+in+Koramangala",
              },
              {
                title: "Residential Plot, Pune",
                price: "₹22 Lakh",
                market: "₹30 Lakh",
                image:
                  "https://via.placeholder.com/400x240/111827/FF9800?text=Plot+in+Hinjewadi",
              },
              {
                title: "3BHK Duplex, Hyderabad",
                price: "₹65 Lakh",
                market: "₹85 Lakh",
                image:
                  "https://via.placeholder.com/400x240/111827/FF9800?text=Duplex+in+Jubilee+Hills",
              },
            ].map((property, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-lg bg-gray-800"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-lg font-semibold text-orange-300">
                    {property.title}
                  </h3>
                  <p className="text-base text-gray-300">
                    Our Price:{" "}
                    <span className="font-bold">{property.price}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Market Value: ~{property.market}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-gray-400 text-base">
            <em>
              *This is a sample. Full, verified listings are shared with
              registered investors only.
            </em>
          </p>
        </section>

        {/* --- NEW SECTION: Understanding Risk vs. Reward --- */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-orange-400 flex items-center mb-8">
            <FiShield className="mr-3" /> Risk vs. Reward
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-green-400 flex items-center mb-4">
                <FiTrendingUp className="mr-2" /> The Rewards
              </h3>
              <ul className="space-y-3 text-base text-gray-300">
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-400 mr-3 mt-1 shrink-0" />
                  <span>Purchase significantly below market value.</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-400 mr-3 mt-1 shrink-0" />
                  <span>High potential for capital appreciation.</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-400 mr-3 mt-1 shrink-0" />
                  <span>Less competition than the open market.</span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-400 mr-3 mt-1 shrink-0" />
                  <span>Opportunity for value-add renovation projects.</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-red-400 flex items-center mb-4">
                <FiShieldOff className="mr-2" /> The Risks (And How We Help)
              </h3>
              <ul className="space-y-3 text-base text-gray-300">
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-400 mr-3 mt-1 shrink-0" />
                  <span>
                    **Risk:** Hidden legal issues or unclear titles. <br />
                    <span className="text-gray-400">
                      **Our Solution:** We conduct rigorous legal due diligence
                      on every property.
                    </span>
                  </span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-400 mr-3 mt-1 shrink-0" />
                  <span>
                    **Risk:** Unknown repair costs and property condition.{" "}
                    <br />
                    <span className="text-gray-400">
                      **Our Solution:** We facilitate property inspections and
                      provide realistic cost estimates.
                    </span>
                  </span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-400 mr-3 mt-1 shrink-0" />
                  <span>
                    **Risk:** Complex auction and bidding processes. <br />
                    <span className="text-gray-400">
                      **Our Solution:** We guide you through the entire process,
                      from paperwork to bidding strategy.
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Submit Interest Form Section (UNCHANGED) */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-orange-400 flex items-center mb-8">
            <FiArrowRight className="mr-3" /> Get Exclusive Access
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
                    name="name"
                    value={formData.name}
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
                  Investment Budget (in ₹ Lakhs) *
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute top-3.5 left-3 text-orange-500" />
                  <input
                    type="number"
                    name="investmentBudget"
                    value={formData.investmentBudget}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="e.g., 50 for ₹50 Lakhs"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Location(s) *
                </label>
                <div className="relative">
                  <FiMapPin className="absolute top-3.5 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="e.g., Hyderabad, Bangalore (North)"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 text-right">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
              >
                Browse Verified Listings <FiArrowRight className="ml-2" />
              </button>
            </div>
          </form>
        </section>

        {/* FAQ Section */}
        <section className="pb-20">
          <h2 className="text-3xl font-semibold text-orange-400 flex items-center mb-8">
            <FiCheckCircle className="mr-3" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                id: "collapse1",
                question: "Are distressed properties legally safe to buy?",
                answer:
                  "Yes. Our primary service is to ensure all documentation, titles, and ownership records are legally verified and clear of any encumbrances before we even present a property to you.",
              },
              {
                id: "collapse2",
                question: "Can I get a home loan for these properties?",
                answer:
                  "Yes, financing is available for most distressed properties. We assist you in connecting with banking partners who are experienced in processing loans for auctioned and distressed assets.",
              },
              {
                id: "collapse3",
                question: "What are your service charges?",
                answer:
                  "Our fee structure is transparent and success-based. It depends on the deal size and complexity. We discuss and agree upon all charges upfront before you commit to a property.",
              },
              {
                id: "collapse4",
                question: "How quickly can a deal be closed?",
                answer:
                  "Timelines can be much faster than the traditional market, often ranging from 30 to 60 days, especially for bank auctions with set timelines. We work to ensure the process is as swift as possible.",
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

export default DistressedSales;
