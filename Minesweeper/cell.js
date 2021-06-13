class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.revealed = false;
    this.mine = random(1) > .2 ? false : true;
    
    this.neighborCount = 0;
  }
  
  clicked(x, y) {
    return (x > this.x && x < this.x + w && y > this.y && y < this.y + w);
  }
  
  reveal() {
    this.revealed = true;
    if (this.neighborCount == 0) {
      this.floodFill();  
    }
  }
  
  countNeighbors() {
    if (this.mine) {
      this.neighborCount = 0; 
      return;
    }
    let neighbors = 0;
    for (let xoff = -1;xoff <= 1;xoff++) {
      for (let yoff = -1;yoff <= 1;yoff++) {
        let i = this.i + xoff;
        let j = this.j + yoff;
        if (i > -1 && i < cols && j > -1 && j < rows) {
          if (grid[i][j].mine) {
           neighbors++; 
          }
        }
      }
    }
    this.neighborCount = neighbors;
  }
  
  floodFill() {
    for (let xoff = -1;xoff <= 1;xoff++) {
      for (let yoff = -1;yoff <= 1;yoff++) {
        let i = this.i + xoff;
        let j = this.j + yoff;
        if (i > -1 && i < cols && j > -1 && j < rows) {
          if (!grid[i][j].mine) {
            grid[i][j].revealed = true;
          }
        }
      }
    }
  }
  
  show() {
    if (this.revealed) {
      // fill(5, 40, 87);
      fill('#103049');
      square(this.x, this.y, w);
      if (this.mine) {
        fill(5, 40, 87);
        ellipse(this.x + w * .5, this.y + w * .5, w / 2); 
      } else {
        if (this.neighborCount > 0) {
          fill('white');
          textSize(32);
          text(this.neighborCount, this.x + w * .4 - 5, this.y + w - 20);
        }
      }
    } else {
      fill('white');
      square(this.x, this.y, w);
    }
  }
}