import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.message) {
      setError('Name, email and message are required');
      return;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Save to Firebase
      await addDoc(collection(db, 'messages'), {
        ...form,
        timestamp: serverTimestamp(),
        status: 'unread'
      });

      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Error saving message:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Contact Us
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
            We'd love to hear from you! Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {submitted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg"
              >
                Thank you! Your message has been sent. We'll get back to you soon.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number (Optional)
                </label>
                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="py-3 px-4 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="How can we help you?"
                  />
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70' : ''}`}
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <FaPaperPlane className="mr-2" />
                  )}
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <FaPhone className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="mt-1 text-gray-600">+91 123657890</p>
                    <p className="mt-1 text-gray-600">Mon-Fri, 9am-5pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <FaEnvelope className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="mt-1 text-gray-600">support@example.com</p>
                    <p className="mt-1 text-gray-600">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <FaMapMarkerAlt className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Office</h3>
                    <p className="mt-1 text-gray-600">123 Main Street</p>
                    <p className="mt-1 text-gray-600">New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  title="Office Location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=123%20Main%20Street,%20New%20York+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  className="rounded-lg"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;