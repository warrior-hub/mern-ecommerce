// routes/adminOrderRoutes.js
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder
} = require("../controllers/orderController");


router.get("/", authMiddleware,  getAllOrders);

router.get("/:id", authMiddleware, getOrderById);

router.put("/:id/status", authMiddleware, updateOrderStatus);

router.put("/:id/cancel", authMiddleware, cancelOrder);

module.exports = router;