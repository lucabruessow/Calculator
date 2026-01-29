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
    // using an object to save the different variables and the phase of my program
    let state = {
        first: "",
        second: "",
        op: null,
        phase: "enteringFirst" // "operatorSet", "enteringSecond", "showingResult"
    }

    return function(event) {
        const tar = event.target;
        const content = event.target.textContent;

        if (state.phase === "enteringFirst" && tar.matches(".calc__button--number")) { 
            state.first += content;
            updateDisplay(state.phase, state.first);
        }
        if (state.phase === "enteringFirst" && tar.matches(".calc__button--operator")) {
            state.op = content;
            state.phase = "operatorSet";
            updateDisplay(state.phase, state.first, state.op);
            state.phase = "enteringSecond";
        }
        if (state.phase === "enteringSecond" && tar.matches(".calc__button--number")) {
            state.second += content;
            updateDisplay(state.phase, state.first, state.op, state.second);
        }
    }
}

buttons.addEventListener("pointerdown", handlePointerDown());