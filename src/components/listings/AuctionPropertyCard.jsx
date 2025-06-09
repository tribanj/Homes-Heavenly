import React from "react";

const AuctionPropertyCard = ({ property }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5>{property.title}</h5>
        <p><strong>Location:</strong> {property.location}</p>
        <p><strong>Reserve Price:</strong> ₹{property.reservePrice}</p>
        <p><strong>Auction Dates:</strong> {property.auctionStartDate} to {property.auctionEndDate}</p>
        <p><strong>Contact:</strong> {property.contactName} ({property.contactPhone})</p>
      </div>
    </div>
  );
};

export default AuctionPropertyCard;
