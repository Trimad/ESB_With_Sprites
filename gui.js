var fps;

function GUI() {

  //GUI Stuff
  var line1;

  if (frameCount % 30 === 0) {
    fps = frameRate();
  }
  var framerate = ("FRAMERATE: " + ceil(fps));

  line1 = select('#line1');
  line1.html(framerate);

  var line2;
  var runtime = ("DRAWN FRAMES: " + frameCount);
  line2 = select('#line2');
  line2.html(runtime);

  var line3;
  var mapsize = ("MAP SIZE: (" + rows + ", " + cols + ")");
  line3 = select('#line3');
  line3.html(mapsize);

  var line4;
  var playerPosition = ("POSITION: (" + ceil(player[0].position.x) + ", " + ceil(player[0].position.y) + ")");
  line4 = select('#line4');
  line4.html(playerPosition);

  var line5;
  var directionInDegrees = degrees(player[0].velocity.heading());
  if (directionInDegrees <= 0) {
    directionInDegrees = directionInDegrees + 360;
  }
  var heading = ("HEADING: " + ceil(directionInDegrees));
  line5 = select('#line5');
  line5.html(heading);

  var line6;
  var debug = ("CANVAS: (" + width + ", " + height + ")");
  line6 = select('#line6');
  line6.html(debug);

  var line7;
  var debug2 = ("DRAW DISTANCE: " + drawDistance);
  line7 = select('#line7');
  line7.html(debug2);

  var line8;
  var mousePosition = ("MOUSE: (" + mouseX + ", " + mouseY + ")");
  line8 = select('#line8');
  line8.html(mousePosition);

  var line9;
  var velocity = ("VELOCITY: (" + round(player[0].velocity.x) + ", " + round(player[0].velocity.y) + ")");
  line9 = select('#line9');
  line9.html(velocity);

  var line10;
  var hunger = ("HUNGER: " + player[0].hunger);
  line10 = select('#line10');
  line10.html(hunger);

  var line11;
  var alive = ("PLAYERS ALIVE: " + player.length);
  line11 = select('#line11');
  line11.html(alive);

}

function saveGame() {
  saveJSON(stats, 'modified.');
  console.log(stats);
  console.log("Game saved! Or is it?");
}

var cameraX;
var cameraY;

function camera() {

  //Up
  if (keyIsDown(UP_ARROW)) {
    cameraY = cameraY + 10;

  }
  //Right
  if (keyIsDown(RIGHT_ARROW)) {
    cameraX += 1;

  }
  //Down
  if (keyIsDown(DOWN_ARROW)) {
    cameraY += 1;
  }
  //Left
  if (keyIsDown(LEFT_ARROW)) {
    cameraX -= 1;

  }

}