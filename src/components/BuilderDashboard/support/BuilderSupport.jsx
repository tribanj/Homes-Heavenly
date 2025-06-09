import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const BuilderSupportContact = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('📩 Support ticket submitted successfully!');
    // 📬 In real case, this would be an API POST request
    setFormData({ subject: '', message: '', email: '' });
  };

  return (
    <div>
      <h4 className="mb-4">📞 Support / Contact Admin</h4>
      <Card className="p-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              placeholder="Issue Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message / Query</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              rows={5}
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit Ticket
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default BuilderSupportContact;
