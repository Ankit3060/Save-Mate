import React from 'react';
import {ArrowLeft,Goal,CheckCircle,BarChart2,Download,Mail,Phone,ExternalLink,} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeatureItem = ({ icon, title, children }) => (
  <li className="flex items-start gap-3">
    <span className="shrink-0 p-2 bg-indigo-100 text-indigo-600 rounded-full">
      {icon}
    </span>
    <div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-600">{children}</p>
    </div>
  </li>
);

function About() {
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
            About <span className="text-indigo-600">SaveMate</span>
          </h1>
        </header>

        {/* --- Our Mission Card --- */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Goal className="w-8 h-8 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            At SaveMate, our mission is to empower you with the tools and insights
            needed to take full control of your financial life. We believe that
            understanding your spending is the first step toward financial
            freedom. Our goal is to make transaction tracking simple, intuitive,
            and insightful.
          </p>
        </div>

        {/* --- Key Features Card --- */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
          <ul className="space-y-6">
            <FeatureItem
              icon={<CheckCircle size={20} />}
              title="Daily Transaction Tracking"
            >
              Easily log all your daily incomes and expenses. A clear and simple
              interface helps you stay on top of your finances without the hassle.
            </FeatureItem>
            <FeatureItem
              icon={<BarChart2 size={20} />}
              title="Powerful Visualizations"
            >
              Don't just see your data; understand it. SaveMate provides
              beautiful, easy-to-read charts and graphs that show you exactly
              where your money is going.
            </FeatureItem>
            <FeatureItem
              icon={<Download size={20} />}
              title="Export Your Data"
            >
              Your data is yours. Download your transaction history as an
              Excel file anytime for your personal records, tax preparation, or
              further analysis.
            </FeatureItem>
          </ul>
        </div>

        {/* --- Meet the Developer Card --- */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Meet the Developer
          </h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* Image Section */}
            <div className="shrink-0 p-1 bg-linear-to-br from-indigo-500 to-blue-500 rounded-full shadow-lg">
              <img 
                // IMPORTANT: Replace this placeholder URL with a direct public URL to your image
                src="/profile.jpg"
                alt="Ankit Kumar" 
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
                onError={(e) => {
                  // Fallback in case the image fails to load
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/100x100/e2e8f0/374151?text=AK";
                }}
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-gray-900">Ankit Kumar</h3>
              <p className="text-indigo-600 font-medium">MERN Stack Developer</p>
              
              {/* Contact Info */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-600 mt-4">
                <a
                  href="mailto:ankt330660@gmail.com"
                  className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
                >
                  <Mail size={16} />
                  <span>ankt330660@gmail.com</span>
                </a>
                <a
                  href="tel:9392833614"
                  className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
                >
                  <Phone size={16} />
                  <span>9392833614</span>
                </a>
              </div>

              {/* Portfolio Button */}
              <a
                href="https://ankitkr.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md mt-6"
              >
                Know More About Me
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;