import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Loader2,
  Send,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/themeContext";

function ContactUs() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const softDark = theme === "dark";

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.query) {
      toast.error("Please fill in your name, email, and message.");
      setLoading(false);
      return;
    }

    const templateData = {
      from_name: formData.name,
      to_name: "Ankit Kumar",
      phone: formData.phone,
      message: formData.query,
      from_email: formData.email,
    };

    const serviceID = import.meta.env.VITE_SERVICE_ID;
    const templateID = import.meta.env.VITE_TEMPLATE_ID;
    const userID = import.meta.env.VITE_USER_ID;

    emailjs.send(serviceID, templateID, templateData, userID).then(
      () => {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          query: "",
        });
        setLoading(false);
      },
      () => {
        toast.error("Something went wrong. Try again later.");
        setLoading(false);
      }
    );
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 -mb-10 font-inter transition-all duration-300 ${
        softDark
          ? "bg-gray-900 text-gray-100"
          : "bg-linear-to-br from-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="max-w-max mx-auto mb-6">
            <button
              onClick={() => navigate("/")}
              className={`flex cursor-pointer items-center gap-2 text-sm transition-colors ${
                softDark
                  ? "text-gray-300 hover:text-indigo-400"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>

          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed ${
              softDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            We'd love to hear from you! Whether you have a question, feedback,
            or just want to say hello, feel free to reach out.
          </p>
        </div>

        {/* Main Card */}
        <div
          className={`rounded-2xl shadow-xl overflow-hidden transition ${
            softDark ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Info Panel */}
            <div className="p-8 lg:p-12 bg-linear-to-br from-indigo-600 to-blue-700 text-white">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>

              <p className="text-indigo-100 mb-8 leading-relaxed">
                Our team is available to assist you. You can find us at our
                office, give us a call, or drop us an email.
              </p>

              {/* Info Items */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-indigo-200 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Our Address</h3>
                    <p className="text-indigo-100">
                      Plot No. 1432, Sector 22 'B', Chandigarh, 160022, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-7 h-7 text-indigo-200 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className="text-indigo-100">+91 93928 33614</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-7 h-7 text-indigo-200 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-indigo-100">ankit330660@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="mt-12 pt-8 border-t border-indigo-400/50">
                <h3 className="font-semibold text-lg mb-4">Follow Us</h3>

                <div className="flex space-x-4">
                  {[
                    {
                      icon: <FaXTwitter className="w-5 h-5" />,
                      link: "https://x.com/ankit330660",
                    },
                    {
                      icon: <FaGithub className="w-5 h-5" />,
                      link: "https://github.com/Ankit3060",
                    },
                    {
                      icon: <FaLinkedinIn className="w-5 h-5" />,
                      link: "https://www.linkedin.com/in/ankit-kumar-511b31229/",
                    },
                    {
                      icon: <FaInstagram className="w-5 h-5" />,
                      link: "https://www.instagram.com/ankit_ak33/",
                    },
                    {
                      icon: <FaFacebookF className="w-5 h-5" />,
                      link: "https://www.facebook.com/share/1FZxBKzdun/",
                    },
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="p-8 lg:p-12">
              <h2
                className={`text-3xl font-bold mb-6 ${
                  softDark ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      softDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition placeholder-gray-500 ${
                      softDark
                        ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-indigo-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500"
                    }`}
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      softDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition placeholder-gray-500 ${
                      softDark
                        ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-indigo-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500"
                    }`}
                    placeholder="you@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      softDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition placeholder-gray-500 ${
                      softDark
                        ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-indigo-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500"
                    }`}
                    placeholder="+91 12345 67890"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      softDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Your Message
                  </label>
                  <textarea
                    name="query"
                    rows="5"
                    value={formData.query}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 resize-none rounded-lg border focus:outline-none focus:ring-2 transition placeholder-gray-500 ${
                      softDark
                        ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-indigo-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-500"
                    }`}
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full cursor-pointer flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 ${
                    softDark
                      ? "bg-indigo-700 hover:bg-indigo-800 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;