import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaPlus,
  FaSignOutAlt,
  FaUser,
  FaShoppingBag
} from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../pages/UserContext";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      
      <h2
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-indigo-600 cursor-pointer"
      >
        ShopEasy
      </h2>

      <div className="flex items-center gap-6 text-gray-700 font-medium">

        <Link to="/" className="hover:text-indigo-600 transition">
          Home
        </Link>
        {user?.role === "user" && (
          <>
            <Link
              to="/cart"
              className="flex items-center gap-1 hover:text-indigo-600 transition"
            >
              <FaShoppingCart />
              Cart
            </Link>

            <Link
              to="/orders"
              className="flex items-center gap-1 hover:text-indigo-600 transition"
            >
              <FaShoppingBag />
              Orders
            </Link>
          </>
        )}

        {user?.role === "seller" && (
          <>
            <Link
              to="/add-product"
              className="flex items-center gap-1 hover:text-indigo-600 transition"
            >
              <FaPlus />
              Add Product
            </Link>

            <Link
              to="/admin"
              className="flex items-center gap-1 hover:text-indigo-600 transition"
            >
              <FaPlus />
              Dashboard
            </Link>
          </>
        )}

        {!token ? (
          <>
            <Link
              to="/login"
              className="flex items-center gap-1 hover:text-indigo-600 transition"
            >
              <FaUser />
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700 transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;