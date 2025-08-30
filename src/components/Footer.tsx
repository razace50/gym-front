import type React from "react";
import {
  FaDumbbell,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 lg:pt-0 ">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaDumbbell className="text-secondary text-2xl" />
              <h2 className="text-xl font-bold text-white">Hamro Gym</h2>
            </div>
            <p className="text-sm leading-relaxed left-8">
              We are dedicated to helping you achieve your fitness goals in a
              motivating and supportive environment. Join our community today!
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-secondary transition-colors"
              >
                <FaFacebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-secondary transition-colors"
              >
                <FaInstagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-secondary transition-colors"
              >
                <FaTwitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-secondary transition-colors"
              >
                <FaYoutube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/classes"
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Classes
                </a>
              </li>
              <li>
                <a
                  href="trainers"
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Trainers
                </a>
              </li>
              <li>
                <a
                  href="membership"
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Membership
                </a>
              </li>
              <li>
                <a
                  href="contact"
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-secondary mt-1 flex-shrink-0" />
                <span className="text-gray-400 hover:text-secondary">123 sangam street, Gaidakot City, GN 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-secondary flex-shrink-0" />
                <span className="text-gray-400 hover:text-secondary">(+977) 9800761486</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-secondary flex-shrink-0" />
                <span className="text-gray-400 hover:text-secondary">info@hamrogym.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-400">Monday - Friday</span>
                <span>5:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Saturday</span>
                <span>6:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Sunday</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
            </ul>
            <div className="pt-4">
              <h4 className="text-white font-medium mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-3 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {currentYear} Hamro Gym. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0 text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
