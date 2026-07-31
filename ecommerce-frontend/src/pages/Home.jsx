import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import API from "../api/axios";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const addToCart = async (id) => {
    await API.post("/cart/add", {
      productId: id,
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
     Our Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer group"
          >
            
            {/* Image Container */}
            <div className="relative bg-gray-100 h-52 flex items-center justify-center overflow-hidden">
              
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
              />

              
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col">
              
              <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                {p.title}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                {p.category}
              </p>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {p.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                
                <p className="text-indigo-600 font-bold text-lg">
                  ₹{p.price}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p._id);
                  }}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-indigo-700 transition"
                >
                  <FaShoppingCart size={14} />
                  Add
                </button>

              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Home;