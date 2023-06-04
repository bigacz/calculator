const displayText = document.getElementById(`display`);
const buttons = document.querySelectorAll(`.buttons > button`)
buttons.forEach(button => 
    button.addEventListener('click', buttonPressed))
let num1 = 0;
let num2 = 0;
let op = '+';

function buttonPressed(button) {
    value = button.currentTarget.textContent;
    let equation = display.value().split(' ');
    switch(value) {
        case `=`:
            display.change(operate(equation));
            break;
        case `AC`:
            display.change('');
            console.log(display.value())
            break;
        case `C`:
            display.trimEnd();
            display.undo();
            display.trimEnd(); 
            break;
        default:
            if(checkNumber(value)) {
                display.add(value)
            } else if(checkNumber(display.lastChar()) && value != `.`) {
                display.add(` ${value} `)
            } else if(!hasChar(equation[equation.length - 1])){
                display.add(value)
            }
    }
}  

function checkNumber(str) {
    return parseInt(str).toString() === str
}

function operate(result) {
    let op, sol, num1, num2;

    while((op = result.findIndex(e => e == `*` || e == `/`)) > 0) {
        num1 = Number(result[op - 1]);
        num2 = Number(result[op + 1]);
        if(result[op] == `*`) {
            sol = multiply(num1, num2);
            result.splice(op - 1, 3, sol);
        } else if(result[op] == `/`) {
            sol = divide(num1, num2);
            result.splice(op - 1, 3, sol);
        }
    }
    
    while((op = result.findIndex(e => e == `+` || e == `-`)) > 0) {
        num1 = Number(result[op - 1]);
        num2 = Number(result[op + 1]);
        if(result[op] == `+`) {
            sol = add(num1, num2);
            result.splice(op - 1, 3, sol);
        } else if(result[op] == `-`) {
            sol = subtract(num1, num2);
            result.splice(op - 1, 3, sol);
        }
    }
    return result
}

function hasChar(str = '') {
    return str.split('').includes('.')
}

let display = {
    value: function() {
        return displayText.textContent
    },

    length: function() {
        return displayText.textContent.length
    },

    change: function(str) {
        displayText.textContent = str;
    },

    add: function(str) {
        displayText.textContent += str;
    },

    trimEnd: function() {
        displayText.textContent = displayText.textContent.trimEnd();
    },
    
    undo: function() {
        this.change(this.value().slice(0, this.value().length - 1));
    },

    lastChar: function() {
        trimmed = displayText.textContent.trimEnd()
        return trimmed.charAt(this.length() -1)
    }
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}