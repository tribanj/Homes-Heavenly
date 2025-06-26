// src/components/UserDashboard/SubmitInquiryHistory.jsx
import React from 'react';

const SubmitInquiryHistory = () => {
  // Dummy inquiry records
  const inquiries = [
    {
      id: 1,
      propertyTitle: '2BHK Flat in Andheri',
      inquiryDate: '2025-06-15',
      status: 'Pending',
    },
    {
      id: 2,
      propertyTitle: 'Custom Home Construction in Noida',
      inquiryDate: '2025-06-14',
      status: 'In Progress',
    },
    {
      id: 3,
      propertyTitle: 'Rental Property in Whitefield',
      inquiryDate: '2025-06-10',
      status: 'Closed',
    },
  ];

  return (
    <div className="p-4">
      <h2>Inquiry History</h2>
      {inquiries.length === 0 ? (
        <p>You haven’t submitted any inquiries yet.</p>
      ) : (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Property</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td>{inquiry.propertyTitle}</td>
                <td>{inquiry.inquiryDate}</td>
                <td>{inquiry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubmitInquiryHistory;
