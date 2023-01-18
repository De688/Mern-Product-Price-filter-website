const express = require("express");
const router = require("express").Router();

const User = require("../schema/userSchema.js");

router.put("/add-to-cart/:userId/:productId", (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      user
        .addToCart(req.params.productId)
        .then((updatedUser) => res.json(updatedUser))
        .catch((err) =>
          res.status(400).json({ message: "Error adding to cart" })
        );
    })
    .catch((err) => res.status(404).json({ message: "User not found" }));
});

router.put("/remove-from-cart/:userId/:productId", (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      user
        .removeFromCart(req.params.productId)
        .then((updatedUser) => res.json(updatedUser))
        .catch((err) =>
          res.status(400).json({ message: "Error removing from cart" })
        );
    })
    .catch((err) => res.status(404).json({ message: "User not found" }));
});

module.exports = router;
