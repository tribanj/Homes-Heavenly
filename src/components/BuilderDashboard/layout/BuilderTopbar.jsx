import React from 'react';

const BuilderTopbar = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #ddd',
    }}>
      <h2 style={{ margin: 0 }}>Dashboard</h2>
      <div>
        <button style={{
          padding: '8px 12px',
          marginLeft: '10px',
          border: 'none',
          backgroundColor: '#007bff',
          color: 'white',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Notifications
        </button>
        <button style={{
          padding: '8px 12px',
          marginLeft: '10px',
          border: 'none',
          backgroundColor: '#6c757d',
          color: 'white',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Profile
        </button>
      </div>
    </div>
  );
};

export default BuilderTopbar;
