var food = [];
var poison = [];
var flowers = [];

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

  for (var p = 0; p < poison.length; p++) {

    var distance = dist(player[0].position.x, player[0].position.y, poison[p].x, poison[p].y);

    if (distance < drawDistance) {

      image(plantSpriteSheet, poison[p].x, poison[p].y, edibleSize, edibleSize,
        plantSpriteWidth * 3, plantSpriteHeight * 4,
        plantSpriteWidth, plantSpriteHeight);

    }
  }
}

function spawnEdibles() {

//Spawn Food

  if (Math.random(1) < 0.1 && food.length < 512) {

    var x = floor(random(rows));
    var y = floor(random(cols));

    if (grid[x][y].b === 0 && grid[x][y].r !== 76) {
      food.push(createVector(x * cellSize, y * cellSize));
    }
  }
  
  //Spawn Poison
  
    if (Math.random(1) < 0.1 && poison.length < 256) {

    var x = floor(random(rows));
    var y = floor(random(cols));

    if (grid[x][y].b === 0 && grid[x][y].r !== 76) {
      poison.push(createVector(x * cellSize, y * cellSize));
    }
  }
  
}