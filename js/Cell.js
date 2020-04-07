class Cell {
    constructor(parent, index) {
        // this.element = null;
        this.parent = parent;
        this.index = index;
        this.cell = null;
        this.createCell(this.parent);
    }

    createCell(parent) {
        this.cell = document.createElement('td');
        this.cell.setAttribute('data-number', this.index);
        this.cell.classList = 'whole';
        parent.append(this.cell);
    }

    activateCell() {
        this.cell.classList.add('active-cell');
    }


    lostCell() {
        this.cell.classList.remove('active-cell');
        this.cell.classList.add('computers-cell');
    }

    wonCell() {
        this.cell.classList.remove('active-cell');
        this.cell.classList.add('players-cell');
    }
}

export default Cell;