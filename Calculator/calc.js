let display = document.getElementById("display");
let currentInput = "";
let operator = "";

function appendNumber(num) {
  currentInput += num;
  display.textContent = currentInput;
}

function appendOperator(op) {
  operator = op;
  currentInput += op;
  display.textContent = currentInput;
}

function calculate() {
  let result;
  try {
    result = Function('"use strict";return (' + currentInput + ')')();
  } catch (error) {
    display.textContent = "Error";
    return;
  }
  display.textContent = result;
  currentInput = result.toString();
}

let clearButton = document.getElementById("clear");

clearButton.addEventListener('click', function () {
  currentInput = "";
  operator = "";
  display.textContent = "";
});

function clearIn(e){
  console.log("bruh")
  document.getElementById("display").innerHTML = ""

}