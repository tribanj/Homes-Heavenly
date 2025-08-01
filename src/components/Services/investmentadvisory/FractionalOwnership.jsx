import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiDollarSign,
  FiChevronDown,
  FiTrendingUp,
  FiBriefcase,
  FiPieChart,
  FiShield,
  FiCheckSquare,
  FiArrowRight,
} from "react-icons/fi";
import { FaCity, FaBuilding } from "react-icons/fa";

const FractionalOwnershipREIT = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    investmentAmount: "",
    preferredPropertyType: "",
    investmentGoal: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "📩 Fractional Ownership/REIT Investment Request Submitted:",
      formData
    );
    toast.success(
      "Your investment request has been received! Our advisors will contact you with curated opportunities.",
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
      contact: "",
      investmentAmount: "",
      preferredPropertyType: "",
      investmentGoal: "",
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
            Fractional Ownership & REITs
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Own a piece of premium commercial and residential real estate.
            Access high-value assets, earn passive rental income, and diversify
            your portfolio.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            The Modern Way to Invest in Real Estate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FiDollarSign className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">Low Entry Point</h3>
              <p className="text-gray-400 mt-2">
                Invest in high-value properties with ticket sizes starting as
                low as ₹1 Lakh.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FiTrendingUp className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">Passive Income</h3>
              <p className="text-gray-400 mt-2">
                Earn regular rental income and benefit from long-term capital
                appreciation.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FiPieChart className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                Portfolio Diversification
              </h3>
              <p className="text-gray-400 mt-2">
                Diversify your investments across multiple high-quality,
                pre-vetted properties.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FiShield className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                Professionally Managed
              </h3>
              <p className="text-gray-400 mt-2">
                Assets are managed by experts, freeing you from landlord
                responsibilities.
              </p>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: Fractional Ownership vs REITs --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Fractional Ownership vs. REITs: What's Right for You?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-orange-300 flex items-center mb-4">
                <FaBuilding className="mr-3" /> Fractional Ownership
              </h3>
              <p className="text-gray-400 mb-4">
                Directly co-own a specific, high-value property like an office
                building or luxury villa. Ideal for investors seeking higher
                returns and direct asset ownership.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  Higher ticket size (typically ₹10L - ₹25L+)
                </li>
                <li className="flex items-center">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  Direct ownership via a Special Purpose Vehicle (SPV)
                </li>
                <li className="flex items-center">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  Liquidity through secondary resale platforms
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-orange-300 flex items-center mb-4">
                <FaCity className="mr-3" /> REITs (Real Estate Investment
                Trusts)
              </h3>
              <p className="text-gray-400 mb-4">
                Invest in a portfolio of income-generating properties by buying
                units on the stock market, similar to mutual funds. Regulated by
                SEBI.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  Very low ticket size (can buy single units)
                </li>
                <li className="flex items-center">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  High liquidity; tradable on stock exchanges
                </li>
                <li className="flex items-center">
                  <FiArrowRight className="text-orange-500 mr-2" />
                  Mandatory dividend distribution from rental income
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: Featured Opportunities --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Featured Investment Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700">
              <img
                src="https://via.placeholder.com/500x280/111827/FF9800?text=Grade-A+Office+Space"
                alt="Office Space"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <span className="text-xs font-bold uppercase text-orange-400">
                  Fractional Ownership
                </span>
                <h3 className="text-2xl font-semibold text-white my-2">
                  Grade-A Office Space, Hitech City
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center mt-4">
                  <div>
                    <p className="text-gray-400 text-sm">Min. Investment</p>
                    <p className="font-bold text-lg text-white">₹25 Lakhs</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Rental Yield</p>
                    <p className="font-bold text-lg text-white">8.5% p.a.</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Target IRR</p>
                    <p className="font-bold text-lg text-white">17%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700">
              <img
                src="https://via.placeholder.com/500x280/111827/FF9800?text=SEBI+Registered+REIT"
                alt="REIT"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <span className="text-xs font-bold uppercase text-orange-400">
                  REIT Investment
                </span>
                <h3 className="text-2xl font-semibold text-white my-2">
                  Embassy Office Parks REIT
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center mt-4">
                  <div>
                    <p className="text-gray-400 text-sm">Asset Type</p>
                    <p className="font-bold text-lg text-white">Commercial</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Listing</p>
                    <p className="font-bold text-lg text-white">NSE/BSE</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Portfolio</p>
                    <p className="font-bold text-lg text-white">Diversified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Start Your Alternative Investment Journey
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Request a free consultation to explore curated fractional and REIT
            opportunities that match your investment goals.
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
                Investment Amount (₹) *
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="investmentAmount"
                  value={formData.investmentAmount}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., 1000000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Preferred Property Type *
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="preferredPropertyType"
                  value={formData.preferredPropertyType}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select --</option>
                  <option value="Commercial">
                    Commercial (Office, Retail)
                  </option>
                  <option value="Residential">
                    Residential (Luxury Villas)
                  </option>
                  <option value="Warehousing">Warehousing & Industrial</option>
                  <option value="REITs">REITs (Any)</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Investment Goal *
              </label>
              <div className="relative">
                <FiTrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="investmentGoal"
                  value={formData.investmentGoal}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select --</option>
                  <option value="Regular Income">
                    Regular Income (Rental Yield)
                  </option>
                  <option value="Long-term Growth">
                    Long-term Growth (Appreciation)
                  </option>
                  <option value="Balanced">Balanced (Income + Growth)</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Request a Consultation
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Investor FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "Is the income from REITs and fractional ownership taxable?",
              a: "Yes. Income from REITs is distributed as dividends and is taxable at your income tax slab rate. For fractional ownership, the rental income received is also taxable. Capital gains tax applies when you sell your holdings in both cases. We advise consulting a tax professional for personalized advice.",
            },
            {
              id: "faq2",
              q: "What is an SPV in fractional ownership?",
              a: "SPV stands for Special Purpose Vehicle. It is a separate legal company (usually an LLP) created to acquire and own a single property. When you invest, you buy shares or partnership in this SPV, making you a legal co-owner of the asset.",
            },
            {
              id: "faq3",
              q: "How can I sell my fractional share?",
              a: "Most fractional ownership platforms have a secondary market or a resale window where you can list your share for sale to other investors on the platform. The platform facilitates the transfer and paperwork for a nominal fee.",
            },
            {
              id: "faq4",
              q: "What are the primary risks involved?",
              a: "Like any market-linked investment, risks include market fluctuations affecting property value and rental income. For fractional ownership, liquidity can be a risk as it may take time to find a buyer on the secondary market. REITs are subject to stock market volatility.",
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

export default FractionalOwnershipREIT;
