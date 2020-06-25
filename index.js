const tableSize = 10;
const totalSize = tableSize * tableSize

const delayPropagation = 50

const posicoes = []

const colors = [
    "#1e0492",
    "#550fcb",
    "#e07df3",
    "#6a6582",
    "#c4b6cc",
    "#ADFF02",
    "#34343a",
    "#01BEFE",
    "#FFDD00",
    "#FF7D00",
    "#FF006D",
    "#FF006D",
    "#ADFF02",
    "#8F00FF"
]

const getRandonColor = () => {
    return colors[Math.floor(Math.random() * colors.length - 1)]
}

const maxPower = colors.length - 1

for (let i = 0; i < totalSize; i++) {
    posicoes.push(i);
}

function getElement(actualIndex) {
    return document.querySelector(`[data-position="${actualIndex}"]`)
}

function getLeftElement(actualIndex) {
    const leftIndex = actualIndex - 1;
    if (leftIndex % tableSize === tableSize - 1) return null
    return getElement(leftIndex)
}

function getRigthElement(actualIndex) {
    const rigthIndex = actualIndex + 1;
    if (rigthIndex % tableSize === 0) return null
    return getElement(rigthIndex)
}

function getTopElement(actualIndex) {
    const topIndex = actualIndex - tableSize;
    if (topIndex < 0) return null
    return getElement(topIndex)
}

function getDownElement(actualIndex) {
    const downIndex = actualIndex + tableSize;
    if (downIndex > totalSize) return null
    return getElement(downIndex)
}

function createWave(element) {
    function wavePropagation(element, actualPower, history, color) {
        //Recursion stop
        if (!element) return;
        if (history.has(element.dataset.position)) return;

        const actualIndex = Number(element.dataset.position);

        // element.innerHTML = actualPower
        // element.bgColor = getColor(actualPower)
        element.bgColor = color
        history.add(element.dataset.position)

        setTimeout(() => {
            wavePropagation(getTopElement(actualIndex), actualPower - 1, history, color)
            wavePropagation(getLeftElement(actualIndex), actualPower - 1, history, color)
            wavePropagation(getDownElement(actualIndex), actualPower - 1, history, color)
            wavePropagation(getRigthElement(actualIndex), actualPower - 1, history, color)

            setTimeout(() => {
                element.bgColor = '#DCECC9'
            }, delayPropagation)

        }, delayPropagation);
    }

    const history = new Set()
    wavePropagation(element, maxPower, history, getRandonColor())
}

function inicializeTable() {
    const table = document.querySelector('table');

    let tableContent = '<table>';

    for (let i = 0, count = 0; i < tableSize; i++) {
        tableContent += '<tr>'
        for (let j = 0; j < tableSize; j++ , count++) {
            tableContent += `<td data-position=${count} onclick="createWave(this)"></td>`
        }
        tableContent += '</tr>'
    }

    table.innerHTML = tableContent
}

inicializeTable();
