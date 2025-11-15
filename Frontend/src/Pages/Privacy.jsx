import React from "react";
import {
  ArrowLeft,
  ShieldCheck,
  User,
  Database,
  Settings,
  MessageSquare,
  AlertTriangle,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/themeContext";

const PolicySection = ({ title, icon, children, softDark }) => (
  <div
    className={`rounded-2xl shadow-xl p-8 transition ${
      softDark
        ? "bg-gray-800 border border-gray-700"
        : "bg-white"
    }`}
  >
    <div className="flex items-center gap-3 mb-4">
      <span
        className={`shrink-0 p-2 rounded-full ${
          softDark
            ? "bg-indigo-900 text-indigo-300"
            : "bg-indigo-100 text-indigo-600"
        }`}
      >
        {icon}
      </span>
      <h2
        className={`text-2xl font-bold ${
          softDark ? "text-gray-100" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
    </div>

    <div
      className={`space-y-4 leading-relaxed ${
        softDark ? "text-gray-300" : "text-gray-600"
      }`}
    >
      {children}
    </div>
  </div>
);

function Privacy() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const softDark = theme === "dark";

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 -mb-10 font-inter transition-all duration-300 ${
        softDark
          ? "bg-gray-900 text-gray-100"
          : "bg-linear-to-br from-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <header className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className={`p-2 cursor-pointer rounded-lg border transition-colors ${
              softDark
                ? "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="Back to Homepage"
          >
            <ArrowLeft size={20} />
          </button>

          <h1
            className={`text-4xl font-bold ${
              softDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Privacy Policy
          </h1>
        </header>

        {/* --- Introduction --- */}
        <PolicySection
          title="Introduction"
          icon={<ShieldCheck size={20} />}
          softDark={softDark}
        >
          <p>
            Welcome to SaveMate ("we," "our," or "us"). We are committed to
            protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our application.
          </p>
          <p>
            By using SaveMate, you agree to the collection and use of
            information in accordance with this policy.
          </p>
        </PolicySection>

        {/* --- Information We Collect --- */}
        <PolicySection
          title="Information We Collect"
          icon={<User size={20} />}
          softDark={softDark}
        >
          <p>
            We collect information that you provide directly to us when you use
            SaveMate. This includes:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <strong>Account Information:</strong> name, email, password
              (securely hashed).
            </li>
            <li>
              <strong>Transaction Data:</strong> income, expenses, amounts,
              categories, dates, and descriptions.
            </li>
            <li>
              <strong>Contact Form Inputs:</strong> your name, email, and
              message when you use the contact form.
            </li>
          </ul>
        </PolicySection>

        {/* --- How We Use Your Information --- */}
        <PolicySection
          title="How We Use Your Information"
          icon={<Settings size={20} />}
          softDark={softDark}
        >
          <p>We use the collected information to:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Provide and maintain the SaveMate service.</li>
            <li>Allow you to track and visualize your transactions.</li>
            <li>Enable data download (CSV/Excel).</li>
            <li>Respond to your questions and support requests.</li>
            <li>Improve application performance and features.</li>
            <li>Prevent fraud and unauthorized access.</li>
          </ul>
        </PolicySection>

        {/* --- Data Sharing --- */}
        <PolicySection
          title="Data Sharing and Disclosure"
          icon={<Database size={20} />}
          softDark={softDark}
        >
          <p>
            We do not sell your data. We only share information in these
            limited cases:
          </p>

          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <strong>With Your Consent</strong>
            </li>
            <li>
              <strong>With Service Providers</strong> (hosting, email service,
              etc.)
            </li>
            <li>
              <strong>If Required by Law</strong> (legal process, subpoena,
              etc.)
            </li>
          </ul>

          {/* EmailJS Info Box */}
          <div
            className={`flex items-start gap-3 p-4 rounded-lg border mt-4 transition ${
              softDark
                ? "bg-gray-700 border-gray-600 text-gray-200"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            <MessageSquare
              className={`w-5 h-5 mt-1 shrink-0 ${
                softDark ? "text-blue-300" : "text-blue-600"
              }`}
            />
            <p className="text-sm">
              <strong>Third-Party Email Service (EmailJS):</strong> When you send
              a message through our Contact Form, your data (name, email, and
              message) is processed through EmailJS only to deliver your message
              to us. We do not use it for marketing.
            </p>
          </div>
        </PolicySection>

        {/* --- Security --- */}
        <PolicySection
          title="Data Security"
          icon={<ShieldCheck size={20} />}
          softDark={softDark}
        >
          <p>
            We use secure protocols (HTTPS), password hashing, and best
            practices to keep your data safe.
          </p>
          <p>
            However, no system is 100% secure — we cannot guarantee absolute
            protection against all threats.
          </p>
        </PolicySection>

        {/* --- Children’s Privacy --- */}
        <PolicySection
          title="Children's Privacy"
          icon={<AlertTriangle size={20} />}
          softDark={softDark}
        >
          <p>
            SaveMate is not intended for children under the age of 13. We do
            not knowingly collect information from children under 13.
          </p>
        </PolicySection>

        {/* --- Changes --- */}
        <PolicySection
          title="Changes to This Policy"
          icon={<Settings size={20} />}
          softDark={softDark}
        >
          <p>
            We may update this Privacy Policy occasionally. Continued use of the
            app constitutes acceptance of updated policies.
          </p>
        </PolicySection>

        {/* --- Contact Us --- */}
        <PolicySection
          title="Contact Us"
          icon={<Mail size={20} />}
          softDark={softDark}
        >
          <p>If you have any questions about this Privacy Policy, contact:</p>
          <p
            className={`font-semibold ${
              softDark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Ankit Kumar <br />
            <a
              href="mailto:ankt330660@gmail.com"
              className={`${
                softDark ? "text-indigo-400" : "text-indigo-600"
              } hover:underline`}
            >
              ankt330660@gmail.com
            </a>
          </p>
        </PolicySection>
      </div>
    </div>
  );
}

export default Privacy;