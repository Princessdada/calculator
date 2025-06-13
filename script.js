let displayBox = document.querySelector("#display-box");
let buttons = document.querySelectorAll("button");
let cancelButton = document.querySelector("#cancel-button");
let symbolButton = document.querySelector(".symbol-button");
let equal = document.querySelector("#equal-sign");
let clearAll = document.querySelector("#clear-all");
let multiplySign = document.querySelector("#multiply-sign").textContent;
let divisionSign = document.querySelector("#division-sign").textContent;
let addSign = document.querySelector("#add-sign").textContent;
let subSign = document.querySelector("#sub-sign").textContent;
let modSign = document.querySelector("#mod-sign").textContent;
let powSign = document.querySelector("#pow-sign").textContent;

let justEvaluated = false;

const operatorSymbols = ["+", "-", "×", "÷", "%", "^"];

//a function to convert the symbols to inbuilt valid JavaScript operators
function symbolConvertter(expression) {
  return expression.replace(/×/g, "*").replace(/÷/g, "/").replace(/\^/g, "**");
}

//a function that solves the mathematical expression and displays result
function mathSolver() {
  let displayedText = displayBox.textContent;
  const equation = symbolConvertter(displayedText);
  try {
    const result = eval(equation);
    displayBox.textContent = result;
    justEvaluated = true; // Indicates that the last action was evaluation
  } catch (err) {
    displayBox.textContent = "Error";
    justEvaluated = false;
  }
}
// a function that displays the clicked button's value in the display box
function displayButton(e) {
  let buttonText = e.target.textContent;
  const isOperator = operatorSymbols.includes(buttonText);
  const isNumber = !isOperator;
  const lastClickedButton = displayBox.textContent.slice(-1);
  // prevent multiple symbol entry
  if (isOperator && operatorSymbols.includes(lastClickedButton)) {
    return;
  }
  // If previous result was "Error", reset display when new button is clicked
  if (displayBox.textContent == "Error") {
    displayBox.textContent = buttonText;
    justEvaluated = false; //prevents appending number to error message.
    return;
  }
  if (justEvaluated) {
    if (isOperator) {
      displayBox.textContent += buttonText; //appends only operator symbol after clicking the equal sign
    } else if (isNumber) {
      displayBox.textContent = buttonText; // starts aftresh if the user clicks a number after the equal sign
    }
    justEvaluated = false;
  } else {
    displayBox.textContent += buttonText;
  }
}
//function to remove the last displayed item
function clearButton(e) {
  let clickedElement = e.target.closest("button");
  if (clickedElement === cancelButton) {
    displayBox.textContent = displayBox.textContent.slice(0, -1);
  }
}
//function to clear all texts
function clearAllTexts() {
  displayBox.textContent = "";
}

// Attaches event listeners to each button
buttons.forEach((button) => {
  if (button === equal) {
    button.addEventListener("click", mathSolver);
  } else if (button === clearAll) {
    button.addEventListener("click", clearAllTexts);
  } else {
    button.addEventListener("click", displayButton);
  }
});
cancelButton.addEventListener("click", clearButton);
