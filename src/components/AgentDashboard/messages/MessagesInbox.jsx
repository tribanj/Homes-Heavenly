import React from 'react';

const MessagesInbox = () => {
  return (
    <div className="messages-inbox" style={{ padding: '30px' }}>
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h2>📩 Messages / Inbox</h2>
      </div>

      {/* Messages List */}
      <div className="messages-list" style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 8px rgba(0,0,0,0.05)' }}>
        {/* Dummy Messages */}
        <div className="message-item" style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
          <strong>John Doe</strong>
          <p style={{ marginTop: '5px' }}>Hi, I am interested in your listing: Luxury Apartment Downtown. Can we schedule a visit?</p>
          <button className="btn btn-sm btn-primary" style={{ marginTop: '10px' }}>Reply</button>
        </div>

        <div className="message-item" style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
          <strong>Jane Smith</strong>
          <p style={{ marginTop: '5px' }}>Is this property still available for rent? Please let me know!</p>
          <button className="btn btn-sm btn-primary" style={{ marginTop: '10px' }}>Reply</button>
        </div>

        <div className="message-item" style={{ padding: '15px 0' }}>
          <strong>Mark Johnson</strong>
          <p style={{ marginTop: '5px' }}>Can you send me a virtual tour link for your listing?</p>
          <button className="btn btn-sm btn-primary" style={{ marginTop: '10px' }}>Reply</button>
        </div>
      </div>
    </div>
  );
};

export default MessagesInbox;
