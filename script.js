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
  if(!operation) {
    a = Number(read());
    operation = '-';
    write('0');
  } else {
    getResult();
  }
}

function addNum() {
  if(!operation) {
    a = Number(read());
    operation = '+';
    write('0');
  } else {
    getResult();
  }
}

function multiply() {
  if(!operation) {
    a = Number(read());
    operation = '*';
    write('0');
  } else {
    getResult();
  }
}

function divide() {
  if(!operation) {
    a = Number(read());
    operation = '/';
    write('0');
  } else {
    getResult();
  }
}

function getResult() {
  b = Number(read());
  if (operation) {
    switch (operation) {
      case '-':
        write(a - b);
        a = Number(read());
        b = null;
        break;
      case '+':
        write(a + b);
        a = Number(read());
        b = null;
        break;
      case '*':
        write(a * b);
        a = Number(read());
        b = null;
        break;
      case '/':
        write(a / b);
        a = Number(read());
        b = null;
        break;
    }
  }
}

function clearValue() {
  write('0');
  a = b = null;
  operation = '';
}
