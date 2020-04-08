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
let currentValue = 0;
let storedValue = 0;
let prevStoredValue = 0;
let storedOperator = "";
let prevStoredOperator = "";
let newInput = true;
let decimalNext = false;


numInputs.forEach(function(node){
   node.addEventListener("click", function() {
        if(valueInput.length < 10) {
            valueInput.push(parseInt(node.textContent));
            displayBlock.textContent = valueInput.join("");
        } 
    }); 
})

addInput.addEventListener("click", function(){
    if(!storedValue && !valueInput) {
        return; 
    } else if(!operators[0] && operators[0] != "equals") {
        storedValue = parseInt(valueInput.join(""));   
    } else if(operators[0] === "+" || operators[0] === "-") {
        getResult();
    }
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

equalsInput.addEventListener("click", function(){
    if(!operators[0]) {valueInput = []}
    else {
        getResult();
        if(operators[0] != "equals") {
            operators.unshift("equals");
        }
        if(operators.length > 2) operators.pop();
    }
})

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

const clear = function() {
    displayBlock.textContent = "0";
    valueInput = [];
    operators = [];

    //previous variables
    currentValue = 0;
    storedValue = 0;
}

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

const round = function(number) {
    return Math.round(Math.trunc(number*10000))/10000;
}

