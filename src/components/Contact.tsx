import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-10">Contact Us</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-6">
          <p className="text-lg">
            We'd love to hear from you! Whether you have questions about
            memberships, classes, or facilities — our team is here to help.
          </p>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Gym Location</h2>
            <p>123 sangam street, Gaidakot City, GN 12345</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Phone</h2>
            <p>(+977) 9800761486</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Email</h2>
            <p>info@hamrogym.com</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Working Hours</h2>
            <p>Mon - Fri: 6:00 AM - 10:00 PM</p>
            <p>Sat - Sun: 8:00 AM - 8:00 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-xl font-semibold transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
