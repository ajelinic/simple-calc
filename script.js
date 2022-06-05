"use strict";
const numbers = document.getElementsByName("num");
const operators = document.getElementsByName("operator");
const numberButtons = document.querySelector(".numbers");
let display = document.getElementById("view");

for (let i = 1; i <= 9; i++) {
  let numButton = document.createElement("button");
  numButton.className = "calc_button";
  numButton.value = i;
  numButton.setAttribute("name", "num");
  numButton.id = i;
  numButton.innerText = i;
  numberButtons.append(numButton);
}

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
    let input = button.value;
    numberInput(input);
  });
});

operators.forEach((button) => {
  button.addEventListener("click", function () {
    var input = button.value;
    if (calc.num1 === "") {
      display.innerText = "ERROR";
    } else {
      setOperand(input);
      display.innerText = "";
    }
    let interval = setInterval(function () {
      if (display.innerText == "" && calc.result > "") {
        clearInterval(interval);
        calc.num1 = calc.result;
        calc.result = "";
        calc.num2 = "";
        display.innerText = calc.num1;
      } else if (display.innerText === "") {
        clearInterval(interval);
        display.innerText = calc.num1;
      }
    }, 50);
  });
});

function numberInput(num) {
  if (num > "" && calc.operand === "") {
    let numString = (calc.num1 += num);
    if (numString.length >= 10) {
      let sub = numString.substr(0, 9);
      calc.num1 = sub;
      return;
    }
  } else if (num > "" && calc.num1 != "" && calc.operand != "") {
    let numString = (calc.num2 += num);
    if (numString.length >= 10) {
      let sub = numString.substr(0, 9);
      calc.num2 = sub;
      return;
    }
  }
  updateDisplay();
  addOnlyOneZero();
}

function updateDisplay() {
  if (calc.result) {
    display.innerText = calc.result;
    console.log(calc);
  } else if (calc.operand != "") {
    display.innerText = calc.num2;
    console.log(calc);
  } else if (calc.num1 > "") {
    calc.zero = "";
    display.innerText = calc.num1;
  }
}

function setOperand(operand) {
  if (
    (operand === "+" && calc.num1 != "") ||
    (operand === "-" && calc.num1 != "") ||
    (operand === "X" && calc.num1 != "") ||
    (operand === "/" && calc.num1 != "")
  ) {
    calc.operand = operand;
    console.log(calc);
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
      ifResultIsZero();
      break;
    case "X":
      calc.result = +calc.num1 * +calc.num2;
      updateDisplay();
      displayLongNumbers(calc.result);
      ifResultIsZero();
      break;
    case "/":
      calc.result = +calc.num1 / +calc.num2;
      updateDisplay();
      displayLongNumbers(calc.result);
      dividedByZero(calc.result);
      ifResultIsZero();
      break;
    default:
  }
});

document.getElementById("del").addEventListener("click", function () {
  if (calc.num1 != "" && calc.num2 > "") {
    calc.num2 = calc.num2.slice(0, -1);
    updateDisplay();
    if (calc.num2 === "") {
      calc.zero = 0;
      display.innerText = calc.zero;
    }
    return;
  } else if (calc.num1 > "" && calc.operand === "") {
    calc.num1 = calc.num1.slice(0, -1);
    updateDisplay();
    console.log(calc);
    if (calc.num1 === "") {
      calc.zero = 0;
      display.innerText = calc.zero;
    }
    return;
  }
});

document.getElementById("comma").addEventListener("click", function () {
  if (calc.num2 > "") {
    calc.num2 = calc.num2 + ".";
    if (calc.num2[1] === ".") {
      calc.num2 = calc.num2.slice(0, 2);
    }

    updateDisplay();
    return;
  }
  if (calc.num1 > "") {
    calc.num1 = calc.num1 + ".";
    if (calc.num1[1] === ".") {
      calc.num1 = calc.num1.slice(0, 2);
    }
    updateDisplay();
    return;
  }
  if (calc.num1 === "") {
    document.getElementById("comma").disable = true;
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

function addOnlyOneZero() {
  let firstZero = document.getElementsByClassName("zero");
  if (calc.num1[1] === ".") {
    updateDisplay();
  } else if (calc.num1[0] === firstZero.num.value) {
    calc.num1 = calc.num1.slice(0, 1);
    updateDisplay();
  }
}
function ifResultIsZero() {
  let resZero = calc.result.toString();
  calc.result = resZero;
  updateDisplay();
}
