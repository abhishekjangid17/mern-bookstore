const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all orders (admin or user)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const query = req.user.isAdmin ? {} : { user: req.user.id };
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Failed to get orders:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
