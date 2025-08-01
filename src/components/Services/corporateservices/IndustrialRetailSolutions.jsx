import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiEdit,
  FiChevronDown,
  FiMapPin,
  FiBox,
  FiShoppingBag,
  FiTool,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

const CommercialSpaceSolutions = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    contact: "",
    propertyType: "",
    location: "",
    sizeRequirement: "",
    purpose: "",
    notes: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🗂️ Commercial Space Inquiry Submitted:", formData);
    toast.success(
      "Your inquiry has been submitted! Our commercial property team will contact you shortly.",
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
      company: "",
      email: "",
      contact: "",
      propertyType: "",
      location: "",
      sizeRequirement: "",
      purpose: "",
      notes: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const services = [
    {
      icon: FiBox,
      title: "Warehousing & Logistics",
      description:
        "Grade-A warehouses and logistics hubs near major transport corridors.",
    },
    {
      icon: FiShoppingBag,
      title: "High-Street Retail",
      description:
        "Prime retail showrooms and stores in high-footfall commercial areas.",
    },
    {
      icon: FiTool,
      title: "Industrial & Manufacturing",
      description:
        "Industrial sheds, plots, and manufacturing units in designated zones.",
    },
    {
      icon: FaBuilding,
      title: "Corporate Office Spaces",
      description:
        "Furnished and unfurnished office spaces for lease or purchase.",
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
            Commercial & Industrial Properties
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Your strategic partner in securing industrial, retail, and warehouse
            properties that align with your business operations and growth.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Specializations
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

        {/* --- NEW SECTION: Commercial Hotspots --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Hyderabad's Commercial & Industrial Hotspots
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Warehousing & Logistics
              </h3>
              <p className="text-orange-400 font-semibold mb-3">
                Patancheru, Medchal, Shamshabad
              </p>
              <p className="text-base text-gray-400">
                Prime zones along the Outer Ring Road, ideal for supply chain
                and e-commerce operations.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Retail & Showrooms
              </h3>
              <p className="text-orange-400 font-semibold mb-3">
                Banjara Hills, Jubilee Hills, Hitech City
              </p>
              <p className="text-base text-gray-400">
                High-street locations with maximum footfall and brand visibility
                for retail businesses.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Industrial & Manufacturing
              </h3>
              <p className="text-orange-400 font-semibold mb-3">
                Jeedimetla, Balanagar, Cherlapally
              </p>
              <p className="text-base text-gray-400">
                Established industrial areas with robust infrastructure for
                manufacturing and assembly units.
              </p>
            </div>
          </div>
        </section>

        {/* --- Our Process as a Timeline --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our 4-Step Site Selection Process
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-orange-500/30 pl-12 space-y-12">
              {[
                [
                  "Requirement Analysis",
                  "We conduct an in-depth analysis of your business needs, supply chain, and operational workflow.",
                ],
                [
                  "Site Sourcing & Shortlisting",
                  "Leveraging our network, we present a curated list of on-market and off-market properties.",
                ],
                [
                  "Due Diligence",
                  "We verify zoning, compliance, power/water access, and legal titles for all shortlisted properties.",
                ],
                [
                  "Negotiation & Closure",
                  "Our team negotiates the best possible lease/sale terms and provides end-to-end assistance with paperwork.",
                ],
              ].map(([title, desc], i) => (
                <div key={i} className="relative">
                  <div className="absolute flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full -left-[64px] ring-4 ring-gray-900 border-2 border-orange-500/50">
                    <span className="text-orange-400 font-bold text-lg">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <p className="text-gray-400 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Find Your Commercial Space
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Tell us your requirements, and our specialists will provide a
            curated list of properties that match your business needs.
          </p>
          <form
            onSubmit={handleSubmit}
            className="text-left bg-gray-800 rounded-2xl p-8 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Your Name *
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
                  placeholder="e.g., John Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Company Name *
              </label>
              <div className="relative">
                <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., Acme Corp"
                />
              </div>
            </div>
            <div>
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
                Phone Number *
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
                  <option value="Warehouse">Warehouse</option>
                  <option value="Retail Space">Retail Space</option>
                  <option value="Cold Storage">Cold Storage</option>
                  <option value="Manufacturing Unit">Manufacturing Unit</option>
                  <option value="Industrial Plot">Industrial Plot</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Preferred Location *
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., Patancheru, Medchal"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Size (sq. ft.) *
              </label>
              <div className="relative">
                <FiBox className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="sizeRequirement"
                  value={formData.sizeRequirement}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., 50000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Purpose of Use
              </label>
              <div className="relative">
                <FiTool className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  placeholder="e.g. Storage, Retail"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Additional Notes
              </label>
              <div className="relative">
                <FiEdit className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., Need high ceilings, specific power load, road access..."
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Get My Property Options
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Commercial Real Estate FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "What are the typical lease terms for commercial properties in Hyderabad?",
              a: "Commercial leases are typically long-term, ranging from 3 to 9 years. They often include a lock-in period (usually 1-3 years) and a rent escalation clause that increases the rent by a certain percentage (e.g., 5%) every year.",
            },
            {
              id: "faq2",
              q: "Do I need a trade license before leasing a retail space?",
              a: "Yes, a trade license from the GHMC (Greater Hyderabad Municipal Corporation) is mandatory to operate any business from a commercial property. We can guide you on the application process as part of our services.",
            },
            {
              id: "faq3",
              q: "What is the difference between Grade A and Grade B warehouse facilities?",
              a: "Grade A warehouses are modern facilities with high ceilings (30+ ft), flat concrete floors, automated docking bays, and fire safety systems, located in prime logistics parks. Grade B facilities are typically older, smaller, and have fewer modern amenities.",
            },
            {
              id: "faq4",
              q: "Are there any government incentives for setting up manufacturing units?",
              a: "Yes, the Telangana government offers various incentives under its TS-iPASS policy for new industries, including investment subsidies, power cost reimbursement, and tax benefits, especially for units set up in designated industrial parks.",
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

export default CommercialSpaceSolutions;
