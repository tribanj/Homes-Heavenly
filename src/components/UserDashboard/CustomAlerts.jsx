import React, { useState } from 'react';
import './CustomAlerts.css';

const CustomAlerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, location: 'Mumbai', type: '2BHK', price: '50L', active: true },
    { id: 2, location: 'Pune', type: '1BHK', price: '30L', active: false },
  ]);

  const toggleAlert = (id) => {
    const updated = alerts.map(alert =>
      alert.id === id ? { ...alert, active: !alert.active } : alert
    );
    setAlerts(updated);
  };

  const deleteAlert = (id) => {
    const updated = alerts.filter(alert => alert.id !== id);
    setAlerts(updated);
  };

  return (
    <div className="custom-alerts">
      <h2>🔔 Custom Alerts</h2>

      {alerts.length === 0 ? (
        <p>No alerts added yet.</p>
      ) : (
        <ul className="alert-list">
          {alerts.map(alert => (
            <li key={alert.id}>
              <div>
                📍 <strong>{alert.type}</strong> in <strong>{alert.location}</strong> under ₹{alert.price}
              </div>
              <div>
                <button onClick={() => toggleAlert(alert.id)}>
                  {alert.active ? 'Disable' : 'Enable'}
                </button>
                <button onClick={() => deleteAlert(alert.id)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="add-alert">
        <h4>Add New Alert (Coming Soon)</h4>
        <input placeholder="e.g., Delhi" disabled />
        <input placeholder="e.g., 3BHK" disabled />
        <input placeholder="e.g., 60L" disabled />
        <button disabled>Add Alert</button>
      </div>
    </div>
  );
};

export default CustomAlerts;
