import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUser, FiMail, FiPhone, FiMapPin, FiFileText, FiCheckCircle, FiChevronDown, FiArrowRight } from 'react-icons/fi';

const LegalAssistance = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceRequired: '',
    propertyLocation: '',
  });
  const [activeAccordion, setActiveAccordion] = useState('collapse1');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📝 Legal Assistance Request:", formData);
    toast.success("Your request has been submitted. Our legal team will contact you shortly.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceRequired: '',
      propertyLocation: '',
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-500 flex items-center justify-center">
            <FiFileText className="mr-2" /> Legal & Documentation Assistance
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Navigate property paperwork with confidence. Our expert legal team ensures seamless agreements, title checks, and compliance for worry-free transactions.
          </p>
        </div>

        {/* What We Help With Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiCheckCircle className="mr-2" /> What We Help With
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Sale Agreements</h3>
              <p className="text-gray-300 text-sm mt-2">
                Drafting and verifying robust sale agreements to protect your interests.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Title Due Diligence</h3>
              <p className="text-gray-300 text-sm mt-2">
                Thorough checks to ensure clear ownership and no encumbrances.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Registration & NOCs</h3>
              <p className="text-gray-300 text-sm mt-2">
                Handling registration, stamp duty, and government approvals seamlessly.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">POA & Affidavits</h3>
              <p className="text-gray-300 text-sm mt-2">
                Assistance with Power of Attorney and affidavit documentation.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Dispute Representation</h3>
              <p className="text-gray-300 text-sm mt-2">
                Expert legal support for property disputes or litigation.
              </p>
            </div>
          </div>
        </section>

        {/* Why Legal Assistance Is Critical Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiFileText className="mr-2" /> Why Legal Assistance Is Critical
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Prevent Fraud</h3>
              <p className="text-gray-300 text-sm mt-2">
                Avoid frauds, forgeries, or hidden liabilities with thorough checks.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Ensure Validity</h3>
              <p className="text-gray-300 text-sm mt-2">
                Confirm 100% valid ownership and documentation for peace of mind.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Avoid Delays</h3>
              <p className="text-gray-300 text-sm mt-2">
                Prevent legal hurdles that could delay property resale or rentals.
              </p>
            </div>
          </div>
        </section>

        {/* Legal Assistance Form Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiArrowRight className="mr-2" /> Talk to Our Legal Experts
          </h2>
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                <div className="relative">
                  <FiUser className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <div className="relative">
                  <FiMail className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                <div className="relative">
                  <FiPhone className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location of Property *</label>
                <div className="relative">
                  <FiMapPin className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="propertyLocation"
                    value={formData.propertyLocation}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter property location"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">What Help Do You Need? *</label>
                <select
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="">-- Select --</option>
                  <option value="Sale Agreement">Sale Agreement Draft/Review</option>
                  <option value="Title Check">Title Verification</option>
                  <option value="Registration">Registration & Stamp Duty</option>
                  <option value="NOCs">NOC or Govt Approvals</option>
                  <option value="Representation">Legal Dispute Representation</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button
                type="submit"
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center"
              >
                <FiArrowRight className="mr-2" /> Speak to Our Legal Team
              </button>
            </div>
          </form>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiCheckCircle className="mr-2" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                id: 'collapse1',
                question: 'Is title verification mandatory before purchase?',
                answer: 'Absolutely. It ensures the seller has legal ownership and the property is free of any disputes or liabilities.',
              },
              {
                id: 'collapse2',
                question: 'Can I do registration without a lawyer?',
                answer: 'Technically yes, but a legal review ensures all clauses are correct and no rights are waived inadvertently.',
              },
              {
                id: 'collapse3',
                question: 'Do you provide services PAN India?',
                answer: 'Yes, we have legal partners and associates across major metros and Tier 2 cities in India.',
              },
            ].map((faq) => (
              <div key={faq.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-700 hover:bg-gray-600 transition-colors"
                  onClick={() => toggleAccordion(faq.id)}
                >
                  <span className="text-orange-300 font-medium">{faq.question}</span>
                  <FiChevronDown
                    className={`text-orange-500 transform transition-transform ${activeAccordion === faq.id ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`px-6 py-4 text-gray-300 text-sm transition-all duration-300 ${activeAccordion === faq.id ? 'block' : 'hidden'
                    }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LegalAssistance;