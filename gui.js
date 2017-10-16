var cameraX;
var cameraY;

function camera() {

  //Up
  if (keyIsDown(UP_ARROW)) {
    cameraY += 1;

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