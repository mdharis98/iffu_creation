const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Hardcoded admin credentials (from env)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'Ifa@iffu_Art';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Iffu@Artist2024';

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { username: ADMIN_USERNAME },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

