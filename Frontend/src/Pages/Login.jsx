import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "../Context/authContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useTheme } from "../Context/themeContext";

function Login() {
  const { isAuthenticated, setIsAuthenticated, setUser, setAccessToken } = useAuth();
  const { theme } = useTheme();
  const softDark = theme === "dark";

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Password validation logic
  const validatePassword = (pwd) => {
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setPasswordError(
        <>
          Password must contain at least one uppercase, lowercase, 
          number, and special character.
        </>
      );
      return;
    } else {
      setPasswordError("");
    }

    try {
      const isEmail = emailOrUsername.includes("@");
      const loginData = isEmail
        ? { email: emailOrUsername, password }
        : { userName: emailOrUsername, password };

      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/auth/login`,
        loginData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      setUser(response.data.user);
      setIsAuthenticated(true);
      setAccessToken(response.data.accessToken);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 -mb-10 transition-all duration-300
        ${
          softDark
            ? "bg-gray-800 text-gray-100"
            : "bg-linear-to-br from-indigo-100 via-purple-100 to-pink-200"
        }
      `}
    >
      {/* Background Blobs (Light Mode Only) */}
      {!softDark && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>
      )}

      {/* Login Card */}
      <div
        className={`w-full max-w-md backdrop-blur-lg p-8 rounded-3xl shadow-2xl border transition-all duration-300 ${
          softDark
            ? "bg-gray-700 border-gray-600"
            : "bg-white/90 border-gray-200"
        }`}
      >
        <h2
          className={`text-3xl font-bold text-center mb-6 ${
            softDark
              ? "text-indigo-300"
              : "bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          }`}
        >
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email or Username */}
          <div>
            <label
              className={`block text-sm mb-2 ${
                softDark ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  softDark ? "text-gray-300" : "text-gray-400"
                }`}
              />
              <input
                type="text"
                name="emailOrUsername"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="Enter your email or username"
                className={`w-full px-10 py-3 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-indigo-500 
                  ${
                    softDark
                      ? "bg-gray-600 border border-gray-500 text-gray-100 placeholder-gray-300"
                      : "bg-white border border-gray-300 text-gray-800 placeholder-gray-400"
                  }
                `}
                required
                maxLength={50}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className={`block text-sm mb-2 ${
                softDark ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  softDark ? "text-gray-300" : "text-gray-400"
                }`}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);

                  if (value.length === 0) return setPasswordError("");
                  if (!validatePassword(value)) {
                    setPasswordError(
                      <>
                        Password must contain at least one uppercase, lowercase,
                        number, and special character.
                      </>
                    );
                  } else {
                    setPasswordError("");
                  }
                }}
                placeholder="Enter your password"
                className={`w-full px-10 py-3 pr-12 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-indigo-500 
                  ${
                    softDark
                      ? "bg-gray-600 border border-gray-500 text-gray-100 placeholder-gray-300"
                      : passwordError
                      ? "bg-white border border-red-400 text-gray-800"
                      : "bg-white border border-gray-300 text-gray-800"
                  }
                `}
                required
                minLength={8}
                maxLength={20}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition ${
                  softDark ? "text-gray-300 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className={`text-sm font-medium ${
                softDark ? "text-indigo-300 hover:text-indigo-200" : "text-indigo-600 hover:text-indigo-800"
              }`}
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 shadow-md cursor-pointer
              ${
                softDark
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
              }
              hover:scale-105
            `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className={`text-sm text-center mt-6 ${
          softDark ? "text-gray-300" : "text-gray-600"
        }`}>
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className={`font-semibold ${
              softDark ? "text-indigo-300 hover:text-indigo-200" : "text-indigo-600 hover:text-indigo-800"
            }`}
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
