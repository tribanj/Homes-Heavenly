import React from 'react';
import './MessagesInquiries.css';

const dummyMessages = [
  {
    id: 1,
    sender: "Ravi Kumar",
    subject: "Interest in 2 BHK Apartment",
    message: "Hi, I'm interested in your 2 BHK in Whitefield. Can we schedule a visit?",
    time: "10 min ago"
  },
  {
    id: 2,
    sender: "Anjali Patel",
    subject: "Query about Villa in Hyderabad",
    message: "Please share more details about the 3 BHK villa.",
    time: "1 hour ago"
  }
];

const MessagesInquiries = () => {
  return (
    <div className="messages-inquiries">
      <h2>💬 Messages & Inquiries</h2>
      <div className="message-list">
        {dummyMessages.map((msg) => (
          <div className="message-card" key={msg.id}>
            <div className="message-info">
              <h4>{msg.subject}</h4>
              <p><strong>From:</strong> {msg.sender}</p>
              <p className="preview">{msg.message}</p>
              <span className="timestamp">{msg.time}</span>
            </div>
            <div className="message-actions">
              <button className="view-btn">View</button>
              <button className="reply-btn">Reply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesInquiries;
