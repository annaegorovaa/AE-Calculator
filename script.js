let memory = null;
let operation = null;
let firstDigit = true;

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
  document.getElementById('log').innerHTML = value;
}

document.onkeypress = typeSymbol;

function typeSymbol(event) {
  event.preventDefault();
  let x = event.key || event.which;
  console.log(x);
  if (x.match(/[0-9]/)) {
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
    return;
  }
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
    writeToLog(`${readFromLog()}<ul>${memory} ${operation}</ul>`);
  } else {
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
  if (operation) {
    switch (operation) {
      case '-':
        write(memory - b);
        writeToLog(`${readFromLog()}${b} = ${memory - b}`);
        break;
      case '+':
        write(memory + b);
        writeToLog(`${readFromLog()}${b} = ${memory + b}`);
        break;
      case '*':
        write(memory * b);
        writeToLog(`${readFromLog()}${b} = ${memory * b}`);
        break;
      case '/':
        write(memory / b);
        writeToLog(`${readFromLog()}${b} = ${memory / b}`);
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
