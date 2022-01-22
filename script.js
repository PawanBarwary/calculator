// Querying some useful DOM elements
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators')
const result = document.querySelector('.results');
const ac = document.querySelector('#AC');
const plusminus = document.querySelector('#plusminus');
const percent = document.querySelector('#percent');
const equal = document.querySelector('#equal');

// Declaring variables about the ongoing calculation
let currentNumber = "";
let afterOperator = false;
let currentCalculation = {
  numbers: [],
  operator: null
};

const resetCalculation = () => {
  currentCalculation = {
    numbers: [],
    operator: null
  };
  currentNumber = "";
};

// Functions for basic arithmetic
const add = (a, b) => (a + b); 
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => (a / b);

const funcFromElement = (element) => {
  switch(element) {
    case "+":
      return add;
    case "-":
      return subtract;
    case "÷":
      return divide;
    case "x":
      return multiply;
  }
};

  
// Changes font size based on number length. Numbers that are too large return false. 
const responsiveFont = (num) => {
  const length = num.toString().length;
  if (length < 7) {
    result.style.fontSize = '2em';
  }
  else if (length < 10) {
    result.style.fontSize = '1.5em';
  }
  else if (length < 18){
    result.style.fontSize = '1em';
    if (length == 17) {
      return false;
    }
  } 
  else {
    result.style.fontSize = '1em';
    return false;
  }
};

// Rounds and turns number into scientific notation until it fits the screen. 

const makeNumSmaller = (num) => {
  let i = 0;
  while (responsiveFont(num) === false) {
    num = Math.round(num/(10**i)) * 10**i;
    num = num.toExponential();
    i++
  }
  return num;
}

const checkForCommas = (number) => {
  if(number.textContent == ".") {
    const dotIn = Array.from(currentNumber).some( character => {
      return character == ".";
    });
    return dotIn;
  }
};

// Click functions


const clickNumber = (numberButton) => {
  ac.textContent = "C";
  const handleSize = responsiveFont(currentNumber);
  if (handleSize == false && afterOperator == false) return ; 
  if (checkForCommas(numberButton)) return ;
  if (numberButton.textContent == "0" && 
      (result.textContent == "0" || result.textContent == "-0")) return;
  if (afterOperator==true) {
    currentCalculation.numbers.push(currentNumber);
    currentNumber = "";
    result.textContent = numberButton.textContent;
    if (currentCalculation.operator){
      currentCalculation.operator.classList.remove('click-operator');
    }
    afterOperator = false;
  }
  else if (result.textContent == "0" && numberButton.textContent != ".") {
    result.textContent = numberButton.textContent;
  } 
  else result.textContent += numberButton.textContent;

  currentNumber += numberButton.textContent;
};

const clickOperator = (operator) => {
  if (currentCalculation.numbers.length == 1) {
    calculate();
  }
  if (afterOperator) {
    currentCalculation.operator.classList.remove('click-operator');
  }
  currentCalculation.operator = operator;
  operator.classList.add('click-operator');
  afterOperator = true;
};

const clear = () => {
  ac.textContent = "AC";
  result.textContent = "0";
  responsiveFont("0");
  if(currentCalculation.operator){
    currentCalculation.operator.classList.remove('click-operator');
  }
  resetCalculation();
}

const calculate = () => {
  if (afterOperator) {
    currentCalculation.operator.classList.remove('click-operator');
    return;
  }
  currentCalculation.numbers.push(currentNumber);
  const calc = funcFromElement(currentCalculation.operator.textContent);
  const num1 = parseFloat(currentCalculation.numbers[0]);
  const num2 = parseFloat(currentCalculation.numbers[1]);
  let solution = calc(num1, num2);
  if (solution == "Infinity" || solution == "-Infinity" || solution == "NaN") solution = "ERROR";
  solution = parseFloat(solution);
  if (responsiveFont(solution) == false) solution = makeNumSmaller(solution);
  result.textContent = solution;
  resetCalculation();
  currentNumber = result.textContent;
};

const changeSign = () => {
  if (currentNumber.charAt(0) == "-"){
    currentNumber = currentNumber.slice(1, currentNumber.length);
  }
  else if (result.textContent == "0") currentNumber = "-"+"0";
  else currentNumber = "-" + currentNumber;
  result.textContent = currentNumber;
};

const toPercent = () => {
  currentNumber = currentNumber / 100;
  currentNumber = makeNumSmaller(currentNumber);
  result.textContent = currentNumber;
}

// Click event listeners
numbers.forEach(number => {
  number.addEventListener('click', () => clickNumber(number));
});

operators.forEach(operator => {
  operator.addEventListener('click', () => clickOperator(operator));
});

ac.addEventListener('click', clear);
plusminus.addEventListener('click', changeSign);
equal.addEventListener('click', calculate);
percent.addEventListener('click', toPercent);