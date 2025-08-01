import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiDollarSign,
  FiTrendingUp,
  FiMap,
  FiChevronDown,
  FiBriefcase,
  FiBarChart2,
  FiShield,
} from "react-icons/fi";

const InvestmentPlanning = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    investmentGoal: "",
    budget: "",
    timeline: "",
    assetPreference: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Investment Plan Inquiry Submitted:", formData);
    toast.success(
      "Your investment planning request has been received! Our advisors will contact you shortly.",
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
      investmentGoal: "",
      budget: "",
      timeline: "",
      assetPreference: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const services = [
    {
      icon: FiMap,
      title: "Customized Roadmap",
      description:
        "A personalized investment plan based on your financial goals and risk appetite.",
    },
    {
      icon: FiBarChart2,
      title: "Data-Driven ROI",
      description:
        "Realistic ROI and cash flow projections based on current Hyderabad market data.",
    },
    {
      icon: FiShield,
      title: "Risk Analysis",
      description:
        "Comprehensive risk assessment and diversification strategies to protect your capital.",
    },
    {
      icon: FiBriefcase,
      title: "Exclusive Access",
      description:
        "Opportunities in pre-launch projects, distressed sales, and off-market deals.",
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
            Real Estate Investment Planning
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Build wealth through strategic property investments in Hyderabad.
            Our data-driven approach helps you make confident, profitable
            decisions.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Your Partner in Wealth Creation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 text-center"
              >
                <service.icon
                  className="text-orange-400 mb-4 mx-auto"
                  size={40}
                />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-base text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- NEW SECTION: Investment Hotspots --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Spotlight on Hyderabad's Investment Hotspots
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                IT Corridor
              </h3>
              <p className="text-orange-400 font-semibold mb-3">
                Hitech City, Gachibowli, Madhapur
              </p>
              <p className="text-base text-gray-400">
                High rental demand from a large IT workforce ensures consistent
                rental yields and strong capital appreciation.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Growth Corridors
              </h3>
              <p className="text-orange-400 font-semibold mb-3">
                Airport Corridor, Pharma City
              </p>
              <p className="text-base text-gray-400">
                Long-term investment potential driven by massive government and
                private sector infrastructure projects.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Emerging Hubs
              </h3>
              <p className="text-orange-400 font-semibold mb-3">
                Kompally, Tellapur, Shankarpally
              </p>
              <p className="text-base text-gray-400">
                Developing residential areas offering greater affordability and
                significant future growth prospects.
              </p>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: Advisory Process --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-4">
            Our 4-Step Advisory Process
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            A structured approach to building your real estate portfolio.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>1</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Goal Discovery
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We understand your financial goals, risk appetite, and
                investment timeline.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>2</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Market Strategy
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We analyze market trends to identify high-potential zones and
                asset types.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>3</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Curated Options
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We present a shortlist of vetted investment properties that
                match your profile.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <h3>4</h3>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Execution & Growth
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We assist with acquisition and provide ongoing performance
                reviews.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Start Building Your Investment Portfolio
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Request a free, no-obligation consultation with our real estate
            investment advisors today.
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
                Primary Investment Goal *
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
                  <option value="">-- Select Goal --</option>
                  <option value="Capital Appreciation">
                    Capital Appreciation
                  </option>
                  <option value="Rental Income">Rental Income</option>
                  <option value="Flip & Resell">Flip & Resell</option>
                  <option value="Diversified Portfolio">
                    Diversified Portfolio
                  </option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Investment Budget *
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., ₹50 Lakhs - ₹1 Cr"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Investment Timeline *
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select Timeline --</option>
                  <option value="Immediate (0–3 months)">
                    Immediate (0–3 months)
                  </option>
                  <option value="Short Term (3–12 months)">
                    Short Term (3–12 months)
                  </option>
                  <option value="Long Term (1+ years)">
                    Long Term (1+ years)
                  </option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Preferred Asset Types *
              </label>
              <div className="relative">
                <FiMap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="assetPreference"
                  value={formData.assetPreference}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., Plots, Apartments, Commercial"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Request My Free Consultation
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
              q: "What is a realistic ROI to expect from property in Hyderabad?",
              a: "This varies by location and property type. Rental yields in prime residential areas typically range from 2.5% to 4% annually. Capital appreciation, especially in developing corridors, has historically been much higher, often ranging from 8% to 15% per annum over the long term.",
            },
            {
              id: "faq2",
              q: "Is it better to invest in plots or apartments in Hyderabad right now?",
              a: "Both have their merits. Apartments in areas like the IT Corridor offer immediate rental income. Plots, especially in government-approved layouts in growth corridors (like near the ORR or new SEZs), offer higher potential for long-term capital appreciation but no rental income.",
            },
            {
              id: "faq3",
              q: "What are the key legal checks before buying a property?",
              a: "The most critical checks include a Title Deed verification to confirm ownership, an Encumbrance Certificate (EC) to check for any legal dues or mortgages, and ensuring the layout and building plans have approvals from HMDA/GHMC.",
            },
            {
              id: "faq4",
              q: "Do you assist with property loans and legal paperwork?",
              a: "Yes. As part of our service, we connect you with our trusted partners in banking for hassle-free loan processing and with our legal team for thorough due diligence and registration assistance.",
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

export default InvestmentPlanning;
