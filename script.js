let memory = null;
let operation = null;
let firstDigit = true;

function read() {
  return document.getElementById('result').value || '0';
}

function write(value) {
  document.getElementById('result').value = value;
}

function toInput(value) {
  if (firstDigit) {
    write('');
  }
  if ((firstDigit && value === '0') || (read().includes('.') && value === '.')) {
    return;
  } else {
    if (read()[0] === '0' && read().length < 2 && value !== '.' ) {
      write(read().substring(1) + value);
    } else if (read()[0] === '-' && read().length < 2 && value === '.'){
      write(read() + '0' + value);
    } else {
      write(read() + value);
    }
  }
  firstDigit = false;
}

function operate(value){
  if(!operation) {
    memory = Number(read());
    operation = value;
    firstDigit = true;
  } else {
    getResult();
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
  getResult();
}

function getResult() {
  let b = Number(read());
  if (operation) {
    switch (operation) {
      case '-':
        write(memory - b);
        break;
      case '+':
        write(memory + b);
        break;
      case '*':
        write(memory * b);
        break;
      case '/':
        write(memory / b);
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
