const buttons = document.querySelectorAll(".button");
const displayBlock = document.querySelector(".display p");
const numInputs = document.querySelectorAll(".number");
const clearInput = document.querySelector(".clear");
const equalsInput = document.querySelector("#equals");
const addInput = document.querySelector("#add");
const subtractInput = document.querySelector("#subtract");
const multiplyInput = document.querySelector("#multiply");
const divideInput = document.querySelector("#divide");
const decimalInput = document.querySelector("#decimal");

let valueInput = [];
let operators = [];
let storedValue = 0;
let prevStoredValue = 0;
let equalsValue = 0;
let operatorMemory = "";

// add case if prevStoredValue exists
const addAndSubtractEvents = function(){
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
    operators.unshift(this.textContent);
    valueInput = [];
    prevStoredValue = 0;
}

// separate function to respect order of operations
const multiplyAndDivideEvents = function(){
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
    operators.unshift(this.textContent);
    valueInput = [];
}

// build array of the number input by clicks. does not allow for numbers greater than 9 digits.
numInputs.forEach(function(node){
   node.addEventListener("click", function() {
        if(valueInput.length < 10) {
            valueInput.push(parseFloat(node.textContent));
            displayBlock.textContent = valueInput.join("");
        } 
    }); 
})

buttons.forEach(function(node){
    node.addEventListener("click", function() { 
         node.classList.add("clicked");
     }); 
    node.addEventListener("transitionend", function() { 
         node.classList.remove("clicked");
     }); 
 })

// Event listeners for clicking operator buttons/
addInput.addEventListener("click", addAndSubtractEvents);
subtractInput.addEventListener("click", addAndSubtractEvents);

multiplyInput.addEventListener("click", multiplyAndDivideEvents);
divideInput.addEventListener("click", multiplyAndDivideEvents);

decimalInput.addEventListener("click", function(){
    if(!valueInput.includes(".")) {
        valueInput.push(this.textContent);
        displayBlock.textContent = valueInput.join(""); 
    }
});

clearInput.addEventListener("click", function() {
    clear();
});

// listens for click on equals button.
equalsInput.addEventListener("click", function(){
    if(!operators[0]) {
        storedValue = parseFloat(valueInput.join(""));
        valueInput = [];
    } //do nothing and reset input array if no operations performed
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
})

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

// reinitialize display and all stored values
const clear = function() {
    displayBlock.textContent = "0";

    valueInput = [];
    operators = [];
    storedValue = 0;
    prevStoredValue = 0;
    operatorMemory = "";
}

// call correct math function based on operator
const operate = function(operator, a, b) {
    let result = 0;
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
    let result = 0;
    if(operators[0] === "equals" && !valueInput[0]) {
        result = operate(operators[1], storedValue, equalsValue);
    } else if (outer === true) {
        result = operate(operatorMemory, storedValue, prevStoredValue);
        prevStoredValue = 0;
        operatorMemory = "";
    } else if(!operators[0] || !valueInput[0]) {
        console.log(valueInput[0]);
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
