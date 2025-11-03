import React, { useState } from 'react'
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../Context/authContext'

function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  
  const { setIsAuthenticated, setUser, setAccessToken } = useAuth();

  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showValidation, setShowValidation] = useState(true)

  const validatePassword = (value) => {
    return {
      length: value.length >= 8,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      number: /\d/.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
    }
  }

  const getColor = (isValid, clicked) => {
    if (isValid) return 'text-green-600'
    if (clicked) return 'text-red-600'
    return 'text-gray-700'
  }

  const handlePasswordChange = (value) => {
    setNewPassword(value)
    setPasswordError('')
    setShowValidation(true)
  }

  const handleSubmit = async () => {
    const validation = validatePassword(newPassword)
    const allValid = Object.values(validation).every(Boolean)
    setShowValidation(true)

    if (!allValid) {
      setPasswordError('Password does not meet all requirements.')
      return
    }

    if (newPassword !== confirmNewPassword) {
      setConfirmPasswordError('Passwords do not match')
      return
    }

    setLoading(true)
    setPasswordError('')
    setConfirmPasswordError('')

    try {
      const payload = {
        password:newPassword,
        confirmPassword:confirmNewPassword,
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/auth/reset-password/${token}`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )

      toast.success(response.data.message || 'Password reset successful')
      setSuccess(true);
      setUser(response.data.user);
      setIsAuthenticated(true);
      setAccessToken(response.data.accessToken);
      setNewPassword('');
      setConfirmNewPassword('');
      navigate('/');
    } catch (err) {
      console.error('Reset password error:', err)
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  const validation = validatePassword(newPassword)

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 via-orange-50 to-yellow-100 flex items-center justify-center p-4 -mb-10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-amber-600 to-orange-600 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <ShieldCheck className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-amber-100">Create a new secure password</p>
          </div>

          <div className="p-8 space-y-5">
            {success ? (
              <div className="text-center space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-green-700 font-medium">Password reset successful!</p>
                  <p className="text-sm text-green-600 mt-2">You can now login with your new password</p>
                </div>
                <button
                  onClick={() => navigate('/login')}
                  className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  Go to Login
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter new password"
                      minLength={8}
                      maxLength={20}
                      className={`w-full pl-11 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                        passwordError
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-amber-500 focus:border-transparent'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmNewPassword ? 'text' : 'password'}
                      value={confirmNewPassword}
                      onChange={(e) => {
                        setConfirmNewPassword(e.target.value)
                        setConfirmPasswordError('')
                      }}
                      onKeyPress={handleKeyPress}
                      placeholder="Confirm new password"
                      minLength={8}
                      maxLength={20}
                      className={`w-full pl-11 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                        confirmPasswordError
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-amber-500 focus:border-transparent'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* ✅ Dynamic Password Validation */}
                {showValidation && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                    <p className={`text-xs ${getColor(validation.length, !!passwordError)}`}>
                      • At least 8 characters long
                    </p>
                    <p className={`text-xs ${getColor(validation.upper && validation.lower, !!passwordError)}`}>
                      • Contains uppercase and lowercase letters
                    </p>
                    <p className={`text-xs ${getColor(validation.number, !!passwordError)}`}>
                      • Contains at least one number
                    </p>
                    <p className={`text-xs ${getColor(validation.special, !!passwordError)}`}>
                      • Contains at least one special character
                    </p>
                  </div>
                )}

                {passwordError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                    <p className="text-xs text-red-600">{passwordError}</p>
                  </div>
                )}
                {confirmPasswordError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                    <p className="text-xs text-red-600">{confirmPasswordError}</p>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-linear-to-r cursor-pointer from-amber-600 to-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-amber-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </>
            )}

            <div className="text-center pt-2">
              <button
                onClick={() => navigate('/login')}
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

export default ResetPassword