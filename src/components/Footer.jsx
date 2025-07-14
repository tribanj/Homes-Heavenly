import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { RiHome3Line } from 'react-icons/ri';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <RiHome3Line className="text-3xl text-orange-500 mr-3" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                                Homes Heavenly
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Curating exceptional living experiences through premium real estate solutions across India's most sought-after locations.
                        </p>
                        <div className="flex space-x-5">
                            <a href="#" className="text-gray-400 hover:text-orange-500 transition-transform hover:-translate-y-1">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-orange-500 transition-transform hover:-translate-y-1">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-orange-500 transition-transform hover:-translate-y-1">
                                <FaInstagram className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-orange-500 transition-transform hover:-translate-y-1">
                                <FaLinkedin className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-orange-500">
                            Explore
                        </h3>
                        <ul className="space-y-3">
                            {['Premium Listings', 'Luxury Villas', 'Penthouse', 'Gated Communities', 'Waterfront', 'Smart Homes'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-orange-500 transition flex items-start group">
                                        <span className="text-orange-500 opacity-0 group-hover:opacity-100 mr-1 mt-1">•</span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cities */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-orange-500">
                            Top Cities
                        </h3>
                        <ul className="space-y-3">
                            {['Mumbai', 'Delhi NCR', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'].map((city) => (
                                <li key={city}>
                                    <a href="#" className="text-gray-400 hover:text-orange-500 transition flex items-start group">
                                        <span className="text-orange-500 opacity-0 group-hover:opacity-100 mr-1 mt-1">•</span>
                                        {city}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-orange-500">
                            Connect
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <FaMapMarkerAlt className="text-orange-500 mt-1 mr-4 flex-shrink-0" />
                                <span className="text-gray-400">
                                    24, Luxury Tower, Golf Course Road, Sector 54, Gurugram 122002
                                </span>
                            </div>
                            <div className="flex items-center">
                                <FaPhone className="text-orange-500 mr-4" />
                                <a href="tel:+911234567890" className="text-gray-400 hover:text-orange-500 transition">
                                    +91 12345 67890
                                </a>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="text-orange-500 mr-4" />
                                <a href="mailto:contact@luxeproperties.com" className="text-gray-400 hover:text-orange-500 transition">
                                    contact@luxeproperties.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-12 border border-gray-700/50">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="text-2xl font-bold text-white mb-3">
                            Join Our <span className="text-orange-500">Exclusive</span> Community
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                            Get early access to premium listings, insider market trends, and luxury property showcases.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-grow px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            <button className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-orange-500/20">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} HomesHeavenly. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-500 hover:text-orange-500 text-sm transition">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-orange-500 text-sm transition">Terms of Service</a>
                        <a href="#" className="text-gray-500 hover:text-orange-500 text-sm transition">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;