var grid;

function setup () {
	createCanvas(200, 200);
	frameRate(1);
	grid = new Grid(5);
	grid.randomize();
}

function draw () {
	background(250);
	grid.randomize();
	grid.updateNeighborCounts();
	grid.updatePopulation();
	grid.draw();
}

class Grid {
	constructor(cellSize) {
		// update the contructor to take cellSize as a parameter
		// use cellSize to calculate and assign values for numberOfColumns and numberOfRows
		this.cellSize = cellSize; //has to access it on this
		this.numberOfColumns = width / cellSize; //width = width of canvas
		this.numberOfRows = height / cellSize; //height = height of canvas

		//creating the grid
		this.cells = new Array(this.numberOfColumns); // create the initial array
		for (var i = 0; i < this.cells.length; i ++) { // loop over each position in the array
			this.cells[i] = new Array(this.numberOfRows); // create another array inside of the first array at position `i`
		}

		//creating the cells
		for (var column = 0; column < this.numberOfColumns; column ++) {
			for (var row = 0; row < this.numberOfRows; row++) {
				this.cells[column][row] = new Cell(column, row, cellSize);
			}
		}
		//print(this.cells);
		//print(this);
	}

	randomize() {
		for (var column = 0; column < this.numberOfColumns; column ++) {
			for (var row = 0; row < this.numberOfRows; row++) {
				var currentCell = this.cells[column][row];
				var randomNum = floor(random(2));
				//print(randomNum); //always alternating 0 and 1..?? no the same values are just wrapped up together and the amount of the same values are listed in the value circled in blue
				currentCell.setIsAlive(randomNum);
			}
		}
	}

	// for each cell in the grid
	// reset it's neighbor count to 0
	// for each of the cell's neighbors, if it is alive add 1 to neighborCount
	updateNeighborCounts() {
		for (var column = 0; column < this.numberOfColumns; column ++) {
			for (var row = 0; row < this.numberOfRows; row++) {	  
				var currentCell = this.cells[column][row];
				currentCell.liveNeighborCounts = 0;
				
				for (var xOffset = -1; xOffset <= 1; xOffset++) {
					for (var yOffset = -1; yOffset <= 1; yOffset++) {
						var neighborX = currentCell.column + xOffset;
						var neighborY = currentCell.row + yOffset;
						var amongtheliving = false;

						if(neighborX < 0 || neighborX >= this.numberOfColumns) {
							neighborX = null;
						}
						if(neighborY < 0 || neighborY >= this.numberOfRows) {
							neighborY = null;
						}
						if(currentCell.column == neighborX && currentCell.row == neighborY) {
							//changed from offsetx and y to neighborx and y
							neighborX = null;
							neighborY = null;
						}
						if(neighborX != null && neighborY != null) {
						//if x and y position of neighbor is greater than 0 or less than cells length (so length is 20 but the it COUNTS 0-19), check it
							amongtheliving = this.cells[neighborX][neighborY].isAlive;
						}
						//if x or y position of neighbor is less than 0 or greater than cells length, skip it cause it's not part of the grid 	
						if(amongtheliving == true) {
							currentCell.liveNeighborCounts++;
						}					
					} 
				}
				//print(currentCell.liveNeighborCounts);
			}
		}
	}	

	updatePopulation() {
		for (var column = 0; column < this.numberOfColumns; column ++) {
			for (var row = 0; row < this.numberOfRows; row++) {
				var currentCell = this.cells[column][row];
				currentCell.liveOrDie();
			print(this.cells[0][1].liveNeighborCounts);
			//off by one because it's maybe counting itself?
			}
		}  
	}

	draw() {
    //go through each position to draw the cell
		for (var column = 0; column < this.numberOfColumns; column ++) {
			for (var row = 0; row < this.numberOfRows; row++) {
				var currentCell = this.cells[column][row];
				currentCell.draw();
				//this.cells[column][row].draw();
				//print(this.cells[0][1].liveNeighborCounts);
				//check the value to make sure it's actually doing what it needs to do
			}
		}
	} 
}

class Cell{
	constructor (column, row, size, isAlive, liveNeighborCounts) {
		this.column = column;
		this.row = row;
		this.size = size;
		this.isAlive; //we want this to keep updating...so I commented it out??
		this.liveNeighborCounts = 0;
	}

	draw() {
		if(this.isAlive == true) {
			fill(200,0,200); //pink
		}
		else {
			fill(240); //gray
		}
        noStroke();
		//print(0); //print("");
		//print(); //this results in the window trying to print
		//print(this.cellSize); //this results in the window trying to print
        rect(this.column * this.size + 1, this.row * this.size + 1, this.size - 1, this.size - 1);
	}

	setIsAlive(value) {
		//this.value = value; //OMGGG this was the problem?! XD
		//commented above out and got rid of this.value below cause Cell isn't supposed to have that as a parameter
		if(value == 1) {
			this.isAlive = true;
			//print("hi" + 1);	
		}
		else {
			this.isAlive = false;
			//print("bi" + 0);	
		}
		//print(this.value);
	}

	/*
	Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
	Any live cell with two or three live neighbours lives on to the next generation.
	Any live cell with more than three live neighbours dies, as if by overpopulation.
	Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
	*/
	liveOrDie() {
 		var number = 0;
		/*
		if(this.isAlive == true) {
			bornnext = false;
		}
		else if (this.liveNeighborCounts < 2 || this.liveNeighborCounts > 3) {
			dienext = true;
		}
		else {
			livenext = true;
		}
		*/
	
		if(this.isAlive == false && this.liveNeighborCounts == 3) {
			number = 1;
			
		}
		else if(this.isAlive == true && (this.liveNeighborCounts < 2 || this.liveNeighborCounts > 3)) {
			number = -1;
		}
		else {
			number = 0;
		}
		//print(this);
		//print(number);
		
		/* DO NOT UNCOMMENT - hurts eyes
		if(number == 1 || number == 0) {
			this.isAlive = true;
		}
		else {
			this.isAlive = false;
		}*/ 
	}
}
