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
    if (displayOut.length < 22) {
        displayOut += e.target.innerText;
        inputScreen.textContent = displayOut;
    }
    return;
}
//set up operator buttons to be click and that the result will be the next input
const operator = document.querySelectorAll('.operator');
operator.forEach((button) => button.addEventListener('click', showAndFunnel));
let operatorCounter = 0;
function showAndFunnel(e) {
    if (clickCounter === 0 || clickCounter === 2) {
        showInput(e);
    } else {
        alert('Press the equal sign again after a calculation');
    }
}
//a function that funnels the results of a previous operation into the next
//when clicking the operator button

//setting up the equal sign
const equal = document.getElementById('=');
const resultScreen = document.querySelector('#result');
equal.addEventListener('click', calculate);
let numSep = ['x', '+', '-', '\xF7'];
let numReg = numSep.map(e => e.match(/[a-zA-Z0-9]/) ? e : `\\${e}`).join('|');
let opeSep = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
let opeReg = opeSep.map(e => e.match(/[a-zA-Z0-9]/) ? e : `\\${e}`).join('|');
let clickCounter = 0;
//a callback function for the equal sign whichs evaluates user input
function calculate () {
    //set up a counter for how many times the button is clicked
    clickCounter++;
    //if it is clicked twice
    if (clickCounter === 2) {
        addLog(inputScreen.textContent, resultScreen.textContent);
        inputScreen.textContent = resultScreen.textContent;
        clickCounter = 0;
        displayOut = inputScreen.textContent;
        return;
    }
    //splitting the outputs into two arrays to be funneled in operate()
    let numArray = displayOut.split(new RegExp(numReg));
    if (numArray.includes('')) {
        clearFn();
        return;
    }
    let opeArray = displayOut.split(new RegExp(opeReg));
    opeArray = opeArray.filter(element => (element !== '' && element !== '.'));
    //if there is no operation, put the input in the results;
    if (opeArray.length < 1) {
        resultScreen.textContent = displayOut;
        return;
    }
    numArray = numArray.map(num => num = +num);
    const resultOut = operate(opeArray, numArray);
    //conditionals to determine the significant figures of the result
    const presicion = resultOut.toString().length
    if (resultOut === Infinity || Number.isNaN(resultOut)) {
        resultScreen.textContent = 'Undefined';
    } else if (Number.isInteger(resultOut)) {
        resultScreen.textContent = resultOut;
    } else if (presicion > 12) {
        resultScreen.textContent = resultOut.toPrecision(12);
    } else {
        resultScreen.textContent = resultOut.toPrecision();
    }
}
//a function to add div to calc log when equal sign is pressed
const calclog = document.querySelector('#log-con');
let divcount = 0;
function addLog (input, result) {
    if (input === result) {
        return;
    } else if (divcount > 5) {
        divArray = Array.from(calclog.querySelectorAll('div'));
        calclog.removeChild(divArray[0]);
    }
    const div = document.createElement('div');
    div.textContent = `${input} = ${result}`;
    div.setAttribute('style', 'border: black solid; box-sizing: border-box; width: 550px; padding: 10px; border-radius: 15px; font-size: 20px');
    calclog.appendChild(div);
    divcount++;
    console.log(`${divcount} div`);
    console.log(clickCounter);
}
//setting up the clear button
const clear = document.querySelector('#Escape');
clear.addEventListener('click', clearFn);

function clearFn () {
    inputScreen.textContent = '';
    resultScreen.textContent = '';
    numArray = [];
    opeArray = [];
    displayOut = '';
    clickCounter = 0;
}
//setting up the delete button
const backspace = document.querySelector('#Backspace');
backspace.addEventListener('click', removeChars);

function removeChars() {
    displayOut = displayOut.slice(0, -1);
    inputScreen.textContent = displayOut;
}

//adding keyboard support
document.addEventListener('keydown', keypress);
function keypress(e) {
    if (e.key === '*') {
        document.getElementById('x').classList.add('black');
        document.getElementById('x').click();
    } else if (e.key === 'Enter') {
        equal.classList.add('black');
        equal.click();
    } else if (document.getElementById(e.key)) {
        document.getElementById(e.key).classList.add('black');
        document.getElementById(e.key).click();
    }
}
//adding changing colour on keypress


document.addEventListener('keyup', removeClass);
//removing class on keyup
function removeClass (e) {
    if (e.key === '*') {
        document.getElementById('x').classList.remove('black');
    } else if (e.key === 'Enter') {
        equal.classList.remove('black');
    } else if (document.getElementById(e.key)) {
        document.getElementById(e.key).classList.remove('black');
    }
}

