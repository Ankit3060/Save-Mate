import React from "react";
import {
  ArrowLeft,
  FileText,
  User,
  Shield,
  BarChart2,
  AlertTriangle,
  Scale,
  Settings,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/themeContext";

const TermsSection = ({ title, icon, children, softDark }) => (
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

function Terms() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const softDark = theme === "dark";

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 -mb-10 font-inter transition-all duration-300 ${
        softDark
          ? "bg-gray-900 text-gray-100"
          : "bg-linear-to-br from-blue-50 to-indigo-100"
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
            Terms & Conditions
          </h1>
        </header>

        {/* --- 1. Introduction --- */}
        <TermsSection
          title="Acceptance of Terms"
          icon={<FileText size={20} />}
          softDark={softDark}
        >
          <p>
            Welcome to SaveMate ("we," "our," or "us"). These Terms and
            Conditions govern your use of our web application ("Service"). By
            accessing or using the Service, you agree to be bound by these Terms.
          </p>
          <p className={softDark ? "text-gray-200 font-semibold" : "text-gray-700 font-semibold"}>
            This is a general template. For legally-binding terms, consult a legal
            professional.
          </p>
        </TermsSection>

        {/* --- 2. User Accounts --- */}
        <TermsSection
          title="User Accounts"
          icon={<User size={20} />}
          softDark={softDark}
        >
          <p>
            You must provide accurate information when creating your account. You
            are responsible for safeguarding your password and all activity under
            your account.
          </p>
          <p>You must notify us immediately of any unauthorized access.</p>
        </TermsSection>

        {/* --- 3. User Data --- */}
        <TermsSection
          title="Your Financial Data"
          icon={<BarChart2 size={20} />}
          softDark={softDark}
        >
          <p>
            You retain full ownership of all financial data (income, expenses,
            etc.) entered into SaveMate.
          </p>
          <p>
            We use your data solely to provide app functionalities — we never sell
            or misuse your personal financial information.
          </p>
        </TermsSection>

        {/* --- 4. Disclaimers --- */}
        <TermsSection
          title="Disclaimers"
          icon={<AlertTriangle size={20} />}
          softDark={softDark}
        >
          <p>
            The Service is provided on an "AS IS" basis without warranties of any
            kind.
          </p>
          <p className={softDark ? "text-gray-200 font-semibold" : "text-gray-800 font-semibold"}>
            SaveMate is a financial tracking tool, not a financial advisor. Data
            provided does not constitute financial advice.
          </p>
        </TermsSection>

        {/* --- 5. Limitation of Liability --- */}
        <TermsSection
          title="Limitation of Liability"
          icon={<Shield size={20} />}
          softDark={softDark}
        >
          <p>
            SaveMate and its developers shall not be liable for any indirect or
            consequential damages, including loss of data or decisions made based
            on the app's outputs.
          </p>
        </TermsSection>

        {/* --- 6. Governing Law --- */}
        <TermsSection
          title="Governing Law"
          icon={<Scale size={20} />}
          softDark={softDark}
        >
          <p>
            These Terms are governed by the laws of India. Failure to enforce any
            provision does not constitute a waiver of rights.
          </p>
        </TermsSection>

        {/* --- 7. Changes to Terms --- */}
        <TermsSection
          title="Changes to Terms"
          icon={<Settings size={20} />}
          softDark={softDark}
        >
          <p>
            We may update these Terms occasionally. Updates will be posted here
            with an updated "Last updated" date.
          </p>
        </TermsSection>

        {/* --- 8. Contact Us --- */}
        <TermsSection
          title="Contact Us"
          icon={<Mail size={20} />}
          softDark={softDark}
        >
          <p>If you have any questions, contact:</p>
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
        </TermsSection>
      </div>
    </div>
  );
}

export default Terms;
