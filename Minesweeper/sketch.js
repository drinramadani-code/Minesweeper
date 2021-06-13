// Made by: Drin Ramadani
// http://www.drinramadani.tech

function makeGrid(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0;i < arr.length;i++) {
   arr[i] = new Array(rows); 
  }
  return arr;
}

let grid;
let cols, rows, w = 60;

function setup() {
  createCanvas(600, 600);
  cols = floor(width / w),
    rows = floor(height / w),
  grid = makeGrid(cols, rows);
  for (let i = 0;i < cols;i++) {
    for (let j = 0;j < rows;j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
  
  
  for (let i = 0;i < cols;i++) {
    for (let j = 0;j < rows;j++) {
      grid[i][j].countNeighbors();
    }
  }
}

function mousePressed() {
  for (let i = 0;i < cols;i++) {
    for (let j = 0;j < rows;j++) {
      if (grid[i][j].clicked(mouseX, mouseY)) {
        if (grid[i][j].mine) {
          for (let x = 0;x < cols;x++) {
            for (let y = 0;y < rows;y++) {
              grid[x][y].revealed = true;
            }
          }
        } else {
          grid[i][j].reveal();
        }
      }
    }
  }
}

function draw() {
  background(220);
  for (let i = 0;i < cols;i++) {
    for (let j = 0;j < rows;j++) {
      grid[i][j].show();
    }
  }
}