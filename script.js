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

function operate(value){
  if(!operation) {
    a = Number(read());
    operation = value;
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
    a = Number(read());
    b = null;
  }
}

function clearValue() {
  write('0');
  a = b = null;
  operation = '';
}
