// src/components/UserDashboard/RecentActivity.jsx
import React from 'react';

const RecentActivity = () => {
  // Static dummy activity logs — will fetch from Firebase in the future
  const activities = [
    {
      id: 1,
      action: 'Posted a property for sale',
      date: '2025-06-18 11:32 AM',
    },
    {
      id: 2,
      action: 'Updated profile details',
      date: '2025-06-17 03:15 PM',
    },
    {
      id: 3,
      action: 'Saved a listing: "3BHK in Delhi"',
      date: '2025-06-16 09:45 PM',
    },
  ];

  return (
    <div className="p-4">
      <h2>Recent Activity</h2>
      {activities.length === 0 ? (
        <p>No recent activity.</p>
      ) : (
        <ul className="list-group mt-3">
          {activities.map((activity) => (
            <li key={activity.id} className="list-group-item">
              <div className="fw-bold">{activity.action}</div>
              <small className="text-muted">{activity.date}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivity;
