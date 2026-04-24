const { add } = require('../app');

test('addition positive numbers', () => {
  expect(add(2, 2)).toBe(4);
});

test('addition negative numbers', () => {
  expect(add(-2, -2)).toBe(-4);
});

test('addition mixed numbers', () => {
  expect(add(5, -2)).toBe(3);
});
