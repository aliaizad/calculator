//a function that takes any argument and sum it up
const add = function() {
	const addArray = Array.from(arguments);
    const add = addArray.reduce((total, element) => {
    return total += element;
    }, 0);
    return add;
};
//a function that subtracts n number of arguments
const subtract = function() {
    const subArray = Array.from(arguments);
    const subtract = subArray.reduce((total, element) => {
    if (total === 0) {
      total = element;
      return total;
    }
    return (total - element);
    }, 0);
    return subtract;
};
//a function that finds the product of n number of arguments
const multiply = function() {
    const multiplyArray = Array.from(arguments);
    const multiply = multiplyArray.reduce((total, element) => {
      return (total*element);
    }, 1);
    return multiply;
  };
//a function that divides n number of arguments, arg1/arg2/arg3 etc.
const divide = function() {
    const divideArray = Array.from(arguments);
    const divide = divideArray.reduce((total, element) => {
        if (total === 0) {
            total = element;
            return total;
        }
        return (total/element);
    }, 0);
    return divide;
}
//a function that takes the operations above and evaluate it
const operate = function () {
    const operationArray = arguments[0];
    const numArray = arguments[1];
    let total = 0;
    while (operationArray.length > 0) {
        if (operationArray.includes('x')) {
            total = calcRemove('x', multiply, operationArray, numArray);
        } else if (operationArray.includes('\xF7')) {
            total = calcRemove('\xF7', divide, operationArray, numArray);
        } else if (operationArray.includes('+')) {
            total = calcRemove('+', add, operationArray, numArray);
        } else {
            total = calcRemove('-', subtract, operationArray, numArray);
        }
    }
    return total;
}
//a function that evaluates multiplication and division first and then removing the
//sign from the opArray
//total is added into the array for the next operation;
function calcRemove (opStr, opFunction, operationArray, numArray) {
    let ind = operationArray.indexOf(opStr);
    let total = opFunction(numArray[ind], numArray[ind+1]);
    operationArray.splice(ind, 1);
    numArray.splice(ind, 1);
    numArray.splice(ind, 1);
    numArray.splice(ind, 0, total);
    return total;
}
//setting up the num button
const butts = document.querySelectorAll('.butts');
butts.forEach((button) => button.addEventListener('click', showInput));
let displayOut = '';
const inputScreen = document.querySelector('#numinp');
//a function that displays user input on the screen
function showInput (e) {
    displayOut += e.target.innerText;
    inputScreen.textContent = displayOut;
}

//setting up the equal sign
const equal = document.querySelector('#equal');
const resultScreen = document.querySelector('#result');
equal.addEventListener('click', calculate);
let numSep = ['x', '+', '-', '\xF7'];
let numReg = numSep.map(e => e.match(/[a-zA-Z0-9]/) ? e : `\\${e}`).join('|');
let opeSep = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let opeReg = opeSep.map(e => e.match(/[a-zA-Z0-9]/) ? e : `\\${e}`).join('|');

function calculate () {
    //splitting the outputs into two arrays to be funneled in operate()
    let numArray = displayOut.split(new RegExp(numReg));
    if (numArray.includes('')) {
        clearFn();
        return;
    }
    let opeArray = displayOut.split(new RegExp(opeReg));
    opeArray = opeArray.filter(element => (element !== '' && element !== '.'));
    numArray = numArray.map(num => num = +num);
    const resultOut = operate(opeArray, numArray);
    //conditionals to determine the significant figures of the result
    const presicion = resultOut.toString().length
    if (resultOut === Infinity) {
        resultScreen.textContent = 'Undefined'
    } else if (Number.isInteger(resultOut)) {
        resultScreen.textContent = resultOut;
    } else if (presicion > 12) {
        resultScreen.textContent = resultOut.toPrecision(12);
    } else {
        resultScreen.textContent = resultOut.toPrecision((presicion - 1));
    }
}
//setting up the clear button
const clear = document.querySelector('#clear');
clear.addEventListener('click', clearFn);

function clearFn () {
    inputScreen.textContent = '';
    resultScreen.textContent = '';
    numArray = [];
    opeArray = [];
    displayOut = '';
}
//setting up the delete button
const backspace = document.querySelector('#backspace');
backspace.addEventListener('click', removeChars);

function removeChars() {
    displayOut = displayOut.slice(0, -1);
    inputScreen.textContent = displayOut;
}



