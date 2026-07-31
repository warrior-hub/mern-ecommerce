import { useEffect, useState } from "react";
import API from "../api/axios";
import { FaBoxOpen, FaRupeeSign } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
   const  navigate=useNavigate();
  const getStatusColor = (status) => {
    if (status === "Delivered") return "text-green-600";
    if (status === "Shipped") return "text-yellow-600";
    return "text-red-500";
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      
      <h2 className="text-3xl font-bold text-center mb-8 flex justify-center gap-2">
       My Orders
      </h2>

      <div className="max-w-5xl mx-auto space-y-6">
        
        {orders.length === 0 && (
  <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow p-10 text-center">
    
    {/* Icon */}
    <FaBoxOpen className="text-5xl text-gray-400 mb-4" />

    {/* Title */}
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      No Orders Yet
    </h3>

    {/* Subtitle */}
    <p className="text-gray-500 mb-4">
      Looks like you haven’t placed any orders yet.
    </p>

    {/* CTA Button */}
    <button
      onClick={() => navigate("/")}
      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
    >
      Start Shopping 🛍️
    </button>
  </div>
)}

        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-xl shadow">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              
              <div className="flex items-center gap-2 text-gray-600">
                <MdDateRange />
                {new Date(order.createdAt).toLocaleDateString()}
              </div>

              <div className={`font-bold ${getStatusColor(order.status)}`}>
                {order.status}
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-3"
                 
                >
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-4">
                    
                    <img
                      src={item.productId?.image}
                      alt=""
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div>
                      <p className="font-semibold cursor-pointer"  onClick={() => navigate(`/product/${item.productId._id}`)}>
                        {item.productId?.title ?? "Product"}
                      </p>
                      <p className="text-sm text-gray-500">
                        ₹{item.productId?.price ?? item.price}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="text-gray-700">
                    Qty: {item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
              
              <div className="text-sm text-gray-400">
                Order ID: {order._id}
              </div>

              <div className="flex items-center font-bold text-indigo-600">
                <FaRupeeSign />
                {order.totalAmount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;