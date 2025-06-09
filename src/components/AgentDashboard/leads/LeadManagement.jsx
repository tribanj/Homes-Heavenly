import React from 'react';
import { Link } from 'react-router-dom';

const LeadManagement = () => {
  return (
    <div className="lead-management" style={{ padding: '30px' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2>Lead Management (CRM)</h2>
        <Link to="/agent-dashboard/lead-management/add" className="btn btn-primary">➕ Add New Lead</Link>
      </div>

      {/* Leads Table */}
      <div className="leads-table">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Phone</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Email</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Status</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy Lead */}
            <tr>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>John Doe</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>+1 987 654 3210</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>john@example.com</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>New Lead</td>
              <td style={{ padding: '10px', border: '1px solid #eee' }}>
                <button className="btn btn-sm btn-info" style={{ marginRight: '5px' }}>View</button>
                <button className="btn btn-sm btn-success" style={{ marginRight: '5px' }}>Follow-up</button>
                <button className="btn btn-sm btn-warning">Add Note</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadManagement;
