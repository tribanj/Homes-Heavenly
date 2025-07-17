import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUser, FiMail, FiPhone, FiHome, FiMapPin, FiCheckCircle, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { FaRuler } from 'react-icons/fa';
const FreeValuation = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyType: '',
    location: '',
    propertySize: '',
  });
  const [activeAccordion, setActiveAccordion] = useState('collapseOne');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Valuation Request:", formData);
    toast.success('Your free valuation request has been submitted!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      propertyType: '',
      location: '',
      propertySize: '',
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
            <FaRuler className="mr-2" /> Free Property Valuation & Appraisal
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Discover your property’s true market value with our professional, no-cost appraisal. Perfect for sellers, landlords, or investors making informed decisions.
          </p>
        </div>

        {/* What You Get Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiCheckCircle className="mr-2" /> What You Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Accurate Market Value</h3>
              <p className="text-gray-300 text-sm mt-2">
                Precise valuation based on current market trends and property specifics.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Competitor Analysis</h3>
              <p className="text-gray-300 text-sm mt-2">
                Insights into local price trends and comparable property sales.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Expert Consultation</h3>
              <p className="text-gray-300 text-sm mt-2">
                No-obligation discussion with our local valuation experts.
              </p>
            </div>
          </div>
        </section>

        {/* Why Get a Valuation Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiHome className="mr-2" /> Why Get a Valuation?
          </h2>
          <p className="text-gray-300 text-sm bg-gray-800 p-6 rounded-xl shadow-lg">
            Whether you're planning to sell, rent, or invest, understanding your property’s market value empowers you to make strategic decisions. Our experts analyze recent sales, neighborhood trends, and your property’s unique features to provide a comprehensive valuation report.
          </p>
        </section>

        {/* Sample Report Preview Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FaRuler className="mr-2" /> Sample Report Preview
          </h2>
          <div className="relative group overflow-hidden rounded-xl shadow-lg">
            <img
              src="https://via.placeholder.com/700x300?text=Valuation+Report+Preview"
              alt="Sample Valuation Report"
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-4">
              <p className="text-orange-300 font-medium">Detailed Valuation Report Example</p>
            </div>
          </div>
        </section>

        {/* Valuation Form Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FaRuler className="mr-2" /> Get Your Free Valuation
          </h2>
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                <div className="relative">
                  <FiUser className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Property Type *</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="">Choose...</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land">Land / Plot</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
                <div className="relative">
                  <FiMapPin className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter property location"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Property Size (sq.ft) *</label>
                <div className="relative">
                  <FaRuler className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="number"
                    name="propertySize"
                    value={formData.propertySize}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter property size"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button
                type="submit"
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center"
              >
                <FiArrowRight className="mr-2" /> Request Valuation
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
                id: 'collapseOne',
                question: 'How long does it take to get a valuation?',
                answer: 'Usually within 24-48 hours, depending on location and complexity.',
              },
              {
                id: 'collapseTwo',
                question: 'Is this really free?',
                answer: 'Yes, there are no charges or obligations involved.',
              },
              {
                id: 'collapseThree',
                question: 'Do you offer in-person visits?',
                answer: 'Yes, in-person or virtual assessments are available based on your preference.',
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

export default FreeValuation;