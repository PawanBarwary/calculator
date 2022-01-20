// Querying some useful DOM elements
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators')
const result = document.querySelector('.results');
const ac = document.querySelector('#AC');
const equal = document.querySelector('#equal');

let currentCalculation = "";
let currentOperator;
let afterOperator = false;
// Functions for basic arithmetic
const add = (a, b) => (a + b); 
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => (a / b);
const powers = (a, b) => (a ** b);

// Click functions
const clickNumber = (number) => {
  if (afterOperator==true) {
    result.textContent = number.textContent;
    currentOperator.classList.remove('click-operator');
    afterOperator = false;
  }
  else if (result.textContent == "0") {
    result.textContent = number.textContent;
  } 
  else {
    result.textContent += number.textContent;
  }
  currentCalculation += number.textContent
};

const clickOperator = (operator) => {
  if (afterOperator) {
    currentOperator.classList.remove('click-operator');
    currentCalculation = currentCalculation.slice(0, currentCalculation.length-1);
  }
  currentOperator = operator;
  operator.classList.add('click-operator');
  currentCalculation += operator.textContent;
  afterOperator = true;
};

const clear = () => {
  result.textContent = "0"
  currentOperator.classList.remove('click-operator');
}

// Click event listeners

numbers.forEach(number => {
  number.addEventListener('click', () => clickNumber(number));
});

operators.forEach(operator => {
  operator.addEventListener('click', () => clickOperator(operator));
});

ac.addEventListener('click', clear);

equal.addEventListener('click', () => {
  currentCalculation = currentCalculation.slice(0, currentCalculation.length-1);
  console.log(currentCalculation);

});


