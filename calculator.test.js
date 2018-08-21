const Calculator = require('./src/calculator');

let calc = null;
let output = '';
let log = '';

beforeEach(() => {
  const writeCallback = (val) => {
    output = val;
  };
  const writeToLogCallback = (val) => {
    log = val;
  };
  calc = new Calculator(writeCallback, writeToLogCallback);
});

describe('test handleKey function', () => {
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
});

describe('test addSymbol function', () => {
  beforeEach(() => {
    output = '';
  });

  describe('test addSymbol if first digit', () => {
    test('if number should return number', () => {
      calc.addSymbol('1');
      expect(output).toBe('1');
    });

    test('if minus should return change sign', () => {
      calc.addSymbol('-');
      expect(output).toBe('-');
    });

    test('if dot should return zero and dot', () => {
      calc.addSymbol('.');
      expect(output).toBe('0.');
    });
  });

  describe('test addSymbol if has digits without dots', () => {
    test('if number should add number', () => {
      calc.addSymbol('1');
      calc.addSymbol('3');
      expect(output).toBe('13');
    });

    test('if dot should add dot', () => {
      calc.addSymbol('1');
      calc.addSymbol('.');
      expect(output).toBe('1.');
    });

    test('if minus should add minus before number', () => {
      calc.addSymbol('1');
      calc.addSymbol('-');
      expect(output).toBe('-1');
    });

    test('if first digit is zero should not add zero', () => {
      calc.addSymbol('0');
      calc.addSymbol('0');
      expect(output).toBe('0');
    });

    test('if first digit is zero should replace zero with number', () => {
      calc.addSymbol('0');
      calc.addSymbol('1');
      expect(output).toBe('1');
    });
  });

  describe('test addSymbol if has digits with dots', () => {
    test('if number should add number', () => {
      calc.addSymbol('1');
      calc.addSymbol('.');
      calc.addSymbol('0');
      expect(output).toBe('1.0');
    });

    test('if dot should not add dot', () => {
      calc.addSymbol('1');
      calc.addSymbol('.');
      calc.addSymbol('.');
      expect(output).toBe('1.');
    });
  });
});

describe('test addOperation function', () => {
  test('if number and no operation should log number and operation', () => {
    calc.addSymbol('1');
    calc.addOperation('+');
    expect(log).toBe('1 +');
  });

  test('if no number and no operation should log zero and operation', () => {
    calc.addOperation('-');
    expect(log).toBe('0 -');
  });

  test('if operation invoked twice should log result and line break', () => {
    calc.addOperation('*');
    calc.addOperation('*');
    expect(log).toBe('0 * 0 = 0\n');
  });
});