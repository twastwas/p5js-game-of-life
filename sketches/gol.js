var grid;

function setup () {
  createCanvas(400, 400);
  grid = new Grid(20);
}

function draw () {
  background(250);
  grid.draw();
}

class Grid {
  constructor (cellSize) {
    // update the contructor to take cellSize as a parameter
    // use cellSize to calculate and assign values for numberOfColumns and numberOfRows
	this.cellSize = cellSize; //has to access it on this
    this.numberOfColumns = width / cellSize;
	this.numberOfRows = height / cellSize;

	this.cells = new Array(this.numberOfColumns); // create the initial array
	for (var i = 0; i < this.cells.length; i ++) { // loop over each position in the array
	  this.cells[i] = new Array(this.numberOfRows); // create another array inside of the first array at position `i`
	}	
	
	for (var column = 0; column < this.numberOfColumns; column ++) {
		for (var row = 0; row < this.numberOfRows; row++) {
			this.cells[column][row] = new Cell(column, row, cellSize);
		}
	}
	//print(this.cells);
	print(this);
  }

  draw () {
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        //fill(240); 
        //noStroke();
        //rect(column * this.cellSize + 1, row * this.cellSize + 1, this.cellSize - 1, this.cellSize - 1);
      var currentCell = this.cells[column][row];
	  
	  currentCell.draw();
	  //this.cells[column][row].draw();
	  //??

	  }
    }
  }
}

class Cell{
	constructor (column, row, size, isAlive) {
		this.column = column;
		this.row = row;
		this.size = size;
		this.isAlive = false;
	}
	
	draw () {
		
		 if(this.isAlive == true) {
			 fill(200,0,200);
		 }
		 else {
			 fill(240);
		//um
		 }

        noStroke();
        rect(this.column * this.cellSize + 1, this.row * this.cellSize + 1, this.cellSize - 1, this.cellSize - 1);
		//different color if alive or dead
	}
	
	setIsAlive(value) {
	
///???
	
	}
}
