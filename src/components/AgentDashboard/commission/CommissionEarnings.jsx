import React from 'react';

const CommissionEarnings = () => {
  return (
    <div className="commission-earnings" style={{ padding: '30px' }}>
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h2>Commission & Earnings</h2>
      </div>

      {/* Commission Summary */}
      <div className="commission-summary" style={{ marginBottom: '30px' }}>
        <h4>Total Earnings</h4>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
          ₹2,50,000
        </div>
      </div>

      {/* Deals Table */}
      <div className="deals-table">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Property</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Client</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Deal Value</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Commission %</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Commission Earned</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy Deal Row */}
            <tr>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>Luxury Villa - Downtown</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>John Doe</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>₹50,00,000</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>2%</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>₹1,00,000</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>Completed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommissionEarnings;
