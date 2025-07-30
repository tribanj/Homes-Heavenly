import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiEdit3,
  FiChevronDown,
  FiArrowRight,
  FiCheckSquare,
} from "react-icons/fi";
import { FaBed, FaHome, FaConciergeBell } from "react-icons/fa";

const ShortTermRentals = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "Hyderabad",
    checkIn: "",
    checkOut: "",
    guests: "",
    rentalType: "",
    specialRequests: "",
  });

  const [activeAccordion, setActiveAccordion] = useState("faq1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // If check-in date changes, ensure check-out is not before it
    if (name === "checkIn" && prev.checkOut && value > prev.checkOut) {
      setFormData((prev) => ({ ...prev, checkOut: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📬 Short-Term Rental Request Submitted:", formData);
    toast.success(
      "Booking request submitted! Our team will contact you shortly to confirm availability."
    );
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "Hyderabad",
      checkIn: "",
      checkOut: "",
      guests: "",
      rentalType: "",
      specialRequests: "",
    });
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-8 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 mb-4">
            Short-Term & Vacation Rentals
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Your home away from home in Hyderabad. Fully-furnished, serviced
            stays for any duration.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Perfect For Every Occasion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <h3 className="text-xl font-semibold text-white">
                Tourists & Explorers
              </h3>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <h3 className="text-xl font-semibold text-white">
                Business Travelers
              </h3>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <h3 className="text-xl font-semibold text-white">
                Relocating Families
              </h3>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
              <h3 className="text-xl font-semibold text-white">
                Medical Stays
              </h3>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: Explore Our Rentals --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Explore Our Range of Stays
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700">
              <img
                src="https://via.placeholder.com/400x250/111827/FF9800?text=Serviced+Apartment"
                alt="Serviced Apartment"
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Serviced Apartments
                </h3>
                <p className="text-gray-400">
                  The comfort of a home with the service of a hotel. Includes
                  housekeeping, WiFi, and fully equipped kitchens.
                </p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700">
              <img
                src="https://via.placeholder.com/400x250/111827/FF9800?text=Private+Villa"
                alt="Private Villa"
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Private Villas
                </h3>
                <p className="text-gray-400">
                  Ideal for families or groups seeking privacy and space. Often
                  includes private gardens or pools.
                </p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700">
              <img
                src="https://via.placeholder.com/400x250/111827/FF9800?text=Cozy+Studio"
                alt="Cozy Studio"
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Cozy Studios
                </h3>
                <p className="text-gray-400">
                  Perfect for solo travelers or couples. A compact, efficient
                  space with all necessary amenities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Request Form Section */}
      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Book Your Hassle-Free Stay
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let us know your requirements, and we'll find the perfect short-term
            rental for you in Hyderabad.
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
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone *
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
                Preferred Location in Hyderabad *
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
                  placeholder="e.g., Hitech City, Banjara Hills"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Check-In Date *
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  min={today}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Check-Out Date *
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  min={formData.checkIn || today}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  disabled={!formData.checkIn}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Number of Guests *
              </label>
              <div className="relative">
                <FiUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="guests"
                  min="1"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., 2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Rental Type *
              </label>
              <div className="relative">
                <FaBed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="rentalType"
                  value={formData.rentalType}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">-- Select --</option>
                  <option value="Serviced Apartment">Serviced Apartment</option>
                  <option value="Vacation Villa">Vacation Villa</option>
                  <option value="Studio">Studio</option>
                  <option value="Guest House">Guest House</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Special Requests
              </label>
              <div className="relative">
                <FiEdit3 className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="specialRequests"
                  rows="3"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., airport pickup, extra bedding, specific floor..."
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Submit Booking Request
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Your Questions, Answered
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "Is daily housekeeping included?",
              a: "Yes, most of our serviced apartments and vacation rentals include regular housekeeping services. The frequency (daily or alternate days) will be mentioned in your booking confirmation.",
            },
            {
              id: "faq2",
              q: "What are the standard check-in and check-out times?",
              a: "Standard check-in time is 2:00 PM and check-out is at 11:00 AM. However, early check-in or late check-out can often be accommodated based on availability. Please mention it in your special requests.",
            },
            {
              id: "faq3",
              q: "What is your cancellation policy?",
              a: "Our cancellation policy varies by property. Generally, we offer a full refund for cancellations made up to 7 days before check-in. Detailed policy information will be shared with you before you confirm your booking.",
            },
            {
              id: "faq4",
              q: "Are the locations safe for families and solo travelers?",
              a: "Absolutely. We prioritize your safety. All our properties are located in secure, well-regarded neighborhoods in Hyderabad. Many are in gated communities or buildings with 24/7 security.",
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

export default ShortTermRentals;
