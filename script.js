let memory = null;
let operation = null;
let firstDigit = true;

window.onload = () => {
  write(0);
};

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

function preventInput() {
  return false;
}

document.onkeydown = typeSymbol;

function typeSymbol(event) {
  let x = event.key || event.which;
  if (x.match(/^[0-9]$/)) {
    addSymbol(x);
  } else if (x.match(/[/*-+]/)) {
    addOperation(x);
  } else if (x === '%') {
    calcPercent();
  } else if (x === 'Enter') {
    calcResult();
  } else if (x === 'Escape') {
    clearValue();
  } else {
    return false;
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
    calcResult();
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
  calcResult();
}

function calcResult() {
  let b = Number(read());
  if (readFromLog().slice(-1) === '\n') {
    writeToLog(`${memory} ${operation}`);
  }
  if (operation) {
    switch (operation) {
      case '-':
        write(memory - b);
        writeToLog(` ${b} = ${memory - b}\n`);
        break;
      case '+':
        write(memory + b);
        writeToLog(` ${b} = ${memory + b}\n`);
        break;
      case '*':
        write(memory * b);
        writeToLog(` ${b} = ${memory * b}\n`);
        break;
      case '/':
        write(memory / b);
        writeToLog(` ${b} = ${memory / b}\n`);
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
  memory = null;
  operation = null;
  firstDigit = true;
}
