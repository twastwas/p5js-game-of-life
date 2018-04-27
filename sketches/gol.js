var grid;

function setup () {
  createCanvas(400, 400);
  grid = new Grid(20);
  grid.randomize();
}

function draw () {
  background(250);
  grid.updateNeighborCounts();
  grid.updatePopulation();
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

  updateNeighborCounts() {
  // for each cell in the grid
  // reset it's neighbor count to 0
  // for each of the cell's neighbors, if it is alive add 1 to neighborCount
	
	
	for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
		  
        var currentCell = this.cells[column][row];
      
        
          for (var xOffset = -1; xOffset <= 1; xOffset++) {
            for (var yOffset = -1; yOffset <= 1; yOffset++) {
              var neighborX = currentCell.column + xOffset; //0
              var neighborY = currentCell.row + yOffset; //0
			  
                var amongtheliving = false;
			  if(neighborX < 0 || neighborX >= this.numberOfColumns) {
				neighborX = null;
			  }
              if(neighborY < 0 || neighborY >= this.numberOfRows) {
				neighborY = null;
			  }
              if(currentCell.column == xOffset && currentCell.row == yOffset) {
              	neighborX = null;
                neighborY = null;
              }
              
              // do something with neighborX and neighborY
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
       // print(currentCell.liveNeighborCounts);
		currentCell.liveNeighborCounts = 0;
	 }
   }
  }	
	
  updatePopulation() {
	  for (var column = 0; column < this.numberOfColumns; column ++) {
		for (var row = 0; row < this.numberOfRows; row++) {
		  
        var currentCell = this.cells[column][row];
		currentCell.liveOrDie;
		print(this.cells[0][0].isAlive);
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
	constructor (column, row, size, isAlive, liveNeighborCounts) {
		this.column = column;
		this.row = row;
		this.size = size;
		this.liveNeighborCounts = 0;
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
	
	liveOrDie() {
		
		  /*
  
    Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  */
 		var livenext = false;
		var dienext = false;
		var bornnext = true;
	if(this.isAlive == true) {
		bornnext = false;
	}
	else if (neighborCount < 2 || neighborCount > 3) {
		dienext = true;
	}
	else {
		livenext = true;
	}
	
	if(dienext == true) {
		this.isAlive = false;
	}
	else {
		this.isAlive = true;
	}
  }
	//counting the neighbor
	//8 neighbors... squares - itself
	
	//3 neighbors don't exist =  only 5 neighbors
	
	//if else statement
}
