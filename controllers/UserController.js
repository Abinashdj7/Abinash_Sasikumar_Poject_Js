const User = require("../models/UserModel");
const bcrypt = require("bcrypt");


const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    // Check if the password is being updated
    if (req.body.password) {
      // Hash the new password before saving it to the database
      const salt = await bcrypt.genSalt(10); // Generate salt with cost factor 10
      req.body.password = await bcrypt.hash(req.body.password, salt); // Hash the password
    }

    // Update the user with the new data (including hashed password if updated)
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Respond with the updated user
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
};


const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If the user doesn't exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the plain text password with the hashed password stored in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If the password is incorrect
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If login is successful, return the user data
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, getUsers, updateUser, deleteUser, loginUser }
