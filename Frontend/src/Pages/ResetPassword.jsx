import React, { useState } from 'react'
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react'

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validatePassword = (value) => {
    const hasUpperCase = /[A-Z]/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasNumber = /\d/.test(value)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
  }

  const handlePasswordChange = (value) => {
    setNewPassword(value)
    if (value.length > 0 && !validatePassword(value)) {
      setPasswordError(
        'Password must contain at least one uppercase, lowercase, number, and special character.'
      )
    } else {
      setPasswordError('')
    }
  }

  const handleSubmit = () => {
    if (!validatePassword(newPassword)) {
      setPasswordError(
        'Password must contain at least one uppercase, lowercase, number, and special character.'
      )
      return
    }

    if (newPassword !== confirmNewPassword) {
      setConfirmPasswordError('Passwords do not match')
      return
    }

    setLoading(true)
    setPasswordError('')
    setConfirmPasswordError('')

    setTimeout(() => {
      console.log('Password reset:', { newPassword, confirmNewPassword })
      setSuccess(true)
      setLoading(false)
      setNewPassword('')
      setConfirmNewPassword('')
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 via-orange-50 to-yellow-100 flex items-center justify-center p-4">
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
                <button className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
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
                  {passwordError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                      <p className="text-xs text-red-600">{passwordError}</p>
                    </div>
                  )}
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
                  {confirmPasswordError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                      <p className="text-xs text-red-600">{confirmPasswordError}</p>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <p className="text-xs text-blue-700">
                    <strong>Password requirements:</strong>
                    <br />• At least 8 characters long
                    <br />• Contains uppercase and lowercase letters
                    <br />• Contains at least one number
                    <br />• Contains at least one special character
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-linear-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-amber-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </>
            )}

            <div className="text-center pt-2">
              <button className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-700 font-medium transition-colors mx-auto">
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