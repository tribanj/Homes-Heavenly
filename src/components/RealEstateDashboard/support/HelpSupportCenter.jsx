import React, { useState } from 'react';
import { Card, Button, Form, Accordion } from 'react-bootstrap';

const HelpSupportCenter = () => {
  const [ticket, setTicket] = useState({
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Support Ticket Submitted');
    setTicket({ subject: '', message: '' });
  };

  return (
    <div>
      <h4 className="mb-4">❓ Help & Support Center</h4>

      {/* Raise Ticket */}
      <Card className="p-4 mb-4 shadow-sm">
        <h5>Raise a Support Ticket</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              value={ticket.subject}
              onChange={handleChange}
              placeholder="Issue subject"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              value={ticket.message}
              onChange={handleChange}
              placeholder="Describe your issue"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Ticket
          </Button>
        </Form>
      </Card>

      {/* FAQs */}
      <Card className="p-4 shadow-sm">
        <h5>📘 FAQs & Docs</h5>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>How do I post a property?</Accordion.Header>
            <Accordion.Body>
              Go to "Add New Property", fill in the details, upload media, and click submit.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>How to assign listings to brokers?</Accordion.Header>
            <Accordion.Body>
              Use the "Broker Management" module to assign listings or areas.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>How do I upgrade my ad plan?</Accordion.Header>
            <Accordion.Body>
              Go to "Ads & Promotions", choose a new package, and complete the payment.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card>
    </div>
  );
};

export default HelpSupportCenter;
