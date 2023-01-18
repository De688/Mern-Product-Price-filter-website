const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ProfileImage: {
    type: String,
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  date: {
    type: Date,
    default: new Date(),
  },
});

usersSchema.methods.addToCart = function (productId) {
  const cartProductIndex = this.cart.findIndex((cp) => {
    return cp.productId.toString() === productId.toString();
  });
  let newQuantity = 1;
  const updatedCart = [...this.cart];
  if (cartProductIndex >= 0) {
    newQuantity = this.cart[cartProductIndex].quantity + 1;
    updatedCart[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCart.push({ productId: productId, quantity: newQuantity });
  }
  this.cart = updatedCart;
  return this.save();
};

usersSchema.methods.removeFromCart = function (productId) {
  this.cart = this.cart.filter(
    (cp) => cp.productId.toString() !== productId.toString()
  );
  return this.save();
};

const usersModel = mongoose.model("users", usersSchema);
module.exports = usersModel;
