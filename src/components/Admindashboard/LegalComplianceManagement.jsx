// 📁 src/components/Admindashboard/legal/LegalComplianceManagement.js

import React from 'react';
import SidebarMenu from './SidebarMenu';

// Sample document data
const legalDocuments = [
  { id: 1, property: 'Luxury Villa in Mumbai', document: 'Title Deed', status: 'Verified', uploaded: '2025-04-15' },
  { id: 2, property: 'Beach House in Goa', document: 'Sale Agreement', status: 'Pending', uploaded: '2025-04-14' },
  { id: 3, property: 'Commercial Space in Bangalore', document: 'Tax Record', status: 'Rejected', uploaded: '2025-04-13' },
];

function LegalComplianceManagement() {
  return (
    <div className="admin-dashboard-container">
      <SidebarMenu />

      <div className="container mt-5 admin-dashboard-content">
        <h2>📜 Legal & Compliance Management</h2>
        <p>Review and manage property documents and compliance statuses.</p>

        <table className="table table-striped mt-4">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Property</th>
              <th>Document</th>
              <th>Status</th>
              <th>Uploaded On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {legalDocuments.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{doc.property}</td>
                <td>{doc.document}</td>
                <td>
                  <span className={
                    doc.status === 'Verified' ? 'badge bg-success' :
                    doc.status === 'Pending' ? 'badge bg-warning' :
                    doc.status === 'Rejected' ? 'badge bg-danger' :
                    'badge bg-secondary'
                  }>
                    {doc.status}
                  </span>
                </td>
                <td>{doc.uploaded}</td>
                <td>
                  <button className="btn btn-sm btn-success me-2">Verify</button>
                  <button className="btn btn-sm btn-danger me-2">Reject</button>
                  <button className="btn btn-sm btn-warning">Request Document</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {legalDocuments.length === 0 && (
          <div className="alert alert-info text-center">No documents pending review.</div>
        )}
      </div>
    </div>
  );
}

export default LegalComplianceManagement;
