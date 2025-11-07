import React from 'react';
import { ArrowLeft, ShieldCheck, User, Database, Settings, MessageSquare, AlertTriangle, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PolicySection = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl shadow-xl p-8">
    <div className="flex items-center gap-3 mb-4">
      <span className="shrink-0 p-2 bg-indigo-100 text-indigo-600 rounded-full">
        {icon}
      </span>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    <div className="space-y-4 text-gray-600 leading-relaxed">
      {children}
    </div>
  </div>
);

function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 -mb-10 font-inter">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 cursor-pointer rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Back to Homepage"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-4xl font-bold text-gray-900">
            Privacy Policy
          </h1>
        </header>


        {/* --- Introduction --- */}
        <PolicySection title="Introduction" icon={<ShieldCheck size={20} />}>
          <p>
            Welcome to SaveMate ("we," "our," or "us"). We are committed to
            protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you
            use our application.
          </p>
          <p>
            By using SaveMate, you agree to the collection and use of
            information in accordance with this policy.
          </p>
        </PolicySection>

        {/* --- Information We Collect --- */}
        <PolicySection title="Information We Collect" icon={<User size={20} />}>
          <p>
            We collect information that you provide directly to us when you use
            SaveMate. This includes:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <strong>Account Information:</strong> When you register, we may
              collect your name, email address, and password (stored in a
              hashed format).
            </li>
            <li>
              <strong>Transaction Data:</strong> All financial data you enter,
              including income, expenses, amounts, categories, dates, and
              descriptions.
            </li>
            <li>
              <strong>Contact Information:</strong> If you contact us via our
              contact form, we collect your name, email, and message.
            </li>
          </ul>
        </PolicySection>

        {/* --- How We Use Your Information --- */}
        <PolicySection title="How We Use Your Information" icon={<Settings size={20} />}>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Provide, operate, and maintain the SaveMate service.</li>
            <li>Allow you to track, manage, and visualize your transactions.</li>
            <li>Enable you to download your transaction data (e.g., as a CSV file).</li>
            <li>Respond to your comments, questions, and support requests via our contact form.</li>
            <li>Monitor and analyze trends, usage, and activities to improve the application.</li>
            <li>Protect our application from fraud and misuse.</li>
          </ul>
        </PolicySection>
        
        {/* --- Data Sharing and Disclosure --- */}
        <PolicySection title="Data Sharing and Disclosure" icon={<Database size={20} />}>
          <p>
            Your privacy is our priority. We do not sell your personal data.
            We may share information in the following limited circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <strong>With Your Consent:</strong> We may share information with your consent.
            </li>
            <li>
              <strong>Service Providers:</strong> We may share information with
              third-party vendors that help us operate our application, such as
              database hosting and (as mentioned below) email delivery.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your information
              if required by law, subpoena, or other legal process.
            </li>
          </ul>
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <MessageSquare className="w-5 h-5 text-blue-600 mt-1 shrink-0"/>
            <p className="text-sm text-blue-800">
              <strong>Third-Party Service (EmailJS):</strong> When you use our
              "Contact Us" form, your name, email, and message are sent to us
              using a third-party service called EmailJS. This information is
              used solely to respond to your inquiry and is not stored by us
              for marketing purposes.
            </p>
          </div>
        </PolicySection>

        {/* --- Data Security --- */}
        <PolicySection title="Data Security" icon={<ShieldCheck size={20} />}>
          <p>
            We take reasonable measures to help protect your personal
            information from loss, theft, misuse, and unauthorized access.
            This includes using secure protocols (HTTPS) and hashing
            passwords.
          </p>
          <p>
            However, please be aware that no security system is impenetrable,
            and we cannot guarantee the absolute security of our database or
            that information you supply will not be intercepted.
          </p>
        </PolicySection>
        
        {/* --- Children's Privacy --- */}
        <PolicySection title="Children's Privacy" icon={<AlertTriangle size={20} />}>
          <p>
            SaveMate is not intended for use by children under the age of 13.
            We do not knowingly collect personal information from children
            under 13. If we become aware that we have, we will take steps to
            delete such information.
          </p>
        </PolicySection>

        {/* --- Changes to This Policy --- */}
        <PolicySection title="Changes to This Policy" icon={<Settings size={20} />}>
          <p>
            We may update this Privacy Policy from time to time. We will
            notify you of any changes by posting the new policy on this page
            and updating the "Last updated" date at the top. We encourage you
            to review this policy periodically.
          </p>
        </PolicySection>

        {/* --- Contact Us --- */}
        <PolicySection title="Contact Us" icon={<Mail size={20} />}>
          <p>
            If you have any questions about this Privacy Policy, please
            contact us at:
          </p>
          <p className="font-semibold text-gray-700">
            Ankit Kumar
            <br />
            <a href="mailto:ankt330660@gmail.com" className="text-indigo-600 hover:underline">
              ankt330660@gmail.com
            </a>
          </p>
        </PolicySection>
      </div>
    </div>
  );
}

export default Privacy;