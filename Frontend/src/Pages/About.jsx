import React from "react";
import {ArrowLeft,Goal,CheckCircle,BarChart2,Download,Mail,Phone,ExternalLink,} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/themeContext";

const FeatureItem = ({ icon, title, children, softDark }) => (
  <li className="flex items-start gap-3">
    <span
      className={`shrink-0 p-2 rounded-full ${
        softDark ? "bg-indigo-800 text-indigo-200" : "bg-indigo-100 text-indigo-600"
      }`}
    >
      {icon}
    </span>
    <div>
      <h4
        className={`font-semibold ${
          softDark ? "text-gray-100" : "text-gray-800"
        }`}
      >
        {title}
      </h4>
      <p className={`${softDark ? "text-gray-300" : "text-gray-600"}`}>
        {children}
      </p>
    </div>
  </li>
);

function About() {
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
        <header className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className={`p-2 rounded-lg border cursor-pointer transition-colors ${
              softDark
                ? "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="Back to Homepage"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-4xl font-bold">
            About{" "}
            <span className={`${softDark ? "text-indigo-400" : "text-indigo-600"}`}>
              SaveMate
            </span>
          </h1>
        </header>

        {/* Our Mission Card */}
        <div
          className={`rounded-2xl shadow-xl p-8 transition ${
            softDark ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <Goal className={`${softDark ? "text-indigo-400" : "text-indigo-600"} w-8 h-8`} />
            <h2 className={`text-2xl font-bold ${softDark ? "text-gray-100" : "text-gray-900"}`}>
              Our Mission
            </h2>
          </div>
          <p className={`${softDark ? "text-gray-300" : "text-gray-600"} text-lg leading-relaxed`}>
            At SaveMate, our mission is to empower you with the tools and insights
            needed to take full control of your financial life. We believe that
            understanding your spending is the first step toward financial
            freedom. Our goal is to make transaction tracking simple, intuitive,
            and insightful.
          </p>
        </div>

        {/* Key Features Card */}
        <div
          className={`rounded-2xl shadow-xl p-8 transition ${
            softDark ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-6 ${
              softDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            What We Offer
          </h2>
          <ul className="space-y-6">
            <FeatureItem
              icon={<CheckCircle size={20} />}
              title="Daily Transaction Tracking"
              softDark={softDark}
            >
              Easily log all your daily incomes and expenses. A clear and simple
              interface helps you stay on top of your finances without the hassle.
            </FeatureItem>
            <FeatureItem
              icon={<BarChart2 size={20} />}
              title="Powerful Visualizations"
              softDark={softDark}
            >
              Don’t just see your data; understand it. SaveMate provides
              beautiful, easy-to-read charts and graphs that show you exactly
              where your money is going.
            </FeatureItem>
            <FeatureItem
              icon={<Download size={20} />}
              title="Export Your Data"
              softDark={softDark}
            >
              Your data is yours. Download your transaction history anytime for
              personal records, tax prep, or deeper analysis.
            </FeatureItem>
          </ul>
        </div>

        {/* Meet the Developer Card */}
        <div
          className={`rounded-2xl shadow-xl p-8 transition ${
            softDark ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-6 ${
              softDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Meet the Developer
          </h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Image */}
            <div className="shrink-0 p-1 rounded-full shadow-lg transition bg-linear-to-br from-indigo-500 to-blue-500">
              <img
                src="/profile.jpg"
                alt="Ankit Kumar"
                className="w-24 h-24 object-cover rounded-full border-4 border-white"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/100x100/e2e8f0/374151?text=AK";
                }}
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h3 className={`text-xl font-bold ${softDark ? "text-gray-100" : "text-gray-900"}`}>
                Ankit Kumar
              </h3>
              <p className={`${softDark ? "text-indigo-300" : "text-indigo-600"} font-medium`}>
                MERN Stack Developer
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm mt-4">
                <a
                  href="mailto:ankt330660@gmail.com"
                  className={`flex items-center gap-1.5 transition-colors ${
                    softDark ? "text-gray-300 hover:text-indigo-400" : "text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  <Mail size={16} />
                  <span>ankt330660@gmail.com</span>
                </a>
                <a
                  href="tel:9392833614"
                  className={`flex items-center gap-1.5 transition-colors ${
                    softDark ? "text-gray-300 hover:text-indigo-400" : "text-gray-600 hover:text-indigo-600"
                  }`}
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
                className={`inline-flex items-center gap-2 px-5 py-3 mt-6 rounded-lg font-semibold transition-shadow ${
                  softDark
                    ? "bg-indigo-700 hover:bg-indigo-800 text-white shadow-lg"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                }`}
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