// src/components/PostProperty/PGHostel/PGHostelPage.js

import React, { useState } from 'react';
import PropertyDetailsLocation from './PropertyDetailsLocation';
import PGHostelPricingFeaturesMedia from './PGHostelPricingFeaturesMedia';
import ContactPreviewSubmit from './ContactPreviewSubmit';

import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const PGHostelPage = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    city: '',
    rent: '',
    facilities: [],
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
        type: 'pgHostel',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'pgHostelListings'), payload);
      alert('🏠 PG/Hostel listing submitted successfully!');

      // Reset
      setStep(1);
      setFormData({
        propertyType: '',
        location: '',
        city: '',
        rent: '',
        facilities: [],
        images: [],
        contactName: '',
        contactPhone: '',
        contactEmail: '',
      });
    } catch (error) {
      console.error('❌ Error submitting PG/Hostel listing:', error);
      alert('There was an error submitting the listing. Please try again.');
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
          <PGHostelPricingFeaturesMedia
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
            handleSubmit={handleSubmit}
          />
        );
      default:
        return <div className="text-danger text-center">Invalid step</div>;
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">🏠 Post PG/Hostel Listing</h2>
      <h5 className="text-center mb-4">Step {step} of 3</h5>
      {renderStep()}
    </div>
  );
};

export default PGHostelPage;
