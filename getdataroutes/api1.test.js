const apiOneData = require('./api1.js');

describe('api 1', () => {
  test('should return string', () => {
    expect(typeof (apiOneData)).toBe('function');
  });
});
