import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import AuctionPropertyCard from "./AuctionPropertyCard";

const AuctionPropertyList = ({ filters }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const snapshot = await getDocs(collection(db, "auctionListings"));
      const allListings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Apply filters
      const filtered = allListings.filter(listing => {
        const locationMatch = filters.location ? listing.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
        const typeMatch = filters.propertyType ? listing.title.toLowerCase().includes(filters.propertyType.toLowerCase()) : true;
        const minPriceMatch = filters.minPrice ? Number(listing.reservePrice) >= filters.minPrice : true;
        const maxPriceMatch = filters.maxPrice ? Number(listing.reservePrice) <= filters.maxPrice : true;
        return locationMatch && typeMatch && minPriceMatch && maxPriceMatch;
      });

      setListings(filtered);
    };

    fetchListings();
  }, [filters]);

  return (
    <div className="mt-4">
      {listings.length === 0 ? (
        <p className="text-center text-muted">No auction listings match your criteria.</p>
      ) : (
        listings.map((property) => (
          <AuctionPropertyCard key={property.id} property={property} />
        ))
      )}
    </div>
  );
};

export default AuctionPropertyList;
