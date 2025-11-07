import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Using react-toastify for notifications
import { MapPin, Phone, Mail, ArrowLeft, Loader2, Send } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

function ContactUs() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    query: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // --- Validation ---
    if (!formData.name || !formData.email || !formData.query) {
      toast.error('Please fill in your name, email, and message.');
      setLoading(false);
      return;
    }

    // --- Prepare template data for EmailJS ---
    const templateData = {
      from_name: formData.name,
      to_name: 'Ankit Kumar', // This can be hardcoded as it's to you
      phone: formData.phone,
      message: formData.query,
      from_email: formData.email,
    };

    const serviceID = import.meta.env.VITE_SERVICE_ID;
    const templateID = import.meta.env.VITE_TEMPLATE_ID;
    const userID = import.meta.env.VITE_USER_ID;

    // --- Send Email ---
    emailjs.send(serviceID, templateID, templateData, userID).then(
      (result) => {
        // On Success: Show success toast and clear form
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: '',
          email: '',
          phone: '',
          query: '',
        });
        setLoading(false);
      },
      (error) => {
        // On Failure: Show error toast
        toast.error('Something went wrong. Please try again later.');
        console.error('EmailJS Error:', error.text);
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 -mb-10 font-inter">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="max-w-max mx-auto mb-6">
            <button
              onClick={() => navigate('/')}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 transition-colors"
              aria-label="Back to Homepage"
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-600">
            We'd love to hear from you! Whether you have a question, feedback, or
            just want to say hello, feel free to reach out.
          </p>
        </div>

        {/* Main Content: Two-column layout */}
        <div className="rounded-2xl shadow-xl overflow-hidden bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side: Company Information */}
            <div className="p-8 lg:p-12 bg-linear-to-br from-indigo-600 to-blue-700 text-white">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-indigo-100 mb-8 leading-relaxed">
                Our team is available to assist you. You can find us at our
                office, give us a call, or drop us an email.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-8 h-8 mt-1 text-indigo-200" />
                  <div>
                    <h3 className="font-semibold text-lg">Our Address</h3>
                    <p className="text-indigo-100">
                      Plot No. 1432, Sector 22 'B', Chandigarh, 160022, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-7 h-7 mt-1 text-indigo-200" />
                  <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className="text-indigo-100">+91 93928 33614</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-7 h-7 mt-1 text-indigo-200" />
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-indigo-100">ankit330660@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-12 pt-8 border-t border-indigo-500">
                <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://x.com/ankit330660"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                  >
                    <FaXTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/Ankit3060"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ankit-kumar-511b31229/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                  >
                    <FaLinkedinIn className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/ankit_ak33/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/1FZxBKzdun/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                  >
                    <FaFacebookF className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-gray-50 placeholder-gray-500"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-gray-50 placeholder-gray-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-gray-50 placeholder-gray-500"
                    placeholder="+91 12345 67890"
                  />
                </div>

                {/* Query/Message */}
                <div>
                  <label
                    htmlFor="query"
                    className="block text-sm font-medium mb-2 text-gray-700"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="query"
                    name="query"
                    rows="5"
                    value={formData.query}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none bg-gray-50 placeholder-gray-500"
                    placeholder="How can we help you today?"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;