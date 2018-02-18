const api1Data = require('./api1.js');
const getRating = require('./api2.js');
const db = require('../models');

let dataAboutAllBooks1 = [];
let dataAboutAllBooks2 = [];
let contents = '';
module.exports = [{
  path: '/books',
  method: 'GET',
  handler: (request, response) => {
    api1Data().then((data) => {
      let allBooks = JSON.parse(data);
      allBooks = allBooks.books;
      dataAboutAllBooks1 = [];
      allBooks.forEach((book) => { dataAboutAllBooks1.push(getRating(book)); });
      Promise.all(dataAboutAllBooks1).then((values) => {
        contents = values;
        const dataGroupedByAuthor = {};
        contents.forEach((details) => {
          const authorName = details.Author;
          if (dataGroupedByAuthor[`${authorName}`] === undefined) {
            dataGroupedByAuthor[`${authorName}`] = [details];
          } else {
            dataGroupedByAuthor[`${authorName}`].push(details);
          }
        });
        response(dataGroupedByAuthor);
      });
    });
  },
}, {
  path: '/saveBooks',
  method: 'POST',
  handler: (request, response) => {
    api1Data().then((data) => {
      let allBooks = JSON.parse(data);
      allBooks = allBooks.books;
      dataAboutAllBooks2 = [];
      allBooks.forEach((book) => { dataAboutAllBooks2.push(getRating(book)); });
      Promise.all(dataAboutAllBooks2).then((values) => {
        contents = values;
        db.booksdetails.destroy({ truncate: true, where: {} }).then(() => {
          for (let i = 0; i < values.length; i += 1) {
            db.booksdetails.create({
              author: contents[i].Author,
              bookid: contents[i].id,
              name: contents[i].Name,
              rating: contents[i].rating,
            }).then(() => {
            });
          }
        }).then(() => {
          response('data saved into database');
        });
      });
    });
  },
},
];
