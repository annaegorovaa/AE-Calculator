let a = 0;
let b = 0;
let operand = '';

function read() {
    return +document.getElementById('result').value || 0;
}

function write(value) {
    document.getElementById('result').value = value;
}

function toInput(value) {
    if (operand) {
        if (b) {
            b = read() + value;
            write(b);
        } else {
            write(value);
            b = value;
        }
    } else {
        write(read() + value);
    }
}

function subtract(){
    a = read();
    operand = '-';
}

function addNum() {
    a = read();
    operand = '+';
}

function multiply() {
    a = read();
    operand = '*';
}

function divide() {
    a = read();
    operand = '/';
}

function getResult() {
    if (operand) {
        switch (operand) {
            case '-':
                write(a - b);
                break;
            case '+':
                write(a + +b);
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
    a = b = 0;
    operand = '';
}
