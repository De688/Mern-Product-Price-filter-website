const number = require("@hapi/joi/lib/types/number");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  product_model: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },

  product_image: {
    type: String,
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
  rating: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    default: 0,
  },

  senderId: {
    type: "String",
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

postSchema.index({
  product_name: "text",
  location: "text",
});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
