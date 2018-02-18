const models = require('../models');
const server = require('../server.js');
const supertest = require('supertest');

beforeEach(() => models.booksdetails.create({
  bookId: 13,
  name: 'Shall We Tell The President?',
  author: 'Jeffrey Archer',
  rating: 3.2,
}));
afterEach(() => models.booksdetails.destroy({ truncate: true }));

describe('route /getAllBooksDatas', () => {
  describe('method GET /books', () => {
    test('server responds with status code 200', (done) => {
      server.inject('/books', (response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
  test('should return all books', (done) => {
    supertest(server.listener)
      .get('/books')
      .then((response) => {
        expect(Object.keys(response.body).length).toBe(2);
        done();
      })
      .catch(console.log);
  });
});
describe('method POST /books', () => {
  test('should return a 200 OK statusCode', (done) => {
    supertest(server.listener)
      .post('/saveBooks')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      })
      .catch(console.log);
  });
});
describe('method GET /book/like/id', () => {
  test('should return a 200 OK statusCode', (done) => {
    supertest(server.listener)
      .get('/book/like/1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      })
      .catch(console.log);
  });
});
describe('method GET /book/dislike/id', () => {
  test('should return a 200 OK statusCode', (done) => {
    supertest(server.listener)
      .get('/book/dislike/1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      })
      .catch(console.log);
  });
});
