const buttons = document.querySelector(".calc__buttons");
const display = document.querySelector(".calc__display");

const funcs = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
}

function operate(a, b, op) {
    return funcs[op](+a, +b);
}

function handlePointerDown() {
    let var1 = "";
    let var2 = "";
    let op = null;

    return function(event) {
        const tar = event.target;
        const content = event.target.textContent;

        if (op === null && tar.matches(".calc__button--number")) { 
            var1 += content;
        }
        if (op === null && tar.matches(".calc__button--operator")) {
            op = content;
        }
        if (op !== null && tar.matches(".calc__button--number")) {
            var2 += content;
        }
    }
}

buttons.addEventListener("pointerdown", handlePointerDown());