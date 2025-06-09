// 📁 src/components/Admindashboard/analytics/UserSearchAnalytics.js

import React from 'react';
import SidebarMenu from './SidebarMenu';  // Ensure this path is correct

// Sample data for User Search Analytics
const searchAnalyticsData = [
  { id: 1, location: 'Mumbai', keyword: 'Luxury Villa', priceRange: '₹2,000,000 - ₹5,000,000', searches: 120 },
  { id: 2, location: 'Goa', keyword: 'Beach House', priceRange: '₹1,500,000 - ₹4,500,000', searches: 95 },
  { id: 3, location: 'Bangalore', keyword: 'Office Space', priceRange: '₹500,000 - ₹1,500,000', searches: 70 },
  { id: 4, location: 'Chennai', keyword: 'Apartment', priceRange: '₹1,000,000 - ₹3,000,000', searches: 110 },
];

function UserSearchAnalytics() {
  return (
    <div className="admin-dashboard-container">
      <SidebarMenu />

      <div className="container mt-5 admin-dashboard-content">
        <h2>📊 User Search Analytics</h2>
        <p>Track popular searches, trending locations, and price range data to gain insights into user behavior.</p>

        <table className="table table-striped mt-4">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Keyword</th>
              <th>Price Range</th>
              <th>Number of Searches</th>
            </tr>
          </thead>
          <tbody>
            {searchAnalyticsData.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.location}</td>
                <td>{data.keyword}</td>
                <td>{data.priceRange}</td>
                <td>{data.searches}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {searchAnalyticsData.length === 0 && (
          <div className="alert alert-info text-center">No search data available.</div>
        )}
      </div>
    </div>
  );
}

export default UserSearchAnalytics;
