const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/credits', async (req, res) => {
  const ip = req.ip;
  const guest = await User.findOne({ googleId: ip, isGuest: true });
  const used = guest ? guest.creditsUsed : 0;
  const remaining = Math.max(0, 5 - used);
  res.json({ used, remaining, max: 5 });
});

module.exports = router;
