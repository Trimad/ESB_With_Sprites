function Tree(x, y, sprite, spriterows, spritecols) {

  this.position = createVector(x, y);

  this.render = function() {

    imageMode(CENTER);

    image(treeSpriteSheet, this.position.x, this.position.y, treeSize, treeSize,
      treeSpriteWidth * spriterows, treeSpriteHeight * spritecols,
      treeSpriteWidth, treeSpriteHeight);
  }

}

function Flower(x, y, sprite, spriterows, spritecols) {

  this.position = createVector(x, y);

  this.render = function() {

    imageMode(CENTER);

      image(plantSpriteSheet, this.position.x, this.position.y, edibleSize, edibleSize,
        plantSpriteWidth * 9, plantSpriteHeight * 5,
        plantSpriteWidth, plantSpriteHeight);
  }

}

//Only call this once!!!
function spawnFlowers() {

  for (var i = 1; i < rows - 1; i++) {

    for (var j = 1; j < cols - 1; j++) {

      var randomX = i * cellSize;
      var randomY = j * cellSize;

      //5% of the time!

      if (Math.random(1) < 0.05 && grid[i][j].b === 0 && grid[i][j].r !== 76) {

        //If two arguments are given, returns a random number from the first argument up to (but not including) the second argument.

        var spriterows = floor(random(4));
        var spritecols = floor(random(15));

        append(doodad, new Flower(randomX, randomY, spriterows, spritecols));

      }
    }
  }
}

//Only call this once!!!
function spawnTrees() {

  for (var i = 1; i < rows - 1; i++) {

    for (var j = 1; j < cols - 1; j++) {

      var randomX = i * cellSize;
      var randomY = j * cellSize;

      //5% of the time!

      if (Math.random(1) < 0.05 && grid[i][j].b === 0 && grid[i][j].r !== 76) {

        //If two arguments are given, returns a random number from the first argument up to (but not including) the second argument.

        var spriterows = floor(random(4));
        var spritecols = floor(random(15));

        append(doodad, new Tree(randomX, randomY, spriterows, spritecols));

      }
    }
  }
}