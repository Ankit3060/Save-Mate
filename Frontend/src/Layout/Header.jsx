import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import logo from "../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";

function Header() {
  const {
    isAuthenticated,
    user,
    setIsAuthenticated,
    setUser,
    setAccessToken,
    accessToken,
  } = useAuth();

  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  const avatarRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/auth/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("Logged out successfully!");
      setUser(null);
      setIsAuthenticated(false);
      setAccessToken(null);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setIsAvatarOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setIsAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Theme toggler
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <header className="sticky top-0 left-0 w-full bg-linear-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-8 sm:px-12 lg:px-20 py-3 shadow-md z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} alt="Save Mate Logo" className="h-9 w-auto" />
          <span className="text-[12px] sm:text-xl font-bold tracking-wide">Save Mate</span>
        </div>

        {/* Desktop Navigation */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center justify-center gap-6 text-sm font-medium text-gray-300">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 border-b-2 border-indigo-400 pb-1"
                  : "hover:text-indigo-300"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 border-b-2 border-indigo-400 pb-1"
                  : "hover:text-indigo-300"
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 border-b-2 border-indigo-400 pb-1"
                  : "hover:text-indigo-300"
              }
            >
              Contact Us
            </NavLink>
          </nav>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-3 relative" ref={avatarRef}>
          {/* Theme toggler */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-700 transition"
          >
            {isDarkMode ? (
              <FiSun className="text-yellow-400 text-xl" />
            ) : (
              <FiMoon className="text-gray-300 text-xl" />
            )}
          </button>

          {!isAuthenticated ? (
            <div className="flex sm:flex gap-2">
              <NavLink
                to="/login"
                className="px-4 py-1.5 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Signup
              </NavLink>
            </div>
          ) : (
            <>
              {/* Avatar */}
              <div
                onClick={() => setIsAvatarOpen(!isAvatarOpen)}
                className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition"
              >
                {user?.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt="User Avatar"
                    className="w-9 h-9 rounded-full border-2 border-indigo-500"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-gray-300" />
                )}
                <span className="hidden sm:inline text-sm font-medium">
                  {user?.fullName?.split(" ")[0]}
                </span>
              </div>

              {isAvatarOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-[#1e293b] border border-gray-700 rounded-lg shadow-lg py-2 z-50">
                  <NavLink
                    to="/user/profile"
                    onClick={() => setIsAvatarOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-indigo-500/20 hover:text-indigo-300"
                  >
                    View Profile
                  </NavLink>
                  <NavLink
                    to="/user/update/profile"
                    onClick={() => setIsAvatarOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-indigo-500/20 hover:text-indigo-300"
                  >
                    Update Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </>
          )}

          {/* Hamburger menu (mobile only) */}
          {isAuthenticated && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-700 transition"
            >
              {isMenuOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isAuthenticated && isMenuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-2 bg-[#1e293b] border border-gray-700 rounded-lg shadow-lg py-3 px-5 text-gray-200">
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="py-2 border-b border-gray-600 hover:text-indigo-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="py-2 border-b border-gray-600 hover:text-indigo-300"
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="py-2 hover:text-indigo-300"
          >
            Contact Us
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
