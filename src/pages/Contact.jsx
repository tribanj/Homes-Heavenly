import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError('All fields are required.');
      return;
    }

    setError('');
    setSubmitted(true);
    
    // Here you could send the data to your backend or service like EmailJS or Formspree
    console.log('Contact form submitted:', form);

    // Optionally clear the form
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <Container className="py-5">
      <h2>Contact Us</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {submitted && <Alert variant="success">Thank you! We'll get back to you soon.</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Send Message
        </Button>
      </Form>
    </Container>
  );
};

export default ContactUs;
