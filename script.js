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
    case "/":
      return divide;
    case "X":
      return multiply;
  }
};

const checkForCommas = (number) => {
  if(number.textContent == ".") {
    let dotIn = Array.from(currentNumber).some( character => {
      return character == ".";
    });
    return dotIn;
  }
}

// Click functions
const clickNumber = (number) => {

  if (checkForCommas(number)) return ;
  ac.textContent = "C";
  
  if (afterOperator==true) {
    currentCalculation.numbers.push(currentNumber);
    currentNumber = "";
    result.textContent = number.textContent;
    currentCalculation.operator.classList.remove('click-operator');
    afterOperator = false;
  }
  else if (result.textContent == "0" && number.textContent != ".") {
    result.textContent = number.textContent;
  } 
  else {
    result.textContent += number.textContent;
  }
  currentNumber += number.textContent;
};

const clickOperator = (operator) => {
  console.log(currentCalculation);
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
  resetCalculation();
  if(afterOperator){
    currentCalculation.operator.classList.remove('click-operator');
  }
}

const calculate = () => {
  currentCalculation.numbers.push(currentNumber);
  console.log(currentCalculation);
  let calc = funcFromElement(currentCalculation.operator.textContent);
  let num1 = parseFloat(currentCalculation.numbers[0]);
  let num2 = parseFloat(currentCalculation.numbers[1]);
  result.textContent = calc(num1, num2);
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
