/**
 * Server/Routes/books.ts
 *
 * Routes for the book list
 *
 * Dohyun Kim 301058465
 * COMP229-M2021-MidTerm-301058465
 */

// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) =>
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  res.render('books/details', {
    title: 'Add Book',
    page: 'book-add',
    books: {}, // required by ejs; DO NOT REMOVE
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  const newBook = new book({
    Title: req.body.title,
    Price: Number(req.body.price),
    Author: req.body.author,
    Genre: req.body.genre,
  });

  book.create(newBook, (err) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    res.redirect('/books');
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  book.findById(req.params.id, {}, {}, (err, foundBook) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    res.render('books/details', {
      title: 'Edit Book',
      page: 'book-edit',
      books: foundBook, // required name by ejs; DO NOT CHANGE PROPERTY NAME
    });
  });

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  const id = req.params.id;

  // deprecated, but required by the specifications
  book.update({ _id: id }, {
    Title: req.body.title,
    Price: Number(req.body.price),
    Author: req.body.author,
    Genre: req.body.genre,
  }, {}, (err) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    res.redirect('/books');
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  const id = req.params.id;

  book.remove({ _id: id }, (err) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    res.redirect('/books');
  });

});


//module.exports = router;
