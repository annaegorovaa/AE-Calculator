let a = null,
  initialState = true,
  operand = null;

function read() {
  return document.getElementById('result').value || '0';
}

function write(value) {
  document.getElementById('result').value = value;
}

function toInput(id) {
  if (initialState) {
    write('');
  }
  if ((initialState && id === '0') || (read().includes('.') && id === '.')) {
    return;
  }
  if (read()[0] === '0' && read().length < 2 && id !== '.' ) {
    write(read().substring(1) + id);
  } else if (read()[0] === '-' && read().length < 2 && id === '.'){
    write(read() + '0' + id);
  } else {
    write(read() + id);
  }
  initialState = false;
}

function initAction(id){
  if(!operand) {
    a = Number(read());
    operand = id;
    initialState = true;
  } else {
    calcResult();
    operand = id;
  }
}

function getResult(){
  let b = Number(read());
  if (operand) {
    switch (operand) {
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
    operand = null;
    initialState = true;
  }
}

function clearValue() {
  write('0');
  a = null;
  operand = null;
  initialState = true;
}

function changeSign() {
  if (initialState) {
    a && !operand ? write(read()[0] === '-' ? read().substring(1) : '-' + read()) : write('-');
    initialState = false;
  } else {
    if (read()[0] === '-') {
      if (read().length === 1) {
        initialState = true;
      }
      write(read().substring(1));
    } else {
      write('-' + read());
    }
  }
}