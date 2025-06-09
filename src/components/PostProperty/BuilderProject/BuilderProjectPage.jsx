import React, { useState } from 'react';
import PropertyDetailsLocation from './PropertyDetailsLocation';
import PricingFeaturesMedia from './PricingFeaturesMedia';
import ContactPreviewSubmit from './ContactPreviewSubmit';
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const BuilderProjectPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    unitTypes: [],
    priceRange: '',
    features: [],
    images: [],
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        type: "builder-project",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "builderProjectListings"), payload);
      alert("🏗️ Builder Project listing submitted successfully!");

      // Reset form
      setFormData({
        projectName: '',
        location: '',
        unitTypes: [],
        priceRange: '',
        features: [],
        images: [],
        contactName: '',
        contactPhone: '',
        contactEmail: '',
      });
      setStep(1);
    } catch (error) {
      console.error("Error submitting builder project:", error);
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
      <h2 className="text-center mb-3">🏗️ Post Builder Project Listing</h2>
      <h5 className="text-center mb-4">Step {step} of 3</h5>
      <div className="card shadow-sm">
        <div className="card-body">{renderStep()}</div>
      </div>
    </div>
  );
};

export default BuilderProjectPage;
