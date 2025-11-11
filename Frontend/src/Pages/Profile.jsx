import React from "react";
import {Mail,Phone,Shield,Calendar,CheckCircle,ArrowLeft,} from "lucide-react";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8 px-4 -mb-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div
            className="h-60 relative bg-cover bg-center"
            style={{
              backgroundImage: "url('/banner.png')",
            }}
          >
            <button
              onClick={() => navigate('/')}
              className="absolute top-6 cursor-pointer left-6 z-10 p-2 rounded-full bg-white/30 text-white hover:bg-white/50 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="absolute inset-0 bg-black/20"></div>

            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {userData.name}
              </h1>
            </div>

            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              {userData.role}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Email Address
                  </p>
                  <p className="text-gray-900 font-medium truncate">
                    {userData.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Phone Number
                  </p>
                  <p className="text-gray-900 font-medium">
                    +91 {userData.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Member Since
                  </p>
                  <p className="text-gray-900 font-medium">
                    {formatDate(userData.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Account Status
                  </p>
                  <p className="text-gray-900 font-medium">
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