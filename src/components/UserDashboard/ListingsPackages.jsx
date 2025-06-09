import React from 'react';
import './ListingsPackages.css';

const ListingsPackages = () => {
  // Simulated user data (you can replace with real data later)
  const currentPlan = {
    role: 'Normal User',
    adsPosted: 2,
    adLimit: 2,
    planExpiry: '2025-06-10',
  };

  return (
    <div className="packages">
      <h2>📦 Listings & Packages</h2>
      
      <div className="package-box">
        <h3>Current Plan: {currentPlan.role}</h3>
        <p><strong>Ads Posted:</strong> {currentPlan.adsPosted} / {currentPlan.adLimit}</p>
        <p><strong>Plan Expiry:</strong> {currentPlan.planExpiry}</p>

        {currentPlan.adsPosted >= currentPlan.adLimit ? (
          <div className="upgrade-box">
            <p>🚫 You've reached your ad limit.</p>
            <button className="upgrade-btn">Buy Additional Ads (₹100 each)</button>
          </div>
        ) : (
          <p>✅ You can still post {currentPlan.adLimit - currentPlan.adsPosted} more ads.</p>
        )}
      </div>

      <div className="upgrade-info">
        <h4>Upgrade Options</h4>
        <ul>
          <li>🔸 Builders Plan – 10 ads / ₹999</li>
          <li>🔹 Agent Plan – 5 ads / ₹499</li>
          <li>⚡ Extra Ads – ₹100 per ad (valid for 28 days)</li>
        </ul>
        <button className="upgrade-btn">Upgrade Plan</button>
      </div>
    </div>
  );
};

export default ListingsPackages;
