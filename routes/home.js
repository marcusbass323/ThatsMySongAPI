const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('Rendering Welcome Message')
  res.send('Welcome to ThatsMySong API')
});

module.exports = router;