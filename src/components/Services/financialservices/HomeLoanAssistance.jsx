import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiHome,
  FiDollarSign,
  FiFileText,
  FiInfo,
  FiArrowRight,
  FiChevronDown,
  FiCheckCircle,
  FiCalendar,
} from "react-icons/fi";
import MortgagePropertyDetails from "../../PostProperty/Mortgage/MortgagePropertyDetails"; // Assuming this path is correct
import { motion } from "framer-motion";

const HomeLoanMortgageAssistance = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    loanAmount: "",
    loanTenure: "",
    propertyType: "",
    assistanceType: "Home Loan",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");
  const [activeTab, setActiveTab] = useState("Home Loan");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Loan/Mortgage Assistance Request Submitted:", formData);
    toast.success(
      "Your request has been submitted successfully! Our loan experts will contact you shortly.",
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
      loanAmount: "",
      loanTenure: "",
      propertyType: "",
      assistanceType: "Home Loan",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const loanBenefits = {
    "Home Loan": [
      "Top lenders with rates from 8.5% p.a.",
      "Flexible tenure from 5 to 30 years",
      "Tax benefits under Sections 80C & 24(b)",
      "Support for salaried, self-employed, and NRIs",
      "End-to-end documentation assistance",
    ],
    "Mortgage Loan": [
      "Funds for business, education, or emergencies",
      "Continue using your property as usual",
      "Rates from 9.25% p.a., lower than personal loans",
      "Loan amount up to 70% of property’s market value",
      "Requires clear title and ownership documents",
    ],
    "Balance Transfer": [
      "Lower your EMIs to reduce financial burden",
      "Quick and hassle-free processing for eligible borrowers",
      "Option for a top-up loan for additional funds",
      "Expert advisory to calculate your exact savings",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-8 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 mb-4">
            Home Loan & Mortgage Assistance
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Your trusted partner for property financing. Whether you're buying,
            refinancing, or leveraging your property, our experts are here to
            guide you.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Understand Your Financing Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-colors">
              <h3 className="text-xl font-bold text-orange-300 mb-2">
                Home Loan
              </h3>
              <p className="text-gray-400">
                A loan to purchase or construct a property, repaid over 10–30
                years.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-colors">
              <h3 className="text-xl font-bold text-orange-300 mb-2">
                Mortgage Loan
              </h3>
              <p className="text-gray-400">
                Pledge your property to get funds for business, education, or
                personal needs.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-colors">
              <h3 className="text-xl font-bold text-orange-300 mb-2">
                Balance Transfer
              </h3>
              <p className="text-gray-400">
                Switch your loan to a lender with better rates and terms to save
                on EMIs.
              </p>
            </div>
          </div>
        </section>

        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Key Benefits & Features
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center border-b border-gray-700 mb-8">
              {Object.keys(loanBenefits).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-lg font-semibold transition-colors ${
                    activeTab === tab
                      ? "text-orange-400 border-b-2 border-orange-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {loanBenefits[activeTab].map((point, i) => (
                  <li key={i} className="flex items-start text-lg">
                    <FiCheckCircle className="text-green-400 mr-3 mt-1 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* --- NEW SECTION: Our Process --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-4">
            Our Simple 4-Step Loan Process
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            From application to disbursal, we're with you at every step.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>1</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Request & Profile Assessment
              </h3>
              <p className="text-base text-gray-400 mt-2">
                Submit your request, and our experts will assess your
                eligibility and document readiness.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>2</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Best Lender Matching
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We compare offers from multiple banks to find the best interest
                rates for your profile.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>3</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Application & Follow-up
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We assist with the application process and proactively follow up
                with the bank on your behalf.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>4</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Sanction & Disbursal
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We support you until the loan is sanctioned and the amount is
                disbursed.
              </p>
            </div>
          </div>
        </section>

        {/* Wrapper for imported MortgagePropertyDetails component */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Provide Your Property Details for Mortgage
          </h2>
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <MortgagePropertyDetails />
          </div>
        </section>
      </div>

      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Apply for Personalized Assistance
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get a head start on your loan application. Fill out the form below
            for a free consultation with our financial experts.
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
                Loan Amount (₹) *
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., 5000000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Loan Tenure (Years) *
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="loanTenure"
                  value={formData.loanTenure}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., 20"
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
                  <option value="Land">Land / Plot</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Assistance Type
              </label>
              <div className="relative">
                <FiInfo className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="assistanceType"
                  value={formData.assistanceType}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="Home Loan">Home Loan</option>
                  <option value="Mortgage Loan">Mortgage Loan</option>
                  <option value="Both">Both</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Loan & Mortgage FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "What is a good CIBIL score to get a home loan in India?",
              a: "A CIBIL score of 750 or above is generally considered excellent by most lenders in India and will help you get the best interest rates and a higher loan amount. Scores above 700 are also considered good.",
            },
            {
              id: "faq2",
              q: "Can I get a home loan for a property in a Gram Panchayat area?",
              a: "It can be challenging as banks often prefer properties with clear municipal approvals (like HMDA or GHMC in Hyderabad). However, some lenders may approve loans for Gram Panchayat properties if they have all the necessary clearances and a clear title.",
            },
            {
              id: "faq3",
              q: "What is the maximum tenure for a mortgage loan?",
              a: "The maximum tenure for a Loan Against Property (Mortgage Loan) is typically up to 15 years, though some lenders may extend it to 20 years depending on your age and financial profile.",
            },
            {
              id: "faq4",
              q: "Do I need to have property insurance to get a home loan?",
              a: "While not mandatory by law, most banks and financial institutions insist on property insurance as a prerequisite for sanctioning a home loan. This protects their investment (and yours) against unforeseen damages.",
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

export default HomeLoanMortgageAssistance;
