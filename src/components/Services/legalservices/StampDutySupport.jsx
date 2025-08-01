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
  FiFileText,
  FiDollarSign,
  FiAward,
} from "react-icons/fi";
import { FaStamp } from "react-icons/fa";

const StampDutyRegistrationSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    propertyValue: "",
    location: "Hyderabad, Telangana",
    serviceNeeded: "",
    notes: "",
  });
  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📄 Registration Request Submitted:", formData);
    toast.success(
      "Your request has been received. Our legal team will get back to you shortly.",
      {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      }
    );
    setFormData({
      name: "",
      email: "",
      phone: "",
      propertyType: "",
      propertyValue: "",
      location: "Hyderabad, Telangana",
      serviceNeeded: "",
      notes: "",
    });
  };

  const toggleAccordion = (id) =>
    setActiveAccordion(activeAccordion === id ? null : id);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-8 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 mb-4">
            Stamp Duty & Property Registration
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Ensure your property transaction is legally secure. We provide
            end-to-end assistance with stamp duty payment and registration.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* --- NEW SECTION: Understanding the Costs --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Understanding the Costs in Telangana
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <p className="text-4xl font-bold text-orange-400">4%</p>
              <p className="text-lg text-white mt-2">Stamp Duty</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <p className="text-4xl font-bold text-orange-400">1.5%</p>
              <p className="text-lg text-white mt-2">Transfer Duty</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              <p className="text-4xl font-bold text-orange-400">0.5%</p>
              <p className="text-lg text-white mt-2">Registration Fee</p>
            </div>
          </div>
          <p className="text-center text-2xl font-bold text-white mt-8">
            Total: <span className="text-green-400">6%</span> of Property Market
            Value
          </p>
          <p className="text-center text-gray-500 text-sm mt-2">
            *Rates are subject to change as per government regulations.
            Additional cess may apply.
          </p>
        </section>

        {/* --- Our Process as a Timeline --- */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Registration Process - Simplified
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-orange-500/30 pl-12 space-y-12">
              {[
                [
                  "Document Drafting",
                  "Our legal team prepares the final, error-free Sale Deed and other necessary documents.",
                ],
                [
                  "Fee Payment & E-Stamping",
                  "We accurately calculate and facilitate the online payment of stamp duty and registration fees.",
                ],
                [
                  "SRO Slot Booking",
                  "We book a convenient appointment slot for you at the appropriate Sub-Registrar Office (SRO).",
                ],
                [
                  "Biometric Verification",
                  "We guide you through the process of physical verification for the buyer, seller, and witnesses at the SRO.",
                ],
                [
                  "Final Registration",
                  "Our representative ensures the document is officially registered and provides you with the registered copy.",
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
            Request Registration Support
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let our experts handle the complexities of property registration for
            you. Fill out the form for a free consultation and quote.
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Your 10-digit mobile number"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Property Value (₹) *
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="propertyValue"
                  value={formData.propertyValue}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., 5000000"
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
                  <option value="Land/Plot">Land / Plot</option>
                  <option value="Industrial">Industrial</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Service Needed *
              </label>
              <div className="relative">
                <FaStamp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="serviceNeeded"
                  value={formData.serviceNeeded}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select --</option>
                  <option value="Stamp Duty Calculation">
                    Stamp Duty Calculation
                  </option>
                  <option value="Sale Deed Drafting">Sale Deed Drafting</option>
                  <option value="Full Registration Support">
                    Full Registration Support
                  </option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Property Location *
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
                  placeholder="e.g., Hyderabad, Telangana"
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
                  placeholder="e.g., Property is a resale, it's a gift deed..."
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Book Registration Support
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Registration FAQs
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "How is the market value of a property determined for stamp duty?",
              a: 'The stamp duty is calculated on the government\'s "guideline value" (also known as circle rate or registration value) or the actual sale price, whichever is higher. The guideline value is the minimum price at which a property can be registered in a particular locality.',
            },
            {
              id: "faq2",
              q: "What is the Dharani portal and how is it used for registration?",
              a: "Dharani is the official integrated land records portal for Telangana. For agricultural land, registration is now done exclusively through the Dharani portal. For non-agricultural properties, it is used for verifying land records before proceeding with registration at the Sub-Registrar Office (SRO).",
            },
            {
              id: "faq3",
              q: "Is the physical presence of both buyer and seller mandatory at the SRO?",
              a: "Yes, for property registration in Telangana, the physical presence of the buyer(s), seller(s), and at least two witnesses is mandatory at the Sub-Registrar Office for biometric verification and photographs.",
            },
            {
              id: "faq4",
              q: "What happens after the property is registered?",
              a: "Once the registration is complete, the SRO provides a receipt. The registered Sale Deed document can typically be downloaded online after a few days. It is also crucial to apply for mutation of the property in your name in the municipal (GHMC) and revenue records to update the ownership.",
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

export default StampDutyRegistrationSupport;
