var grid;

function setup () {
	createCanvas(400, 400);
	frameRate(1);
	grid = new Grid(20);
	grid.randomize();
}

function draw () {
	background(250);
	//don't need randomize here
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
		//print wuz here
	}

	randomize() {
		for (var column = 0; column < this.numberOfColumns; column ++) {
			for (var row = 0; row < this.numberOfRows; row++) {
				var currentCell = this.cells[column][row];
				var randomNum = floor(random(2));
				//print(randomNum); //always alternating 0 and 1..?? no the same values are just wrapped up together and the amount of the same values are listed in the value circled in blue on the inspect element's console tab
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
				
				//going through neighboring cells
				for (var xOffset = -1; xOffset <= 1; xOffset++) {
					for (var yOffset = -1; yOffset <= 1; yOffset++) {
						var neighborX = currentCell.column + xOffset;
						var neighborY = currentCell.row + yOffset;
						var amongtheliving = false; //is the neighboring cell among the living? start with false
						
						//if x position of neighbor is less than 0 or greater than cells length, skip it cause it's not part of the grid 	
						if(neighborX < 0 || neighborX >= this.numberOfColumns) {
							neighborX = null;
						}
						//if y position of neighbor is less than 0 or greater than cells length, skip it cause it's not part of the grid 	
						if(neighborY < 0 || neighborY >= this.numberOfRows) {
							neighborY = null;
						}
						//check to see if "neigbor" has same coordinates as the currentCell- in that case it wouldn't be the neighbor, it would be cell itself so it won't be added to the neighbor count vv
						if(currentCell.column == neighborX && currentCell.row == neighborY) {
							//^^ changed from offsetx and y to neighborx and y
							neighborX = null;
							neighborY = null;
						}
						//now get the living state of neighbor
						if(neighborX != null && neighborY != null) {
						
							amongtheliving = this.cells[neighborX][neighborY].isAlive;
						}
						//if living state is true, increase neighborcount of the current cell
						if(amongtheliving == true) {
							currentCell.liveNeighborCounts++;
						}
					} 
				}
				//print(this.cells[0][0].liveNeighborCounts);
			}
		}
	}	

	updatePopulation() {
		for (var column = 0; column < this.numberOfColumns; column ++) {
			for (var row = 0; row < this.numberOfRows; row++) {
				var currentCell = this.cells[column][row];
				//print wuz here
				currentCell.liveOrDie();
			}
		}  
	}

	draw() {
    	//go through each position to draw the cell
		for (var column = 0; column < this.numberOfColumns; column ++) {
			for (var row = 0; row < this.numberOfRows; row++) {
				var currentCell = this.cells[column][row];
				currentCell.draw();
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
		this.isAlive; //we want this to keep updating so don't assign it!
		this.liveNeighborCounts = 0;
	}

	draw() {
		if(this.isAlive == true) {
			fill(200,0,200); //pink = living
		}
		else {
			fill(240); //gray = dead
		}
        noStroke();
		//print(0); //print("");
		//print(); //this results in the window trying to print
		//print(this.cellSize); //this results in the window trying to print
        rect(this.column * this.size + 1, this.row * this.size + 1, this.size - 1, this.size - 1);
	}

	setIsAlive(value) {
		if(value == 1) {
			this.isAlive = true;
		}
		else {
			this.isAlive = false;	
		}
		//print wuz here
	}

	liveOrDie() {
 		var number = 0;
		//using number for logic can be confusing- proceed with caution
		if(this.isAlive == false && this.liveNeighborCounts == 3) {
			//"Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction." to me means +1
			number = 1;
		}
		else if(this.isAlive == true && (this.liveNeighborCounts < 2 || this.liveNeighborCounts > 3)) {
			//"Any live cell with fewer than two live neighbours dies, as if caused by underpopulation."
			//"Any live cell with more than three live neighbours dies, as if by overpopulation." to me means -1
			number = -1;
		}
		else {
		//"Any live cell with two or three live neighbours lives on to the next generation." to me means no change, or 0
			number = 0;
		}
		//print wuz here
		if(number == 1) {
			//1 means death -> life
			this.isAlive = true;
		}
		else if (number == -1) {
			//-1 means life -> death
			this.isAlive = false;
		}
		else{
			//0 means life -> life or death -> death (no change)
		}
	}
}
