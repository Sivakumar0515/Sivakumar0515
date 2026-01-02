// script.js
const display = document.getElementById("display");
const keys = document.querySelector(".keys");

let firstOperand = "";
let secondOperand = "";
let operator = "";
let shouldResetDisplay = false;

function updateDisplay(value) {
  display.textContent = value;
}

function clearAll() {
  firstOperand = "";
  secondOperand = "";
  operator = "";
  shouldResetDisplay = false;
  updateDisplay("0");
}

function deleteLast() {
  if (shouldResetDisplay) return;
  const current = display.textContent;
  const next = current.length > 1 ? current.slice(0, -1) : "0";
  updateDisplay(next);
}

function appendNumber(num) {
  if (display.textContent === "0" || shouldResetDisplay) {
    updateDisplay(num);
    shouldResetDisplay = false;
  } else {
    updateDisplay(display.textContent + num);
  }
}

function chooseOperator(op) {
  if (operator !== "") {
    // chain calculations like 2 + 3 + 4
    calculate();
  }
  firstOperand = display.textContent;
  operator = op;
  shouldResetDisplay = true;
}

function calculate() {
  if (operator === "" || shouldResetDisplay) return;
  secondOperand = display.textContent;

  const a = parseFloat(firstOperand);
  const b = parseFloat(secondOperand);
  let result;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) {
        result = "Error";
      } else {
        result = a / b;
      }
      break;
    default:
      result = "Error";
  }

  updateDisplay(String(result));
  firstOperand = String(result);
  operator = "";
  shouldResetDisplay = true;
}

keys.addEventListener("click", (e) => {
  const target = e.target;
  if (!target.matches("button")) return;

  const action = target.dataset.action;
  const op = target.dataset.op;
  const value = target.textContent;

  if (!action && !op) {
    // number or dot
    if (value === "." && display.textContent.includes(".")) return;
    appendNumber(value);
    return;
  }

  if (op) {
    chooseOperator(op);
    return;
  }

  if (action === "clear") {
    clearAll();
  } else if (action === "delete") {
    deleteLast();
  } else if (action === "equals") {
    calculate();
  }
});
