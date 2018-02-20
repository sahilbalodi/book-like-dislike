const apiTwoData = require('./api2.js');

describe('api 2', () => {
  test('should return promise', () => {
    expect(typeof (apiTwoData)).toBe('function');
  });
});
