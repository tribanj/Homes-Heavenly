import React, { useEffect, useState, useRef } from 'react';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import {
  FaUsers, FaHome, FaBuilding, FaHandshake, FaRocket, FaGavel, FaKey,
  FaUserCheck, FaCalendarAlt, FaCreditCard, FaArrowDown
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const cardColors = [
  { bg: 'bg-orange-500/10', text: 'text-orange-400', progress: 'bg-orange-500' },
  { bg: 'bg-blue-500/10', text: 'text-blue-400', progress: 'bg-blue-500' },
  { bg: 'bg-purple-500/10', text: 'text-purple-400', progress: 'bg-purple-500' },
  { bg: 'bg-emerald-500/10', text: 'text-emerald-400', progress: 'bg-emerald-500' },
  { bg: 'bg-pink-500/10', text: 'text-pink-400', progress: 'bg-pink-500' },
  { bg: 'bg-red-500/10', text: 'text-red-400', progress: 'bg-red-500' },
  { bg: 'bg-cyan-500/10', text: 'text-cyan-400', progress: 'bg-cyan-500' },
  { bg: 'bg-green-500/10', text: 'text-green-400', progress: 'bg-green-500' },
  { bg: 'bg-indigo-500/10', text: 'text-indigo-400', progress: 'bg-indigo-500' },
  { bg: 'bg-yellow-500/10', text: 'text-yellow-400', progress: 'bg-yellow-500' }
];

function SummaryCards() {
  const [summaryData, setSummaryData] = useState([
    {
      title: "Builder Projects",
      count: 0,
      icon: <FaBuilding className="text-2xl" />,
      collection: "BuilderProjectsListing"
    },
    {
      title: "PG/Hostels",
      count: 0,
      icon: <FaHome className="text-2xl" />,
      collection: "PGAndHostels"
    },
    {
      title: "Coworking Spaces",
      count: 0,
      icon: <FaHandshake className="text-2xl" />,
      collection: "coworkingLeaseProperties"
    },
    {
      title: "Mortgage Listings",
      count: 0,
      icon: <FaKey className="text-2xl" />,
      collection: "mortgageListings"
    },
    {
      title: "Prelaunch Projects",
      count: 0,
      icon: <FaRocket className="text-2xl" />,
      collection: "prelaunchProjects"
    },
    {
      title: "Auction Properties",
      count: 0,
      icon: <FaGavel className="text-2xl" />,
      collection: "property_for_auction"
    },
    {
      title: "Rent/Sale Properties",
      count: 0,
      icon: <FaKey className="text-2xl" />,
      collection: "property_for_rent_or_sale"
    },
    {
      title: "Active Users",
      count: 0,
      icon: <FaUserCheck className="text-2xl" />,
      collection: "users",
      filterField: "lastActive",
      filterThreshold: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      title: "Appointments",
      count: 0,
      icon: <FaCalendarAlt className="text-2xl" />,
      collection: "appointments"
    },
    {
      title: "Transactions",
      count: 0,
      icon: <FaCreditCard className="text-2xl" />,
      collection: "transactions"
    }
  ]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const updatedData = await Promise.all(summaryData.map(async (item) => {
          try {
            let collQuery;
            if (item.filterField && item.filterThreshold) {
              collQuery = query(
                collection(db, item.collection),
                where(item.filterField, ">=", item.filterThreshold)
              );
            } else {
              collQuery = collection(db, item.collection);
            }
            const snapshot = await getCountFromServer(collQuery);
            return {
              ...item,
              count: snapshot.data().count
            };
          } catch (err) {
            console.error(`Error counting ${item.collection}:`, err);
            return { ...item, count: 0 };
          }
        }));
        setSummaryData(updatedData);
      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const handleScrollDown = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 max-h-[600px] overflow-auto scroll-smooth"
        style={{ scrollbarWidth: 'thin' }}
      >
        {summaryData.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className={`bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-${cardColors[index].progress.split('-')[1]}-400 hover:shadow-xl transition-all duration-300`}
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${cardColors[index].bg} mr-4`}>
                  {React.cloneElement(item.icon, { className: `text-2xl ${cardColors[index].text}` })}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">{item.title}</h3>
                  {loading ? (
                    <div className="h-8 w-16 bg-gray-700 rounded animate-pulse mt-1"></div>
                  ) : (
                    <p className={`text-2xl font-bold ${index < 7 ? 'text-orange-400' : 'text-white'}`}>
                      {item.count.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cardColors[index].progress}`}
                    style={{
                      width: `${Math.min(100, (item.count / (summaryData.reduce((max, i) => Math.max(max, i.count), 1) || 1)) * 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* Floating Button (Always Visible) */}
      <motion.button
        className="fixed top-1/2 center z-50 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        onClick={handleScrollDown}
        initial={{ scale: 0.8 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        }}
        title="Scroll to Bottom"
      >
        <FaArrowDown className="text-xl" />
      </motion.button>
    </div>
  );
}

export default SummaryCards;
