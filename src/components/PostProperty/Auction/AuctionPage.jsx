import React, { useState } from "react";
import PropertyDetailsLocation from "./PropertyDetailsLocation";
import PricingFeaturesMedia from "./PricingFeaturesMedia";
import ContactPreviewSubmit from "./ContactPreviewSubmit";
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const AuctionPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    reservePrice: '',
    bidIncrement: '',
    auctionStartDate: '',
    auctionEndDate: '',
    features: [],
    images: [],
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  });

  const [searchFilters, setSearchFilters] = useState({
    propertyType: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    auctionDateFrom: '',
    auctionDateTo: ''
  });

  const handleSearchChange = (field) => (e) => {
    setSearchFilters({ ...searchFilters, [field]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // 🔎 You can integrate this with Firestore queries or filter listings locally
    console.log("Searching with filters:", searchFilters);
    alert("Search functionality will be integrated soon.");
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        type: "auction",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "auctionListings"), payload);
      alert("📢 Auction listing submitted successfully!");

      setFormData({
        title: '',
        location: '',
        reservePrice: '',
        bidIncrement: '',
        auctionStartDate: '',
        auctionEndDate: '',
        features: [],
        images: [],
        contactName: '',
        contactPhone: '',
        contactEmail: '',
      });
      setStep(1);
    } catch (error) {
      console.error("Error submitting auction listing:", error);
      alert("❌ Submission failed. Please try again.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PropertyDetailsLocation
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <PricingFeaturesMedia
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <ContactPreviewSubmit
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
            onSubmit={handleSubmit}
          />
        );
      default:
        return <div className="text-danger text-center">Unknown step</div>;
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-3">📢 Post Auction Listing</h2>
      <h5 className="text-center mb-4">Step {step} of 3</h5>

      {/* 🔍 Search Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">🔍 Search Auction Properties</h5>
          <form onSubmit={handleSearch} className="row g-3">
            <div className="col-md-3">
              <label>Property Type</label>
              <select className="form-select" value={searchFilters.propertyType} onChange={handleSearchChange("propertyType")}>
                <option value="">All</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="plot">Plot</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div className="col-md-3">
              <label>Location (City or State)</label>
              <input type="text" className="form-control" value={searchFilters.location} onChange={handleSearchChange("location")} />
            </div>
            <div className="col-md-3">
              <label>Min Price</label>
              <input type="number" className="form-control" value={searchFilters.minPrice} onChange={handleSearchChange("minPrice")} />
            </div>
            <div className="col-md-3">
              <label>Max Price</label>
              <input type="number" className="form-control" value={searchFilters.maxPrice} onChange={handleSearchChange("maxPrice")} />
            </div>
            <div className="col-md-3">
              <label>Auction Start Date (From)</label>
              <input type="date" className="form-control" value={searchFilters.auctionDateFrom} onChange={handleSearchChange("auctionDateFrom")} />
            </div>
            <div className="col-md-3">
              <label>Auction End Date (To)</label>
              <input type="date" className="form-control" value={searchFilters.auctionDateTo} onChange={handleSearchChange("auctionDateTo")} />
            </div>
            <div className="col-md-12 d-flex justify-content-end">
              <button type="submit" className="btn btn-outline-primary mt-2">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 📝 Form Section */}
      <div className="card shadow-sm">
        <div className="card-body">{renderStep()}</div>
      </div>
    </div>
  );
};

export default AuctionPage;
