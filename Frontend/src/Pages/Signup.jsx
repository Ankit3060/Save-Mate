import React, { useState } from 'react'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../Context/authContext.jsx'

function Signup() {
  const { setUser } = useAuth()
  const navigateTo = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validatePassword = (value) => {
    const hasUpperCase = /[A-Z]/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasNumber = /\d/.test(value)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, email, password, confirmPassword } = formData

    // Password strength validation
    if (!validatePassword(password)) {
      setPasswordError(
        <>
          Password must contain at least one uppercase, lowercase,
          <br />
          number, and special character.
        </>
      )
      return
    } else {
      setPasswordError('')
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match!')
      return
    } else {
      setConfirmPasswordError('')
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/auth/register`,
        { name, email, password, confirmPassword },
        { withCredentials: true }
      )

      toast.success(res.data.message)
      setUser(res.data.user)
      navigateTo('/verify-otp')
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-100 via-teal-50 to-cyan-100 flex items-center justify-center p-4 -mb-10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>
      
      
      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-emerald-100">Join us today!</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  maxLength={50}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  maxLength={50}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    handleChange(e)
                    const val = e.target.value
                    if (!validatePassword(val) && val.length > 0) {
                      setPasswordError(
                        <>
                          Password must contain at least one uppercase, lowercase,
                          <br />
                          number, and special character.
                        </>
                      )
                    } else {
                      setPasswordError('')
                    }
                  }}
                  placeholder="Create a password"
                  required
                  minLength={8}
                  maxLength={20}
                  className={`w-full pl-11 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                    passwordError ? 'border-red-400' : 'focus:ring-emerald-500 border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  minLength={8}
                  maxLength={20}
                  className={`w-full pl-11 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                    confirmPasswordError ? 'border-red-400' : 'focus:ring-emerald-500 border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPasswordError && (
                <p className="text-sm text-red-500">{confirmPasswordError}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </button>

            {/* Already have an account */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => navigateTo('/login')}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                >
                  Login now
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
