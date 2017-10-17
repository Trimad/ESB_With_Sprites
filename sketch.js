"use strict"

let npcSprites = [];
let playerSprites = [];
let doodad = [];
var player = [];
let grid = [];

let drawDistance;
let cols = 64;
let rows = 64;
let cellSize = 128;
let playerSize = cellSize;
let treeSize = cellSize * 3;
let edibleSize = playerSize;

let numPlayers = 8;

function setup() {

  //Canvas stuff

  createCanvas(windowWidth, windowHeight);
  if (height > width) {
    drawDistance = height / 2;

  } else if (width > height) {
    drawDistance = width / 2;
  }

  pixelDensity(1);
  imageMode(CENTER);
  rectMode(CENTER);
  //noSmooth();

  //Spawn stuff into the world
  make2Darray();
  spawnFlowers();
  spawnTrees();
  spawnPlayers();
  spawnWater();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (height > width) {
    drawDistance = height / 2;

  } else if (width > height) {
    drawDistance = width / 2;
  }
}

function draw() {

  background(0);
  translate(-player[0].position.x + width / 2, -player[0].position.y + height / 2);

  //Draw tiles
  let xRadius = drawDistance / cellSize;
  let leftBoundary = constrain(floor(((player[0].position.x / cellSize) - xRadius)), 0, rows);
  let rightBoundary = constrain(floor(((player[0].position.x / cellSize) + xRadius + 2)), 0, rows);

  let yRadius = drawDistance / cellSize;
  let topBoundary = constrain(floor(((player[0].position.y / cellSize) - yRadius)), 0, cols);
  let bottomBoundary = constrain(floor(((player[0].position.y / cellSize) + yRadius + 2)), 0, cols);

  for (let i = leftBoundary; i < rightBoundary; i++) {

    for (let j = topBoundary; j < bottomBoundary; j++) {

      grid[i][j].render();

      for (let p = player.length - 1; p >= 0; p--) {

        //If player hits a water block
        /*
        if (player[p].intersects(grid[i][j], cellSize) && grid[i][j].b !== 0) {

          if (player[p].thirst < 50) {

            player[p].collisionBehavior();
            
          }
        }

*/
      }

      //grid[i][j].regrow();

    }

  }

  //Food and Poison stuff
  if (food.length + poison.length < (cols * rows / 3)){
    spawnEdibles();}
  drawEdibles();

  //Evolutionary Steering Behaviors

  for (let p = 0; p < player.length; p++) {
    if (player[0].intersects(player[p], drawDistance * 1.5)) {

      player[p].render();

    }

    player[p].behaviors(food, poison, wat0r);
    player[p].edges();
    player[p].update();

    if (p > 0 && player.length <= 50) {
      let newPlayer = player[p].clone();
      if (newPlayer !== null) {
        player.push(newPlayer);
      }

    }
    if (player[p].dead()) {
      /*
            let x = player[p].position.x;
            let y = player[p].position.y;
            food.push(createVector(x, y));
      */
      player.splice(p, 1);

    }
  }

  //DRAW TREES AND FLOWERS
  for (let d = 0; d < doodad.length; d++) {

    if (player[0].intersects(doodad[d], drawDistance * 1.5)) {
      doodad[d].render();
    }

  }
  /*
  //This is all I need in draw for the mouse controls!

  if (dragging) {
    translate(player[0].position.x - width / 2, player[0].position.y - height / 2);
    noFill();
    stroke(255);
    quad(mouseStartX, mouseStartY, mouseX, mouseStartY, mouseX, mouseY, mouseStartX, mouseY);
  }
*/
  player[0].input();

  GUI(player[0].position.x, player[0].position.y);
}