// responsible for the behavior of a single cell
class Cell {
    /**
     * @param position Array Tuple of Numbers representing the column and row of this cell on the board
     * @param alive Boolean Optional initial state of this cell (true === alive, false === dead)
     */
    constructor(position, alive = false) {
        this.position =position
        this.alive = alive
        this.create()
    }
    satisfiesBirthRule() {
        // An empty, or “dead,” cell with precisely three “live” neighbors
        // (full cells) becomes live.
        // FIXME for now, return 50/50
        return Math.random() >= 0.5
    }
    satisfiesDeathRule() {
        // A live cell with zero or one neighbors dies of isolation;
        // a live cell with four or more neighbors dies of overcrowding.
        // FIXME for now, return 50/50
        return Math.random() >= 0.5
    }
    /* this rule isn't needed because the other 2 rules imply this rule
    meetsSurvivalRule() {
        // A live cell with two or three neighbors remains alive.
        // NEVER GETS CALLED, COVERED BY THE OTHER 2 RULES
    }
    */
    getSelector() {
        return `.cell.col-${this.position[1]}`
    }
    getClassName() {
        return `cell col-${this.position[1]} ${this.alive ? 'alive' : 'dead'}`
    }
    /**
     * Create the DOM node for this cell
     * @param board Node DOM node of the board
     */
    create(board) {

console.log('cell:create:this.position', this.position)

        const row = document.querySelector(`.row.row-${this.position[0]}`)

console.log('cell:create:row', row)

        const html = `<div class="${this.getClassName()}"></div>`

console.log('cell:create:html', html)

        row.insertAdjacentHTML('beforeend', html)
        const selector = this.getSelector()

console.log('cell:create:selector', selector)

        this.node = document.querySelector(selector)
    }
    /**
     * Update the state of this cell
     * @param grid Array Array of arrays representing the state of the board
     */
    update(grid) {
        if (this.alive) {
            if (this.satisfiesDeathRule(grid)) {
                this.alive = false
            }
        }
        // this.alive === false
        else {
            if (this.satisfiesBirthRule(grid)) {
                this.alive = true
            }
        }
        this.node.className = this.getClassName()
    }
}

export { Cell }
