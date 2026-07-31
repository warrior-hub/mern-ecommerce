import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";
import API from "../api/axios";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" // ✅ default role
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);

      alert("Signup successful ✅");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-gray-200 px-4">
      
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-2">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Join us and start shopping
        </p>

        {/* Name */}
        <div className="mb-4 relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4 relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            Select Role
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
        >
          <FaUserPlus />
          Sign Up
        </button>

        {/* Redirect */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;