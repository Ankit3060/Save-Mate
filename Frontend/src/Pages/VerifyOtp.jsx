import React, { useState } from 'react'
import { Mail, ShieldCheck, RefreshCw } from 'lucide-react'
import { useAuth } from '../Context/authContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function VerifyOtp() {
  const {isAuthenticated, setUser, setIsAuthenticated, setAccessToken, accessToken} = useAuth();

  const [email, setEmail] = useState(localStorage.getItem('emailForVerification') || '')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  const navigateTo = useNavigate();

  const handleSubmit = async () => {
    if (!email || !otp) {
      setError('Both email and OTP are required')
      return
    }

    if (!/^\d{6}$/.test(otp)) {
      setError('OTP must be exactly 6 digits')
      return
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/auth/verify-otp`,
        { email, otp },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "OTP verified successfully");
      setUser(response.data.user);
      setIsAuthenticated(true);
      setAccessToken(response.data.accessToken);
      navigateTo("/");
      setError("");
      setEmail("");
      setOtp("");
      localStorage.removeItem('emailForVerification');
    } catch (err) {
      console.error("Verify OTP error:", err);
      toast.error(err.response?.data?.message || "Invalid OTP or Email");
    } finally {
      setLoading(false);
    }
  }

  const handleResendOtp = async() => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }
    try {
      setResendLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/auth/resend-otp`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "OTP resent successfully");
    } catch (err) {
      console.error("Resend OTP error:", err);
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  }

  const handleOtpChange = (e) => {
    const value = e.target.value
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value)
      setError('')
    } else {
      setError('OTP must be numbers only (6 digits)')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-100 via-purple-50 to-fuchsia-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-violet-600 to-purple-600 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <ShieldCheck className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Verify OTP</h1>
            <p className="text-violet-100">Enter the code sent to your email</p>
          </div>

          <div className="p-8 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Enter OTP</label>
              <div className="relative">
                <input
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-2xl tracking-widest font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
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
              className="w-full bg-linear-to-r cursor-pointer from-violet-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <div className="flex justify-center">
              <button
                onClick={handleResendOtp}
                disabled={resendLoading}
                className="flex items-center cursor-pointer gap-2 text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${resendLoading ? 'animate-spin' : ''}`} />
                {resendLoading ? 'Resending...' : 'Resend OTP'}
              </button>
            </div>

            <div className="text-center pt-2">
              <p className="text-gray-600">
                Back to{' '}
                <button 
                  onClick={() => navigateTo('/login')}
                  className="text-violet-600 hover:text-violet-700 cursor-pointer font-semibold transition-colors">
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp