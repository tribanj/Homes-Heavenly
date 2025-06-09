import React from 'react';

const AgentProfile = () => {
  return (
    <div className="agent-profile" style={{ padding: '30px' }}>
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h2>Agent Profile & Settings</h2>
      </div>

      {/* Profile Information */}
      <div className="profile-info" style={{ marginBottom: '40px' }}>
        <h4>Basic Information</h4>
        <form style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label>Full Name:</label><br />
            <input type="text" placeholder="Enter full name" className="form-control" />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Email:</label><br />
            <input type="email" placeholder="Enter email address" className="form-control" />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Phone Number:</label><br />
            <input type="text" placeholder="Enter phone number" className="form-control" />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Area of Expertise:</label><br />
            <input type="text" placeholder="Ex: Residential, Commercial, Rentals" className="form-control" />
          </div>

          <button className="btn btn-success" style={{ marginTop: '15px' }}>
            💾 Save Changes
          </button>
        </form>
      </div>

      {/* Upload Certifications / KYC Section */}
      <div className="upload-certifications" style={{ marginBottom: '40px' }}>
        <h4>Upload Certifications & KYC Documents</h4>
        <p>Enhance your trust profile by uploading your verified certifications and KYC.</p>
        <button className="btn btn-info" style={{ marginTop: '10px' }}>
          📤 Upload Documents
        </button>
      </div>

      {/* Change Password Section */}
      <div className="change-password">
        <h4>Change Password</h4>
        <form style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label>Current Password:</label><br />
            <input type="password" placeholder="Enter current password" className="form-control" />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>New Password:</label><br />
            <input type="password" placeholder="Enter new password" className="form-control" />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Confirm New Password:</label><br />
            <input type="password" placeholder="Confirm new password" className="form-control" />
          </div>

          <button className="btn btn-warning" style={{ marginTop: '15px' }}>
            🔒 Update Password
          </button>
        </form>
      </div>

    </div>
  );
};

export default AgentProfile;
