
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      paymentMethod,
      shippingAddress
    } = req.body;

    const userId = req.user.id;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const order = new Order({
      userId,
      items: items.map((item) => ({
        productId: item.productId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      totalAmount,

      paymentMethod: paymentMethod || "COD",
      paymentStatus: paymentMethod === "Online" ? "Paid" : "Pending",

      status: "Pending",

      shippingAddress: {
        name: shippingAddress?.name,
        phone: shippingAddress?.phone,
        address: shippingAddress?.address,
        city: shippingAddress?.city,
        pincode: shippingAddress?.pincode
      }
    });

    await order.save();

    res.status(201).json({
      message: " Order placed successfully",
      order
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .populate("items.productId", "title price image")
      .sort({ createdAt: -1 }); 

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching orders"
    });
  }
});

module.exports = router;