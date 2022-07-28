const numbers   =    document.querySelectorAll('[data-number]')
const operators =    document.querySelectorAll('[is_operator]');
const clear     =    document.getElementById("clear");
const equal     =    document.getElementById("equal");
const display   =    document.getElementById("display");
var number1 = '';
var number2 = '';
var currentOperation = null;
var shouldResetScreen = false;

clear.addEventListener('click', clearScreen);
equal.addEventListener('click', evaluate);

function clearScreen(){
    display.value = '';
    display.ariaPlaceholder = '0';
    number1 = '';
    number2 = '';
    currentOperation = null;
}

numbers.forEach(element => {
    element.addEventListener('click', () => appendNumber(element.textContent))
});

operators.forEach(element => {
    element.addEventListener('click',() => setOperation(element.textContent))
});

function appendNumber(number){
    if(display.value === '0' || shouldResetScreen) resetScreen();
    display.value += number;
}

function resetScreen(){
    display.value = '';
    display.placeholder = '0';
    shouldResetScreen = false;
}

function setOperation(operator){
    if(currentOperation!==null) evaluate();
    number1 = display.value;
    currentOperation = operator;
    shouldResetScreen = true;
}

function evaluate(){
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === '÷' && display.value === '0') {
        alert("You can't divide by 0!");
        return;
    }
    number2 = display.value;
    display.value = roundResult(operate(currentOperation, number1, number2));
    currentOperation = null;
}


function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case '÷':
            if (b === 0) return null;
            else return divide(a, b);
        default:
            return null;
    }
}

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}