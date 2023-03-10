const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).send("token not found");

  try {
    verifiedwithtoken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verifiedwithtoken;
    next();
  } catch (error) {
    res.status(404).send(error);
  }
};
