import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhone
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
    
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
    
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
           ShopEasy
          </h2>
          <p className="text-sm leading-relaxed">
            Discover the best products at unbeatable prices. We bring
            quality, trust, and fast delivery right to your doorstep.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <FaEnvelope /> support@shopeasy.com
            </p>
            <p className="flex items-center gap-2">
              <FaPhone /> +91 8470937935
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/signup" className="hover:text-white">Signup</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Categories
          </h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Electronics</li>
            <li className="hover:text-white cursor-pointer">Fashion</li>
            <li className="hover:text-white cursor-pointer">Furniture</li>
            <li className="hover:text-white cursor-pointer">Beauty</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Newsletter
          </h3>
          <p className="text-sm mb-3">
            Subscribe to get latest updates & offers.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none"
            />
            <button className="bg-indigo-600 px-4 rounded-r-lg hover:bg-indigo-700">
              Join
            </button>
          </div>
          <div className="flex gap-4 text-xl mt-5">
            <FaFacebook className="cursor-pointer hover:text-white" />
            <FaInstagram className="cursor-pointer hover:text-white" />
            <FaTwitter className="cursor-pointer hover:text-white" />
            <FaYoutube className="cursor-pointer hover:text-white" />
          </div>
        </div>

      </div>
    <div className="border-t border-gray-700 text-center py-4 text-sm">
  © {new Date().getFullYear()} ShopEasy. All rights reserved. | Developed by Prince 
</div>
    </footer>
  );
}

export default Footer;