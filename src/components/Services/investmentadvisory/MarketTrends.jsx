import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiChevronDown,
  FiDatabase,
  FiBarChart2,
  FiCpu,
  FiUsers,
} from "react-icons/fi";

const MarketTrendsForecasting = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    preferredLocation: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "📩 Market Trends & Price Forecasting Request Submitted:",
      formData
    );
    toast.success(
      "Your request for market insights has been received! We'll send the report to your email.",
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
      preferredLocation: "",
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
            Market Trends & Price Forecasting
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Make data-driven investment decisions with our AI-powered real
            estate analytics for the Hyderabad market.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Actionable Insights for Smart Investors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FiBarChart2 className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">Price Indices</h3>
              <p className="text-gray-400 mt-2">
                Track micro-market price movements over time.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FiMapPin className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                Investment Hotspots
              </h3>
              <p className="text-gray-400 mt-2">
                Identify high-growth corridors using predictive heatmaps.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FiCpu className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                AI-Powered Forecasts
              </h3>
              <p className="text-gray-400 mt-2">
                Get future price projections based on historical data and
                trends.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FiUsers className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                Custom Investor Briefs
              </h3>
              <p className="text-gray-400 mt-2">
                Receive tailored reports that match your specific investment
                goals.
              </p>
            </div>
          </div>
        </section>

        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Hyderabad Real Estate Snapshot: Q3 2025
          </h2>
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl p-8 border border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-green-400">+12.5%</p>
              <p className="text-gray-400 mt-1">Price Growth YoY (West Hyd)</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-400">3.8%</p>
              <p className="text-gray-400 mt-1">
                Average Rental Yield (IT Corridor)
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">Plots</p>
              <p className="text-gray-400 mt-1">Top Performing Asset Class</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400">Positive</p>
              <p className="text-gray-400 mt-1">Market Outlook for 2026</p>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            *Data is illustrative. Request a report for the latest figures.
          </p>
        </section>

        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Data-Driven Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <FiDatabase className="text-orange-400 mb-4" size={40} />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Registry Data Analysis
              </h3>
              <p className="text-base text-gray-400">
                We analyze transactional data from official government sources
                like the Dharani portal to track actual price movements and sale
                volumes.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <FiBarChart2 className="text-orange-400 mb-4" size={40} />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Macroeconomic Indicators
              </h3>
              <p className="text-base text-gray-400">
                Our predictive models incorporate key indicators like
                infrastructure spending, inflation, and IT sector growth to
                forecast future trends.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <FiUsers className="text-orange-400 mb-4" size={40} />
              <h3 className="text-2xl font-semibold text-white mb-2">
                On-Ground Intelligence
              </h3>
              <p className="text-base text-gray-400">
                Our extensive local network provides invaluable insights into
                micro-market sentiments and upcoming project launches before
                they become public knowledge.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Get Your Personalized Market Report
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Request a free report for any location in Hyderabad. Our team will
            compile the latest data and send it to your inbox.
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
                Location of Interest *
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., Shankarpally, Kompally, etc."
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Get My Free Report
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Forecasting FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "Which areas in Hyderabad have the highest growth potential for 2026?",
              a: "Based on current infrastructure development and IT expansion, areas along the upcoming Regional Ring Road (RRR) and the western corridor (e.g., Tellapur, Mokila) show strong potential for capital appreciation. Our detailed reports provide micro-market analysis for specific recommendations.",
            },
            {
              id: "faq2",
              q: "How does the Regional Ring Road (RRR) project impact property prices?",
              a: "The RRR is a game-changer, significantly improving connectivity to satellite towns and industrial zones. Land and property values in areas near the RRR alignment are expected to see substantial long-term growth as the project progresses.",
            },
            {
              id: "faq3",
              q: "Are commercial or residential properties a better investment in Hyderabad right now?",
              a: "Both sectors are strong. Commercial properties, especially Grade-A office spaces in the IT corridor, offer stable rental yields. Residential properties, particularly plots and villas in emerging suburbs, show higher potential for capital gains. Your ideal choice depends on your investment goals and risk appetite.",
            },
            {
              id: "faq4",
              q: "How accurate are your price forecasts?",
              a: "Our forecasts are generated using a hybrid model that combines AI-driven analysis of historical data with expert human oversight. While no forecast is 100% guaranteed, our data-driven approach is designed to provide highly probable outcomes to guide your investment strategy effectively.",
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

export default MarketTrendsForecasting;
