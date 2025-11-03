import React, { useState } from 'react';
import { Mail, KeyRound, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const navigatTo = useNavigate();

  const handleSubmit = async () => {
    if (!email) {   
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/auth/forget-password`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "Reset link sent to your email");
      setError("");
      setEmail("");
      setSuccess(true);
    } catch (err) {
      console.error("Forgot password error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-100 via-pink-50 to-orange-100 flex items-center justify-center p-4 -mb-10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-rose-600 to-pink-600 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <KeyRound className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
            <p className="text-rose-100">No worries, we'll send you reset instructions</p>
          </div>

          <div className="p-8 space-y-6">
            {success ? (
              <div className="text-center space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-green-700 font-medium">Reset link sent successfully!</p>
                  <p className="text-sm text-green-600 mt-2">Please check your email inbox</p>
                </div>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-rose-600 hover:text-rose-700 cursor-pointer font-medium transition-colors"
                >
                  Didn't receive the email? Send another reset link
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                      }}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your registered email"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full cursor-pointer bg-linear-to-r from-rose-600 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-rose-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </>
            )}

            <div className="text-center pt-2">
              <button
                onClick={()=>navigatTo("/login")}
                className="flex cursor-pointer items-center justify-center gap-2 text-gray-600 hover:text-gray-700 font-medium transition-colors mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword