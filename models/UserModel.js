const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Create the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Skip hashing if the password wasn't modified (e.g., during updates)
  }

  try {
    // Hash the password with salt rounds of 10
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords (for login)
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
