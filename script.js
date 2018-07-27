let a=0,
    initialState = true,
    operand = null;

document.getElementById('result').value = '0';

function toInput(id) {
    console.log(operand);
    console.log(initialState);
    let temp = document.getElementById('result').value;
    if (initialState) {
        clearValue();
        initialState = false;
    }
    if (temp === '0') document.getElementById('result').value = id;
    else document.getElementById('result').value += id;
}

function toInputClean(id){
    clearValue();
    toInput(id);
}

function fromInput(){
    return document.getElementById('result').value;
}

function fromInputClean(){
    let result = document.getElementById('result').value;
    clearValue();
    return result;
}

function initAction(id){
    initialState = true;
    if (operand === null){
        a = Number(fromInput());
        operand = id;
    }
    else{
        operand = id;
        switchOperand();
        toInput(a.toString());
        initialState = true;
    }
}

function switchOperand(){
    switch(operand){
        case '-': a -= Number(fromInputClean());
        break;
        case '+': a += Number(fromInputClean());
        break;
        case '*': a *= Number(fromInputClean());
        break;
        case '/': a = a / Number(fromInputClean());
        break;
    }
}

function getResult(){
    switchOperand();
    toInputClean(a.toString());
    a = 0;
    initialState = true;
    operand = null;
}

function clearValue() {
    document.getElementById('result').value = '';
}

function clearToInitialState() {
    clearValue();
    a = 0;
    initialState = true;
    operand = null;
}
