const displayBlock = document.querySelector(".display p");
const numInputs = document.querySelectorAll(".number");
const clearInput = document.querySelector(".clear");
const equalsInput = document.querySelector("#equals");
const addInput = document.querySelector("#add");
const subtractInput = document.querySelector("#subtract");
const multiplyInput = document.querySelector("#multiply");
const divideInput = document.querySelector("#divide");
const decimalInput = document.querySelector("#decimal");

let currentValue = 0;
let storedValue = 0;
let prevStoredValue = 0;
let storedOperator = "";
let prevStoredOperator = "";
let newInput = true;
let decimalNext = false;


numInputs.forEach(function(node){
   node.addEventListener("click", function() {
        if(newInput) {
            currentValue = parseInt(node.textContent);
            displayBlock.textContent = node.textContent;
            newInput = false;
        } else if(currentValue < 999999999) {
            if(decimalNext){
                currentValue = currentValue + parseInt(node.textContent)/10;
            } else {
                currentValue = currentValue*10 + parseInt(node.textContent);

            }
            displayBlock.textContent += node.textContent;
        }
    }); 
})

addInput.addEventListener("click", function(){
    if(newInput && !storedValue) {
        return;
    } else if(storedOperator) {
        getResult();
    } else {
        storedValue = currentValue;
        newInput = true;
    }
    storedOperator = "+";
    decimalNext = false;
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
    getResult();
    storedOperator = "";
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
    currentValue = 0;
    storedValue = 0;
    storedOperator = "";
    newInput = true;
    decimalNext = false;
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
    if(!storedOperator) {
        return;
    }
    let result = operate(storedOperator, storedValue, currentValue);
    displayBlock.textContent = result;
    currentValue = result;
    storedValue = result;
    newInput = true;
    decimalNext = false;
}

const round = function(number) {
    return Math.round(Math.trunc(number*10000))/10000;
}

