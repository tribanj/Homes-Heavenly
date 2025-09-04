import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiHelpCircle,
  FiFileText,
  FiMessageSquare,
  FiChevronDown,
  FiSend,
  FiMail,
  FiTag,
} from "react-icons/fi";

const SupportHelpdesk = () => {
  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const faqs = [
    {
      id: "faq1",
      q: "How do I upload a new property listing?",
      a: 'Navigate to the "Manage Properties" tab and click the "Add New Listing" button. Fill out the required details and submit.',
    },
    {
      id: "faq2",
      q: "How can I update my agent profile?",
      a: 'Go to the "Profile & Settings" tab. You can update your basic information, upload new certifications, and change your password there.',
    },
    {
      id: "faq3",
      q: "How do I boost my listings to get more visibility?",
      a: 'In the "Marketing & Promotions" tab, you will find options to "Boost a Property". You can select a package that fits your needs.',
    },
    {
      id: "faq4",
      q: "Where can I track my commissions?",
      a: 'The "Commission & Earnings" tab provides a detailed breakdown of your closed deals, commission amounts, and payout statuses.',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Support & Helpdesk</h1>
        <p className="text-gray-500 mt-1">
          Find answers to your questions or get in touch with our support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: FAQs & Live Chat */}
        <div className="lg:col-span-2 space-y-8">
          {/* FAQs Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FiHelpCircle className="mr-3 text-orange-500" /> Frequently Asked
              Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border-b border-gray-200 last:border-b-0 pb-4"
                >
                  <button
                    className="w-full flex justify-between items-center text-left"
                    onClick={() => toggleAccordion(faq.id)}
                  >
                    <span className="font-semibold text-gray-700">{faq.q}</span>
                    <FiChevronDown
                      className={`transition-transform duration-300 ${
                        activeAccordion === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: activeAccordion === faq.id ? "auto" : 0,
                      opacity: activeAccordion === faq.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-2 text-gray-600">{faq.a}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Support Ticket Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl shadow-lg h-full">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Raise a Support Ticket
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <div className="relative">
                  <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter issue subject"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Your registered email"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    placeholder="Describe your issue in detail..."
                    rows="5"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg"
                  ></textarea>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                >
                  <FiSend className="mr-2" /> Submit Ticket
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Need Immediate Help?
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Our team is available for live chat.
              </p>
              <button className="w-full flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors">
                <FiMessageSquare className="mr-2" /> Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportHelpdesk;
