const express = require('express');
const debug = require('debug')('app:authRouter');
const { MongoClient, ObjectID } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      // create user
      const { login, password } = req.body;
      const url = 'mongodb://127.0.0.1:27017';
      const dbName = 'libraryApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          const db = client.db(dbName);
          debug('database connection successful');

          const user = { login, password };

          const response = await db.collection('users').insertOne(user);
          debug(response);
          req.login(response.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      }());

      // res.json(req.body);
    });

  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/');
    });

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });


  return authRouter;
}

module.exports = router;
