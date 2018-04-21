var grid;

function setup () {
  createCanvas(400, 400);
  grid = new Grid(20);
  grid.randomize();
  /*example
  var x = 1;
  var y = -1;
  var sampleArray = [[0,0],[1,1]];
 
  if (x >= 0 && x < sampleArray.length) {
  //print(sampleArray[x][y]);
  //do the same for y values
  } else {
	print("bad value"); //skip that cell
  }
  */
    
  //print(sampleArray[0][-1]);//[0,0], print(undefined)
  //print(sampleArray[-1][0]);//print(undefined[0]);
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
		  currentCell.setIsAlive(randomNum);
		}
	}
  }

  draw () {
    //go through each position to draw the cell
	for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
      var currentCell = this.cells[column][row];

	  currentCell.draw();
	  //this.cells[column][row].draw();
	  }
    }
  }
}

class Cell{
	constructor (column, row, size, isAlive) {
		this.column = column;
		this.row = row;
		this.size = size;
		//this.isAlive = false; //we want this to keep updating...so I commented it out??
	}

	draw () {
		 if(this.isAlive == false) {
			 fill(200,0,200); //neighbor
			
		}
		 else {
			 fill(240); //gray
		 }

        noStroke();

		//print(0);
		//print("");
		//print(); //this results in the window trying to print
		//print(this.cellSize); //this results in the window trying to print
		
        rect(this.column * this.size + 1, this.row * this.size + 1, this.size - 1, this.size - 1);
		//different color if alive or dead
	}
	
	
	setIsAlive(value) {
		this.value = value; //OMGGG this was the problem?! XD
		if(this.value == 1) {
			this.isAlive = true;
			//print("hi" + 1);	
		}
		else {
			this.isAlive = false;
			//print("bi" + 0);	
		}
	}
	
	//counting the neighbor
	//8 neighbors... squares - itself
	
	//3 neighbors don't exist =  only 5 neighbors
	
	//if else statement
}
