const result = document.querySelector('.result');
const history = document.querySelector('.history');
const clear = document.querySelector('.clear');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const equal = document.querySelector('.equal');

let currentNumber = '';
let previousNumber = '';
let operation = '';
let historyArray = [];

// Update Result Field
function updateResult(value) {
    const str = value.toString();
    if (str.length > 10) {
        const num = parseFloat(str);
        result.innerText = num.toExponential(5);
    } else {
        result.innerText = str;
    }
}

// Update History Field
function updateHistory() {
    const str = historyArray.join(' ');
    history.innerText = str;
}

// Clear Result Field
function clearResult() {
    currentNumber = '';
    updateResult(currentNumber);
}

// Handle Number Click
function handleNumberClick(number) {
    if (number === '.' && currentNumber.includes('.')) return;
    if (number === '0' && currentNumber === '') return;

    currentNumber += number;
    updateResult(currentNumber);
}

// Handle Operator Click
function handleOperatorClick(op) {
    if (operation !== '') {
        calculate();
    }

    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';

    historyArray.push(previousNumber);
    historyArray.push(operation);

    updateHistory();
    clearResult();
}

// Perform Calculations
function calculate() {
    if (currentNumber === '' || previousNumber === '') return;

    let resultNumber;
    const num1 = parseFloat(previousNumber);
    const num2 = parseFloat(currentNumber);

    if (isNaN(num1) || isNaN(num2)) return;

    switch (operation) {
        case '+':
            resultNumber = num1 + num2;
            break;

        case '-':
            resultNumber = num1 - num2;
            break;

        case '*':
            resultNumber = num1 * num2;
            break;

        case '/':
            resultNumber = num1 / num2;
            break;

        case '%':
            resultNumber = num1 % num2;
            break;

        default:
            return;
    }

    currentNumber = String(resultNumber);
    operation = '';
    previousNumber = '';
    historyArray = [currentNumber];
    updateHistory();
    updateResult(currentNumber);
}

// Bind Click Event Listeners
clear.addEventListener('click', () => {
    clearResult();
    operation = '';
    previousNumber = '';
    historyArray = [];
    updateHistory();
});

operators.forEach((op) => {
    op.addEventListener('click', () => handleOperatorClick(op.getAttribute('data-operator')));
});

numbers.forEach((num) => {
    num.addEventListener('click', () => handleNumberClick(num.getAttribute('data-number')));
});

equal.addEventListener('click', () => {
    calculate();
});