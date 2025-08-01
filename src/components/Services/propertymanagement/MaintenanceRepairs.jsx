import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiEdit,
  FiChevronDown,
  FiTool,
  FiShield,
  FiCheck,
  FiCheckCircle,
} from "react-icons/fi";
import { FaWrench, FaBolt, FaBroom, FaBug, FaHandshake } from "react-icons/fa";

const MaintenanceSupport = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    contact: "",
    email: "",
    propertyAddress: "",
    maintenanceType: [],
    preferredDate: "",
    additionalNotes: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  // Create a ref for the form section
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updated = checked
        ? [...formData.maintenanceType, value]
        : formData.maintenanceType.filter((item) => item !== value);
      setFormData({ ...formData, maintenanceType: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🛠️ Maintenance Request Submitted:", formData);
    toast.success(
      "Your maintenance request has been submitted! Our team will contact you shortly to confirm the details.",
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
      ownerName: "",
      contact: "",
      email: "",
      propertyAddress: "",
      maintenanceType: [],
      preferredDate: "",
      additionalNotes: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  // Function to scroll smoothly to the form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const today = new Date().toISOString().split("T")[0];
  const maintenanceServices = [
    {
      icon: FaWrench,
      title: "Plumbing & Electrical",
      value: "Plumbing & Electrical",
    },
    { icon: FaBolt, title: "Appliance Repair", value: "Appliance Repair" },
    { icon: FaBroom, title: "Deep Cleaning", value: "Deep Cleaning" },
    { icon: FaBug, title: "Pest Control", value: "Pest Control" },
    {
      icon: FiTool,
      title: "Painting & Carpentry",
      value: "Painting & Carpentry",
    },
    {
      icon: FiCheckCircle,
      title: "Preventive Inspection",
      value: "Preventive Inspection",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-8 px-4 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 mb-4">
          Property Maintenance & Repair
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Keep your investment in pristine condition. We provide reliable,
          end-to-end coordination for all your property maintenance needs in
          Hyderabad.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Our Maintenance Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {maintenanceServices.map((service) => (
              <div
                key={service.value}
                className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 text-center"
              >
                <service.icon
                  className="text-orange-400 mb-4 mx-auto"
                  size={40}
                />
                <h3 className="text-xl font-semibold text-white">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-4">
            Our Hassle-Free Service Process
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            We handle everything, so you don't have to.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <FiEdit size={30} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                1. Request & Diagnose
              </h3>
              <p className="text-base text-gray-400 mt-2">
                Submit your request online. Our team calls you to understand the
                issue and provide a preliminary quote.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <FiCalendar size={30} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                2. Schedule & Dispatch
              </h3>
              <p className="text-base text-gray-400 mt-2">
                We schedule a convenient time and dispatch a verified, skilled
                technician to your property.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-500/20 text-orange-400 rounded-full p-5 mb-4 border-2 border-orange-500/30">
                <FiCheck size={30} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                3. Resolve & Confirm
              </h3>
              <p className="text-base text-gray-400 mt-2">
                The job is completed to your satisfaction, and we provide a
                digital invoice for your records.
              </p>
            </div>
          </div>
        </section>

        <section className="my-20 bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-orange-400 mb-4">
                Annual Maintenance Contracts (AMC)
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                For complete peace of mind, sign up for our AMC. Get preventive
                care and priority service for your property all year round at a
                discounted rate.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-lg">
                  <FiShield className="text-green-400 mr-3 shrink-0" />
                  Preventive check-ups to avoid costly breakdowns.
                </li>
                <li className="flex items-center text-lg">
                  <FiCheckCircle className="text-green-400 mr-3 shrink-0" />
                  Priority scheduling for all service requests.
                </li>
                <li className="flex items-center text-lg">
                  <FaHandshake className="text-green-400 mr-3 shrink-0" />
                  Locked-in prices for the entire year.
                </li>
              </ul>
            </div>
            <div className="text-center">
              <button
                onClick={scrollToForm}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
              >
                Inquire About an AMC
              </button>
            </div>
          </div>
        </section>
      </div>

      <div ref={formRef} className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Schedule a Maintenance Service
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Fill out the form below to book a service. We handle everything from
            minor repairs to major renovations.
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
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Owner or Manager Name"
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Property Address *
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Full address of the property requiring service"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Maintenance Type(s):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {maintenanceServices.map((service) => (
                  <label
                    key={service.value}
                    className="flex items-center text-gray-300 p-3 bg-gray-700/50 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-700"
                  >
                    <input
                      type="checkbox"
                      className="absolute opacity-0 h-0 w-0"
                      name="maintenanceType"
                      value={service.value}
                      onChange={handleChange}
                      checked={formData.maintenanceType.includes(service.value)}
                    />
                    <div
                      className={`w-5 h-5 flex items-center justify-center rounded border-2 mr-3 ${
                        formData.maintenanceType.includes(service.value)
                          ? "bg-orange-500 border-orange-500"
                          : "bg-gray-600 border-gray-500"
                      }`}
                    >
                      {formData.maintenanceType.includes(service.value) && (
                        <FiCheck className="text-white" size={14} />
                      )}
                    </div>
                    <span className="select-none">{service.title}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Preferred Visit Date *
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  min={today}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Additional Notes (Optional)
              </label>
              <div className="relative">
                <FiEdit className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="additionalNotes"
                  rows="3"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Describe the issue in more detail..."
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Submit Maintenance Request
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Your Maintenance Questions Answered
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "What are your service hours?",
              a: "Our standard service hours are from 9 AM to 7 PM, Monday to Saturday. However, we offer 24/7 coordination for emergency requests like major plumbing leaks or electrical failures.",
            },
            {
              id: "faq2",
              q: "Are your technicians verified?",
              a: "Yes, every technician in our network undergoes a thorough background check and verification process. We only work with experienced, licensed, and reliable professionals.",
            },
            {
              id: "faq3",
              q: "Do you provide a warranty on repairs?",
              a: "Absolutely. We provide a service warranty on all repairs and workmanship. The duration of the warranty depends on the nature of the job and will be clearly stated in the service invoice.",
            },
            {
              id: "faq4",
              q: "How is billing handled?",
              a: "For standard requests, we provide a quote after the initial diagnosis. For AMCs, you have a fixed annual fee. All billing is transparent, with digital invoices provided for every job. There are no hidden charges.",
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

export default MaintenanceSupport;
