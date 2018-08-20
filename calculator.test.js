const Calculator = require('./src/calculator');

const calc = new Calculator(() => {}, () => {});

test('handleKey should handle numbers', () => {
  expect(calc.handleKey('0')).toBe(true);
  expect(calc.handleKey('1')).toBe(true);
  expect(calc.handleKey('2')).toBe(true);
  expect(calc.handleKey('3')).toBe(true);
  expect(calc.handleKey('4')).toBe(true);
  expect(calc.handleKey('5')).toBe(true);
  expect(calc.handleKey('6')).toBe(true);
  expect(calc.handleKey('7')).toBe(true);
  expect(calc.handleKey('8')).toBe(true);
  expect(calc.handleKey('9')).toBe(true);
});

test('handleKey should handle dot', () => {
  expect(calc.handleKey('.')).toBe(true);
});

test('handleKey should handle operation signs', () => {
  expect(calc.handleKey('+')).toBe(true);
  expect(calc.handleKey('-')).toBe(true);
  expect(calc.handleKey('*')).toBe(true);
  expect(calc.handleKey('/')).toBe(true);
});

test('handleKey should handle percent sign', () => {
  expect(calc.handleKey('%')).toBe(true);
});

test('handleKey should handle enter', () => {
  expect(calc.handleKey('Enter')).toBe(true);
});

test('handleKey should not handle unknown key', () => {
  expect(calc.handleKey('r')).toBe(false);
  expect(calc.handleKey('?')).toBe(false);
  expect(calc.handleKey('$')).toBe(false);
  expect(calc.handleKey('&')).toBe(false);
  expect(calc.handleKey('\\')).toBe(false);
  expect(calc.handleKey('M')).toBe(false);
});