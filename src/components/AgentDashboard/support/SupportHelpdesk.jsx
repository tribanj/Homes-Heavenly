import React from 'react';

const SupportHelpdesk = () => {
  return (
    <div className="support-helpdesk" style={{ padding: '30px' }}>
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h2>Support & Helpdesk</h2>
      </div>

      {/* FAQs Section */}
      <div className="faqs" style={{ marginBottom: '40px' }}>
        <h4>Frequently Asked Questions (FAQs)</h4>
        <ul style={{ marginTop: '20px' }}>
          <li style={{ marginBottom: '10px' }}>💬 How to upload my property listing?</li>
          <li style={{ marginBottom: '10px' }}>💬 How to update my agent profile?</li>
          <li style={{ marginBottom: '10px' }}>💬 How can I boost my listings?</li>
          <li style={{ marginBottom: '10px' }}>💬 How to track my commissions?</li>
          <li style={{ marginBottom: '10px' }}>💬 Whom should I contact for urgent support?</li>
        </ul>
      </div>

      {/* Raise a Support Ticket */}
      <div className="support-ticket" style={{ marginBottom: '40px' }}>
        <h4>Raise a Support Ticket</h4>
        <form style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label>Subject:</label><br />
            <input type="text" placeholder="Enter issue subject" className="form-control" />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Message:</label><br />
            <textarea placeholder="Describe your issue" rows="4" className="form-control"></textarea>
          </div>

          <button className="btn btn-primary" style={{ marginTop: '15px' }}>
            🎟️ Submit Ticket
          </button>
        </form>
      </div>

      {/* Live Chat */}
      <div className="live-chat">
        <h4>Live Chat Support</h4>
        <p>Need immediate assistance? Click below to chat with our team.</p>
        <button className="btn btn-success" style={{ marginTop: '10px' }}>
          💬 Start Live Chat
        </button>
      </div>

    </div>
  );
};

export default SupportHelpdesk;
