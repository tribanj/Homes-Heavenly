import React from 'react';

const MarketingPromotions = () => {
  return (
    <div className="marketing-promotions" style={{ padding: '30px' }}>
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h2>Marketing & Promotions</h2>
      </div>

      {/* Boost Listing Section */}
      <div className="boost-listing" style={{ marginBottom: '40px' }}>
        <h4>Boost Your Listings</h4>
        <p>Reach more buyers and tenants by boosting your listings. Highlight your properties at the top of search results!</p>
        <button className="btn btn-success" style={{ marginTop: '10px' }}>
          🚀 Boost a Property
        </button>
      </div>

      {/* Social Sharing Section */}
      <div className="social-sharing" style={{ marginBottom: '40px' }}>
        <h4>Share Listings on Social Media</h4>
        <p>Promote your properties easily via Facebook, Instagram, LinkedIn, and WhatsApp.</p>
        <button className="btn btn-primary" style={{ marginTop: '10px' }}>
          📤 Share Now
        </button>
      </div>

      {/* WhatsApp Broadcast Section */}
      <div className="whatsapp-broadcast">
        <h4>WhatsApp Broadcast</h4>
        <p>Send property updates and offers directly to your clients through WhatsApp Broadcast lists.</p>
        <button className="btn btn-info" style={{ marginTop: '10px' }}>
          📲 Start Broadcast
        </button>
      </div>
    </div>
  );
};

export default MarketingPromotions;
