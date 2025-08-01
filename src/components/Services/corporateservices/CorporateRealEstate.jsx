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
  FiUsers,
  FiBox,
  FiAward,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

const OfficeSpaceLeasing = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    contact: "",
    spaceType: "",
    location: "",
    teamSize: "",
    notes: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📨 Office Space Leasing Request:", formData);
    toast.success(
      "Your request has been submitted. Our commercial leasing team will contact you shortly!",
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
      spaceType: "",
      location: "",
      teamSize: "",
      notes: "",
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
            Office Space Leasing & Relocation
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Find the perfect workspace that fuels productivity and supports your
            team’s growth. We handle the entire process, from search to setup.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Find Your Ideal Workspace
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <FiHome className="text-orange-400 text-4xl mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Private Offices
              </h3>
              <p className="text-gray-400">
                Secure, dedicated spaces for teams of all sizes, from startups
                to enterprise headquarters.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <FiUsers className="text-orange-400 text-4xl mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Co-working Spaces
              </h3>
              <p className="text-gray-400">
                Flexible and cost-effective desks or cabins in a collaborative,
                professional environment.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <FiBox className="text-orange-400 text-4xl mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Custom-Built Offices
              </h3>
              <p className="text-gray-400">
                We design and build a bespoke office that reflects your
                company's brand, culture, and unique workflow.
              </p>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: Business Districts --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Hyderabad's Premier Business Districts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Hitech City & Madhapur
              </h3>
              <p className="text-base text-gray-400">
                The epicenter of Hyderabad's IT industry, offering Grade-A
                office buildings and sprawling tech parks.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Gachibowli Financial District
              </h3>
              <p className="text-base text-gray-400">
                Home to major multinational corporations, financial
                institutions, and the city's most iconic commercial towers.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Banjara & Jubilee Hills
              </h3>
              <p className="text-base text-gray-400">
                Premium boutique office spaces and prestigious commercial
                addresses in upscale, central locations.
              </p>
            </div>
          </div>
        </section>

        {/* --- Relocation Process as a Timeline --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our End-to-End Relocation Process
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-orange-500/30 pl-12 space-y-12">
              {[
                [
                  "Consultation & Needs Assessment",
                  "We begin by understanding your team size, budget, workflow, and specific business requirements.",
                ],
                [
                  "Property Search & Site Visits",
                  "We curate a shortlist of suitable properties and arrange site visits at your convenience.",
                ],
                [
                  "Lease Negotiation & Documentation",
                  "Our experts negotiate the best possible lease terms and handle all legal paperwork meticulously.",
                ],
                [
                  "Relocation & IT Setup",
                  "We coordinate with movers and IT vendors to ensure a smooth transition with minimal downtime.",
                ],
                [
                  "Post-Move Support",
                  "Our job isn't done until your team is settled in and fully operational in the new space.",
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
            Find Your Next Office Space
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Tell us what you need, and our corporate leasing specialists will
            provide a curated list of properties tailored to your business.
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
                  placeholder="Your Name"
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
                  placeholder="Your Company's Name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email *
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
                  placeholder="your.email@company.com"
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
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Office Type *
              </label>
              <div className="relative">
                <FiAward className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="spaceType"
                  value={formData.spaceType}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select --</option>
                  <option value="Furnished Office">Furnished Office</option>
                  <option value="Unfurnished Office">Unfurnished Office</option>
                  <option value="Co-Working Space">Co-Working Space</option>
                  <option value="Shared Office">Shared Office</option>
                  <option value="Custom Setup">Custom Setup</option>
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
                  placeholder="e.g., Hitech City, Gachibowli"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Team Size (No. of Seats) *
              </label>
              <div className="relative">
                <FiUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., 50"
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
                  placeholder="e.g., Need a conference room, pantry, specific IT requirements..."
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Find My Office Space
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Office Leasing FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "What are the average commercial rent prices in Hitech City?",
              a: "As of mid-2025, Grade-A office space rents in prime areas of Hitech City and Gachibowli typically range from ₹70 to ₹95 per square foot per month. Prices vary based on the building's age, amenities, and exact location.",
            },
            {
              id: "faq2",
              q: "What is the difference between a 'warm shell' and a 'fully furnished' office?",
              a: "A 'warm shell' office typically comes with basic finishes like flooring, ceilings, and AC ducting, but no furniture or partitions. A 'fully furnished' office is a plug-and-play solution with workstations, cabins, conference rooms, and a pantry already set up.",
            },
            {
              id: "faq3",
              q: "What is the standard lock-in period for a commercial lease?",
              a: "For traditional office leases in Hyderabad, a lock-in period of 3 years is standard for a 5-year lease term. Co-working spaces offer much more flexibility, with options for monthly or even daily passes and no long-term lock-in.",
            },
            {
              id: "faq4",
              q: "What is an SEZ, and are there benefits to leasing an office in one?",
              a: "An SEZ (Special Economic Zone) is a designated area with business and trade laws that differ from the rest of the country. Companies in SEZs, particularly in the IT sector, can avail benefits like tax exemptions and other government incentives, making it a cost-effective option for eligible businesses.",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center bg-gray-700 hover:bg-gray-600 transition-colors"
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
                <div className="px-6 pb-5 pt-2 text-base text-gray-300">
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

export default OfficeSpaceLeasing;
