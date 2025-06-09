import React, { useState, useEffect } from "react";
import SearchFilters from "../components/SearchFilters";
import PropertyList from "../components/listings/PropertyList";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Rent = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const fetchListings = async () => {
    try {
      const collectionsToFetch = [
        "rentListings",
        "pgHostelListings",
        "commercialLeaseListings",
        "builderProjectListings",
        "auctionListings",
      ];

      let combinedData = [];

      for (const col of collectionsToFetch) {
        const snapshot = await getDocs(collection(db, col));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        combinedData = [...combinedData, ...data];
      }

      setAllProperties(combinedData);
      setFilteredProperties(combinedData);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleSearch = (filters) => {
    const results = allProperties.filter((property) => {
      const matchesLocation =
        !filters.location ||
        property.city?.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.state?.toLowerCase().includes(filters.location.toLowerCase());

      const matchesType =
        !filters.propertyType || property.propertyType === filters.propertyType;

      const matchesPrice =
        (!filters.minPrice || Number(property.price) >= filters.minPrice) &&
        (!filters.maxPrice || Number(property.price) <= filters.maxPrice);

      const matchesBedrooms =
        !filters.bedrooms || Number(property.bedrooms) === Number(filters.bedrooms);

      const matchesBathrooms =
        !filters.bathrooms || Number(property.bathrooms) === Number(filters.bathrooms);

      const matchesSize =
        !filters.size || Number(property.size) >= Number(filters.size);

      return (
        matchesLocation &&
        matchesType &&
        matchesPrice &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesSize
      );
    });

    setFilteredProperties(results);
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Available Properties for Rent</h1>
      <SearchFilters onSearch={handleSearch} />
      <hr />
      <PropertyList properties={filteredProperties} />
    </div>
  );
};

export default Rent;