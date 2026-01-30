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
    // using an object to save the different variables and the phase of my program
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
            
            // catch all possibilities for different phases
            case "enteringFirst":
                if (tar.matches(".calc__button--number")) { 
                    state.first += content;
                    updateDisplay(state.phase, state.first);
                    break;
                }
                if (tar.matches(".calc__button--operator")) {
                    state.op = content;
                    state.phase = "operatorSet";
                    updateDisplay(state.phase, state.first, state.op);
                    state.phase = "enteringSecond";
                    break;
                }

            case "enteringSecond":
                if (tar.matches(".calc__button--number")) {
                    state.second += content;
                    updateDisplay(state.phase, state.first, state.op, state.second);
                    break;
                }
                if (tar.matches(".calc__button--equals")) {
                    state.result = operate(state.first, state.second, state.op);
                    state.phase = "showingResult";
                    updateDisplay(state.phase, state.first, state.operator, state.second, state.result);
                }
        }
    }
}


buttons.addEventListener("pointerdown", handlePointerDown());