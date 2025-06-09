import React, { useState } from "react";
import PropertyDetailsLocation from "./PropertyDetailsLocation";
import PricingFeaturesMedia from "./PricingFeaturesMedia";
import ContactPreviewSubmit from "./ContactPreviewSubmit";
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const OtherPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        type: "other",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "otherListings"), payload);
      alert("General listing submitted successfully!");

      setStep(1);
      setFormData({});
    } catch (error) {
      console.error("Error submitting general listing:", error);
      alert("Error submitting listing. Please try again.");
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
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Post General Listing</h2>
      {renderStep()}
    </div>
  );
};

export default OtherPage;
