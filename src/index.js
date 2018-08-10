const Decimal = require('decimal.js-light');

let memory = null;
let operation = null;
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
document.getElementById('change-sign').addEventListener('click', () => changeSign());
document.getElementById('percent').addEventListener('click', () => calcPercent());
document.getElementById('equals').addEventListener('click', () => equalsListener());
document.getElementById('clear').addEventListener('click', () => clearValue());

function read() {
  return document.getElementById('display').value || '0';
}

function readFromLog() {
  return document.getElementById('log').innerText;
}

function write(value) {
  document.getElementById('display').value = value;
}

function writeToLog(value) {
  document.getElementById('log').innerText += value;
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
    write('');
  }
  if ((firstDigit && value === '0') || (read().includes('.') && value === '.')) {
    return;
  }
  if (read()[0] === '0' && read().length < 2 && value !== '.' ) {
    write(read().substring(1) + value);
  } else if (read()[0] === '-' && read().length < 2 && value === '.'){
    write(read() + '0' + value);
  } else {
    write(read() + value);
  }
  firstDigit = false;
}

function addOperation(value){
  if(!operation) {
    memory = Number(read());
    operation = value;
    firstDigit = true;
    writeToLog(`${memory} ${operation}`);
  } else {
    if (readFromLog().slice(-1) === '\n') {
      writeToLog(`${memory} ${operation}`);
    }
    equalsListener();
    operation = value;
  }
}

function changeSign() {
  if (firstDigit) {
    memory && !operation ? write(read()[0] === '-' ? read().substring(1) : '-' + read()) : write('-');
    firstDigit = false;
  } else {
    if (read()[0] === '-') {
      if (read().length === 1) {
        firstDigit = true;
      }
      write(read().substring(1));
    } else {
      write('-' + read());
    }
  }
}

function calcPercent() {
  write(Number(read()) * memory / 100);
  equalsListener();
}

function equalsListener() {
  let b = Number(read());
  if (operation && readFromLog().slice(-1) === '\n') {
    writeToLog(`${memory} ${operation}`);
  }
  if (operation) {
    switch (operation) {
      case '-':
        write(new Decimal(memory).minus(b));
        writeToLog(` ${b} = ${new Decimal(memory).minus(b)}\n`);
        break;
      case '+':
        write(new Decimal(memory).plus(b));
        writeToLog(` ${b} = ${new Decimal(memory).plus(b)}\n`);
        break;
      case '*':
        write(new Decimal(memory).times(b));
        writeToLog(` ${b} = ${new Decimal(memory).times(b)}\n`);
        break;
      case '/':
        write(new Decimal(memory).dividedBy(b));
        writeToLog(` ${b} = ${new Decimal(memory).dividedBy(b)}\n`);
        break;
    }
    memory = Number(read());
    b = null;
    operation = null;
    firstDigit = true;
  }
}

function clearValue() {
  write('0');
  let log = document.getElementById('log');
  let logText = log.innerText;
  if (logText.charAt(logText.length - 1) !== '\n') {
    log.innerText = logText.substring(0, logText.lastIndexOf('\n') + 1);
  }
  memory = null;
  operation = null;
  firstDigit = true;
}