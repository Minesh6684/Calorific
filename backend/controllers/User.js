const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    // Save the user to the database
    const user = await newUser.save();
    const userData = {
      name: user.name,
      token: await generateToken(user._id),
    };

    // Respond with a success message or token if needed
    res.status(201).json(userData);
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const LoginUser = async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (correctPassword) {
      console.log(`Is Password Correct: ${correctPassword}`);
      return res
        .status(200)
        .json({ name: user.name, token: await generateToken(user._id) });
    } else {
      return res.status(401).json({ error: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { RegisterUser, LoginUser };
