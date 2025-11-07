import React from 'react';
import { ArrowLeft, FileText, User, Shield, BarChart2, AlertTriangle, Scale, Settings, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsSection = ({ title, icon, children }) => (
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

function Terms() {
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
            Terms & Conditions
          </h1>
        </header>

        {/* --- 1. Introduction --- */}
        <TermsSection title="Acceptance of Terms" icon={<FileText size={20} />}>
          <p>
            Welcome to SaveMate ("we," "our," or "us"). These Terms and
            Conditions ("Terms") govern your use of our web application
            (the "Service"). By accessing or using our Service, you agree to be
            bound by these Terms. If you disagree with any part of the terms,
            then you may not access the Service.
          </p>
          <p className="font-semibold text-gray-700">
            This is a general template. For a real, legally-binding document, you should consult with a legal professional.
          </p>
        </TermsSection>

        {/* --- 2. User Accounts --- */}
        <TermsSection title="User Accounts" icon={<User size={20} />}>
          <p>
            When you create an account with us, you must provide information
            that is accurate and complete. You are responsible for safeguarding
            the password that you use to access the Service and for any
            activities or actions under your password.
          </p>
          <p>
            You agree not to disclose your password to any third party. You
            must notify us immediately upon becoming aware of any breach of
            security or unauthorized use of your account.
          </p>
        </TermsSection>

        {/* --- 3. User Data --- */}
        <TermsSection title="Your Financial Data" icon={<BarChart2 size={20} />}>
          <p>
            You are solely responsible for the financial data (income,
            expenses, descriptions, etc.) that you upload, post, or otherwise
            provide to the Service ("User Data"). You retain full ownership
            of your User Data.
          </p>
          <p>
            We will only use your User Data to provide the Service to you,
            such as generating visualizations and allowing you to download your
            data. We will not sell or share your individual User Data with
            third parties for marketing purposes.
          </p>
        </TermsSection>

        {/* --- 4. Disclaimers --- */}
        <TermsSection title="Disclaimers" icon={<AlertTriangle size={20} />}>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
            We make no warranties, express or implied, regarding the
            operation or availability of the Service, or the accuracy of the
            information.
          </p>
          <p className="font-semibold text-gray-800">
            SaveMate is a tracking tool, not a financial advisor. The
            visualizations and data provided do not constitute financial,
            investment, or legal advice. You should consult with a
            professional for such advice.
          </p>
        </TermsSection>

        {/* --- 5. Limitation of Liability --- */}
        <TermsSection title="Limitation of Liability" icon={<Shield size={20} />}>
          <p>
            In no event shall SaveMate or its developers be liable for any
            indirect, incidental, special, consequential, or punitive damages,
            including without limitation, loss of profits, data, or other
            intangibles, arising out of or in connection with your use of the
            Service.
          </p>
          <p>
            We are not responsible for the accuracy of the financial data you
            enter or for any financial decisions you make based on the data
            presented by the Service.
          </p>
        </TermsSection>

        {/* --- 6. Governing Law --- */}
        <TermsSection title="Governing Law" icon={<Scale size={20} />}>
          <p>
            These Terms shall be governed and construed in accordance with
            the laws of India, without regard to its conflict of law
            provisions. Our failure to enforce any right or provision of these
            Terms will not be considered a waiver of those rights.
          </p>
        </TermsSection>

        {/* --- 7. Changes to Terms --- */}
        <TermsSection title="Changes to Terms" icon={<Settings size={20} />}>
          <p>
            We reserve the right, at our sole discretion, to modify or
            replace these Terms at any time. We will provide notice of any
            changes by posting the new Terms on this page and updating the
            "Last updated" date.
          </p>
        </TermsSection>

        {/* --- 8. Contact Us --- */}
        <TermsSection title="Contact Us" icon={<Mail size={20} />}>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="font-semibold text-gray-700">
            Ankit Kumar
            <br />
            <a href="mailto:ankt330660@gmail.com" className="text-indigo-600 hover:underline">
              ankt330660@gmail.com
            </a>
          </p>
        </TermsSection>
      </div>
    </div>
  );
}

export default Terms;