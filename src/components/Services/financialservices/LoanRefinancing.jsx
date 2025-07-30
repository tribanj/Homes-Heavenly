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
  FiCheckSquare,
  FiAward,
  FiFileText,
} from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";

const LoanRefinancingBalanceTransfer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    existingLoanAmount: "",
    existingLender: "",
    preferredEMI: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Loan Refinancing Request Submitted:", formData);
    toast.success(
      "Your request has been submitted! Our loan specialists will contact you with the best offers.",
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
      existingLoanAmount: "",
      existingLender: "",
      preferredEMI: "",
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
            Loan Refinancing & Balance Transfer
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Lower your EMIs and save significantly on interest. We help you
            transfer your existing home loan to a new lender with better terms.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Key Benefits of Refinancing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FiTrendingUp className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                Lower Interest Rates
              </h3>
              <p className="text-gray-400 mt-2">
                Access current, lower interest rates to reduce your monthly EMI.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FiDollarSign className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">Top-Up Loan</h3>
              <p className="text-gray-400 mt-2">
                Get additional funds over your existing loan amount for other
                needs.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FiFileText className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                Better Loan Terms
              </h3>
              <p className="text-gray-400 mt-2">
                Switch to a lender offering more flexible repayment options or
                better service.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FiAward className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">Consolidate Debt</h3>
              <p className="text-gray-400 mt-2">
                Combine multiple high-interest debts into a single, more
                manageable home loan.
              </p>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: Savings Calculator Visual --- */}
        <section className="my-20 bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Visualize Your Savings
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-gray-400 text-sm">Current EMI</p>
              <p className="font-bold text-3xl text-red-400">₹ 55,000</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">New EMI After Transfer</p>
              <p className="font-bold text-3xl text-green-400">₹ 48,000</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Lifetime Savings</p>
              <p className="font-bold text-3xl text-green-400">₹ 8.4 Lakhs</p>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">
            *Illustrative example. Your actual savings may vary. Submit the form
            below for a personalized calculation.
          </p>
        </section>

        {/* --- NEW SECTION: The Refinancing Process --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-4">
            Our Simple 4-Step Refinancing Process
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            We make switching your loan quick, transparent, and hassle-free.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>1</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Eligibility Check
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We assess your current loan, repayment history, and credit
                profile.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>2</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Compare Offers
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We present you with the best balance transfer offers from
                multiple top banks.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>3</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Easy Application
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We assist you with all the required documentation and
                application submission.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>4</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Loan Takeover
              </h3>
              <p className="text-base text-gray-400 mt-2">
                The new lender pays off your old loan, and you start saving from
                the next EMI.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Start Saving on Your Loan Today
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Fill out the form below for a free, no-obligation assessment of your
            loan and discover how much you can save.
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
                Existing Loan Amount (₹) *
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="existingLoanAmount"
                  value={formData.existingLoanAmount}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., 4500000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Existing Lender Name *
              </label>
              <div className="relative">
                <FaUniversity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="existingLender"
                  value={formData.existingLender}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., HDFC, SBI"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Your Preferred EMI (₹) *
              </label>
              <div className="relative">
                <FiTrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="preferredEMI"
                  value={formData.preferredEMI}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Your target monthly EMI"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Calculate My Savings
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Refinancing & Balance Transfer FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "What are the foreclosure charges when transferring a home loan?",
              a: "For home loans with a floating interest rate, banks in India are not permitted to charge any foreclosure or prepayment penalties. For fixed-rate loans, charges may apply and typically range from 2% to 4% of the outstanding principal.",
            },
            {
              id: "faq2",
              q: "Will my CIBIL score be affected by a balance transfer?",
              a: "When you apply for a balance transfer, the new lender will make a hard inquiry on your credit report, which can temporarily lower your score by a few points. However, successfully transferring to a lower EMI can improve your credit utilization and payment history over time, positively impacting your score.",
            },
            {
              id: "faq3",
              q: "What is a top-up loan, and can I get one with a balance transfer?",
              a: "A top-up loan is an additional amount you can borrow over and above your existing home loan. Many lenders offer an attractive top-up loan facility at a competitive interest rate when you opt for a balance transfer, which you can use for any personal or professional needs.",
            },
            {
              id: "faq4",
              q: "How long does the balance transfer process typically take?",
              a: "The entire process, from application to the new lender taking over your loan, usually takes between 15 to 20 working days. This includes the time for document verification, property valuation, and legal checks by the new bank.",
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
                {/* --- CHANGE: Applying your requested padding style --- */}
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

export default LoanRefinancingBalanceTransfer;
