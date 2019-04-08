// eslint-disable-next-line import/newline-after-import
const express = require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();
const books = [
  {
    title: 'War and peace 1',
    genre: 'Historical Fiction 1',
    author: 'Lev Niko 1',
    bookId: 656,
    read: false
  },
  {
    title: 'War and peace 2',
    genre: 'Historical Fiction 2',
    author: 'Lev Niko 2',
    bookId: 24280,
    read: false
  },
  {
    title: 'War and peace 3',
    genre: 'Historical Fiction 3',
    author: 'Lev Niko 3',
    bookId: 12,
    read: false
  },
  {
    title: 'War and peace 4',
    genre: 'Historical Fiction 4',
    author: 'Lev Niko  4',
    bookId: 100,
    read: false
  }

];

// eslint-disable-next-line no-unused-vars
function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      // db
      const url = 'mongodb://127.0.0.1:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(url);
          debug('Connected to the server');

          const db = client.db(dbName);
          //   await db.collection('books').insertMany(books);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());


      // res.send('inserting books');
    });

  return adminRouter;
}

module.exports = router;
