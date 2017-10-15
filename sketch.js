var canvas;
var debug;
var data;

var stats;

var npcSprites = [];
var playerSprites = [];
var doodad = [];
var player = [];
var tentacles = [];

var drawDistance;
var cols = 32;
var rows = 32;
var cellSize = 128;
var playerSize = cellSize;
var treeSize = cellSize * 3;
var edibleSize = playerSize;

var numPlayers = 8;

function setup() {

  //JSON stuff
  stats = data.tristan;

  //Canvas stuff
  drawDistance = windowHeight;
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  pixelDensity(1);
  imageMode(CENTER);
  rectMode(CENTER);
  noSmooth();
  
  //Spawn stuff into the world
  make2Darray();
  spawnTrees();
  spawnPlayers();

  debug = createCheckbox();
  debug.parent('debugbox');

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawDistance = windowWidth / 2;
}

function draw() {

  background(51);

  GUI();

  translate(-player[0].position.x + width / 2, -player[0].position.y + height / 2);
  //translate(cameraX, cameraY);
  //camera();

  //Draw tiles

  for (var i = 0; i < rows; i++) {

    for (var j = 0; j < cols; j++) {

      drawWithinDistance(player[0], grid[i][j]);

      for (var p = player.length - 1; p >= 0; p--) {

        if (player[p] !== undefined) {

          //player[p].tread(grid[i][j]);

        }

      }

      //Every 60 frames, regrow the grass
      /*
            if (frameCount % 60 === 0) {

              grid[i][j].regrow();

            }
      */
    }

  }

  //Food and Poison stuff

  spawnEdibles();
  drawEdibles();

  //Evolutionary Steering Behaviors

  for (p = 0; p < player.length; p++) {
    drawWithinDistance(player[0], player[p]);
    player[p].behaviors(food, poison);
    player[p].edges();
    if (debug.checked()) {
      player[p].display();
    }
    player[p].update();

    if (p > 0 && player.length <= 49) {
      var newPlayer = player[p].clone();
      if (newPlayer !== null) {
        player.push(newPlayer);
      }

    }
    if (player[p].dead()) {
      /*
            var x = player[p].position.x;
            var y = player[p].position.y;
            food.push(createVector(x, y));
      */
      player.splice(p, 1);
    }
  }

  //Draw doodads ontop of the player
  for (var d = 0; d < doodad.length; d++) {

    //Only draw doodas within the draw distance
    //Doodads must be drawn after players
    drawWithinDistance(player[0], doodad[d]);

  }

  //This is all I need in draw for the mouse controls!

  if (dragging) {
    translate(player[0].position.x - width / 2, player[0].position.y - height / 2);
    noFill();
    stroke(255);
    quad(mouseStartX, mouseStartY, mouseX, mouseStartY, mouseX, mouseY, mouseStartX, mouseY);
  }

  player[0].input();
}

function drawWithinDistance(player, someObject) {

  var distance = dist(player.position.x, player.position.y, someObject.position.x, someObject.position.y);

  if (distance < drawDistance) {

    someObject.render(player);

  }

}