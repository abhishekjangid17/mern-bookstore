const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getBooks);
router.get('/:id', getBookById);

// Protected routes
router.post('/', protect, adminOnly, createBook);
router.put('/:id', protect, adminOnly, updateBook);
router.delete('/:id', protect, adminOnly, deleteBook);

module.exports = router;
