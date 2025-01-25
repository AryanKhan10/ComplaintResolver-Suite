import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Grid Layout for Footer Content */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* About Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-white">ReflexCMS</h2>
                        <p className="mt-4 text-sm">
                            ReflexCMS is your trusted platform for submitting and resolving complaints within your university. We ensure
                            your concerns are heard and resolved efficiently.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-indigo-600" />
                                support@reflexcms.com
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faPhone} className="mr-2 text-indigo-600" />
                                +1 (123) 456-7890
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-indigo-600" />
                                123 University Ave, City, Country
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li>
                                <a href="/about" className="hover:text-indigo-400">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/faq" className="hover:text-indigo-400">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="/support" className="hover:text-indigo-400">
                                    Support
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:text-indigo-400">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">Follow Us</h3>
                        <p className="mt-4 text-sm">
                            Stay connected with us on social media for updates and announcements.
                        </p>
                        <div className="flex mt-4 space-x-4">
                            <a href="#" className="p-2 bg-indigo-600 rounded-full hover:bg-indigo-500">
                                <FontAwesomeIcon icon={faFacebookF} className="text-white" />
                            </a>
                            <a href="#" className="p-2 bg-indigo-600 rounded-full hover:bg-indigo-500">
                                <FontAwesomeIcon icon={faTwitter} className="text-white" />
                            </a>
                            <a href="#" className="p-2 bg-indigo-600 rounded-full hover:bg-indigo-500">
                                <FontAwesomeIcon icon={faInstagram} className="text-white" />
                            </a>
                            <a href="#" className="p-2 bg-indigo-600 rounded-full hover:bg-indigo-500">
                                <FontAwesomeIcon icon={faLinkedinIn} className="text-white" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-12 border-t border-gray-700"></div>

                {/* Footer Bottom */}
                <div className="mt-6 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} ReflexCMS. All rights reserved.
                    </p>
                    <ul className="flex space-x-6 text-sm">
                        <li>
                            <a href="/privacy-policy" className="hover:text-indigo-400">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="/terms" className="hover:text-indigo-400">
                                Terms of Service
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
