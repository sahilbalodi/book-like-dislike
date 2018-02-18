const Hapi = require('hapi');
const server = require('./server.js');
const verify = require('./verify.js');

describe('test for server getbookdata ', () => {
  test('server.js should return a server object', () => {
    expect(server).toBeInstanceOf(Hapi.Server);
  });
});
describe('server getbookdata ', () => {
  test('server responds to the get request with statusCode 404', (done) => {
    server.inject('/', (response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
  test('server responds to the get request with statusCode 404', (done) => {
    server.inject('/sahil/balodi', (response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
  test('server responds to the get request with statusCode 404', (done) => {
    if (!verify('') === null) {
      server.inject('', (response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    }
    done();
  });
  test('server responds to the get request with statusCode 404', (done) => {
    if (!verify(123) === null) {
      server.inject(123, (response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    }
    done();
  });
  test('server responds to the get request with statusCode 200', (done) => {
    if (!(verify('/Books') === null)) {
      server.inject('/Books', (response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    }
  });
});
