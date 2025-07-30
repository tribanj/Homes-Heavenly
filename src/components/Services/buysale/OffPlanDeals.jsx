import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OffPlanDeals = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectInterested: "",
    message: "",
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsSnapshot = await getDocs(
          collection(db, "prelaunchProjects")
        );

        const projectsData = projectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching prelaunch projects:", error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleViewDetails = (projectId, prelaunchId) => {
    navigate(`/services/buysale/OffPlanDeals/${projectId}`);
    // console.log(prelaunchId)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save inquiry to Firebase
      await addDoc(collection(db, "prelaunchInquiries"), {
        ...formData,
        timestamp: new Date(),
        status: "new",
      });
      toast.success("Your inquiry has been submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectInterested: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("Failed to submit inquiry");
    }
  };

  const benefits = [
    {
      icon: "💰",
      title: "Lower Launch Price",
      description:
        "Get properties at pre-launch rates, typically 15-25% below market price",
    },
    {
      icon: "📈",
      title: "High Appreciation Potential",
      description:
        "Historical data shows 20-40% appreciation from launch to possession",
    },
    {
      icon: "🏗️",
      title: "Customization Options",
      description:
        "Choose layouts, finishes, and modifications during construction phase",
    },
    {
      icon: "🎯",
      title: "Best Unit Selection",
      description:
        "Priority access to premium floors, corners, and preferred orientations",
    },
  ];

  const documentation = [
    "RERA Registration Certificate",
    "Approved Building Plans",
    "Environmental Clearance (if applicable)",
    "Title Deeds & Chain of Ownership",
    "Commencement Certificate",
    "Project Approval from Local Authority",
    "Fire Safety NOC",
    "Water & Electricity Connection Approvals",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-8 px-4 text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">
            Off-Plan & Pre-Launch Property Deals
          </h1>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            Secure the future with smart investment choices. Be among the first
            to access exclusive properties still under development.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-amber-400">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              RERA Approved Projects
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Reputed Developers
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Bank Loan Approved
            </span>
          </div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto mb-16 px-4">
        <h2 className="text-2xl font-bold mb-6 text-amber-500 border-b border-amber-500 pb-2 inline-block">
          Why Invest in Off-Plan Properties?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-amber-500 transition-all text-center"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-bold text-amber-500 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-300 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-7xl mx-auto mb-16 px-4">
        <h2 className="text-2xl font-bold mb-6 text-amber-500 border-b border-amber-500 pb-2 inline-block">
          Current Pre-Launch Projects
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-xl p-4 animate-pulse h-96"
              ></div>
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-amber-500 transition-all"
              >
                <div className="h-48 bg-gray-700 overflow-hidden relative">
                  {project.imageUrls && project.imageUrls.length > 0 ? (
                    <img
                      src={project.imageUrls[0]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image Available
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                    RERA Approved
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-3 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {project.locality}, {project.city}
                  </p>
                  <p className="text-amber-500 font-bold mb-2">
                    {project.startPrice
                      ? `Starting from ₹${project.startPrice}`
                      : "Price on request"}
                  </p>
                  <p className="text-green-400 text-sm mb-3">
                    📈 Expected appreciation: 25-35%
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Possession: {project.completionDate || "To be announced"}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.configurations?.slice(0, 3).map((config, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                      >
                        {config}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md transition"
                      onClick={() =>
                        handleViewDetails(project.id, project.prelaunchId)
                      }
                    >
                      View Details
                    </button>
                    <button
                      className="bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-3 rounded-md transition"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          projectInterested: project.title,
                        }))
                      }
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
            <p className="text-gray-400 mb-4">
              No pre-launch projects available at the moment.
            </p>
            <p className="text-amber-500 text-sm">
              Register your interest below to get notified about upcoming
              launches
            </p>
          </div>
        )}
      </section>

      {/* Payment Plans */}
      <section className="max-w-7xl mx-auto mb-16 px-4">
        <h2 className="text-2xl font-bold mb-6 text-amber-500 border-b border-amber-500 pb-2 inline-block">
          Flexible Payment Plans
        </h2>
        <p className="text-gray-300 mb-6">
          Invest smartly with our developer-partnered financial plans designed
          for Indian market:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-amber-500 transition-all">
            <h3 className="text-xl font-bold text-amber-500 mb-3 flex items-center gap-2">
              <span>🏗️</span> 10-80-10 Plan
            </h3>
            <p className="text-gray-300 mb-2">
              Pay 10% now, 80% during construction, and 10% on possession.
            </p>
            <p className="text-sm text-green-400">
              Most popular construction-linked plan
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-amber-500 transition-all">
            <h3 className="text-xl font-bold text-amber-500 mb-3 flex items-center gap-2">
              <span>💸</span> Zero Pre-EMI
            </h3>
            <p className="text-gray-300 mb-2">
              No EMIs until you get your keys (available in select projects).
            </p>
            <p className="text-sm text-green-400">
              Save on interest during construction
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-amber-500 transition-all">
            <h3 className="text-xl font-bold text-amber-500 mb-3 flex items-center gap-2">
              <span>🏦</span> Bank-Approved Financing
            </h3>
            <p className="text-gray-300 mb-2">
              Tie-ups with SBI, HDFC, ICICI, Axis Bank and leading NBFCs for
              hassle-free loans.
            </p>
            <p className="text-sm text-green-400">Up to 90% loan available</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-amber-500 transition-all">
            <h3 className="text-xl font-bold text-amber-500 mb-3 flex items-center gap-2">
              <span>📋</span> Custom Schedule
            </h3>
            <p className="text-gray-300 mb-2">
              Tailored payment plans based on your financial capacity and needs.
            </p>
            <p className="text-sm text-green-400">
              Flexible milestone-based payments
            </p>
          </div>
        </div>
      </section>

      {/* Documentation Required */}
      <section className="max-w-7xl mx-auto mb-16 px-4">
        <h2 className="text-2xl font-bold mb-6 text-amber-500 border-b border-amber-500 pb-2 inline-block">
          Essential Documentation to Verify
        </h2>
        <p className="text-gray-300 mb-6">
          Before investing, ensure the project has all necessary approvals and
          clearances:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {documentation.map((doc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-center gap-3"
            >
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-300 text-sm">{doc}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-2xl font-bold mb-6 text-amber-500 border-b border-amber-500 pb-2 inline-block">
          Send an Inquiry
        </h2>
        <p className="text-gray-300 mb-6">
          Fill in your details and our RERA-certified property consultants will
          get in touch to help you choose the perfect off-plan property for your
          investment needs.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-amber-500 focus:border-amber-500 text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-amber-500 focus:border-amber-500 text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-amber-500 focus:border-amber-500 text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">
                Interested Project
              </label>
              <input
                type="text"
                name="projectInterested"
                value={formData.projectInterested}
                onChange={handleChange}
                placeholder="Select from above or mention specific requirements"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-amber-500 focus:border-amber-500 text-gray-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Share your budget, preferred location, configuration, and any specific requirements..."
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-amber-500 focus:border-amber-500 text-gray-200"
            ></textarea>
          </div>
          <div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-md transition flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Submit Inquiry
            </motion.button>
          </div>
        </form>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-2xl font-bold mb-6 text-amber-500 border-b border-amber-500 pb-2 inline-block">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold text-gray-100 mb-2">
              Is investing in off-plan properties safe in India?
            </h3>
            <p className="text-gray-400">
              Yes, with RERA (Real Estate Regulation and Development Act) in
              place, investing in off-plan properties is much safer. Always
              ensure the project is RERA registered and developed by a reputed
              builder with a good track record.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold text-gray-100 mb-2">
              What are the tax implications of off-plan property investment?
            </h3>
            <p className="text-gray-400">
              Capital gains tax applies when you sell the property. If held for
              more than 2 years, it's considered long-term capital gain (LTCG)
              with lower tax rates. Under construction properties also qualify
              for Section 80C deductions on home loan principal repayment.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold text-gray-100 mb-2">
              Can I get a home loan for an off-plan property?
            </h3>
            <p className="text-gray-400">
              Yes, most banks and NBFCs provide home loans for
              under-construction properties. The loan is typically disbursed in
              stages based on construction milestones. Interest rates may be
              slightly higher than ready-to-move properties.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold text-gray-100 mb-2">
              What if the project gets delayed beyond the promised date?
            </h3>
            <p className="text-gray-400">
              Under RERA, developers are liable to pay penalty for delays.
              Buyers can claim compensation or even withdraw from the project
              with refund plus interest. Always check the RERA registration and
              completion timeline before investing.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold text-gray-100 mb-2">
              Can I sell the property before it's completed?
            </h3>
            <p className="text-gray-400">
              Yes, you can transfer your booking to another buyer before
              completion, subject to builder's terms and applicable transfer
              charges. This is common in the Indian real estate market and can
              be quite profitable if property values have appreciated.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center px-4 md:px-40 pb-16">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Secure Your Dream Property at Pre-Launch Prices?
          </h3>
          <p className="text-amber-100 mb-6">
            Our certified property consultants are here to guide you through the
            best off-plan opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-amber-600 font-bold py-3 px-8 rounded-md transition hover:bg-gray-100"
            >
              Talk to an Expert Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-black font-medium py-3 px-8 rounded-md transition hover:bg-white hover:text-amber-600"
            >
              Download Investment Guide
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OffPlanDeals;
