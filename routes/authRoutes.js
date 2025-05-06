const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authenticate = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', authenticate, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.name}` });
});

module.exports = router;
