// src/components/PostProperty/PreLaunch/PreLaunchProjectPage.js

import React, { useState } from 'react';
import ProjectDetails from './ProjectDetails';
import LocationPricing from './LocationPricing';
import MediaContactSubmit from './MediaContactSubmit';

// Firebase imports
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const PreLaunchProjectPage = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    projectName: '',
    builderName: '',
    projectType: '',
    location: '',
    city: '',
    priceRange: '',
    images: [],
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  });

  // Step navigation
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Final submission to Firestore
  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        type: 'preLaunch',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'preLaunchProjects'), payload);

      alert('🚀 Pre-Launch Project submitted successfully!');
      
      // Reset form after submission
      setStep(1);
      setFormData({
        projectName: '',
        builderName: '',
        projectType: '',
        location: '',
        city: '',
        priceRange: '',
        images: [],
        contactName: '',
        contactPhone: '',
        contactEmail: '',
      });
    } catch (error) {
      console.error('Error submitting pre-launch project:', error);
      alert('❌ There was an error submitting the project. Please try again.');
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ProjectDetails
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <LocationPricing
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <MediaContactSubmit
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return <p>Invalid step</p>;
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">🚧 Post a Pre-Launch Project</h2>
      <h5 className="text-center mb-4">Step {step} of 3</h5>
      {renderStep()}
    </div>
  );
};

export default PreLaunchProjectPage;
