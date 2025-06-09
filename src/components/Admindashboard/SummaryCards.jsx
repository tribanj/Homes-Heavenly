// 📁 src/components/admindashboard/SummaryCards.js

import React from 'react';
import './SummaryCards.css';  // optional: for custom styles

function SummaryCards() {
  const summaryData = [
    { title: "Active Users (Logged In)", count: 123, icon: "🟢" },
    { title: "Total Signups", count: 578, icon: "🧑‍💻" },
    { title: "Total Listed Properties", count: 325, icon: "🏘️" },
    { title: "Total Services Posted", count: 210, icon: "🧰" },
    { title: "Appointments Booked", count: 75, icon: "📅" },
    { title: "Payments Completed", count: 48, icon: "💳" },
  ];

  return (
    <div className="row">
      {summaryData.map((item, index) => (
        <div key={index} className="col-md-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <h2>{item.icon}</h2>
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text display-6">{item.count}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
