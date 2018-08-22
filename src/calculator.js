const Decimal = require('decimal.js-light');

function Calculator(writeCallback, writeToLogCallback) {
  this.log = '';
  this.storedNumber = '';
  this.currentNumber = '';
  this.operation = '';
  this.firstDigit = true;
  this.writeCallback = writeCallback;
  this.writeToLogCallback = writeToLogCallback;
  this.handleKey = handleKey;
  this.addSymbol = addSymbol;
  this.addOperation = addOperation;
  this.calcPercent = calcPercent;
  this.equalsListener = equalsListener;
  this.clearValue = clearValue;

  writeCallback('0');
}

function handleKey (x) {
  if (x.match(/^[0-9.]$/)) {
    this.addSymbol(x);
  } else if (x.match(/[/*\-+]/)) {
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
}

function addSymbol(value) {
  if (this.firstDigit) {
    this.currentNumber = '';
  }
  if ((value === '0' && this.currentNumber === '0') || (value === '.' && this.currentNumber.includes('.'))) {
    return;
  } else if (value === '.' && !this.currentNumber.length) {
    this.currentNumber = '0';
  }
  if (value === '-') {
    this.currentNumber = this.currentNumber.charAt(0) === value ? this.currentNumber.substring(1) : value + this.currentNumber;
  } else {
    if (value !== '.' && this.currentNumber === '0') {
      this.currentNumber = '';
    }
    this.currentNumber += value;
  }
  this.firstDigit = false;
  this.writeCallback(this.currentNumber);
}

function addOperation(value) {
  if (!this.operation) {
    this.storedNumber = Number(this.currentNumber);
    this.operation = value;
    this.firstDigit = true;
    this.log += `${this.storedNumber} ${this.operation}`;
  } else {
    if (this.log.slice(-1) === '\n') {
      this.log += `${this.storedNumber} ${this.operation}`;
    }
    this.equalsListener();
    this.operation = value;
  }
  this.currentNumber = '';
  this.writeToLogCallback(this.log);
}

function calcPercent() {
  this.currentNumber = Number(this.currentNumber) * this.storedNumber / 100;
  this.writeCallback(this.currentNumber);
  this.equalsListener();
}

function equalsListener() {
  let b = Number(this.currentNumber);
  if (this.operation && this.log.slice(-1) === '\n') {
    this.log += `${this.storedNumber} ${this.operation}`;
  }
  if (this.operation) {
    switch (this.operation) {
      case '-':
        this.currentNumber = new Decimal(this.storedNumber).minus(b);
        break;
      case '+':
        this.currentNumber = new Decimal(this.storedNumber).plus(b);
        break;
      case '*':
        this.currentNumber = new Decimal(this.storedNumber).times(b);
        break;
      case '/':
        this.currentNumber = new Decimal(this.storedNumber).dividedBy(b);
        break;
    }
    this.writeCallback(this.currentNumber);
    this.log += ` ${b} = ${this.currentNumber}\n`;
    this.writeToLogCallback(this.log);
    this.storedNumber = Number(this.currentNumber);
    this.operation = '';
    this.firstDigit = true;
  }
}

function clearValue() {
  this.writeCallback('0');
  if (this.log.charAt(this.log.length - 1) !== '\n') {
    this.log = this.log.substring(0, this.log.lastIndexOf('\n') + 1);
  }
  this.writeToLogCallback(this.log);
  this.storedNumber = '';
  this.currentNumber = '';
  this.operation = '';
  this.firstDigit = '';
}

module.exports = Calculator;