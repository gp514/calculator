const buttons = document.querySelectorAll(".button");
const displayBlock = document.querySelector(".display p");
const numInputs = document.querySelectorAll(".number");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector("#equals");
const addButton = document.querySelector("#add");
const subtractButton = document.querySelector("#subtract");
const multiplyButton = document.querySelector("#multiply");
const divideButton = document.querySelector("#divide");
const decimalButton = document.querySelector("#decimal");
const plusMinusInput = document.querySelector("#plus-minus");
const backspaceButton = document.querySelector(".backspace");
const zeroButton = document.querySelector("#zero");
const oneButton = document.querySelector("#one");
const twoButton = document.querySelector("#two");
const threeButton = document.querySelector("#three");
const fourButton = document.querySelector("#four");
const fiveButton = document.querySelector("#five");
const sixButton = document.querySelector("#six");
const sevenButton = document.querySelector("#seven");
const eightButton = document.querySelector("#eight");
const nineButton = document.querySelector("#nine");

let valueInput = [];
let operators = [];
let storedValue = 0;
let prevStoredValue = 0;
let equalsValue = 0;
let operatorMemory = "";
let result = 0;

// reinitialize display and all stored values
const clear = function() {
    displayBlock.textContent = "0";

    valueInput = [];
    operators = [];
    storedValue = 0;
    prevStoredValue = 0;
    operatorMemory = "";
    result = 0;
    equalsValue = 0;
}

// remove one char if currently being input, otherwise clear
const backspace = function() {
    if(valueInput[0]){
        valueInput.pop();
        displayBlock.textContent = valueInput.join("");   
    }
    else {
        clear();
    }
}

// add case if prevStoredValue exists
const addAndSubtractEvents = function(operator = null){  
    const operation = this.textContent || operator;
    // store value of current number array if no previous operator is stored or last operator was equals.
    if((!operators[0] || operators[0] === "equals") && valueInput[0]) {
        storedValue = parseFloat(valueInput.join(""));   
    } 
    // obtain results of stored operator if previous non-equals operator exists.
    else if(operators[0] && valueInput[0]) {
        getResult();
    }

    if(prevStoredValue) {
        getResult(true);
    }
    // clear input array to build new number. update operator array to have selected operator. clear prevStoredValue as order of operations is maintained.
    operators.unshift(operation);
    valueInput = [];
    prevStoredValue = 0;
}

// separate function to respect order of operations
const multiplyAndDivideEvents = function(operator = null){
    const operation = this.textContent || operator;
    // store value of current number array if no previous operator is stored or last operator was equals.
    if((!operators[0] || operators[0] === "equals") && valueInput[0]) {
        storedValue = parseFloat(valueInput.join(""));   
    }
    // move lower priority value to memory
    else if((operators[0] === "+" || operators[0] === "−") && valueInput[0]) {
        prevStoredValue = storedValue;
        storedValue = parseFloat(valueInput.join(""));
        operatorMemory = operators[0];
    }
    // obtain results of stored operator if previous non-equals operator exists.
    else if(operators[0] && valueInput[0]) {
        getResult();
    }
    // clear input array to build new number. update operator array to have selected operator.
    operators.unshift(operation);
    valueInput = [];
}

// build array of the numbers input. does not allow for numbers greater than 9 digits.
const inputNum = function(input) {
    if(valueInput.length < 10) {
        valueInput.push(parseFloat(input));
        displayBlock.textContent = valueInput.join("");
    }
}

const decimalInput = function() {
    if(!valueInput.includes(".")) {
        valueInput.push(".");
        displayBlock.textContent = valueInput.join(""); 
    }
}

const equalsInput = function() {
    if(!operators[0]) {
        storedValue = parseFloat(valueInput.join(""));
        valueInput = [];
    } 
    // obtain result of operation otherwise
    else {
        getResult();
        if(prevStoredValue) {
            getResult(true);
        }
        // only store one equals operator to preserve prior operator to repeat function
        if(operators[0] != "equals") {
            operators.unshift("equals");
        }
        // limit size of operators array
        if(operators.length > 2) operators.pop();
    }
}

// add event listeners for inputting numbers with clicks
numInputs.forEach(function(node){
   node.addEventListener("click", function() {
        inputNum(node.textContent);
    }); 
})

document.addEventListener("keydown", function(e) {
        if(e.key >= 0 && e.key < 10) {
            inputNum(e.key);
            switch(e.key){
                case "10":
                    zeroButton.classList.add("clicked");
                    break;
                case "1":
                    oneButton.classList.add("clicked");
                    break;
                case "2":
                    twoButton.classList.add("clicked");
                    break;
                case "3":
                    threeButton.classList.add("clicked");
                    break;
                case "4":
                    fourButton.classList.add("clicked");
                    break;
                case "5":
                    fiveButton.classList.add("clicked");
                    break;
                case "6":
                    sixButton.classList.add("clicked");
                    break;
                case "7":
                    sevenButton.classList.add("clicked");
                    break;
                case "8":
                    eightButton.classList.add("clicked");
                    break;
                case "9":
                    nineButton.classList.add("clicked");
                    break;
                default:
                    break;
            }
        }
        if(e.key === "."){
            decimalButton.classList.add("clicked");
            decimalInput();
        }
        if(e.key === "Escape"){
            clearButton.classList.add("clicked");
            clear();
        }
        if(e.key === "Backspace"){
            backspaceButton.classList.add("clicked");
            backspace();
        }
        if(e.key === "+"){
            addButton.classList.add("clicked");
            addAndSubtractEvents("+");
        }
        if(e.key === "-"){
            subtractButton.classList.add("clicked");
            addAndSubtractEvents("−");
        }
        if(e.key === "*"){
            multiplyButton.classList.add("clicked");
            multiplyAndDivideEvents("×");
        }
        if(e.key === "-"){
            subtractButton.classList.add("clicked");
            addAndSubtractEvents("÷");
        }
        if(e.key === "="){
            equalsButton.classList.add("clicked");
            equalsInput();
        }
}); 


buttons.forEach(function(node){
    node.addEventListener("click", function() { 
         node.classList.add("clicked");
     }); 
    node.addEventListener("transitionend", function() { 
         node.classList.remove("clicked");
     }); 
 })

// Event listeners for clicking operator buttons/
addButton.addEventListener("click", addAndSubtractEvents);
subtractButton.addEventListener("click", addAndSubtractEvents);

multiplyButton.addEventListener("click", multiplyAndDivideEvents);
divideButton.addEventListener("click", multiplyAndDivideEvents);

decimalButton.addEventListener("click", decimalInput);

plusMinusInput.addEventListener("click", function(){
    if(valueInput[0] === "-") {
        valueInput.shift();
        displayBlock.textContent = valueInput.join("");
    } else if(valueInput[0]) {
        valueInput.unshift("-");
        displayBlock.textContent = valueInput.join("");
    } else {
        result *= -1;
        storedValue *= -1;
        displayBlock.textContent = result;
    }
})

clearButton.addEventListener("click", clear);
backspaceButton.addEventListener("click", backspace);
equalsButton.addEventListener("click", equalsInput);

// basic mathematical functions
const add = function(a, b) {
    return round(a + b);
}

const subtract = function(a, b) {
    return round(a - b);
}

const multiply = function(a, b) {
    return round(a * b);
}

const divide = function(a, b) {
    return round(a / b);
}



// call correct math function based on operator
const operate = function(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "−":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
        default:
            return console.log("Error in operator");
    }
}

// update display and stored values when called by event listeners. repeats prior operation if equals is hit consecutively
const getResult = function(outer = false) {
    if(operators[0] === "equals" && !valueInput[0]) {
        result = operate(operators[1], storedValue, equalsValue);
    } else if (outer === true) {
        result = operate(operatorMemory, storedValue, prevStoredValue);
        prevStoredValue = 0;
        operatorMemory = "";
    } else if(!operators[0] || !valueInput[0]) {
        return;
    } else {
        result = operate(operators[0], storedValue, parseFloat(valueInput.join("")));
        equalsValue = parseFloat(valueInput.join(""));
    }
    displayBlock.textContent = result;
    valueInput = [];
    storedValue = result;
}

// round operation results to avoid overflow on calculator display
const round = function(number) {
    return Math.round(Math.trunc(number*10000))/10000;
}
