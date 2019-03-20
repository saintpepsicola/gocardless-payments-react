function add(a, b) {
    return a + b;
  }
  
  module.exports = add;

const add = require('./add');
describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
