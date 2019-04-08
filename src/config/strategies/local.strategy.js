const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:signInRouter');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'login',
      passwordField: 'password'
    }, (login, password, done) => {
      const url = 'mongodb://127.0.0.1:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          const db = client.db(dbName);

          debug('connection to database was established');

          const col = await db.collection('users');
          const userLogin = await col.findOne({ login });
          if (userLogin && userLogin.password === password) {
            done(null, userLogin);
          } else {
            done(null, false);
          }
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      }());
    }
  ));
};
