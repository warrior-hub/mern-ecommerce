
const Order = require("../models/Order");


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found ❌" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found ❌" });
    }

    order.status = status;

    if (status === "Confirmed") order.confirmedAt = new Date();
    if (status === "Shipped") order.shippedAt = new Date();
    if (status === "Delivered") order.deliveredAt = new Date();

    await order.save();

    res.json({ message: "Order updated ✅", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found ❌" });
    }

    order.status = "Cancelled";
    await order.save();

    res.json({ message: "Order cancelled ❌" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};