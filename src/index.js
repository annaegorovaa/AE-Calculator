const Calculator = require('./calculator');

window.onload = () => {
  const calculator = new Calculator(
    (value) => {
      document.getElementById('display').value = value;
    },
    (value) => {
      document.getElementById('log').innerText = value;
    }
  );

  calculator.write(0);

  function addListener(id, callback) {
    document.getElementById(id).addEventListener('click', callback);
  }
  addListener('1', () => calculator.addSymbol('1'));
  addListener('2', () => calculator.addSymbol('2'));
  addListener('3', () => calculator.addSymbol('3'));
  addListener('4', () => calculator.addSymbol('4'));
  addListener('5', () => calculator.addSymbol('5'));
  addListener('6', () => calculator.addSymbol('6'));
  addListener('7', () => calculator.addSymbol('7'));
  addListener('8', () => calculator.addSymbol('8'));
  addListener('9', () => calculator.addSymbol('9'));
  addListener('0', () => calculator.addSymbol('0'));
  addListener('.', () => calculator.addSymbol('.'));
  addListener('minus', () => calculator.addOperation('-'));
  addListener('plus', () => calculator.addOperation('+'));
  addListener('divide', () => calculator.addOperation('/'));
  addListener('multiply', () => calculator.addOperation('*'));
  addListener('change-sign', () => calculator.addSymbol('-'));
  addListener('percent', () => calculator.calcPercent());
  addListener('equals', () => calculator.equalsListener());
  addListener('clear', () => calculator.clearValue());

  document.onkeyup = (event) => {
    let x = event.key;
    if (calculator.handleKey(x)) {
      event.preventDefault();
    }
  };
};