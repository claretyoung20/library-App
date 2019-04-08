// eslint-disable-next-line import/newline-after-import
const express = require('express');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadService');

const bookRouter = express.Router();

function router(nav) {
  const { getIndex, getById, middleWare } = bookController(bookService, nav);

  bookRouter.use(middleWare);

  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    .get(getById);

  bookRouter.route('/single').get((req, res) => res.send('single books'));

  return bookRouter;
}

module.exports = router;
