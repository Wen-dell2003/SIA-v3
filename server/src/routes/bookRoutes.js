const express = require('express');
const { body } = require('express-validator');
const bookController = require('../controllers/bookController');
const router = express.Router();

// Get all books with filtering and pagination
router.get('/', bookController.getAllBooks);

// Get a single book
router.get('/:id', bookController.getBookById);

// Create a new book
router.post('/',
  [
    body('title').notEmpty().trim().escape(),
    body('author').notEmpty().trim().escape(),
    body('description').notEmpty().trim().escape(),
    body('price').isFloat({ min: 0 }),
    body('imageUrl').isURL(),
    body('category').isIn(['Fiction', 'Non-Fiction', 'Science', 'Technology', 'Arts', 'History', 'Other']),
    body('stock').isInt({ min: 0 }),
    body('isbn').notEmpty().trim().escape()
  ],
  bookController.createBook
);

// Update a book
router.put('/:id',
  [
    body('title').optional().trim().escape(),
    body('author').optional().trim().escape(),
    body('description').optional().trim().escape(),
    body('price').optional().isFloat({ min: 0 }),
    body('imageUrl').optional().isURL(),
    body('category').optional().isIn(['Fiction', 'Non-Fiction', 'Science', 'Technology', 'Arts', 'History', 'Other']),
    body('stock').optional().isInt({ min: 0 }),
    body('isbn').optional().trim().escape()
  ],
  bookController.updateBook
);

// Delete a book
router.delete('/:id', bookController.deleteBook);

module.exports = router;
