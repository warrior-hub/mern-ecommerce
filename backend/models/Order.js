const mongoose = require("mongoose");

//
// ✅ Order Item Schema (VERY IMPORTANT)
//
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  title: String,   // snapshot (backup if product deleted)
  price: Number,   // snapshot price
  image: String,   // snapshot image

  quantity: {
    type: Number,
    required: true,
  },
});

//
// ✅ Main Order Schema
//
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],

    totalAmount: {
      type: Number,      // ✅ FIXED
      required: true,
    },

    // ✅ Order Status
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    // ✅ Payment Info
    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    // ✅ Shipping Address
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
    },

    // ✅ Tracking Dates
    confirmedAt: Date,
    shippedAt: Date,
    deliveredAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);