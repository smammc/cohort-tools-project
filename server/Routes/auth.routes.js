const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const isAuthenticated = require("../middleware/jwt");

// Sign up
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please provide both email and password" });
    return;
  }

  // Check if user already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // Add user to DB
  const salt = await bcrypt.genSalt(12); // generate a salt
  const hashedPassword = await bcrypt.hash(password, salt); // hash the password

  const newUser = {
    email,
    password: hashedPassword,
  };

  const createdUser = await User.create(newUser);
  res.status(201).json({ email: createdUser.email, id: createdUser._id });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please provide both email and password" });
    return;
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  // Check if password is correct
  const correctPassword = await bcrypt.compare(password, foundUser.password);

  // if password is incorrect, return error
  if (!correctPassword) {
    res.status(400).json({ message: "Incorrect password" });
    return;
  }

  // if password is correct, generate a jwt (json web token) for user
  const payload = {
    id: foundUser._id,
    email: foundUser.email,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "6h" });
  res.send({ authToken: token });
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});

module.exports = router;
