import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaKaggle,
} from "react-icons/fa";
import { FaHashnode, FaXTwitter } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="bg-linear-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-300 pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
          {/* Logo + About */}
          <div>
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
              <span className="text-lg font-semibold">Save Mate</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              See where your money goes. Save where it matters.
            </p>
          </div>

          {/* Quick Links + Support (side by side on phone) */}
          <div className="col-span-2 grid grid-cols-2 gap-16">
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <NavLink to="/" className="hover:text-indigo-400 transition">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className="hover:text-indigo-400 transition"
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/user/create/blog"
                    className="hover:text-indigo-400 transition"
                  >
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <NavLink
                    to="/help"
                    className="hover:text-indigo-400 transition"
                  >
                    Help Center
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/privacy"
                    className="hover:text-indigo-400 transition"
                  >
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/terms"
                    className="hover:text-indigo-400 transition"
                  >
                    Terms & Conditions
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Ankit3060"
                target="_blank"
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/ankit-kumar-511b31229/"
                target="_blank"
                className="p-2 bg-gray-700 hover:bg-indigo-600 rounded-full transition"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/ankit_ak33/"
                target="_blank"
                className="p-2 bg-gray-700 hover:bg-pink-400 rounded-full transition"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/ankit330660"
                target="_blank"
                className="p-2 bg-gray-700 hover:bg-indigo-800 rounded-full transition"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1FZxBKzdun/"
                target="_blank"
                className="p-2 bg-gray-700 hover:bg-indigo-600 rounded-full transition"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="https://hashnode.com/@ankit3060"
                target="_blank"
                className="p-2 bg-gray-700 hover:bg-blue-600 rounded-full transition"
              >
                <FaHashnode className="w-4 h-4" />
              </a>
              <a
                href="https://www.kaggle.com/ankit3060"
                target="_blank"
                className="p-2 bg-gray-700 hover:bg-blue-600 rounded-full transition"
              >
                <FaKaggle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Save Mate. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">Made with ❤️ by Ankit</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;