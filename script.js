const add = function() {
	const addArray = Array.from(arguments);
    const add = addArray.reduce((total, element) => {
    return total += element;
    }, 0);
    return add;
};

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

const multiply = function() {
    const multiplyArray = Array.from(arguments);
    const multiply = multiplyArray.reduce((total, element) => {
      return (total*element);
    }, 1);
    return multiply;
  };

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

const operate = function (operator, num1, num2) {
    return operator(num1, num2);
}

//when a num button is clicked,
//set up an event listener for the num buttons to notice the click
//find the number that the button represent
//store the number in a variable
//change the inner text of the num input to that variable
//if a user click another num button it will concatenate
//the number appears on the num input
const num = document.querySelectorAll('.num');
num.forEach((button) => button.addEventListener('click'))
console.log(num);