import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { FaShoppingCart } from "react-icons/fa";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  // ✅ FIXED FUNCTION
  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async () => {
    await API.post("/cart/add", {
      productId: id,
      quantity: 1
    });
    alert("Added to cart ✅");
  };

  // Loading UI
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-lg font-medium animate-pulse">
          Loading product...
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      <div className="bg-white rounded-2xl shadow-md max-w-4xl w-full grid md:grid-cols-2 gap-6 p-6">
        
        {/* Image */}
        <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-72 object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between">
          
          <div>
            <p className="text-sm text-indigo-500 mb-2">
              {product.category}
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {product.title}
            </h2>

            <p className="text-gray-600 text-sm mb-4">
              {product.description}
            </p>

            <h3 className="text-2xl font-bold text-indigo-600">
              ₹{product.price}
            </h3>
          </div>

          {/* Button */}
          <button
            onClick={addToCart}
            className="mt-6 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>

    </div>
  );
}

export default ProductDetail;