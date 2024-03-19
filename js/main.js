const buttonsContainer = document.querySelector(".buttons");
const operationsScreen = document.querySelector(".operationsScreen");
const totalScreen = document.querySelector(".totalScreen");

let acc = null;
let operation = null;
let result = null;
let operationResult = null;

buttonsContainer.addEventListener("click", buttonHandler);

function buttonHandler(event){
  const clickedElement = event.target;

  const buttonValue = clickedElement.textContent;

  switch(buttonValue){
    case 'C':
      break;
    
    case 'DELETE':
      break;

    case '÷':
      checkOperator(buttonValue);
      break;

    case 'x':
      checkOperator(buttonValue);
      break;

    case '-':
      checkOperator(buttonValue);
      break;

    case '+':
      checkOperator(buttonValue);
      break;

    case '=':
      break;

    case '.':
      break;

    default:
      if(operation === null){
        if(result === null){
          result = buttonValue;
        }else{
          result += buttonValue;
        }
        totalScreen.textContent = result;
      }else{
        if(result === null){
          result = buttonValue;
        }else{
          result += buttonValue;
        }
        operationsScreen.textContent += buttonValue;
        operationResult = makeOperation(operation, acc, result);
        totalScreen.textContent ="=" + operationResult;
      }
      break;
  }
}

function checkOperator(buttonValue){
  if (result !== null) {
    operation = buttonValue;
    operationsScreen.textContent = acc + operation;
    setAccumulator();
  }else{
    operation = buttonValue;
    operationsScreen.textContent = acc + operation;
  }
}


function setAccumulator(){
  if(result !== null && operationResult === null){
    acc = result;
  }else{
    acc = operationResult;
  }
  operationsScreen.textContent = acc + operation;
  result = null;
}

function makeOperation(operation,acc,result){
  let total = null;
  switch(operation){
    case "+":
      total = add(parseInt(acc), parseInt(result));
      return total;
      break;

    case "-":
      total = subtract(parseInt(acc), parseInt(result));
      return total;
      break;

    case "÷":
      total = divide(parseInt(acc), parseInt(result));
      return total;
      break;

    case "x":
      total = multiply(parseInt(acc), parseInt(result));
      return total;
      break;
  }
}


function add(a,b){
  return a + b;
}

function subtract(a,b){
  return a - b;
}

function multiply(a,b){
  return a * b;
}

function divide(a,b){
  return a / b;
}