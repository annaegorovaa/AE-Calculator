let a = 0;
let b = 0;
let operation = '';

function read() {
    return +document.getElementById('result').value || 0;
}

function write(value) {
    document.getElementById('result').value = value;
}

function toInput(value) {
    if (operation) {
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
    operation = '-';
}

function addNum() {
    a = read();
    operation = '+';
}

function multiply() {
    a = read();
    operation = '*';
}

function divide() {
    a = read();
    operation = '/';
}

function getResult() {
    if (operation) {
        switch (operation) {
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
    operation = '';
}
