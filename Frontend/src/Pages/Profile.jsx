import React from "react";
import {Mail,Phone,Shield,Calendar,CheckCircle,ArrowLeft,} from "lucide-react";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/themeContext";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const softDark = theme === "dark";

  const userData = {
    avatar: user?.avatar?.url,
    name: user?.name,
    email: user?.email,
    role: user?.role,
    accountVerified: user?.accountVerified,
    createdAt: user?.createdAt,
    phone: user?.phone,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 -mb-10 transition-all duration-300 ${
        softDark
          ? "bg-gray-900 text-gray-100"
          : "bg-linear-to-br from-slate-50 to-slate-100"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`rounded-2xl shadow-xl overflow-hidden transition ${
            softDark ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
        >
          {/* TOP BANNER */}
          <div
            className="h-60 relative bg-cover bg-center"
            style={{
              backgroundImage: "url('/banner.png')",
            }}
          >
            <button
              onClick={() => navigate("/")}
              className={`absolute top-6 left-6 z-10 p-2 cursor-pointer rounded-full transition-colors ${
                softDark
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-white/30 text-white hover:bg-white/50"
              }`}
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            {/* Banner Overlay */}
            <div
              className={`absolute inset-0 ${
                softDark ? "bg-black/40" : "bg-black/20"
              }`}
            ></div>

            {/* Profile Picture */}
            <div className="absolute -bottom-16 left-8">
              <div
                className={`w-32 h-32 rounded-full border-4 shadow-xl overflow-hidden ${
                  softDark ? "border-gray-700 bg-gray-700" : "border-white bg-white"
                }`}
              >
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* PROFILE DETAILS */}
          <div className="pt-20 px-8 pb-8">
            {/* Name */}
            <h1
              className={`text-3xl font-bold mb-2 ${
                softDark ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {userData.name}
            </h1>

            {/* Role Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${
                softDark
                  ? "bg-indigo-900 text-indigo-300"
                  : "bg-indigo-50 text-indigo-700"
              }`}
            >
              <Shield className="w-4 h-4" />
              {userData.role}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* EMAIL */}
              <div
                className={`flex items-start gap-4 p-4 rounded-xl transition ${
                  softDark
                    ? "bg-gray-700 hover:bg-gray-600 border border-gray-600"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium mb-1 ${
                      softDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Email Address
                  </p>
                  <p
                    className={`font-medium truncate ${
                      softDark ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {userData.email}
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div
                className={`flex items-start gap-4 p-4 rounded-xl transition ${
                  softDark
                    ? "bg-gray-700 hover:bg-gray-600 border border-gray-600"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium mb-1 ${
                      softDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Phone Number
                  </p>
                  <p
                    className={`font-medium ${
                      softDark ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    +91 {userData.phone}
                  </p>
                </div>
              </div>

              {/* MEMBER SINCE */}
              <div
                className={`flex items-start gap-4 p-4 rounded-xl transition ${
                  softDark
                    ? "bg-gray-700 hover:bg-gray-600 border border-gray-600"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium mb-1 ${
                      softDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Member Since
                  </p>
                  <p
                    className={`font-medium ${
                      softDark ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {formatDate(userData.createdAt)}
                  </p>
                </div>
              </div>

              {/* ACCOUNT STATUS */}
              <div
                className={`flex items-start gap-4 p-4 rounded-xl transition ${
                  softDark
                    ? "bg-gray-700 hover:bg-gray-600 border border-gray-600"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium mb-1 ${
                      softDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Account Status
                  </p>
                  <p
                    className={`font-medium ${
                      softDark ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {userData.accountVerified ? "Verified" : "Not Verified"}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;