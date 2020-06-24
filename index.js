const tableWidth = 10;
const tableHeigth = 10;

const posicoes = []

const maxPower = 10

for (let i = 0; i < tableWidth * tableHeigth; i++) {
    posicoes.push(i);
}

function getElement(actualIndex) {
    return document.querySelector(`[data-position="${actualIndex}"]`)
}

function getLeftElement(actualIndex) {
    const leftIndex = actualIndex - 1;
    if (leftIndex % tableWidth === tableWidth - 1) return null
    return getElement(leftIndex)
}

function getRigthElement(actualIndex) {
    const rigthIndex = actualIndex + 1;
    if (rigthIndex % tableWidth === 0) return null
    return getElement(rigthIndex)
}

function getTopElement(actualIndex) {
    const topIndex = actualIndex - tableWidth;
    if (topIndex < 0) return null
    return getElement(topIndex)
}

function getDownElement(actualIndex) {
    const downIndex = actualIndex + tableWidth;
    if (downIndex > tableWidth * tableHeigth) return null
    return getElement(downIndex)
}

function createWave(element) {
    function wavePropagation(element, actualPower, history) {
        //Recursion stop
        if (!element || actualPower === 0) return;
        if (history.has(element.dataset.position)) return;

        const actualIndex = Number(element.dataset.position);

        element.innerHTML = actualPower
        history.add(element.dataset.position)

        setTimeout(() => {
            wavePropagation(getTopElement(actualIndex), actualPower - 1, history)
            wavePropagation(getLeftElement(actualIndex), actualPower - 1, history)
            wavePropagation(getDownElement(actualIndex), actualPower - 1, history)
            wavePropagation(getRigthElement(actualIndex), actualPower - 1, history)

            element.innerHTML = ''
        }, 1000);
    }

    const history = new Set()

    wavePropagation(element, maxPower, history)
}

function inicializeTable() {
    const table = document.querySelector('table');

    let tableContent = '<table>';

    for (let i = 0, count = 0; i < tableWidth; i++) {
        tableContent += '<tr>'
        for (let j = 0; j < tableWidth; j++ , count++) {
            tableContent += `<td data-position=${count} onclick="createWave(this)"></td>`
        }
        tableContent += '</tr>'
    }

    table.innerHTML = tableContent
}

inicializeTable();
