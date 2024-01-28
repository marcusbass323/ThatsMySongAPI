// services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function register(username, email, password) {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      // Add any other fields you want to include in the user document
    });

    // Save the user to the database
    await newUser.save();

    return { message: 'User registered successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function login(username, password) {
  // ... (unchanged)
}

module.exports = { register, login };