import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUser, FiMail, FiPhone, FiDollarSign, FiMapPin, FiCheckCircle, FiChevronDown, FiArrowRight, FiHome } from 'react-icons/fi';

const DistressedSales = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investmentBudget: '',
    preferredLocation: '',
  });
  const [activeAccordion, setActiveAccordion] = useState('collapse1');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📥 Distressed Sales Inquiry:", formData);
    toast.success('Your inquiry has been submitted!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnjonClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      investmentBudget: '',
      preferredLocation: '',
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
            <FiHome className="mr-2" /> Foreclosed & Distressed Sales
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Unlock incredible investment opportunities with verified foreclosed and distressed properties. Purchase below market value and maximize your ROI.
          </p>
        </div>

        {/* Why Choose Distressed Properties Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiCheckCircle className="mr-2" /> Why Choose Distressed Properties?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Below Market Value</h3>
              <p className="text-gray-300 text-sm mt-2">
                Purchase properties at 10–40% below market rates for exceptional value.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">High ROI Potential</h3>
              <p className="text-gray-300 text-sm mt-2">
                Renovate or resell for significant returns on your investment.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Quick Closing</h3>
              <p className="text-gray-300 text-sm mt-2">
                Fast transactions with motivated sellers or bank auctions.
              </p>
            </div>
          </div>
        </section>

        {/* Value-Add Services Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiCheckCircle className="mr-2" /> Our Value-Add Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Verified Listings</h3>
              <p className="text-gray-300 text-sm mt-2">
                Thoroughly vetted distressed properties for reliable investments.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Risk Analysis</h3>
              <p className="text-gray-300 text-sm mt-2">
                Detailed ROI forecasts and risk assessments for informed decisions.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Due Diligence</h3>
              <p className="text-gray-300 text-sm mt-2">
                Comprehensive legal and financial checks for peace of mind.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Listings Preview Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiHome className="mr-2" /> Featured Listings Preview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '2BHK, Bangalore', price: '₹45L', market: '₹62L', image: 'https://via.placeholder.com/300x180?text=Property+1' },
              { title: 'Plot, Pune', price: '₹22L', market: '₹30L', image: 'https://via.placeholder.com/300x180?text=Property+2' },
              { title: '3BHK Duplex, Hyderabad', price: '₹65L', market: '₹85L', image: 'https://via.placeholder.com/300x180?text=Property+3' },
            ].map((property, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-4">
                  <div>
                    <h3 className="text-orange-300 font-medium">{property.title}</h3>
                    <p className="text-gray-300 text-sm">Listed at {property.price} (Market: {property.market})</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-gray-400 text-sm">
            <em>*Full listings available after verification</em>
          </p>
        </section>

        {/* Legal & Financial Handling Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiCheckCircle className="mr-2" /> Legal & Financial Handling
          </h2>
          <p className="text-gray-300 text-sm bg-gray-800 p-6 rounded-xl shadow-lg mb-4">
            We prioritize legal clarity with thorough title verification, encumbrance checks, and due diligence by our expert legal team, ensuring secure investments.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✅</span> Clean title assurance for all properties
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✅</span> Support for bank auction processes
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✅</span> Loan processing assistance for investors
            </li>
          </ul>
        </section>

        {/* Submit Interest Form Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiArrowRight className="mr-2" /> Submit Your Interest
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Investment Budget (INR) *</label>
                <div className="relative">
                  <FiDollarSign className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="number"
                    name="investmentBudget"
                    value={formData.investmentBudget}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter your budget"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Location(s) *</label>
                <div className="relative">
                  <FiMapPin className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="text"
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter preferred locations"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button
                type="submit"
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center"
              >
                <FiArrowRight className="mr-2" /> Browse Verified Listings
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
                question: 'Are distressed sales legally safe?',
                answer: 'Yes, we ensure all documentation and ownership is legally verified before listing.',
              },
              {
                id: 'collapse2',
                question: 'Can I get a loan for these properties?',
                answer: 'Yes, we help you secure financing from banks familiar with auctioned/distressed property protocols.',
              },
              {
                id: 'collapse3',
                question: 'Do you charge brokerage or service fees?',
                answer: 'Our service fee varies depending on the deal structure and is disclosed transparently.',
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

export default DistressedSales;