import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiDollarSign,
  FiMapPin,
  FiChevronDown,
  FiShield,
  FiFileText,
  FiTrendingUp,
  FiCheckSquare,
} from "react-icons/fi";
import { FaTractor, FaMountain, FaRoad, FaChartLine } from "react-icons/fa";

const LandInvestment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    investmentGoal: "",
    landPreference: "",
    budget: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Land Investment Request Submitted:", formData);
    toast.success(
      "Your land investment request has been received! Our specialists will contact you shortly.",
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
      landPreference: "",
      budget: "",
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
            Land & Plot Investments
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Secure your future with tangible assets. We provide expert guidance
            for investing in plots and land in Hyderabad's fastest-growing
            corridors.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Why Invest in Land?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FaChartLine className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                High Appreciation
              </h3>
              <p className="text-gray-400 mt-2">
                Benefit from significant long-term value growth in developing
                areas.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FaMountain className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">Tangible Asset</h3>
              <p className="text-gray-400 mt-2">
                Own a finite resource that provides a secure foundation for your
                portfolio.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FiShield className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">Low Maintenance</h3>
              <p className="text-gray-400 mt-2">
                Enjoy fewer overheads and maintenance costs compared to built
                properties.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <FaRoad className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                Future Development
              </h3>
              <p className="text-gray-400 mt-2">
                Flexibility to build, farm, or develop your property as the
                market evolves.
              </p>
            </div>
          </div>
        </section>

        <section className="my-20 bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Ironclad Due Diligence Checklist
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex items-start">
              <FiCheckSquare className="text-green-400 text-2xl mr-4 mt-1 shrink-0" />
              <span className="text-lg text-gray-300">
                Title Search & Encumbrance Certificate (EC) Verification
              </span>
            </div>
            <div className="flex items-start">
              <FiCheckSquare className="text-green-400 text-2xl mr-4 mt-1 shrink-0" />
              <span className="text-lg text-gray-300">
                Zoning & Land Use Conformity (Residential, GO 111, etc.)
              </span>
            </div>
            <div className="flex items-start">
              <FiCheckSquare className="text-green-400 text-2xl mr-4 mt-1 shrink-0" />
              <span className="text-lg text-gray-300">
                HMDA/DTCP Layout & LRS Approval Status
              </span>
            </div>
            <div className="flex items-start">
              <FiCheckSquare className="text-green-400 text-2xl mr-4 mt-1 shrink-0" />
              <span className="text-lg text-gray-300">
                Verification of Records on Telangana's Dharani Portal
              </span>
            </div>
            <div className="flex items-start">
              <FiCheckSquare className="text-green-400 text-2xl mr-4 mt-1 shrink-0" />
              <span className="text-lg text-gray-300">
                Physical Survey, Demarcation & Access Road Check
              </span>
            </div>
            <div className="flex items-start">
              <FiCheckSquare className="text-green-400 text-2xl mr-4 mt-1 shrink-0" />
              <span className="text-lg text-gray-300">
                Litigation & Local Body NOC Verification
              </span>
            </div>
          </div>
        </section>

        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Focus Areas for Land Investment in Hyderabad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                ORR Growth Corridors
              </h3>
              <p className="text-orange-400 font-semibold mb-3">
                Shankarpally, Mokila, Adibatla
              </p>
              <p className="text-base text-gray-400">
                High appreciation potential driven by proximity to the Outer
                Ring Road and major infrastructure projects.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Pharma & SEZ Hubs
              </h3>
              <p className="text-orange-400 font-semibold mb-3">
                Yacharam, Ibrahimpatnam
              </p>
              <p className="text-base text-gray-400">
                Long-term value driven by industrial growth, Pharma City, and
                other Special Economic Zones.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Gated Community Plots
              </h3>
              <p className="text-orange-400 font-semibold mb-3">
                Kompally, Medchal, Patancheru
              </p>
              <p className="text-base text-gray-400">
                Secure, ready-to-build options for investors looking for
                well-planned layouts with amenities.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Start Your Land Investment Journey
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Request a free consultation with our land investment specialists to
            explore verified and high-potential opportunities in Hyderabad.
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
                  <option value="">-- Select Goal --</option>
                  <option value="Build Property">Build a Home/Villa</option>
                  <option value="Resell for Profit">
                    Resell for Profit (Short-term)
                  </option>
                  <option value="Hold for Appreciation">
                    Hold for Appreciation (Long-term)
                  </option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Preferred Land Type *
              </label>
              <div className="relative">
                <FaTractor className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="landPreference"
                  value={formData.landPreference}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., Residential Plot, Agricultural Land"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Budget *
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
                  placeholder="e.g. ₹20 Lakhs - ₹50 Lakhs"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Request a Free Consultation
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Land Investment FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "What is the difference between HMDA and DTCP approval?",
              a: "HMDA (Hyderabad Metropolitan Development Authority) approval is for layouts within the Greater Hyderabad region. DTCP (Directorate of Town and Country Planning) is for areas outside of HMDA limits but within Telangana. Both are government bodies that ensure a plot layout adheres to legal and developmental norms.",
            },
            {
              id: "faq2",
              q: "What is GO 111 and how does it affect my investment?",
              a: "GO 111 is a Government Order that restricts heavy industrialization and development in the catchment areas of Himayat Sagar and Osman Sagar lakes to protect Hyderabad's drinking water. Investing in these zones carries risks and limitations, which is why our due diligence process is critical.",
            },
            {
              id: "faq3",
              q: "Can a non-farmer buy agricultural land in Telangana?",
              a: "Yes. As of the latest regulations following the introduction of the Dharani portal, there is no longer a requirement to be an agriculturist to purchase agricultural land in Telangana, opening up more investment opportunities.",
            },
            {
              id: "faq4",
              q: "How do I verify land records online in Telangana?",
              a: "Land records in Telangana can be verified through the government's official Dharani portal. Our team uses this portal extensively as part of our due diligence process to verify ownership, survey numbers, and transaction history.",
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

export default LandInvestment;
