
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaHome } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <FaHome className="text-2xl text-amber-400 mr-2" />
                            <span className="text-xl font-bold">DreamHome</span>
                        </div>
                        <p className="text-gray-300">
                            Your trusted partner in finding the perfect property. We connect buyers, sellers, and renters across the country.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-amber-400 transition">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-amber-400 transition">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-amber-400 transition">
                                <FaInstagram className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-amber-400 transition">
                                <FaLinkedin className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b border-amber-400 pb-2 inline-block">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-amber-400 transition">Home</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-amber-400 transition">Properties</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-amber-400 transition">Agents</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-amber-400 transition">Services</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-amber-400 transition">About Us</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-amber-400 transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Property Types */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b border-amber-400 pb-2 inline-block">Property Types</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-amber-400 transition">Apartments</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-amber-400 transition">Villas</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-amber-400 transition">Commercial</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-amber-400 transition">Plots</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-amber-400 transition">PG/Hostel</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-amber-400 transition">Farm Houses</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b border-amber-400 pb-2 inline-block">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <FaMapMarkerAlt className="text-amber-400 mt-1 mr-3 flex-shrink-0" />
                                <span className="text-gray-300">123 Real Estate Avenue, City Center, Chandigarh 160022</span>
                            </div>
                            <div className="flex items-center">
                                <FaPhone className="text-amber-400 mr-3" />
                                <span className="text-gray-300">+91 98765 43210</span>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="text-amber-400 mr-3" />
                                <a href="mailto:info@dreamhome.com" className="text-gray-300 hover:text-amber-400 transition">info@dreamhome.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Subscription */}
                <div className="bg-black bg-opacity-20 rounded-lg p-6 mb-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-xl font-semibold mb-3">Subscribe to Our Newsletter</h3>
                        <p className="text-gray-300 mb-4">
                            Get the latest property listings and real estate news delivered to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-grow px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                            <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2 rounded-md transition">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-3 md:mb-0">
                        © {new Date().getFullYear()} DreamHome Real Estate. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;