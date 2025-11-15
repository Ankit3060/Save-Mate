import React, { useState } from "react";
import {CheckCircle,Lock,Eye,EyeOff,Save,ArrowLeft,} from "lucide-react";
import axios from "axios";
import { useAuth } from "../Context/authContext";
import { useTheme } from "../Context/themeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const { accessToken, user, setUser } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const softDark = theme === "dark";
  const id = user?._id;

  const [userData, setUserData] = useState({
    avatar: user?.avatar?.url,
    name: user?.name,
    email: user?.email,
    role: user?.role,
    accountVerified: user?.accountVerified,
    createdAt: user?.createdAt,
    phone: user?.phone,
  });

  const [editableData, setEditableData] = useState({
    name: user?.name,
    phone: user?.phone,
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [passwordErrors, setPasswordErrors] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const passwordCriteria = {
    minLength: passwords.newPassword.length >= 8,
    maxLength:
      passwords.newPassword.length <= 20 && passwords.newPassword.length > 0,
    hasLowerCase: /[a-z]/.test(passwords.newPassword),
    hasUpperCase: /[A-Z]/.test(passwords.newPassword),
    hasNumber: /\d/.test(passwords.newPassword),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(passwords.newPassword),
  };

  const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPasswordErrors({});
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleUpdateProfile = async () => {
    setUpdateLoading(true);
    const loadingToast = toast.loading("Updating profile...");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/user/update/${id}`,
        editableData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUser(response.data.user || response.data.data?.user || response.data);
      toast.update(loadingToast, {
        render: "Profile updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred while updating your profile.";
      toast.update(loadingToast, {
        render: `Error updating profile: ${message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    const errors = {};

    if (!allCriteriaMet) {
      errors.newPassword = "Password does not meet all criteria";
    }

    if (passwords.newPassword !== passwords.confirmNewPassword) {
      errors.confirmNewPassword = "Passwords do not match";
    }

    if (!passwords.oldPassword) {
      errors.oldPassword = "Old password is required";
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setPasswordLoading(true);
    const loadingToast = toast.loading("Updating password...");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/user/update-password`,
        {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
          confirmNewPassword: passwords.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.update(loadingToast, {
        render: response.data.message || "Password updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      // Reset fields
      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setPasswordErrors({});
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred while updating password.";
      toast.update(loadingToast, {
        render: `Error updating password: ${message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const getCriteriaColor = (met, hasError) => {
    if (hasError) return softDark ? "text-red-400" : "text-red-600";
    if (passwords.newPassword.length === 0) return softDark ? "text-gray-500" : "text-gray-500";
    return met ? (softDark ? "text-green-400" : "text-green-600") : (softDark ? "text-gray-500" : "text-gray-500");
  };

  return (
    <div className={`min-h-screen py-8 px-4 -mb-10 transition-all duration-300
      ${softDark ? "bg-gray-800" : "bg-linear-to-br from-slate-50 to-slate-100"}`}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className={`rounded-2xl shadow-xl overflow-hidden
          ${softDark ? "bg-gray-900 border border-gray-700" : "bg-white"}`}
        >
          <div
            className="h-60 relative bg-cover bg-center"
            style={{
              backgroundImage: "url('/banner.png')",
            }}
          >
            <button
              onClick={() => navigate("/")}
              className="absolute top-6 cursor-pointer left-6 z-10 p-2 rounded-full bg-white/30 text-white hover:bg-white/50 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="absolute inset-0 bg-black opacity-10"></div>
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
            <div className="flex items-center gap-3 mb-6">
              <h1 className={`text-3xl font-bold
                ${softDark ? "text-gray-100" : "text-gray-900"}`}
              >
                Update Profile
              </h1>
              {userData.accountVerified && (
                <CheckCircle className={`w-7 h-7
                  ${softDark ? "text-blue-400 fill-blue-900/30" : "text-blue-500 fill-blue-100"}`} 
                />
              )}
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2
                    ${softDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editableData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
                      ${softDark 
                        ? "bg-gray-800 border-gray-600 text-gray-100" 
                        : "border-gray-300 text-gray-900"
                      }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2
                    ${softDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editableData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
                      ${softDark 
                        ? "bg-gray-800 border-gray-600 text-gray-100" 
                        : "border-gray-300 text-gray-900"
                      }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2
                    ${softDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    disabled
                    className={`w-full px-4 py-3 rounded-lg border cursor-not-allowed
                      ${softDark 
                        ? "bg-gray-800 border-gray-600 text-gray-500" 
                        : "border-gray-300 bg-gray-100 text-gray-500"
                      }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2
                    ${softDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    value={userData.role}
                    disabled
                    className={`w-full px-4 py-3 rounded-lg border cursor-not-allowed
                      ${softDark 
                        ? "bg-gray-800 border-gray-600 text-gray-500" 
                        : "border-gray-300 bg-gray-100 text-gray-500"
                      }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2
                    ${softDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Member Since
                  </label>
                  <input
                    type="text"
                    value={formatDate(userData.createdAt)}
                    disabled
                    className={`w-full px-4 py-3 rounded-lg border cursor-not-allowed
                      ${softDark 
                        ? "bg-gray-800 border-gray-600 text-gray-500" 
                        : "border-gray-300 bg-gray-100 text-gray-500"
                      }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2
                    ${softDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Account Status
                  </label>
                  <input
                    type="text"
                    value={
                      userData.accountVerified ? "Verified" : "Not Verified"
                    }
                    disabled
                    className={`w-full px-4 py-3 rounded-lg border cursor-not-allowed
                      ${softDark 
                        ? "bg-gray-800 border-gray-600 text-gray-500" 
                        : "border-gray-300 bg-gray-100 text-gray-500"
                      }`}
                  />
                </div>
              </div>

              <button
                onClick={handleUpdateProfile}
                disabled={updateLoading}
                className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {updateLoading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl shadow-xl p-8
          ${softDark ? "bg-gray-900 border border-gray-700" : "bg-white"}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock className={`w-7 h-7
              ${softDark ? "text-indigo-400" : "text-indigo-600"}`} 
            />
            <h2 className={`text-2xl font-bold
              ${softDark ? "text-gray-100" : "text-gray-900"}`}
            >
              Update Password
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2
                ${softDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.old ? "text" : "password"}
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
                    ${passwordErrors.oldPassword
                      ? "border-red-500"
                      : softDark 
                        ? "bg-gray-800 border-gray-600 text-gray-100" 
                        : "border-gray-300 text-gray-900"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("old")}
                  className={`absolute right-3 top-1/2 -translate-y-1/2
                    ${softDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
                >
                  {showPasswords.old ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {passwordErrors.oldPassword && (
                <p className={`text-sm mt-1
                  ${softDark ? "text-red-400" : "text-red-600"}`}
                >
                  {passwordErrors.oldPassword}
                </p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2
                ${softDark ? "text-gray-300" : "text-gray-700"}`}
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
                    ${passwordErrors.newPassword
                      ? "border-red-500"
                      : softDark 
                        ? "bg-gray-800 border-gray-600 text-gray-100" 
                        : "border-gray-300 text-gray-900"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className={`absolute right-3 top-1/2 -translate-y-1/2
                    ${softDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className={`rounded-lg p-4 border
              ${softDark 
                ? "bg-gray-800 border-gray-600" 
                : "bg-gray-50 border-gray-200"
              }`}
            >
              <p className={`text-sm font-medium mb-3
                ${softDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Password Requirements:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div
                  className={`flex items-center gap-2 text-sm ${getCriteriaColor(
                    passwordCriteria.minLength,
                    passwordErrors.newPassword
                  )}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  Minimum 8 characters
                </div>
                <div
                  className={`flex items-center gap-2 text-sm ${getCriteriaColor(
                    passwordCriteria.maxLength,
                    passwordErrors.newPassword
                  )}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  Maximum 20 characters
                </div>
                <div
                  className={`flex items-center gap-2 text-sm ${getCriteriaColor(
                    passwordCriteria.hasLowerCase,
                    passwordErrors.newPassword
                  )}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  One lowercase letter
                </div>
                <div
                  className={`flex items-center gap-2 text-sm ${getCriteriaColor(
                    passwordCriteria.hasUpperCase,
                    passwordErrors.newPassword
                  )}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  One uppercase letter
                </div>
                <div
                  className={`flex items-center gap-2 text-sm ${getCriteriaColor(
                    passwordCriteria.hasNumber,
                    passwordErrors.newPassword
                  )}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  One number
                </div>
                <div
                  className={`flex items-center gap-2 text-sm ${getCriteriaColor(
                    passwordCriteria.hasSpecialChar,
                    passwordErrors.newPassword
                  )}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  One special character
                </div>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2
                ${softDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmNewPassword"
                  value={passwords.confirmNewPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
                    ${passwordErrors.confirmNewPassword
                      ? "border-red-500"
                      : softDark 
                        ? "bg-gray-800 border-gray-600 text-gray-100" 
                        : "border-gray-300 text-gray-900"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className={`absolute right-3 top-1/2 -translate-y-1/2
                    ${softDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {passwordErrors.confirmNewPassword && (
                <p className={`text-sm mt-1
                  ${softDark ? "text-red-400" : "text-red-600"}`}
                >
                  {passwordErrors.confirmNewPassword}
                </p>
              )}
            </div>

            <button
              onClick={handleUpdatePassword}
              disabled={passwordLoading}
              className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Lock className="w-5 h-5" />
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
