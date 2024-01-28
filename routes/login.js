// routes/login.js
const express = require('express');
const { login } = require('../services/authService');

const router = express.Router();

router.post('/api/v1/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await login(username, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;