const displayText = document.getElementById(`display`);
const buttons = document.querySelectorAll(`.buttons > button`)
buttons.forEach(button => 
    button.addEventListener('click', e => buttonPressed(e.currentTarget.textContent)))

window.addEventListener('keydown', e => {
    const button = document.querySelector(`button[data-key="${e.key}"]`)
    if(button) button.click()
})

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
        trimmed = displayText.textContent.trimEnd();
        return trimmed.charAt(this.length() -1)
    }
}

function buttonPressed(value) {
    let equation = display.value().trimEnd().split(' ');
    switch(value) {
        case `=`:
            if(isNumber(display.lastChar()))
            display.change(operate(equation));
            break;
        case `AC`:
            display.change('');
            break;
        case `C`:
            display.trimEnd();
            display.undo();
            display.trimEnd();
            if(!isNumber(display.lastChar())) display.add(` `); 
            break;
        default:
            if(isNumber(value)) {
                if(value === '0' && equation[equation.length - 1] == '/') {
                    alert("You can't divide by 0!");
                } else {
                    display.add(value);
                }
            } else if(isNumber(display.lastChar()) && value != `.`) {
                display.add(` ${value} `);
            } else if(value == `.` && 
                      isNumber(display.lastChar()) &&
                      !hasDot(equation[equation.length - 1]
                    )) {
                display.add(value);
            }
    }
}  

function isNumber(str) {
    return parseInt(str).toString() === str
}

function operate(result) {
    let op, sol, num1, num2;

    while((op = result.findIndex(e => e == `*` || e == `/` || e == `%`)) > 0) {
        num1 = Number(result[op - 1]);
        num2 = Number(result[op + 1]);
        if(result[op] == `*`) {
            sol = multiply(num1, num2);
            result.splice(op - 1, 3, sol);
        } else if(result[op] == `/`) {
            sol = divide(num1, num2);
            result.splice(op - 1, 3, sol);
        } else if(result[op] == `%`) {
            sol = modulo(num1, num2);
            result.splice(op - 1, 3, sol)
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

function hasDot(str = '') {
    return str.split('').includes('.')
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

function modulo(a, b) {
    return a % b
}