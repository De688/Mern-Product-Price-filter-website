const express = require("express");
const router = require("express").Router();
const User = require("../schema/userSchema");
const Product = require("../schema/postSchema");

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // Find user and retrieve their cart and totalPrice
    const user = await User.findById(userId);
    const cart = user.cart;
    const totalPrice = user.totalPrice;

    // Return response with all items in cart and the overall total price of all items
    res.status(200).json({ cart, totalPrice });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});

//add to cart
router.post("/add-to-cart", async (req, res) => {
  const { userId, productId, price, quantity } = req.body;

  try {
    // Find user and retrieve their cart
    const user = await User.findById(userId);
    let cart = user.cart;
    let totalPrice = user.totalPrice;

    // Check if item already exists in cart
    let itemIndex = cart.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex !== -1) {
      // Item already exists in cart, update quantity and total
      cart[itemIndex].quantity += quantity;
      cart[itemIndex].total = cart[itemIndex].price * cart[itemIndex].quantity;
      totalPrice += price * quantity;
    } else {
      // Calculate total for new item
      const total = price * quantity;
      // Add new item to cart
      cart.push({ productId, price, quantity, total });
      totalPrice += total;
    }

    // Update user's cart and totalPrice in the database
    await User.updateOne({ _id: userId }, { $set: { cart, totalPrice } });

    // Return response with all items in cart, their individual total price, and the overall total price of all items
    res.status(200).json({ message: "Item added to cart", cart, totalPrice });
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
});

//increment product

router.patch("/increment-cart-item/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Find user and retrieve their cart
    const user = await User.findById(userId);
    let cart = user.cart;
    let totalPrice = user.totalPrice;

    // Find the index of the item in the cart
    let itemIndex = cart.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Get the item from the cart
    let item = cart[itemIndex];
    item.quantity++;
    item.total = item.price * item.quantity;
    totalPrice = cart.reduce((acc, item) => acc + item.total, 0);

    // Update user's cart and totalPrice in the database
    await User.updateOne({ _id: userId }, { $set: { cart, totalPrice } });

    // Return response with all items in cart, their individual total price, and the overall total price of all items
    res
      .status(200)
      .json({ message: "Item incremented in cart", cart, totalPrice });
  } catch (error) {
    res.status(500).json({ message: "Error incrementing item in cart", error });
  }
});

router.patch("/decrement-cart-item/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Find user and retrieve their cart
    const user = await User.findById(userId);
    let cart = user.cart;
    let totalPrice = user.totalPrice;

    // Find the index of the item in the cart
    let itemIndex = cart.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Get the item from the cart
    let item = cart[itemIndex];
    item.quantity--;
    if (item.quantity === 0) {
      cart.splice(itemIndex, 1);
    }
    item.total = item.price * item.quantity;
    totalPrice = cart.reduce((acc, item) => acc + item.total, 0);

    // Update user's cart and totalPrice in the database
    await User.updateOne({ _id: userId }, { $set: { cart, totalPrice } });

    // Return response with all items in cart, their individual total price, and the overall total price of all items
    res
      .status(200)
      .json({ message: "Item decremented in cart", cart, totalPrice });
  } catch (error) {
    res.status(500).json({ message: "Error decrementing item in cart", error });
  }
});

//delete item from cart

router.delete("/remove-from-cart/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Find user and retrieve their cart
    const user = await User.findById(userId);
    let cart = user.cart;
    let totalPrice = user.totalPrice;

    // Find the index of the item in the cart
    let itemIndex = cart.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Remove the item from the cart
    let removedItem = cart.splice(itemIndex, 1)[0];
    totalPrice -= removedItem.total;

    // Update user's cart and totalPrice in the database
    await User.updateOne({ _id: userId }, { $set: { cart, totalPrice } });

    // Return response with all items in cart and the overall total price of all items
    res
      .status(200)
      .json({ message: "Item removed from cart", cart, totalPrice });
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
});

module.exports = router;
