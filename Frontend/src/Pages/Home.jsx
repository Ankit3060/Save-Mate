// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FaPlusCircle,
//   FaEye,
//   FaChartPie,
//   FaCalendarWeek,
//   FaCalendarAlt,
//   FaChartBar,
//   FaTrashAlt,
// } from "react-icons/fa";

// function Home() {
//   const features = [
//     { title: "Add Transaction", icon: <FaPlusCircle />, color: "from-indigo-500 to-purple-500" },
//     { title: "View Transaction", icon: <FaEye />, color: "from-teal-500 to-cyan-500" },
//     { title: "Dashboard", icon: <FaChartPie />, color: "from-orange-500 to-amber-500" },
//     { title: "Weekly Report", icon: <FaCalendarWeek />, color: "from-green-500 to-emerald-500" },
//     { title: "Monthly Report", icon: <FaCalendarAlt />, color: "from-blue-500 to-sky-500" },
//     { title: "Yearly Report", icon: <FaChartBar />, color: "from-pink-500 to-rose-500" },
//     { title: "Bin", icon: <FaTrashAlt />, color: "from-red-500 to-orange-500" },
//   ];

//   return (
//     <div className="min-h-[90vh] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex flex-col items-center py-10 px-6 sm:px-10 lg:px-20">
//       <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
//         Welcome to <span className="text-indigo-400">Save Mate</span>
//       </h1>

//       {/* Grid layout */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
//         {features.map((feature, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.97 }}
//             className={`relative group bg-gradient-to-br ${feature.color} p-[2px] rounded-2xl shadow-lg cursor-pointer transition-all duration-300`}
//           >
//             <div className="bg-[#0f172a] rounded-2xl flex flex-col items-center justify-center py-10 hover:bg-opacity-80 transition-all duration-300 ease-in-out">
//               <div className="text-4xl mb-3 text-gray-100 group-hover:text-white transition">
//                 {feature.icon}
//               </div>
//               <h2 className="text-lg sm:text-xl font-semibold group-hover:text-indigo-200 transition">
//                 {feature.title}
//               </h2>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;




import React from 'react'
import { Plus, Eye, LayoutDashboard, Calendar, BarChart3, TrendingUp, Trash2 } from 'lucide-react'
import { useAuth } from '../Context/authContext';
import { Navigate } from 'react-router-dom';

function Home() {
  const { isAuthenticated, user, accessToken } = useAuth();

  const menuItems = [
    { icon: Plus, title: 'Add Transaction', color: 'from-blue-500 to-cyan-500', hoverColor: 'from-blue-600 to-cyan-600' },
    { icon: Eye, title: 'View Transaction', color: 'from-purple-500 to-pink-500', hoverColor: 'from-purple-600 to-pink-600' },
    { icon: LayoutDashboard, title: 'Dashboard', color: 'from-emerald-500 to-teal-500', hoverColor: 'from-emerald-600 to-teal-600' },
    { icon: Calendar, title: 'Weekly Report', color: 'from-orange-500 to-red-500', hoverColor: 'from-orange-600 to-red-600' },
    { icon: BarChart3, title: 'Monthly Report', color: 'from-indigo-500 to-blue-500', hoverColor: 'from-indigo-600 to-blue-600' },
    { icon: TrendingUp, title: 'Yearly Report', color: 'from-pink-500 to-rose-500', hoverColor: 'from-pink-600 to-rose-600' },
    { icon: Trash2, title: 'Bin', color: 'from-gray-500 to-slate-500', hoverColor: 'from-gray-600 to-slate-600' }
  ]

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 -mb-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">Welcome Back!</h1>
        <p className="text-gray-600 mb-8 text-center">Manage your transactions effortlessly</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${item.color} transition-all duration-500 ease-in-out`}></div>
              <div className={`absolute inset-0 bg-linear-to-br ${item.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out`}></div>
              
              <div className="relative p-6 md:p-8 flex flex-col items-center justify-center h-40 md:h-48">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4 transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-white font-semibold text-center text-sm md:text-lg transition-transform duration-300 group-hover:translate-y-1">
                  {item.title}
                </h3>
              </div>
              
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