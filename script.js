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
  firstDigit = false;
}

function operate(value){
  if(!operation) {
    memory = Number(read());
    operation = value;
    firstDigit = true;
  } else {
    getResult();
  }
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
    firstDigit = true;
  }
}

function clearValue() {
  write('0');
  memory = null;
  operation = null;
  firstDigit = true;
}
