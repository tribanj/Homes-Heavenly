import React, { useState } from "react";
import PropertyLocationDetails from "./PropertyLocationDetails";
import PricingFeaturesMedia from "./PricingFeaturesMedia";
import ContactPreviewSubmit from "./ContactPreviewSubmit";

const RentPropertyPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  switch (step) {
    case 1:
      return (
        <PropertyLocationDetails
          formData={formData}
          setFormData={setFormData}
          onNext={nextStep}
          onBack={() => {}}
        />
      );
    case 2:
      return (
        <PricingFeaturesMedia
          formData={formData}
          setFormData={setFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      );
    case 3:
      return (
        <ContactPreviewSubmit
          formData={formData}
          setFormData={setFormData}
          onBack={prevStep}
        />
      );
    default:
      return <h2>Invalid Step</h2>;
  }
};

export default RentPropertyPage;
