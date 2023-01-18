const router = require("express").Router();
const usersModel = require("../schema/userSchema.js");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

//validation using joi
// joi schema

const schema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().required(),
});

router.post("/register", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //   destructure the post
  const { name, email, password } = req.body;

  //encription
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, parseInt(salt));

  //create the new user whose password id encripted(hashed)
  const newUser = new usersModel({
    name: name,
    email: email,
    password: hashedpassword,
    ProfileImage: "",
  });

  //check if user arleady exist before saving the user
  // but first destructure

  const userExist = await usersModel.findOne({ email: email });
  if (userExist) return res.status(404).send("arleady exist");

  try {
    await newUser.save();
    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      ProfileImage: newUser.ProfileImage,
      token: generateToken(newUser._id),
      created_at: newUser.date,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// log in route
//fisrt vallidate login data with Joi

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().required(),
});

router.post("/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  //check if user exist
  const { email, password } = req.body;
  const userExist = await usersModel.findOne({ email: email });
  if (!userExist) return res.status(401).send("user does not exist");

  //match two password
  const validuser = await bcrypt.compare(password, userExist.password);
  if (!validuser) return res.status(401).send("wrong password");
  try {
    res.status(200).json({
      id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      ProfileImage: userExist.ProfileImage,
      token: generateToken(userExist._id),
      created_at: userExist.date,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update user login data
//first validate data

const updateuserschema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().required(),
  ProfileImage: Joi.string(),
});

router.put("/updateuserdata/:id", upload.single("image"), async (req, res) => {
  const { error } = updateuserschema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let userData = req.body;
    // Hash the user's new password
    if (userData.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      userData = { ...userData, password: hashedPassword };
    }
    // Update the user with the new data
    const user = await usersModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: userData },
      { new: true }
    );

    // Save the updated user
    await user.save();

    // Send a success response to the client
    res.status(201).json({ user });
  } catch (err) {
    // Handle any errors that occurred during the update process
    res.status(500).json({ error: err.message });
  }
});

//delete user account

router.delete("/deleteuser/:id", async (req, res) => {
  const user = await usersModel.findById(req.params.id);
  if (!user) return res.status(404).send("user not found!");

  await user.remove();
  res.status(200).json({ id: req.params.id, message: "user account deleted" });
});

// my functions
const generateToken = (userid) => {
  return jwt.sign({ _id: userid }, process.env.TOKEN_SECRET);
};
module.exports = router;
