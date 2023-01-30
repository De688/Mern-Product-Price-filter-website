const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const userRoute = require("./routes/userRoute.js");
const postRoute = require("./routes/postRoute.js");
const cartRoutes = require("./routes/addtocart.js");
const productsRouter = require("./routes/ProductRouter.js");
const Stripe = require("./routes/Stripe.js");


const port = 5000;
app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// multer image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded!");
});

// connect  database url
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },

  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mongoDB_connected_successfully");
    }
  }
);

// starting the server
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(bodyParser.json({ limit: "3mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "3mb", extended: true }));

app.use("/api/user", userRoute);
app.use("/api/Product", postRoute);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRoutes);
app.use("/api/", Stripe);

app.listen(port, () => {
  console.log(`server running at port:${port}`);
});
