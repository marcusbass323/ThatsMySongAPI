// routes/register.js
const express = require('express');
const { register } = require('../services/authService');

const router = express.Router();

router.post('/api/v1/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password)
  try {
    const result = await register(username, email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;