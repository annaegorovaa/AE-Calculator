const Decimal = require('decimal.js-light');

function Calculator(writeCallback, writeToLogCallback) {
  let log = '';
  let storedNumber = '';
  let currentNumber = '';
  let operation = '';
  let firstDigit = true;

  writeCallback('0');

  this.handleKey = function(x) {
    if (x.match(/^[0-9.]$/)) {
      this.addSymbol(x);
    } else if (x.match(/[/*-+]/)) {
      this.addOperation(x);
    } else if (x === '%') {
      this.calcPercent();
    } else if (x === 'Enter') {
      this.equalsListener();
    } else if (x === 'Escape') {
      this.clearValue();
    } else {
      return false;
    }
    return true;
  };

  this.addSymbol = function(value) {
    if (firstDigit) {
      currentNumber = '';
    }
    if ((value === '0' && currentNumber === '0') || (value === '.' && currentNumber.includes('.'))) {
      return;
    } else if (value === '.' && !currentNumber.length) {
      currentNumber = '0';
    }
    if (value === '-') {
      currentNumber = currentNumber.charAt(0) === value ? currentNumber.substring(1) : value + currentNumber;
    } else {
      if (value !== '.' && currentNumber === '0') {
        currentNumber = '';
      }
      currentNumber += value;
    }
    firstDigit = false;
    writeCallback(currentNumber);
  };

  this.addOperation = function(value) {
    if (!operation) {
      storedNumber = Number(currentNumber);
      operation = value;
      firstDigit = true;
      log += `${storedNumber} ${operation}`;
    } else {
      if (log.slice(-1) === '\n') {
        log += `${storedNumber} ${operation}`;
      }
      this.equalsListener();
      operation = value;
    }
    currentNumber = '';
    writeToLogCallback(log);
  };

  this.calcPercent = function() {
    currentNumber = Number(currentNumber) * storedNumber / 100;
    writeCallback(currentNumber);
    this.equalsListener();
  };

  this.equalsListener = function() {
    let b = Number(currentNumber);
    if (operation && log.slice(-1) === '\n') {
      log += `${storedNumber} ${operation}`;
    }
    if (operation) {
      switch (operation) {
        case '-':
          currentNumber = new Decimal(storedNumber).minus(b);
          break;
        case '+':
          currentNumber = new Decimal(storedNumber).plus(b);
          break;
        case '*':
          currentNumber = new Decimal(storedNumber).times(b);
          break;
        case '/':
          currentNumber = new Decimal(storedNumber).dividedBy(b);
          break;
      }
      writeCallback(currentNumber);
      log += ` ${b} = ${currentNumber}\n`;
      writeToLogCallback(log);
      storedNumber = Number(currentNumber);
      operation = '';
      firstDigit = true;
    }
  };

  this.clearValue = function() {
    writeCallback('0');
    if (log.charAt(log.length - 1) !== '\n') {
      log = log.substring(0, log.lastIndexOf('\n') + 1);
    }
    writeToLogCallback(log);
    storedNumber = '';
    currentNumber = '';
    operation = '';
    firstDigit = '';
  };
}

module.exports = Calculator;