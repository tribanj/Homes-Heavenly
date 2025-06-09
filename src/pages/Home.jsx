import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/listings/PropertyCard";
import { db } from "../firebase/firebaseConfig";  // your firebase config file
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [rentProperties, setRentProperties] = useState([]);
  const [saleProperties, setSaleProperties] = useState([]);
  const [services, setServices] = useState([]);

  // Fetch data from firestore
  useEffect(() => {
    async function fetchProperties() {
      // Rent properties: where type == 'rent', order by createdAt desc, limit 6
      const rentQuery = query(
        collection(db, "properties"),
        where("type", "==", "rent"),
        orderBy("createdAt", "desc"),
        limit(6)
      );
      const rentSnap = await getDocs(rentQuery);
      setRentProperties(rentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Sale properties: where type == 'sale', order by createdAt desc, limit 6
      const saleQuery = query(
        collection(db, "properties"),
        where("type", "==", "sale"),
        orderBy("createdAt", "desc"),
        limit(6)
      );
      const saleSnap = await getDocs(saleQuery);
      setSaleProperties(saleSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Services: order by usageCount desc, limit 9
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
    <div className="home-container">
      {/* Rent Properties Section */}
      {rentProperties.length > 0 && (
        <section>
          <h2>Properties for Rent</h2>
          <div className="grid">
            {rentProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <button onClick={() => navigate("/rent")}>See more</button>
        </section>
      )}

      {/* Sale Properties Section */}
      {saleProperties.length > 0 && (
        <section>
          <h2>Properties for Sale</h2>
          <div className="grid">
            {saleProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <button onClick={() => navigate("/sale")}>See more</button>
        </section>
      )}

      {/* Services Section */}
      {services.length > 0 && (
        <section>
          <h2>Popular Services</h2>
          <div className="grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <h5>{service.name}</h5>
                {/* Add more details about service */}
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/services")}>See more</button>
        </section>
      )}
    </div>
  );
};

export default Home;
