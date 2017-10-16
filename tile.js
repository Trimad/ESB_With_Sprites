"use strict"

var grid = [];

//Perlin Noise
var inc = 0.1;

function Tile(x, y, r, g, b, a) {

  this.position = createVector(x, y);

  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
  this.originalG = g;
  this.originalR = r;

  this.brown = function() {

    if (frameCount % 30 === 0) {

      this.r += 1;
      this.g -= 1;

    }
  }

  this.intersects = function(other, d) {

    if (dist(this.position.x, this.position.y, other.position.x, other.position.y) < d) {
      return true;
    } else {
      return false;
    }

  }

  this.regrow = function() {
    if (frameCount % 240 === 0) {
      if (this.r > this.originalR) {
        this.r -= 1;

      }
      if (this.g < this.originalG) {
        this.g += 1;

      }
    }
  }

  this.render = function() {
    
        //Grass
        if (this.r === 0 && this.b === 0) {
          image(grass, this.position.x, this.position.y, cellSize, cellSize);
        }
        //Water
        else if (this.b !== 0) {
          image(water, this.position.x, this.position.y, cellSize, cellSize);
        }
        //Dirt
        else if (this.r == 76 && this.b == 0) {
          image(dirt, this.position.x, this.position.y, cellSize, cellSize);
        }
      
    //Tint
    fill(this.r, this.g, this.b, this.a);
    noStroke();
    rect(this.position.x, this.position.y, cellSize, cellSize);

  }

}

//Only call this once!!!
//Only call this once!!!
//Only call this once!!!

function make2Darray() {

  //Perline noise generated terrain coloration

  var yOff = 0;
  var r = 0;
  var g = randColor;
  var b = 0;
  var a = 0;

  for (var i = 0; i < rows; i++) {

    var xOff = 0;

    grid[i] = [];

    for (var j = 0; j < cols; j++) {

      var randColor = noise(xOff, yOff) * 255 / 1.2;

      xOff += inc;

      //Draw grass
      if (randColor >= 75) {
        r = 0;
        g = randColor;
        b = 0;
        a = 100;
      }
      //Draw sand
      else if (randColor < 75 && randColor > 65) {
        r = 76;
        g = randColor;
        b = 0;
        a = 100;
      }
      //Draw water
      else if (randColor <= 65) {
        //r = 0;
        //g = 0;
        b = randColor;
        a = 0;
      }

      var x = i * cellSize;
      var y = j * cellSize;

      grid[i][j] = new Tile(x, y, r, g, b, a);

    }
    yOff += inc;
  }
}