import React, { useState } from "react";
import PropertyDetailsMortgage from "./PropertyDetailsMortgage";
import FinancialTermsDocuments from "./FinancialTermsDocuments";
import ContactPreviewSubmit from "./ContactPreviewSubmit";

import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const MortgagePropertyPage = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    loanAmount: '',
    interestRate: '',
    bankName: '',
    loanTenure: '',
    repaymentPlan: '',
    processingFee: '',
    prepaymentOption: '',
    documents: [],
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleMultiChange = (input) => (value) => {
    setFormData({ ...formData, [input]: value });
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      propertyType: '',
      location: '',
      loanAmount: '',
      interestRate: '',
      bankName: '',
      loanTenure: '',
      repaymentPlan: '',
      processingFee: '',
      prepaymentOption: '',
      documents: [],
      contactName: '',
      contactPhone: '',
      contactEmail: '',
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        type: "mortgage",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "mortgageListings"), payload);
      alert("🏦 Mortgage listing submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error submitting mortgage listing:", error);
      alert("❌ Error submitting listing. Please try again.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PropertyDetailsMortgage
            formData={formData}
            handleChange={handleChange}
            handleMultiChange={handleMultiChange}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <FinancialTermsDocuments
            formData={formData}
            handleChange={handleChange}
            handleMultiChange={handleMultiChange}
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
      <h2 className="text-center mb-3">🏦 Post Your Mortgage Listing</h2>
      <h5 className="text-center mb-4">Step {step} of 3</h5>
      {renderStep()}
    </div>
  );
};

export default MortgagePropertyPage;
