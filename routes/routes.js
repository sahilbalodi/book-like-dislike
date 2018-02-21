const api1Data = require('../apis/api1.js');
const getRating = require('../apis/api2.js');
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
            });
          }
        }).then(() => {
          response('data saved into database');
        });
      });
    });
  },
},
{
  path: '/book/like/{id}',
  method: 'GET',
  handler: (request, response) => {
    db.booksdetails.findOne({ where: { bookid: request.params.id } }).then((book) => {
      if (!(book === null)) {
        db.likes.upsert({
          bookId: request.params.id,
          like: true,
        }).then(() => {
          response(`book liked with id ${request.params.id}`);
        });
      } else {
        response('book id not present');
      }
    });
  },
},
{
  path: '/book/dislike/{id}',
  method: 'GET',
  handler: (request, response) => {
    db.booksdetails.findOne({ where: { bookid: request.params.id } }).then((book) => {
      if (!(book === null)) {
        db.likes.upsert({
          bookId: request.params.id,
          like: false,
        }).then(() => {
          response(`book disliked with id ${request.params.id}`);
        });
      } else {
        response('book id not present');
      }
    });
  },
},
{
  path: '/booksFromDatabase',
  method: 'GET',
  handler: (request, response) => {
    const sendBooks = [];
    db.booksdetails.findAll().then((tableresult) => {
      db.likes.findAll().then((likeresult) => {
        if (likeresult.length === 0) {
          tableresult.forEach((x) => {
            x.like = null;
            sendBooks.push({
              name: x.name,
              rating: x.rating,
              author: x.author,
              like: x.like,
              bookid: x.bookid,
            });
          });
        } else {
          tableresult.forEach((x) => {
            likeresult.forEach((y) => {
              if (y.bookId === x.bookid) {
                x.like = y.like;
              } else {
                x.like = null;
              }
            });
            sendBooks.push({
              name: x.name,
              rating: x.rating,
              author: x.author,
              like: x.like,
              bookid: x.bookid,
            });
          });
        }
        response(sendBooks);
      });
    });
  },
},
];
