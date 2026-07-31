import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/products", form);

      alert("✅ Product Added Successfully");

      // Reset form
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        image: ""
      });

      // Redirect to home
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          ➕ Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price ₹"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Category */}
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Image URL */}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Preview Image */}
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-full h-40 object-cover rounded-lg"
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "Adding..." : "Add Product 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;