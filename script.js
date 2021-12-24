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
    let operator;
    for (let i = 0; i < operationArray.length; i++) {
        if (operationArray[i] === '+') {
            operator = add; 
        } else if (operationArray[i] === '-') {
            operator = subtract;
        } else if (operationArray[i] === 'x') {
            operator = multiply;
        } else {
            operator = divide;
        }

        if (total === 0) {
            total = operator(numArray[i], numArray[i+1]);
        } else {
            total = operator(total, numArray[i+1])
        }
    }
    return total;
}
//when a num button is clicked,
//set up an event listener for the num buttons to notice the click
//find the number that the button represent
//store the number in a variable
//change the inner text of the num input to that variable
//if a user click another num button it will concatenate
//the number appears on the num input
const num = document.querySelectorAll('.num');
num.forEach((button) => button.addEventListener('click', showInput));
let displayOut = '';
const inputScreen = document.querySelector('#numinp');
function showInput (e) {
    displayOut += e.target.innerText;
    inputScreen.textContent = displayOut;
}

//when a user click an operator
//take the number on the input screen and save it
//output the operator on the display
//and assign a function of mathematical operations declared above on to a variable
//based on the button clicked
const operator = document.querySelectorAll('.operator');
operator.forEach((button) => button.addEventListener('click', storeNum));
let opSymbol;
const opeArray = [];
let sep = ['x', '+', '-', '\xF7'];
let reg = sep.map(e => e.match(/[a-zA-Z0-9]/) ? e : `\\${e}`).join('|');
function storeNum(e) {
    showInput(e);
    switch (e.target.innerText) {
        case '+':
            opSymbol = '+';
            break;
        case '-':
            opSymbol = '-';
            break;
        case 'x':
            opSymbol = 'x';
            break;
        case '\xF7': 
            opSymbol = '\xF7';                             
            break;
    };
    opeArray.push(opSymbol);
}
//and when the equal sign is click,
//save the nth number and the operators 
//and operate it
const equal = document.querySelector('#equal');
const resultScreen = document.querySelector('#result');
equal.addEventListener('click', calculate);

function calculate () {
    let numArray = displayOut.split(new RegExp(reg));
    numArray = numArray.map(e => e = +e);
    const resultOut = operate(opeArray, numArray);
    resultScreen.textContent = resultOut;
}




