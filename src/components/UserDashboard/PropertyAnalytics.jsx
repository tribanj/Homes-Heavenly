import React from 'react';
import './PropertyAnalytics.css';

const dummyAnalytics = [
  {
    id: 1,
    title: "2 BHK Flat in Whitefield",
    views: 145,
    inquiries: 12,
    favorites: 8,
  },
  {
    id: 2,
    title: "3 BHK Villa in Hyderabad",
    views: 87,
    inquiries: 5,
    favorites: 3,
  },
];

const PropertyAnalytics = () => {
  return (
    <div className="property-analytics">
      <h2>📈 Property Analytics</h2>
      <div className="analytics-list">
        {dummyAnalytics.map((item) => (
          <div className="analytics-card" key={item.id}>
            <h4>{item.title}</h4>
            <div className="analytics-bar">
              <div className="bar views" style={{ width: `${item.views}px` }}>
                Views: {item.views}
              </div>
              <div className="bar inquiries" style={{ width: `${item.inquiries * 10}px` }}>
                Inquiries: {item.inquiries}
              </div>
              <div className="bar favorites" style={{ width: `${item.favorites * 10}px` }}>
                Favorites: {item.favorites}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyAnalytics;
