const buttonsContainer = document.querySelector(".buttons");
const operationsScreen = document.querySelector(".operationsScreen");
const totalScreen = document.querySelector(".totalScreen");

let acc = null;
let operation = null;
let result = null;
let operationResult = null;
let totalized = false;

buttonsContainer.addEventListener("click", buttonHandler);

function buttonHandler(event) {
  const clickedElement = event.target;

  if (clickedElement.tagName === "BUTTON") {
    const buttonValue = clickedElement.textContent;

    switch (buttonValue) {
      case "C":
        reset();
        operationsScreen.textContent = "";
        totalScreen.textContent = "0";
        break;

      case "DEL":
        if (operation === null) {
          if(totalized){
            return;
          }
          // Borrar dígitos del primer número
          if (result.length === 1) {
            result = "0";
            totalScreen.textContent = result;
          } else {
            result = result.substring(0, result.length - 1);
            totalScreen.textContent = result;
          }
        } else if (operationsScreen.textContent.charAt(operationsScreen.textContent.length - 1) !== operation) {
          // Borrar dígitos del resultado
          if (result.length === 1) {
            result = "0";
            operationsScreen.textContent = operationsScreen.textContent.substring(0, operationsScreen.textContent.length - 1);
          } else {
            result = result.substring(0, result.length - 1);
            operationsScreen.textContent = operationsScreen.textContent.substring(0, operationsScreen.textContent.length - 1);
          }
          operationResult = makeOperation(operation, acc, result);
          totalScreen.textContent = operationResult;
        }
        break;

      case "÷":
        checkOperator(buttonValue);
        break;

      case "x":
        checkOperator(buttonValue);
        break;

      case "-":
        checkOperator(buttonValue);
        break;

      case "+":
        checkOperator(buttonValue);
        break;

      case "=":
        if (operationResult === null) {
          return;
        }
        if (result !== null || operationResult !== null) {
          totalScreen.textContent = operationResult;
          operationsScreen.textContent = "";
          operation = null;
          totalized = true;
        }
        break;

      case ".":
        if (operation === null) {
          if (result === null) {
            result = "0.";
            totalScreen.textContent = result;
          }else{
            result += ".";
            totalScreen.textContent = result;
          }
        } else {
          if (result === null) {
            result = "0.";
            operationsScreen.textContent += result;
          } else if (!result.includes(".")) {
            result += ".";
            operationsScreen.textContent += ".";
          }
        }
        break;

      default:
        if (totalized && operation === null) {
          reset();
        }
        if (operation === null) {
          if (result === null || result === "0") {
            result = buttonValue;
          } else {
            result += buttonValue;
          }
          totalScreen.textContent = result;
        } else {
          if (result === null || result === "0") {
            result = buttonValue;
          } else {
            result += buttonValue;
          }
          operationsScreen.textContent += buttonValue;
          operationResult = makeOperation(operation, acc, result);
          
          if(operationResult === Infinity || isNaN(operationResult)){
            reset();
            totalScreen.textContent = "LOL";
            operationsScreen.textContent = "";
            reset();
          }else{
            totalScreen.textContent = "=" + operationResult;
          }
        }
        break;
    }
  }
}

function checkOperator(buttonValue) {
  if (result !== null) {
    operation = buttonValue;
    operationsScreen.textContent = acc + operation;
    setAccumulator();
  } else if(result === null && operation === null){
    operation = buttonValue;
    acc = "0";
    operationsScreen.textContent = acc + operation;
  }else{
    operation = buttonValue;
    operationsScreen.textContent = acc + operation;
  }
}

function setAccumulator() {
  if (result !== null && operationResult === null) {
    acc = result;
  } else {
    acc = operationResult;
  }
  operationsScreen.textContent = acc + operation;
  result = null;
}

function reset() {
  acc = null;
  operation = null;
  result = null;
  operationResult = null;
  totalized = false;
}

function makeOperation(operation, acc, result) {
  let total = null;
  switch (operation) {
    case "+":
      total = add(parseFloat(acc), parseFloat(result));
      return total;

    case "-":
      total = subtract(parseFloat(acc), parseFloat(result));
      return total;

    case "÷":
      total = divide(parseFloat(acc), parseFloat(result));
      return total;

    case "x":
      total = multiply(parseFloat(acc), parseFloat(result));
      return total;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
    return a / b;
  }

