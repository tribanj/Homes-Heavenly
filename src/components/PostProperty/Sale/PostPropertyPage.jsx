// src/components/PostProperty/Sale/PostPropertyPage.js

import React, { useState } from 'react';
import PropertyDetails from './PropertyDetails';
import MediaUpload from './MediaUpload';
import LocationDetails from './LocationDetails';
import PricingFeatures from './PricingFeatures';
import ContactInfo from './ContactInfo';
import PreviewSubmit from './PreviewSubmit';

// ✅ Correct Firebase imports
import { db } from '../../../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const PostPropertyPage = () => {
  const [formData, setFormData] = useState({
    propertyType: '',
    purpose: '',
    title: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    city: '',
    locality: '',
    images: [],
    video: null,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    amenities: [],
  });

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  // ✅ Save the data to Firestore
  const handleFinalSubmit = async () => {
    try {
      const dataToSubmit = {
        ...formData,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'saleProperties'), dataToSubmit);

      alert('Property successfully submitted!');

      setCurrentStep(1);
      setFormData({
        propertyType: '',
        purpose: '',
        title: '',
        price: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        city: '',
        locality: '',
        images: [],
        video: null,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        amenities: [],
      });
    } catch (error) {
      console.error('Error submitting property:', error);
      alert('There was an error submitting the property.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PropertyDetails
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <MediaUpload
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <LocationDetails
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <PricingFeatures
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <ContactInfo
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 6:
        return (
          <PreviewSubmit
            formData={formData}
            handleFinalSubmit={handleFinalSubmit}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container py-4">
      <div className="mb-3 text-center">
        <h3>Step {currentStep} of 6</h3>
      </div>
      {renderStep()}
    </div>
  );
};

export default PostPropertyPage;
