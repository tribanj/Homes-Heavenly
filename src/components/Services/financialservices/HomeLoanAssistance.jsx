import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUser, FiPhone, FiMail, FiHome, FiDollarSign, FiFileText, FiInfo, FiArrowRight } from 'react-icons/fi';
import MortgagePropertyDetails from '../../PostProperty/Mortgage/MortgagePropertyDetails';

const HomeLoanMortgageAssistance = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    loanAmount: '',
    loanTenure: '',
    propertyType: '',
    assistanceType: 'Home Loan',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Loan/Mortgage Assistance Request Submitted:", formData);
    toast.success("Your request has been submitted successfully!", {
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
      contact: '',
      loanAmount: '',
      loanTenure: '',
      propertyType: '',
      assistanceType: 'Home Loan',
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-500 flex items-center justify-center">
            <FiHome className="mr-2" /> Home Loan & Mortgage Assistance
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Your trusted partner for home loans and property financing. Whether you're buying, refinancing, or leveraging your property, our experts are here to guide you.
          </p>
        </div>

        {/* Understand the Basics Section */}
        <section className="mb-12 bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-4">
            <FiInfo className="mr-2" /> Understand the Basics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Home Loan</h3>
              <p className="text-gray-300 text-sm mt-2">
                A loan to purchase or construct residential/commercial property, repaid over 10–30 years.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Mortgage Loan</h3>
              <p className="text-gray-300 text-sm mt-2">
                Pledge your property for funds to support business, education, or personal needs.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition-colors">
              <h3 className="text-lg font-medium text-orange-300">Balance Transfer</h3>
              <p className="text-gray-300 text-sm mt-2">
                Switch your loan to a lender with better rates and terms to save on EMIs.
              </p>
            </div>
          </div>
        </section>
        <MortgagePropertyDetails />
        {/* Form Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiFileText className="mr-2" /> Apply for Personalized Assistance
          </h2>
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Contact Number</label>
                <div className="relative">
                  <FiPhone className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter your contact number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="">Select Property Type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land">Land</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Loan Amount (₹)</label>
                <div className="relative">
                  <FiDollarSign className="absolute top-3 left-3 text-orange-500" />
                  <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    placeholder="Enter loan amount"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Loan Tenure (Years)</label>
                <input
                  type="number"
                  name="loanTenure"
                  value={formData.loanTenure}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="Enter loan tenure"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Assistance Type</label>
                <select
                  name="assistanceType"
                  value={formData.assistanceType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                >
                  <option value="Home Loan">Home Loan</option>
                  <option value="Mortgage Loan">Mortgage Loan</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
              >
                <FiArrowRight className="mr-2" /> Submit Request
              </button>
            </div>
          </form>
        </section>

        {/* Benefits & Details Sections */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiHome className="mr-2" /> Home Loan Benefits
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <li className="flex items-start"><span className="text-orange-500 mr-2">🔍</span> Top lenders with rates from 8.5% p.a.</li>
            <li className="flex items-start"><span className="text-orange-500 mr-2">📅</span> Flexible tenure: 5–30 years</li>
            <li className="flex items-start"><span className="text-orange-500 mr-2">🧾</span> Tax benefits under Sections 80C & 24(b)</li>
            <li className="flex items-start"><span className="text-orange-500 mr-2">✅</span> Support for salaried, self-employed, and NRIs</li>
            <li className="flex items-start"><span className="text-orange-500 mr-2">📝</span> Documentation: KYC, income proof, property docs</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiHome className="mr-2" /> Mortgage Loan (Loan Against Property)
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <li className="flex items-start"><span className="text-orange-500 mr-2">💰</span> Funds for business, education, or emergencies</li>
            <li className="flex items-start"><span className="text-orange-500 mr-2">🏛️</span> Continue using your property</li>
            <li className="flex items-start"><span className="text-orange-500 mr-2">📉</span> Rates from 9.25% p.a., lower than personal loans</li>
            <li className="flex items-start"><span className="text-orange-500 mr-2">🔍</span> Up to 70% of property’s market value</li>
            <li className="flex items-start"><span className="text-orange-500 mr-2">📜</span> Requires clear title, ownership documents</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiDollarSign className="mr-2" /> Balance Transfer & Refinance
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <li className="flex items-start"><span className="text-orange-500 mr-2">📉</span> Lower EMIs to reduce loan burden</li>
            <li className="flex items-start"><span className="text-orange-500 mr-2">⚡</span> Quick processing for eligible borrowers</li>
            <li className="flex items-start"><span className="text-orange-500 mr-2">💼</span> Better terms or top-up loans</li>
            <li className="flex items-start"><span className="text-orange-500 mr-2">📊</span> Advisory team to calculate savings</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiFileText className="mr-2" /> Step-by-Step Process
          </h2>
          <ol className="space-y-4 text-gray-300">
            <li className="flex items-start"><span className="text-orange-500 mr-2">1.</span> Consultation with our loan advisor</li>
            <li className="flex items-start"><span className="text-orange-500 mr-2">2.</span> Eligibility check & document collection</li>
            <li className="flex items-start"><span className="text-orange-500 mr-2">3.</span> Lender selection & loan offer comparison</li>
            <li className="flex items-start"><span className="text-orange-500 mr-2">4.</span> Application submission & approval tracking</li>
            <li className="flex items-start"><span className="text-orange-500 mr-2">5.</span> Disbursement and legal registration</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-400 flex items-center mb-6">
            <FiInfo className="mr-2" /> Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="text-orange-300 font-medium">Can I get a home loan without a co-applicant?</p>
              <p className="text-gray-300 text-sm mt-2">Yes, but a co-applicant improves eligibility and approval chances.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="text-orange-300 font-medium">What is the maximum tenure for a mortgage loan?</p>
              <p className="text-gray-300 text-sm mt-2">Generally 15–20 years, depending on the lender and applicant profile.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="text-orange-300 font-medium">Do I need insurance for a home loan?</p>
              <p className="text-gray-300 text-sm mt-2">It’s optional, but property or loan insurance is often recommended.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeLoanMortgageAssistance;