const api1Data = require('./api1.js');
const getRating = require('./api2.js');
const db = require('../models');

let dataAboutAllBooks1 = [];
const dataAboutAllBooks2 = [];
let contents = '';
module.exports = [{
  path: '/Books',
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
  method: 'GET',
  handler: (request, response) => {

  },
},
];
