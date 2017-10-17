"use strict"
let food = [];
let poison = [];
let flowers = [];
let wat0r = [];

function drawEdibles() {

  //Draw Food

  for (var f = 0; f < food.length; f++) {

    var distance = dist(player[0].position.x, player[0].position.y, food[f].x, food[f].y);

    if (distance < drawDistance) {

      image(plantSpriteSheet, food[f].x, food[f].y, edibleSize, edibleSize,
        plantSpriteWidth * 3, plantSpriteHeight * 5,
        plantSpriteWidth, plantSpriteHeight);

    }
  }

  //Draw Poison

  for (let p = 0; p < poison.length; p++) {

    var distance = dist(player[0].position.x, player[0].position.y, poison[p].x, poison[p].y);

    if (distance < drawDistance) {

      image(plantSpriteSheet, poison[p].x, poison[p].y, edibleSize, edibleSize,
        plantSpriteWidth * 3, plantSpriteHeight * 4,
        plantSpriteWidth, plantSpriteHeight);

    }
  }

  //Draw water
  /*
    for (let w = 0; w < wat0r.length; w++) {
      fill(0, 0, 255);
      ellipse(wat0r[w].x, wat0r[w].y, 16, 16);

    }
    */
}

function spawnEdibles() {

  let x = floor(random(1, rows - 1));
  let y = floor(random(1, cols - 1));

  //Spawn Food
  if (Math.random(1) < 0.1 && food.length < 512) {
    if (grid[x][y].b === 0 && grid[x][y].r !== 76) {
      food.push(createVector(x * cellSize, y * cellSize));
    }
  }

  //Spawn Poison
  if (Math.random(1) < 0.1 && poison.length < 256) {
    if (grid[x][y].b === 0 && grid[x][y].r !== 76) {
      poison.push(createVector(x * cellSize, y * cellSize));
    }
  }

}

function spawnWater() {

  for (let x = 0; x < rows; x++) {

    for (let y = 0; y < cols; y++) {

      if (grid[x][y].b !== 0) {

        wat0r.push(createVector(x * cellSize, y * cellSize));
      }


    }
  }

}