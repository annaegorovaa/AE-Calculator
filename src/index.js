const Decimal = require('decimal.js-light');

let log = '';
let storedNumber = '';
let currentNumber = '';
let operation = '';
let firstDigit = true;

window.onload = () => {
  write(0);
};

document.getElementById('1').addEventListener('click', () => addSymbol('1'));
document.getElementById('2').addEventListener('click', () => addSymbol('2'));
document.getElementById('3').addEventListener('click', () => addSymbol('3'));
document.getElementById('4').addEventListener('click', () => addSymbol('4'));
document.getElementById('5').addEventListener('click', () => addSymbol('5'));
document.getElementById('6').addEventListener('click', () => addSymbol('6'));
document.getElementById('7').addEventListener('click', () => addSymbol('7'));
document.getElementById('8').addEventListener('click', () => addSymbol('8'));
document.getElementById('9').addEventListener('click', () => addSymbol('9'));
document.getElementById('0').addEventListener('click', () => addSymbol('0'));
document.getElementById('.').addEventListener('click', () => addSymbol('.'));
document.getElementById('minus').addEventListener('click', () => addOperation('-'));
document.getElementById('plus').addEventListener('click', () => addOperation('+'));
document.getElementById('divide').addEventListener('click', () => addOperation('/'));
document.getElementById('multiply').addEventListener('click', () => addOperation('*'));
document.getElementById('change-sign').addEventListener('click', () => addSymbol('-'));
document.getElementById('percent').addEventListener('click', () => calcPercent());
document.getElementById('equals').addEventListener('click', () => equalsListener());
document.getElementById('clear').addEventListener('click', () => clearValue());

function write(value) {
  document.getElementById('display').value = value;
}

function writeToLog(value) {
  document.getElementById('log').innerText = value;
}

document.onkeydown = typeSymbol;

function typeSymbol(event) {
  let x = event.key || event.which;
  if (x.match(/^[0-9.]$/)) {
    addSymbol(x);
  } else if (x.match(/[/*-+]/)) {
    addOperation(x);
  } else if (x === '%') {
    calcPercent();
  } else if (x === 'Enter') {
    equalsListener();
  } else if (x === 'Escape') {
    clearValue();
  } else {
    return;
  }
  event.preventDefault();
}

function addSymbol(value) {
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
  write(currentNumber);
}

function addOperation(value){
  if(!operation) {
    storedNumber = Number(currentNumber);
    operation = value;
    firstDigit = true;
    log += `${storedNumber} ${operation}`;
  } else {
    if (log.slice(-1) === '\n') {
      log += `${storedNumber} ${operation}`;
    }
    equalsListener();
    operation = value;
  }
  currentNumber = '';
  writeToLog(log);
}

function calcPercent() {
  currentNumber = Number(currentNumber) * storedNumber / 100;
  write(currentNumber);
  equalsListener();
}

function equalsListener() {
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
    write(currentNumber);
    log += ` ${b} = ${currentNumber}\n`;
    writeToLog(log);
    storedNumber = Number(currentNumber);
    operation = '';
    firstDigit = true;
  }
}

function clearValue() {
  write('0');
  if (log.charAt(log.length - 1) !== '\n') {
    log = log.substring(0, log.lastIndexOf('\n') + 1);
  }
  writeToLog(log);
  storedNumber = '';
  currentNumber = '';
  operation = '';
  firstDigit = '';
}