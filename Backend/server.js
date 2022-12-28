const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const userRoute = require("./routes/userRoute.js");
const postRoute = require("./routes/postRoute.js");

const port = 5000;

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

app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "3mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "3mb", extended: true }));

app.use("/api/user", userRoute);
app.use("/api/Product", postRoute);

app.listen(port, () => {
  console.log(`server running at port:${port}`);
});
