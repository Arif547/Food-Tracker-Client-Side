import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
            <div className="max-w-[1280px] mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Food Saver</h2>
                        <p className="mt-4 text-gray-300">Tracking your food journey with precision and care. Making healthy choices easier than ever.</p>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-center md:justify-start">
                                <FaPhone className="text-blue-400 mr-2" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start">
                                <FaEnvelope className="text-blue-400 mr-2" />
                                <a href="mailto:contact@FoodTracker.com" className="hover:text-blue-400 transition-colors">contact@FoodSaver.com</a>
                            </div>
                            <div className="flex items-center justify-center md:justify-start">
                                <FaMapMarkerAlt className="text-blue-400 mr-2" />
                                <span>123 Food Street, Cuisine City</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                className="bg-gray-700 p-3 rounded-full hover:bg-blue-600 transition-colors">
                                <FaFacebookF className="text-xl" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                className="bg-gray-700 p-3 rounded-full hover:bg-blue-400 transition-colors">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                className="bg-gray-700 p-3 rounded-full hover:bg-blue-700 transition-colors">
                                <FaLinkedinIn className="text-xl" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                className="bg-gray-700 p-3 rounded-full hover:bg-pink-600 transition-colors">
                                <FaInstagram className="text-xl" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-700 text-center">
                    <p className="text-gray-400">© {new Date().getFullYear()} Food Tracker. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
