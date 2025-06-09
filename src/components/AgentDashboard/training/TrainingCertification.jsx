import React from 'react';

const TrainingCertification = () => {
  return (
    <div className="training-certification" style={{ padding: '30px' }}>
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h2>Training & Certification</h2>
      </div>

      {/* Webinars Section */}
      <div className="webinars" style={{ marginBottom: '40px' }}>
        <h4>Free Webinars & Workshops</h4>
        <p>Join our free live webinars to improve your selling skills, learn new marketing strategies, and grow your client base.</p>
        <button className="btn btn-success" style={{ marginTop: '10px' }}>
          🎓 View Upcoming Webinars
        </button>
      </div>

      {/* Badges and Certifications Section */}
      <div className="badges-certifications" style={{ marginBottom: '40px' }}>
        <h4>Earn Badges & Certifications</h4>
        <p>Complete courses and earn badges to showcase your skills and expertise to your clients.</p>
        <button className="btn btn-primary" style={{ marginTop: '10px' }}>
          🏆 View My Certifications
        </button>
      </div>

      {/* Upload Certifications Section */}
      <div className="upload-certifications">
        <h4>Upload Your Certifications</h4>
        <p>Enhance your profile by uploading your professional certifications and licenses.</p>
        <button className="btn btn-info" style={{ marginTop: '10px' }}>
          📤 Upload Certification
        </button>
      </div>
    </div>
  );
};

export default TrainingCertification;
