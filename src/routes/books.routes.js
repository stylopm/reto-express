const { Router } = require('express');
const { getBooks, createBook, updateBook, deleteBook } = require('../controllers/books.controllers');
const auth = require('./../middlewares/authorization')
const router = Router();
router.get('/', auth, getBooks)
router.post('/', createBook)
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)
module.exports = router;