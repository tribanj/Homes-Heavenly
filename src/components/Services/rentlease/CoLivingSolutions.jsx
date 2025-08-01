import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import {
  FaBuilding,
  FaWifi,
  FaParking,
  FaSnowflake,
  FaShieldAlt,
  FaArrowRight,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMap,
  FiDollarSign,
  FiBriefcase,
  FiCalendar,
  FiEdit,
  FiChevronDown,
} from "react-icons/fi";
import { motion } from "framer-motion";

// --- Helper component for skeleton loading UI ---
const SkeletonCard = () => (
  <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700 animate-pulse">
    <div className="h-48 bg-gray-700"></div>
    <div className="p-6">
      <div className="h-6 w-3/4 bg-gray-700 rounded mb-3"></div>
      <div className="h-4 w-full bg-gray-700 rounded mb-4"></div>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-7 w-20 bg-gray-700 rounded-full"></div>
        <div className="h-7 w-16 bg-gray-700 rounded-full"></div>
        <div className="h-7 w-24 bg-gray-700 rounded-full"></div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-8 w-1/3 bg-gray-700 rounded"></div>
        <div className="h-10 w-1/4 bg-gray-700 rounded-md"></div>
      </div>
    </div>
  </div>
);

const CoLivingSolutions = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "Hyderabad",
    budget: "",
    occupation: "",
    moveInDate: "",
    preferences: "",
  });
  const [coworkingSpaces, setCoworkingSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState("faq1");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoworkingSpaces = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "coworkingLeaseProperties")
        );
        const spaces = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCoworkingSpaces(spaces);
      } catch (error) {
        console.error("Error fetching coworking spaces:", error);
        toast.error("Failed to load coworking spaces.");
      } finally {
        setLoading(false);
      }
    };
    fetchCoworkingSpaces();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🏠 Co-Living Inquiry Submitted:", formData);
    toast.success(
      "Thanks for your inquiry! Our team will contact you shortly."
    );
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      city: "Hyderabad",
      budget: "",
      occupation: "",
      moveInDate: "",
      preferences: "",
    });
  };

  const toggleAccordion = (id) =>
    setActiveAccordion(activeAccordion === id ? null : id);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 py-8 px-4 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 mb-4">
          Premium Co-Living & Shared Spaces
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Experience hassle-free, community-centric living in Hyderabad.
          Fully-furnished rooms, all-inclusive pricing, and flexible terms.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="my-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center hover:border-orange-500/50 transition-colors">
              <FaBuilding className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2 text-white">
                Fully Furnished
              </h3>
              <p className="text-gray-400">
                Move-in ready spaces with modern furniture, appliances, and all
                necessary amenities included.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center hover:border-orange-500/50 transition-colors">
              <FaWifi className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2 text-white">
                All-Inclusive Rent
              </h3>
              <p className="text-gray-400">
                One simple payment covers WiFi, utilities, housekeeping, and
                maintenance. No hidden costs.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center hover:border-orange-500/50 transition-colors">
              <FaShieldAlt className="text-orange-400 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2 text-white">
                Safe & Secure
              </h3>
              <p className="text-gray-400">
                24/7 security, CCTV surveillance, and secure access systems for
                your peace of mind.
              </p>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: Who is Co-Living For? --- */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
            Designed for Modern Lifestyles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 flex items-center gap-6">
              <FaUserTie className="text-5xl text-orange-400 shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  For Professionals
                </h3>
                <p className="text-gray-400 mt-1">
                  Live in prime locations near major IT hubs like Hitech City &
                  Gachibowli. Network with a community of like-minded
                  individuals.
                </p>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 flex items-center gap-6">
              <FaUserGraduate className="text-5xl text-orange-400 shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  For Students
                </h3>
                <p className="text-gray-400 mt-1">
                  Hassle-free living so you can focus on your studies. Choose
                  from spaces near universities and coaching centers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Co-working Spaces */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-orange-400 mb-8">
            🏢 Featured Work-From-Home Friendly Spaces
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coworkingSpaces.slice(0, 3).map((space) => (
                <div
                  key={space.id}
                  className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700 hover:border-orange-500/50 transition-all flex flex-col"
                >
                  {space.imageUrls?.[0] && (
                    <img
                      src={space.imageUrls[0]}
                      alt={space.propertyTitle}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-white truncate">
                      {space.propertyTitle}
                    </h3>
                    <p className="flex items-center text-gray-400 mb-4 text-sm">
                      <FaMapMarkerAlt className="mr-2 text-orange-500 shrink-0" />{" "}
                      {space.locality}, {space.city}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4 text-xs">
                      {[
                        {
                          show: true,
                          icon: <FaBuilding />,
                          text: space.spaceType,
                        },
                        {
                          show: space.airConditioning,
                          icon: <FaSnowflake />,
                          text: "AC",
                        },
                        {
                          show: space.powerBackup,
                          icon: <FaShieldAlt />,
                          text: "Power Backup",
                        },
                        {
                          show: true,
                          icon: <FaParking />,
                          text: `${space.parkingSpaces} Parking`,
                        },
                      ].map(
                        (item, i) =>
                          item.show && (
                            <span
                              key={i}
                              className="bg-gray-700/80 px-3 py-1 rounded-full flex items-center text-gray-200"
                            >
                              {React.cloneElement(item.icon, {
                                className: "mr-1.5",
                              })}{" "}
                              {item.text}
                            </span>
                          )
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700">
                      <div className="text-orange-400 text-xl font-bold">
                        ₹{parseInt(space.monthlyRent).toLocaleString("en-IN")}
                        <span className="text-sm text-gray-400">/mo</span>
                      </div>
                      <button
                        onClick={() =>
                          navigate(
                            `/services/buysale/coworkingLeaseProperties/${space.id}`
                          )
                        }
                        className="text-orange-400 font-semibold hover:text-white transition flex items-center"
                      >
                        View Details <FaArrowRight className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="bg-gray-800/70 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">
            Find Your Perfect Space Today
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Tell us what you're looking for, and we'll match you with the best
            co-living options in Hyderabad. It's fast, easy, and free!
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
                  name="fullName"
                  value={formData.fullName}
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
                Monthly Budget (₹) *
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g., 15000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Occupation *
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option value="">Select Occupation</option>
                  <option value="Student">Student</option>
                  <option value="Working Professional">
                    Working Professional
                  </option>
                  <option value="Freelancer/Digital Nomad">
                    Freelancer/Digital Nomad
                  </option>
                  <option value="Other">Other</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Expected Move-in Date
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="moveInDate"
                  value={formData.moveInDate}
                  min={today}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Preferences (e.g., private room, near metro)
              </label>
              <div className="relative">
                <FiEdit className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="preferences"
                  rows="3"
                  value={formData.preferences}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Any specific requirements..."
                ></textarea>
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Find My Space
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-orange-400 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              id: "faq1",
              q: "Are utilities and WiFi included in the rent?",
              a: "Yes, our pricing is all-inclusive. It covers all major utilities like electricity and water, high-speed internet, regular housekeeping, and maintenance, so you have one simple, predictable monthly payment.",
            },
            {
              id: "faq2",
              q: "What safety and security measures are in place?",
              a: "Your safety is our top priority. All our properties are equipped with 24/7 CCTV surveillance, secure biometric or card-based access, and often have on-site security personnel.",
            },
            {
              id: "faq3",
              q: "Is there a minimum stay period?",
              a: "We offer flexible terms to suit your needs. While most spaces have a standard one-month minimum stay, shorter-term options are available at select properties. Please mention your preferred duration in the form.",
            },
            {
              id: "faq4",
              q: "Can I choose my roommate?",
              a: "You can specify your preferences for roommates (e.g., working professional, student, non-smoker) in the inquiry form. We do our best to match you with compatible housemates based on availability and mutual consent.",
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

export default CoLivingSolutions;
