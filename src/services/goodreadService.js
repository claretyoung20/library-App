const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadService');

const parser = xml2js.Parser({ explicitArray: false });

function goodreadService() {
  function getBookById(bookId) {
    return new Promise((resolve, rejects) => {
      axios.get(`https://www.goodreads.com/book/show/${ bookId}.xml?key=MVVTyeM42ztRtzkabiDGg`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result.GoodreadsResponse.book.authors.author.name);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          rejects(error);
          debug(error);
        });
    });
  }

  return { getBookById };
}
module.exports = goodreadService();
