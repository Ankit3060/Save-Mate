import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png';

const Icon = ({ name }) => {
  const icons = {
    github: (
      <svg fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
    linkedin: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    instagram: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.229-1.667 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.229 1.667-4.771 4.919-4.919 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.273 0-3.66.014-4.944.072-4.233.194-6.431 2.392-6.626 6.626-.058 1.284-.073 1.67-.073 4.944s.015 3.66.072 4.944c.194 4.233 2.392 6.431 6.626 6.626 1.284.058 1.67.072 4.944.072s3.66-.014 4.944-.072c4.233-.194 6.431-2.392 6.626-6.626.058-1.284.072-1.67.072-4.944s-.014-3.66-.072-4.944c-.194-4.233-2.392-6.431-6.626-6.626-1.284-.058-1.67-.072-4.944-.072zm0 6.162c-3.205 0-5.798 2.593-5.798 5.798s2.593 5.798 5.798 5.798 5.798-2.593 5.798-5.798-2.593-5.798-5.798-5.798zm0 9.497c-2.04 0-3.699-1.659-3.699-3.699s1.659-3.699 3.699-3.699 3.699 1.659 3.699 3.699-1.659 3.699-3.699 3.699zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z" />
      </svg>
    ),
    twitter: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.617l-5.21-6.817-6.044 6.817h-3.308l7.731-8.918-8.318-10.58h6.817l4.596 6.134 5.437-6.134zm-1.141 17.52h1.836l-10.15-13.398h-1.996l10.31 13.398z" />
      </svg>
    ),
    facebook: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    ),
    hashnode: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="m22.351 8.019-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z"/></svg>
    ),
    kaggle: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
      </svg>
    ),
  };
  return icons[name] || null;
};


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
              <span className="text-xl font-bold text-white">Save Mate</span>
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
                    to="/contact"
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
                    to="/contact"
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
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/Ankit3060"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition"
              >
                <Icon name="github" />
              </a>
              <a
                href="https://www.linkedin.com/in/ankit-kumar-511b31229/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-indigo-600 rounded-full transition"
              >
                <Icon name="linkedin" />
              </a>
              <a
                href="https://www.instagram.com/ankit_ak33/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-pink-400 rounded-full transition"
              >
                <Icon name="instagram" />
              </a>
              <a
                href="https://x.com/ankit330660"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-indigo-800 rounded-full transition"
              >
                <Icon name="twitter" />
              </a>
              <a
                href="https://www.facebook.com/share/1FZxBKzdun/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-indigo-600 rounded-full transition"
              >
                <Icon name="facebook" />
              </a>
              <a
                href="https://hashnode.com/@ankit3060"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-blue-600 rounded-full transition"
              >
                <Icon name="hashnode" />
              </a>
              <a
                href="https.www.kaggle.com/ankit3060"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-blue-600 rounded-full transition"
              >
                <Icon name="kaggle" />
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