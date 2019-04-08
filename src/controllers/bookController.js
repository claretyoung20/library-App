const express = require('express');
const debug = require('debug')('app:bookController');
const { MongoClient, ObjectID } = require('mongodb');

function bookController(bookService, nav) {
  function getIndex(req, res) {
    // db
    const url = 'mongodb://127.0.0.1:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;

      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);

        const col = await db.collection('books');
        const books = await col.find().toArray();

        res.render('books',
          {
            title: 'My Library App',
            nav,
            books
          });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  function getById(req, res) {
    const { id } = req.params;
    // db
    const url = 'mongodb://127.0.0.1:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;

      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);

        const col = await db.collection('books');
        const book = await col.findOne({ _id: new ObjectID(id) });

        book.details = await bookService.getBookById(book.bookId);

        res.render('bookView',
          {
            title: 'My Library App',
            nav,
            book
          });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  function middleWare(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    getIndex,
    getById,
    middleWare
  };
}

module.exports = bookController;
