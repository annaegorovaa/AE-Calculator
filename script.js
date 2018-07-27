let a = null;
let b = null;
let operation = '';

function read() {
  return document.getElementById('result').value || '0';
}

function write(value) {
  document.getElementById('result').value = value;
}

function toInput(value) {
  if (value === '.' && !read().includes('.')) {
    write(read() + value);
  } else if (value === '0' && read().includes('.')) {
    write(read() + value);
  } else if (value !== '0' && value !== '.') {
    if (read().includes('.')) {
      write(read() + value);
    } else {
      if (read()[0] === '0') {
        write(read().substring(1) + value);
      } else {
        write(read() + value);
      }
    }
  }
}

function subtract(){
  a = Number(read());
  operation = '-';
}

function addNum() {
  a = Number(read());
  operation = '+';
}

function multiply() {
  a = Number(read());
  operation = '*';
}

function divide() {
  a = Number(read());
  operation = '/';
}

function getResult() {
  if (operation) {
    switch (operation) {
      case '-':
        write(a - b);
        break;
      case '+':
        write(a + b);
        break;
      case '*':
        write(a * b);
        break;
      case '/':
        write(a / b);
        break;
    }
  }
}

function clearValue() {
  document.getElementById('result').value = '0';
  a = b = null;
  operation = '';
}
