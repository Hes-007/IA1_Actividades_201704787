function reflexAgent(location, stateA, stateB) {
    if ((location === "A" && stateA === "DIRTY") || (location === "B" && stateB === "DIRTY")) {
        return "CLEAN";
    }
    return location === "A" ? "RIGHT" : "LEFT";
}

function getStateKey(location, stateA, stateB) {
    return `${location}-${stateA}-${stateB}`;
}

function maybeDirty(state) {
    return Math.random() < 0.25 ? "DIRTY" : state;
}

function logState(iteration, location, currentStateKey, visitedStates) {
    const logElement = document.getElementById("log");
    logElement.innerHTML += `<br># ${iteration}: Localización: ${location} | Estado: ${currentStateKey}`;
    console.log(`Estados visitados: ${visitedStates.size} / 8`);

    if (visitedStates.size === 8) {
        logElement.innerHTML += "<br><strong>Todos los estados han sido visitados!!!</strong>";
        return true;
    }
    return false;
}

function test(states, visitedStates, iteration = 0) {
    const [location, stateA, stateB] = states;
    const currentStateKey = getStateKey(location, stateA, stateB);

    visitedStates.add(currentStateKey);

    if (logState(iteration, location, currentStateKey, visitedStates)) return;

    const action = reflexAgent(location, stateA, stateB);

    if (action === "CLEAN") {
        states[location === "A" ? 1 : 2] = "CLEAN";
    } else {
        states[0] = location === "A" ? "B" : "A";
    }

    states[1] = maybeDirty(states[1]);
    states[2] = maybeDirty(states[2]);

    if (++iteration >= 100) {
        document.getElementById("log").innerHTML += "<br><strong>Límite de iteraciones alcanzado!!!</strong>";
        return;
    }

    setTimeout(() => test(states, visitedStates, iteration), 2000);
}



const initialStates = ["A", "DIRTY", "DIRTY"];
const visitedStates = new Set();

window.onload = () => test(initialStates, visitedStates);
