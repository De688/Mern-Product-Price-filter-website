const router = require("express").Router();
const postModel = require("../schema/postSchema.js");
const usersModel = require("../schema/userSchema.js");
const verified = require("../verify_user/verify.js");

//posting product info

router.post("/createProduct", async (req, res) => {
  const {
    product_name,
    product_model,
    product_price,
    product_image,
    amount,
    location,
    phone_number,
    Product_description,
    senderId,
  } = req.body;

  const newProduct = new postModel({
    product_name,
    product_model,
    product_price,
    product_image,
    amount,
    location,
    phone_number,
    Product_description,
    senderId,
  });

  try {
    await newProduct.save();
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(401).send(error);
  }
});

//read all products info from the database

router.get("/getProduct", verified, async (req, res) => {
  postModel.find({}, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

//Edit  product

router.put("/editProduct/:id", verified, async (req, res) => {
  const post = await postModel.findById(req.params.id);
  if (!post) return res.status(404).json("Post not found");

  const updatedPost = postModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedPost);
});

//fetch a single post

// router.get("/getpost/:id", verified, async (req, res) => {
//   const post = await postModel.findOne(req.params.id);

//   if (!post) return res.status(404).json("post not found");
//   return res.status(200).json(post);
// });

//delete a post
router.delete("/deletePost/:id", verified, async (req, res) => {
  const post = postModel.findById(req.params.id);
  if (!post) {
    res.status(404).json("Post not found");
  }

  post.remove();
  res
    .status(200)
    .json({ id: req.params.id, message: "Post deleted successfully" });
});

module.exports = router;
