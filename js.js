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

function updateDisplay(phase, numOne = "", operator = "", numTwo = "", result = "") {
    switch(phase) {
        case "enteringFirst":
            display.textContent = numOne;
            break;
        case "operatorSet":
            display.textContent = `${numOne} ${operator}`;
            break;
        case "enteringSecond":
            display.textContent = `${numOne} ${operator} ${numTwo}`;
            break;
        case "showingResult":
            console.log(result);
            display.textContent = result;
    }
}

// using closure to not lose the values of the variables
function handlePointerDown() {
    // using an object to save different variables and phase of my program
    let state = {
        first: "",
        second: "",
        op: null,
        result: null,
        phase: "enteringFirst", // "operatorSet", "enteringSecond", "showingResult"
    }

    return function(event) {
        const tar = event.target;
        const content = event.target.textContent;

        switch (state.phase) {
            
            // catch all possible buttons for different phases
            case "enteringFirst":
                if (tar.matches(".calc__button--number")) { 
                    state.first += content;
                    updateDisplay(state.phase, state.first);
                
                }
                else if (tar.matches(".calc__button--operator") && state.first !== "") {
                    state.op = content;
                    state.phase = "operatorSet";
                    updateDisplay(state.phase, state.first, state.op);
                }
                else if (tar.matches(".calc__button--comma") && !(state.first.includes("."))) {
                    state.first += content;
                    updateDisplay(state.phase, state.first);
                }
                break;

            case "operatorSet":
                if (tar.matches(".calc__button--number")) {
                    state.second += content;
                    state.phase = "enteringSecond";
                    updateDisplay(state.phase, state.first, state.op, state.second);
                }
                break;
            
            case "enteringSecond":
                if (tar.matches(".calc__button--number")) {
                    state.second += content;
                    updateDisplay(state.phase, state.first, state.op, state.second);
                }
                else if (tar.matches(".calc__button--comma") && !(state.second.includes("."))) {
                    state.second += content;
                    updateDisplay(state.phase, state.first, state.op, state.second);
                }
                else if (tar.matches(".calc__button--equals")) {
                    state.result = operate(state.first, state.second, state.op);
                    state.phase = "showingResult";
                    updateDisplay(state.phase, state.first, state.op, state.second, state.result);
                }
                else if (tar.matches(".calc__button--operator")) {
                    state.op = content;
                    state.first = operate(state.first, state.second, state.op);
                    state.second = "";
                    state.phase = "operatorSet";
                    updateDisplay(state.phase, state.first, state.op);
                }
                break;

            case "showingResult":
                if (tar.matches(".calc__button--number")) {
                    state.first = content;
                    state.second = "";
                    state.op = null;
                    state.phase = "enteringFirst";
                    updateDisplay(state.phase, state.first);
                }
                else if (tar.matches(".calc__button--operator")) {
                    state.first = operate(state.first, state.second, state.op);
                    state.op = content;
                    state.second = "";
                    state.phase = "operatorSet";
                    updateDisplay(state.phase, state.first, state.op);
                }
                break;
        }
        // catch clear button for all phases
        if (tar.matches(".calc__button--clear")) {
            console.log(state.first);
            state.first = "";
            state.second = "";
            state.op = null;
            state.result = null;
            state.phase = "enteringFirst";
            updateDisplay(state.phase, state.first);
        }
    }
}


buttons.addEventListener("pointerdown", handlePointerDown());