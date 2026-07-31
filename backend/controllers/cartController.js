const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity }]
      });
    } else {
      const index = cart.products.findIndex(
        item => item.productId.toString() === productId
      );

      if (index > -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("products.productId");

    res.json(cart || { products: [] });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.products.find(
      p => p.productId.toString() === productId
    );

    if (!item) return res.status(404).json({ message: "Product not in cart" });

    item.quantity = quantity;

    await cart.save();
    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    res.json({ message: "Item removed", cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = [];
    await cart.save();

    res.json({ message: "Cart cleared successfully", cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};