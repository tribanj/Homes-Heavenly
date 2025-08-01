// src/components/Services/buysale/ROIcalculator.js
import React, { useState } from 'react';

const ROIcalculator = () => {
  const [investment, setInvestment] = useState('');
  const [roi, setROI] = useState(null);

  const handleCalculate = () => {
    // Example logic: (Assume some basic calculation here)
    const calculatedROI = (investment * 0.1).toFixed(2); // 10% of investment as ROI
    setROI(calculatedROI);
  };

  return (
    <div>
      <h4>ROI Calculator</h4>
      <input
        type="number"
        value={investment}
        onChange={(e) => setInvestment(e.target.value)}
        placeholder="Enter Investment Amount"
      />
      <button onClick={handleCalculate}>Calculate ROI</button>
      {roi && (
        <div>
          <p>Estimated ROI: ${roi}</p>
        </div>
      )}
    </div>
  );
};

export default ROIcalculator;
