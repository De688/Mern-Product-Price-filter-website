const express = require("express");
const router = express.Router();
const postModel = require("../schema/postSchema.js");
const verified = require("../verify_user/verify.js");

router.post("/addProduct", async (req, res) => {
 
  try {
    const newProduct = new postModel({
      product_name: req.body.product_name,
      product_model: req.body.product_model,
      price: req.body.product_price,
      product_image: req.body.product_image,
      location: req.body.location,
      phone_number: req.body.phone_number,
      Product_description: req.body.Product_description,
      senderId: req.body.senderId,
    });
    await newProduct.save();
    res.json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await postModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const product = await postModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  console.log(req.body.rating);
  try {
    const updatedProduct = await postModel.findByIdAndUpdate(
      req.params.id,
      { $set: { rating: req.body.rating } },
      { new: true }
    );
    // calculate the average rating
    const averageRating = await postModel.aggregate([
      {
        $match: { _id: updatedProduct._id },
      },
      {
        $group: {
          _id: "$_id",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    // update the average rating in the product
    await postModel.findByIdAndUpdate(req.params.id, {
      $set: { averageRating: averageRating[0].averageRating },
    });
    const updatedProductWithAvgRating = await postModel.findById(req.params.id);
    res.status(200).json(updatedProductWithAvgRating);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
