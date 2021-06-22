"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const books_1 = __importDefault(require("../Models/books"));
router.get('/', (req, res, next) => {
    books_1.default.find((err, books) => {
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
router.get('/add', (req, res, next) => {
    res.render('books/details', {
        title: 'Add Book',
        page: 'book-add',
        books: {},
    });
});
router.post('/add', (req, res, next) => {
    const newBook = new books_1.default({
        Title: req.body.title,
        Price: Number(req.body.price),
        Author: req.body.author,
        Genre: req.body.genre,
    });
    books_1.default.create(newBook, (err) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.redirect('/books');
    });
});
router.get('/:id', (req, res, next) => {
    books_1.default.findById(req.params.id, {}, {}, (err, books) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.render('books/details', {
            title: 'Edit Book',
            page: 'book-edit',
            books,
        });
    });
});
router.post('/:id', (req, res, next) => {
    books_1.default.findByIdAndUpdate(req.params.id, {
        $set: {
            Title: req.body.title,
            Price: Number(req.body.price),
            Author: req.body.author,
            Genre: req.body.genre,
        },
    }, (err) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.redirect('/books');
    });
});
router.get('/delete/:id', (req, res, next) => {
});
//# sourceMappingURL=books.js.map