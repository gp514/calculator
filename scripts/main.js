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

// build array of the number input by clicks. does not allow for numbers greater than 9 digits.
numInputs.forEach(function(node){
   node.addEventListener("click", function() {
        if(valueInput.length < 10) {
            valueInput.push(parseInt(node.textContent));
            displayBlock.textContent = valueInput.join("");
        } 
    }); 
})

// functionality for clicking the add button/
addInput.addEventListener("click", function(){
    // do nothing if pressed when calculator is cleared
    if(!storedValue && !valueInput) { 
        return; 
    } 
    // store value of current number array is no previous operator is stored and last operator was not equals.
    else if(!operators[0] && operators[0] != "equals") {
        storedValue = parseInt(valueInput.join(""));   
    } 
    // obtain results of stored operator if previous non-equals operator exists.
    else if(!operators[0]) {
        getResult();
    }
    // clear input array to build new number. add plus to beginning of operator array.
    operators.unshift("+");
    valueInput = [];
});

subtractInput.addEventListener("click", function(){
    if(newInput && !storedValue) {
        return;
    } else if(storedOperator) {
        getResult();
    } else {
        storedValue = currentValue;
        newInput = true;
    }
    storedOperator = "-";
    decimalNext = false;
});

multiplyInput.addEventListener("click", function(){
    if(newInput && !storedValue) {
        return;
    } else if(storedOperator === "+" || storedOperator === "-") {
        prevStoredOperator = storedOperator;
        prevStoredValue = storedValue;
        storedValue = currentValue;
        newInput = true;
    } else if(storedOperator) {
        getResult();
    } else {
        storedValue = currentValue;
        newInput = true;
    }
    storedOperator = "×";
    decimalNext = false;
});

divideInput.addEventListener("click", function(){
    if(newInput && !storedValue) {
        return;
    } else if(storedOperator === "+" || storedOperator === "-") {
        prevStoredOperator = storedOperator;
        prevStoredValue = storedValue;
        storedValue = currentValue;
        newInput = true;
    } else if(storedOperator) {
        getResult();
    } else {
        storedValue = currentValue;
        newInput = true;
    }
    storedOperator = "÷";
    decimalNext = false;
});

decimalInput.addEventListener("click", function(){
    if(decimalNext === false) {
        displayBlock.textContent += ".";
        decimalNext = true; 
    }
});

clearInput.addEventListener("click", function() {
    clear();
});

// listens for click on equals button.
equalsInput.addEventListener("click", function(){
    if(!operators[0]) {valueInput = []} //do nothing and reset input array if no operations performed
    // obtain result of operation otherwise
    else {
        getResult();
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
}

// call correct math function based on operator
const operate = function(operator, a, b) {
    let result = 0;
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
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
const getResult = function() {
    let result = 0;
    if(!operators[0]) {
        return;
    } else if(operators[0] === "equals" && !valueInput[0]) {
        result = operate(operators[1], storedValue, prevStoredValue);
    } else {
        result = operate(operators[0], storedValue, parseInt(valueInput.join("")));
        prevStoredValue = parseInt(valueInput.join(""));
    }
    displayBlock.textContent = result;
    valueInput = [];
    storedValue = result;
}

// round operation results to avoid overflow on calculator display
const round = function(number) {
    return Math.round(Math.trunc(number*10000))/10000;
}

