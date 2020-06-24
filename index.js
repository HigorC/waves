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
    return {
        index: leftIndex,
        element: getElement(leftIndex)
    }
}

function getRigthElement(actualIndex) {
    const rigthIndex = actualIndex + 1;
    if (rigthIndex % tableWidth === 0) return null
    return {
        index: rigthIndex,
        element: getElement(rigthIndex)
    }
}

function getTopElement(actualIndex) {
    const topIndex = actualIndex - tableWidth;
    if (topIndex < 0) return null
    return {
        index: topIndex,
        element: getElement(topIndex)
    }
}

function getDownElement(actualIndex) {
    const downIndex = actualIndex + tableWidth;
    if (downIndex > tableWidth * tableHeigth) return null
    return {
        index: downIndex,
        element: getElement(downIndex)
    }
}

function createWave(element) {
    function wavePropagation(element, actualPower, waveInfo, history) {
        //Recursion stop
        if (!element || actualPower === 0) return;

        const actualIndex = Number(element.dataset.position);

        if (history.has(element.dataset.position)) return;

        element.innerHTML = actualPower
        history.add(element.dataset.position)

        setTimeout(() => {
            const topElement = getTopElement(actualIndex)

            if (topElement && topElement.index < waveInfo.sourceIndex) {
                wavePropagation(topElement.element, actualPower - 1, {
                    sourceIndex: waveInfo.sourceIndex
                }, history)
            }

            const leftElement = getLeftElement(actualIndex)

            if (leftElement && leftElement.index < waveInfo.sourceIndex) {
                wavePropagation(leftElement.element, actualPower - 1, {
                    sourceIndex: waveInfo.sourceIndex
                }, history)
            }

            const downElement = getDownElement(actualIndex)

            if (downElement && downElement.index > waveInfo.sourceIndex) {
                wavePropagation(downElement.element, actualPower - 1, {
                    sourceIndex: waveInfo.sourceIndex
                }, history)
            }

            const rigthElement = getRigthElement(actualIndex)

            if (rigthElement && rigthElement.index > waveInfo.sourceIndex) {
                wavePropagation(rigthElement.element, actualPower - 1, {
                    sourceIndex: waveInfo.sourceIndex
                }, history)
            }




            element.innerHTML = ''
        }, 1000);
    }

    const history = new Set()

    wavePropagation(element, maxPower, { sourceIndex: element.dataset.position }, history)

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
