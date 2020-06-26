const tableSize = 10;
const totalSize = tableSize * tableSize

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

const maxPower = colors.length - 1

/**
 * Returns a randon color
 * @returns { String }
 */
const getRandonColor = () => {
    return colors[Math.floor(Math.random() * colors.length - 1)]
}

/**
 * Return a td with the passed index
 * @param { Number } actualIndex 
 * @returns { HTMLElement }
 */
function getElement(actualIndex) {
    return document.querySelector(`[data-position="${actualIndex}"]`)
}

/**
 * Check if exists a left td element and return it
 * @param { Number } actualIndex 
 * @returns { HTMLElement }
 */
function getLeftElement(actualIndex) {
    const leftIndex = actualIndex - 1;
    if (leftIndex % tableSize === tableSize - 1) return null
    return getElement(leftIndex)
}

/**
 * Check if exists a rigth td element and return it
 * @param { Number } actualIndex 
 * @returns { HTMLElement }
 */
function getRigthElement(actualIndex) {
    const rigthIndex = actualIndex + 1;
    if (rigthIndex % tableSize === 0) return null
    return getElement(rigthIndex)
}

/**
 * Check if exists a top td element and return it
 * @param { Number } actualIndex 
 * @returns { HTMLElement }
 */
function getTopElement(actualIndex) {
    const topIndex = actualIndex - tableSize;
    if (topIndex < 0) return null
    return getElement(topIndex)
}

/**
 * Check if exists a down td element and return it
 * @param { Number } actualIndex 
 * @returns { HTMLElement }
 */
function getDownElement(actualIndex) {
    const downIndex = actualIndex + tableSize;
    if (downIndex > totalSize) return null
    return getElement(downIndex)
}

/**
 * Use the passed element as the source of wave and call the propagation function
 * @param { HTMLElement } element 
 * @returns { Void }
 */
function createWave(element) {
    /**
     * For each passed element, call's recursivly four times, one for each direction
     * The recursion stops when the element don't exists or if the element already was propagated
     * @param { HTMLElement } element 
     * @param { Number } actualPower 
     * @param { Set } history 
     * @param { String } color 
     * @returns { Void }
    */
    function wavePropagation(element, actualPower, history, color) {
        //Recursion stop
        if (!element) return;
        if (history.has(element.dataset.position)) return;

        const actualIndex = Number(element.dataset.position);

        const delayPropagation = document.querySelector('#propagationDelay').value;

        element.innerHTML = document.querySelector('#showNumbers').checked ? actualPower : null
        element.bgColor = color

        history.add(element.dataset.position)

        setTimeout(() => {
            if (document.querySelector('#propagateUp').checked) {
                wavePropagation(getTopElement(actualIndex), actualPower - 1, history, color)
            }

            if (document.querySelector('#propagateLeft').checked) {
                wavePropagation(getLeftElement(actualIndex), actualPower - 1, history, color)
            }

            if (document.querySelector('#propagateDown').checked) {
                wavePropagation(getDownElement(actualIndex), actualPower - 1, history, color)
            }

            if (document.querySelector('#propagateRigth').checked) {
                wavePropagation(getRigthElement(actualIndex), actualPower - 1, history, color)
            }

            setTimeout(() => {
                element.bgColor = '#DCECC9'
            }, delayPropagation)

        }, delayPropagation);
    }

    const history = new Set()
    wavePropagation(element, maxPower, history, getRandonColor())
}

/**
 * Create intire table, with the positions to can be possible find each element
 * @returns { Void }
 */
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