// pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (acc, o) => acc + o.totalAmount,
    0
  );

  const deliveredOrders = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  // ✅ Update Status
  const updateStatus = async (id, status) => {
    await API.put(`/admin/orders/${id}/status`, { status });
    fetchOrders();
  };

  // ❌ Cancel
  const cancelOrder = async (id) => {
    await API.put(`/admin/orders/${id}/cancel`);
    fetchOrders();
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* 🔥 Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-2xl font-bold text-green-600">
            ₹{totalRevenue}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Delivered</h3>
          <p className="text-2xl font-bold text-indigo-600">
            {deliveredOrders}
          </p>
        </div>
      </div>

      {/* 📦 Orders Table */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">User</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                
                <td className="p-2">
                  {order.userId?.name || "User"}
                  <br />
                  <span className="text-xs text-gray-400">
                    {order.userId?.email}
                  </span>
                </td>

                <td className="p-2 font-bold">
                  ₹{order.totalAmount}
                </td>

                <td className="p-2">
                  <span className="px-2 py-1 rounded text-sm bg-gray-200">
                    {order.status}
                  </span>
                </td>

                <td className="p-2 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="p-2 space-x-2">
                  
                  <select
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    value={order.status}
                    className="border p-1 rounded"
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>

                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="text-red-500"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default AdminDashboard;