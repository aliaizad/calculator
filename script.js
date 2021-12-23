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
    }
    return (total - element);
  })
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
        }
        return (total/element);
    }, 0);
    return divide;
}