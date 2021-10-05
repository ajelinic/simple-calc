"use strict";
const numbers = document.querySelectorAll("#num");
const operators = document.querySelectorAll("#operator");
let display = document.getElementById("view");

let calc = {
  num1: "",
  num2: "",
  operand: "",
  result: "",
  zero: 0,
};

this.displayZero();
function displayZero() {
  display.innerText = calc.zero;
}

document.getElementById("clr").addEventListener("click", function () {
  calc.zero = 0;
  display.innerText = calc.zero;
  calc.result = "";
  calc.num1 = "";
  calc.num2 = "";
  calc.operand = "";
});

numbers.forEach((button) => {
  button.addEventListener("click", function () {
    let input = button.firstChild.data;
    numberInput(input);
  });
});

operators.forEach((button) => {
  button.addEventListener("click", function () {
    var input = button.firstChild.data;
    setOperand(input);
    display.innerText = "";
    let interval = setInterval(function () {
      if (display.innerText == "" && calc.result != "") {
        clearInterval(interval);
        calc.num1 = calc.result;
        calc.result = "";
        calc.num2 = "";
        display.innerText = calc.num1;
      } else if (display.innerText == "") {
        clearInterval(interval);
        display.innerText = calc.num1;
      }
    }, 50);
  });
});

function numberInput(num) {
  if (num > "" && calc.operand == "") {
    let numString = (calc.num1 += num);
    if (numString.length >= 10) {
      let sub = numString.substr(0, 9);
      calc.num1 = sub;
      return;
    }
  } else if (
    (num > "" && calc.num1 != "" && calc.operand != "") ||
    calc.operand > 0
  ) {
    let numString = (calc.num2 += num);
    if (numString.length >= 10) {
      let sub = numString.substr(0, 9);
      calc.num2 = sub;
      return;
    }
  }
  updateDisplay();
}

function updateDisplay() {
  if (calc.result != "") {
    display.innerText = calc.result;
  } else if (calc.operand != "" || calc.operand > 0) {
    display.innerText = calc.num2;
    console.log(calc);
  } else if (calc.num1 > "") {
    calc.zero = "";
    display.innerText = calc.num1;
  }
}

function setOperand(operand) {
  if (
    operand === "+" ||
    operand === "-" ||
    operand === "X" ||
    operand === "/"
  ) {
    calc.operand = operand;
    console.log(calc);
  } else if (calc.num1 === "") {
    return (display.innerText = "ERROR");
  }
}
function displayLongNumbers() {
  if (calc.result.toString().length >= 10) {
    let result;
    result = +calc.result;
    calc.result = result.toExponential(5);
    updateDisplay();
  }
}
document.getElementById("eq").addEventListener("click", function () {
  switch (calc.operand) {
    case "+":
      calc.result = +calc.num1 + +calc.num2;
      updateDisplay();
      displayLongNumbers(calc.result);
      break;
    case "-":
      calc.result = +calc.num1 - +calc.num2;
      updateDisplay();
      displayLongNumbers(calc.result);
      break;
    case "X":
      calc.result = +calc.num1 * +calc.num2;
      updateDisplay();
      displayLongNumbers(calc.result);
      break;
    case "/":
      calc.result = +calc.num1 / +calc.num2;
      updateDisplay();
      displayLongNumbers(calc.result);
      dividedByZero(calc.result);
      break;
    default:
  }
});

document.getElementById("del").addEventListener("click", function () {
  if (calc.num2 > "" && calc.num2 > "") {
    calc.num2 = calc.num2.slice(0, -1);
    updateDisplay();
    if (calc.num2 === "") {
      calc.zero = 0;
      display.innerText = calc.zero;
      updateDisplay();
    }
    return;
  } else if (calc.num1 > "") {
    calc.num1 = calc.num1.slice(0, -1);
    updateDisplay();
    console.log(calc);
    if (calc.num1 === "") {
      calc.zero = 0;
      display.innerText = calc.zero;
      updateDisplay();
    }
    return;
  }
});

document.getElementById(".").addEventListener("click", function () {
  if (calc.num2 > "") {
    calc.num2 = calc.num2 + ".";
    updateDisplay();
    return;
  }
  if (calc.num1 > "") {
    calc.num1 = calc.num1 + ".";
    updateDisplay();
    return;
  }
  if (calc.num1 === "") {
    document.getElementById(".").disable = true;
  }
});

function dividedByZero() {
  if (isFinite(calc.result)) {
    return calc.result;
  }
  calc.result = "";
  calc.num1 = "";
  calc.num2 = "";
  calc.operand = "";
  return (display.innerText = "ERROR");
}
