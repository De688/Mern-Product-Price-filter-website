const number = require("@hapi/joi/lib/types/number");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  product_model: {
    type: String,
  },
  product_price: {
    type: Number,
    default: 0,
  },
  product_image: {
    type: [String],
  },
  amount: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  Product_description: {
    type: String,
  },

  senderId: {
    type: "String",
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
