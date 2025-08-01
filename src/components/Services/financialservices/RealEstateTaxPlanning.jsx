import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiTrendingUp,
  FiFileText,
  FiChevronDown,
  FiCheckSquare,
  FiAward,
} from "react-icons/fi";

const RealEstateTaxInvestmentPlanning = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    propertyType: "",
    investmentGoals: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Tax & Investment Planning Request Submitted:", formData);
    toast.success(
      "Your consultation request has been submitted! Our tax experts will contact you shortly.",
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
      propertyType: "",
      investmentGoals: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const services = [
    {
      icon: FiTrendingUp,
      title: "Capital Gains Planning",
      description:
        "Strategic advice to minimize taxes on property sales using exemptions like Section 54.",
    },
    {
      icon: FiHome,
      title: "Loan & HRA Benefits",
      description:
        "Optimize your tax deductions through home loan principal and interest (Sec 80C & 24b).",
    },
    {
      icon: FiFileText,
      title: "Rental Income Tax",
      description:
        "Effectively manage tax on rental income by claiming all eligible deductions.",
    },
    {
      icon: FiAward,
      title: "Portfolio Structuring",
      description:
        "Guidance on structuring your property portfolio for long-term growth and tax efficiency.",
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
            Real Estate Tax & Investment Planning
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Maximize your returns by minimizing tax liabilities. Our experts
            provide strategic guidance for tax-efficient property investment in
            India.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            How We Help You Save
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center"
              >
                <service.icon className="text-orange-400 text-4xl mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400 mt-2">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- NEW SECTION: Key Tax Instruments --- */}
        <section className="my-20 bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Key Tax-Saving Instruments for Property Owners
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex items-start">
              <FiCheckSquare className="text-green-400 text-2xl mr-4 mt-1 shrink-0" />
              <span className="text-lg text-gray-300">
                <strong>Section 80C:</strong> Deduction on home loan principal
                repayment.
              </span>
            </div>
            <div className="flex items-start">
              <FiCheckSquare className="text-green-400 text-2xl mr-4 mt-1 shrink-0" />
              <span className="text-lg text-gray-300">
                <strong>Section 24(b):</strong> Deduction on home loan interest
                payment.
              </span>
            </div>
            <div className="flex items-start">
              <FiCheckSquare className="text-green-400 text-2xl mr-4 mt-1 shrink-0" />
              <span className="text-lg text-gray-300">
                <strong>Section 54:</strong> Capital gains exemption on sale of
                house.
              </span>
            </div>
            <div className="flex items-start">
              <FiCheckSquare className="text-green-400 text-2xl mr-4 mt-1 shrink-0" />
              <span className="text-lg text-gray-300">
                <strong>Standard Deduction:</strong> Flat 30% deduction on
                rental income.
              </span>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: Consultation Process --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-4">
            Our 3-Step Consultation Process
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            A simple, confidential, and effective approach to tax planning.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>1</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Submit Your Query
              </h3>
              <p className="text-base text-gray-400 mt-2">
                Fill the form below with your property and investment details.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>2</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Portfolio Analysis
              </h3>
              <p className="text-base text-gray-400 mt-2">
                Our experts review your financial situation and tax liabilities.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>3</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Strategy Session
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We provide a personalized, one-on-one consultation with
                actionable advice.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Book a Free Tax Consultation
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Take the first step towards smarter tax planning. Fill out the form
            for a free, no-obligation consultation with our financial experts.
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Property Type(s) you own/plan to buy *
              </label>
              <div className="relative">
                <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., Residential Flat, Commercial Plot"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Primary Goal / Question *
              </label>
              <div className="relative">
                <FiTrendingUp className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="investmentGoals"
                  rows="4"
                  value={formData.investmentGoals}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., How to save capital gains tax on a recent sale?"
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Book My Consultation
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Real Estate Tax FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "How is rental income taxed in India?",
              a: 'Rental income is taxed under the head "Income from House Property." You can claim a standard deduction of 30% on the net annual value (rent received minus municipal taxes paid) for repairs and maintenance, regardless of your actual expenses. Interest paid on a home loan for that property is also deductible.',
            },
            {
              id: "faq2",
              q: "Can I claim HRA and home loan tax benefits at the same time?",
              a: "Yes, it is possible. You can claim HRA (House Rent Allowance) if you are living in a rented accommodation in the same city where you work. You can simultaneously claim home loan tax benefits (for principal and interest) if you own a property in a different city, or if you own a property in the same city but are renting for a genuine reason (e.g., workplace is far from your owned home).",
            },
            {
              id: "faq3",
              q: 'What is "indexation" in capital gains tax?',
              a: "Indexation is a process that adjusts the purchase price of your property to account for inflation. This increases your cost base and reduces your overall profit, thereby lowering your Long-Term Capital Gains (LTCG) tax liability. This benefit is only available for long-term assets (property held for more than 24 months).",
            },
            {
              id: "faq4",
              q: "What happens if I sell a property at a loss?",
              a: "A loss from the sale of a property is a capital loss. A short-term capital loss can be set off against any capital gains (short-term or long-term). A long-term capital loss can only be set off against long-term capital gains. Unused losses can be carried forward for up to 8 assessment years.",
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

export default RealEstateTaxInvestmentPlanning;
