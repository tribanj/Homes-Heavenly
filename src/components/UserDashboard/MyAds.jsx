// src/components/UserDashboard/MyAds.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const MyAds = () => {
  const { user } = useAuth();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchMyAds = async () => {
      try {
        const q = query(
          collection(db, "property_for_rent_or_sale"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);

        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAds(results);
      } catch (error) {
        console.error("Error fetching user ads:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAds();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📢 My Posted Properties</h2>

      {loading ? (
        <p>Loading your ads...</p>
      ) : ads.length === 0 ? (
        <p>You haven’t posted any property yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={ad.photos?.[0] || "/images/placeholder.jpg"}
                alt={ad.title}
                className="w-full h-40 object-cover mb-3 rounded"
              />
              <h3 className="text-lg font-semibold">{ad.title}</h3>
              <p className="text-sm text-gray-600">
                {ad.locality}, {ad.city}
              </p>
              <p className="text-blue-700 font-bold mt-1">₹ {ad.price}</p>
              <p
                className={`text-sm mt-2 font-medium ${ad.status === "approved"
                    ? "text-green-600"
                    : ad.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
              >
                Status: {ad.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAds;
