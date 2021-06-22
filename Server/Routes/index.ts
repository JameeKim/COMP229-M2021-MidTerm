/**
 * Server/Routes/index.ts
 *
 * Routes for the index page
 *
 * Dohyun Kim 301058465
 * COMP229-M2021-MidTerm-301058465
 */

// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

import mongoose from 'mongoose';

// define the book model
import book from '../Models/books';

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    page: 'home',
    books: ''
   });
});

//module.exports = router;
