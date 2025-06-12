import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/listings/PropertyCard";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [rentProperties, setRentProperties] = useState([]);
  const [saleProperties, setSaleProperties] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchProperties() {
      const rentQuery = query(
        collection(db, "properties"),
        where("type", "==", "rent"),
        orderBy("createdAt", "desc"),
        limit(6)
      );
      const rentSnap = await getDocs(rentQuery);
      setRentProperties(rentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const saleQuery = query(
        collection(db, "properties"),
        where("type", "==", "sale"),
        orderBy("createdAt", "desc"),
        limit(6)
      );
      const saleSnap = await getDocs(saleQuery);
      setSaleProperties(saleSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const servicesQuery = query(
        collection(db, "services"),
        orderBy("usageCount", "desc"),
        limit(9)
      );
      const servicesSnap = await getDocs(servicesQuery);
      setServices(servicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }

    fetchProperties();
  }, []);

  return (
    <div className="home-container bg-black text-white">
      {/* === HERO SECTION === */}
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-center px-6 md:px-12">
        {/* Optional: background video */}
        {/* <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40">
          <source src="/path/to/video.mp4" type="video/mp4" />
        </video> */}

        <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-10 rounded-xl" />

        <motion.div
          className="relative z-20 max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Your <span className="text-yellow-400">Dream Home</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10">
            Luxury living made simple. Explore curated listings, premium services, and elegant properties tailored for you.
          </p>
          </motion.div>
      </section>

      {/* === RENT PROPERTIES === */}
      {rentProperties.length > 0 && (
        <section className="py-16 px-6 md:px-12">
          <h2 className="text-3xl font-semibold text-yellow-300 mb-6">Luxury Rentals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {rentProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/rent")}
              className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition"
            >
              See More Rentals
            </button>
          </div>
        </section>
      )}

      {/* === SALE PROPERTIES === */}
      {saleProperties.length > 0 && (
        <section className="py-16 px-6 md:px-12 bg-[#111]">
          <h2 className="text-3xl font-semibold text-yellow-300 mb-6">Homes for Sale</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {saleProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/sale")}
              className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition"
            >
              See More Listings
            </button>
          </div>
        </section>
      )}

      {/* === SERVICES SECTION === */}
      {services.length > 0 && (
        <section className="py-16 px-6 md:px-12 bg-gradient-to-t from-black to-gray-900">
          <h2 className="text-3xl font-semibold text-yellow-300 mb-6">Popular Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map(service => (
              <div key={service.id} className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
                <h5 className="text-xl font-bold text-white mb-2">{service.name}</h5>
                <p className="text-gray-300 text-sm">High-demand luxury service</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/services")}
              className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition"
            >
              See All Services
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
