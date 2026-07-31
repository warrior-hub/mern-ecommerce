import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { FiShoppingCart } from "react-icons/fi";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // ✅ Get Cart
  const getCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // ✅ Update Quantity
  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    await API.put("/cart/update", {
      productId: id,
      quantity: qty
    });
    getCart();
  };

  // ✅ Remove Item
  const removeItem = async (id) => {
    await API.delete(`/cart/remove/${id}`);
    getCart();
  };

  // ✅ Total Price
  const total = cart.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

 const handleCheckout = async () => {
  try {
    const orderItems = cart.map(item => ({
      productId: item.productId._id,
      title: item.productId.title,     // ✅ snapshot
      price: item.productId.price,
      image: item.productId.image,
      quantity: item.quantity
    }));

    await API.post("/orders", {
      items: orderItems,
      totalAmount: total,

      // ✅ Add extra details
      paymentMethod: "COD",
      shippingAddress: {
        name: "John Doe",
        phone: "9876543210",
        address: "Street 123",
        city: "Delhi",
        pincode: "110001"
      }
    });

    await API.delete("/cart/clear");

    setCart([]);
    alert("✅ Order placed successfully!");
    navigate("/orders");

  } catch (err) {
    console.error(err);
    alert("❌ Checkout failed");
  }
};

  return (
  <div className="min-h-screen bg-gray-100 px-4 py-8">

  <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
    Your Cart
  </h2>

  {/* ✅ EMPTY CART FULL CENTER */}
  {cart.length === 0 ? (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-10 text-center max-w-md w-full">
        
        <FiShoppingCart className="text-6xl text-gray-400 mb-4" />

        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Your Cart is Empty 
        </h2>

        <p className="text-gray-500 mb-5">
          Looks like you haven't added anything yet.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  ) : (
    // ✅ NORMAL CART
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

      {/* LEFT */}
      <div className="md:col-span-2 space-y-4">
        {cart.map((item) => (
          <div
            key={item.productId._id}
            className="bg-white p-4 rounded-xl shadow flex gap-4 items-center"
          >
            <img
              src={item.productId.image}
              alt=""
              onClick={() => navigate(`/product/${item.productId._id}`)}
              className="w-24 h-24 object-cover rounded-lg cursor-pointer"
            />

            <div className="flex-1">
              <h3
                onClick={() => navigate(`/product/${item.productId._id}`)}
                className="font-semibold cursor-pointer"
              >
                {item.productId.title}
              </h3>

              <p className="text-indigo-600 font-bold">
                ₹{item.productId.price}
              </p>

              <p className="text-sm text-gray-500">
                Subtotal: ₹
                {item.productId.price * item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() =>
                updateQty(item.productId._id, item.quantity - 1)
              }>−</button>

              <span>{item.quantity}</span>

              <button onClick={() =>
                updateQty(item.productId._id, item.quantity + 1)
              }>+</button>
            </div>

            <button
              onClick={() => removeItem(item.productId._id)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="bg-white p-6 rounded-xl shadow h-fit">
        <h3 className="text-xl font-bold mb-4">
          Order Summary
        </h3>

        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>{cart.length}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span>Total</span>
          <span className="font-bold text-indigo-600">
            ₹{total}
          </span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          Proceed to Checkout 
        </button>

        <p className="text-xs text-center mt-3">
          Secure payment 
        </p>
      </div>

    </div>
  )}
</div>
  );
}

export default Cart;