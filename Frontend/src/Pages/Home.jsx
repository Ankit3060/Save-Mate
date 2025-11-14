import React from 'react'
import {
  Plus,
  Eye,
  LayoutDashboard,
  Calendar,
  BarChart3,
  TrendingUp,
  Trash2
} from 'lucide-react'
import { useAuth } from '../Context/authContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/themeContext';

function Home() {
  const { isAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const { theme } = useTheme();
  const softDark = theme === "dark";

  const menuItems = [
    { icon: Plus, title: 'Add Transaction', color: 'from-blue-500 to-cyan-500', hoverColor: 'from-blue-600 to-cyan-600', link: '/transaction/add' },
    { icon: Eye, title: 'View Transaction', color: 'from-purple-500 to-pink-500', hoverColor: 'from-purple-600 to-pink-600', link: '/transaction/view' },
    { icon: LayoutDashboard, title: 'Dashboard', color: 'from-emerald-500 to-teal-500', hoverColor: 'from-emerald-600 to-teal-600', link: '/dashboard' },
    { icon: Calendar, title: 'Weekly Report', color: 'from-orange-500 to-red-500', hoverColor: 'from-orange-600 to-red-600', link: '/report/weekly' },
    { icon: BarChart3, title: 'Monthly Report', color: 'from-indigo-500 to-blue-500', hoverColor: 'from-indigo-600 to-blue-600', link: '/report/monthly' },
    { icon: TrendingUp, title: 'Yearly Report', color: 'from-pink-500 to-rose-500', hoverColor: 'from-pink-600 to-rose-600', link: '/report/yearly' },
    { icon: Trash2, title: 'Bin', color: 'from-gray-500 to-slate-500', hoverColor: 'from-gray-600 to-slate-600', link: '/bin' }
  ]

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      className={`min-h-screen p-6 -mb-10 transition-all duration-300 
        ${
          softDark
            ? "bg-gray-800 text-gray-100"
            : "bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50"
        }
      `}
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className={`text-4xl font-bold mb-2 text-center transition-all
            ${softDark ? "text-gray-100" : "text-gray-800"}`}
        >
          Welcome Back!
        </h1>

        <p
          className={`mb-8 text-center 
            ${softDark ? "text-gray-300" : "text-gray-600"}`}
        >
          Manage your transactions effortlessly
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigateTo(item.link)}
              className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300
                hover:shadow-2xl hover:scale-105 cursor-pointer
                ${softDark ? "border border-gray-600" : ""}
              `}
            >
              {/* Base gradient layer */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${item.color} transition-all duration-500 ease-in-out`}
              ></div>

              {/* Hover gradient layer */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${item.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out`}
              ></div>

              <div className="relative p-6 md:p-8 flex flex-col items-center justify-center h-40 md:h-48">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4 transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2} />
                </div>

                <h3 className="text-white font-semibold text-center text-sm md:text-lg transition-transform duration-300 group-hover:translate-y-1">
                  {item.title}
                </h3>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                <div className="absolute bottom-0 right-0 w-full h-1 bg-white/30 transform translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home