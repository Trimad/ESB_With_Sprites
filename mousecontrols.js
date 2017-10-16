var mouseStartX;
var mouseStartY;
var dragging = false;

function mousePressed() {

  if (mouseButton == LEFT) {

    mouseStartX = mouseX;
    mouseStartY = mouseY;
    dragging = true;

  }

  if (mouseButton == RIGHT) {

    for (var i = 0; i < player.length; i++) {
      
      if (player[i].isSelected) {

        player[i].applyForce(mouseX, mouseY);

      }

      console.log("RIGHT MOUSE");
      
    }
    
  }

}

function mouseReleased() {

  dragging = false;
  selectObj();

}


function selectObj() {

  var xOffset = player[0].position.x - width / 2;
  var yOffset = player[0].position.y - height / 2;


  for (p = 0; p < player.length; p++) {

    //Lower-Right Quadrant

    if (mouseX + xOffset > mouseStartX + xOffset && mouseY + yOffset > mouseStartY + yOffset) {

      if (player[p].position.x > mouseStartX + xOffset && player[p].position.y > mouseStartY + yOffset) {
        if (player[p].position.x < mouseX + xOffset && player[p].position.y < mouseY + yOffset) {

          player[p].selectMe();

        }
      }
    }

    //Lower-Left Quadrant

    if (mouseX + xOffset < mouseStartX + xOffset && mouseY + yOffset > mouseStartY + yOffset) {

      if (player[p].position.x < mouseStartX + xOffset && player[p].position.y > mouseStartY + yOffset) {
        if (player[p].position.x > mouseX + xOffset && player[p].position.y < mouseY + yOffset) {

          print("SELECTED");
          player[p].selectMe();
        }
      }
    }

    //Upper-Right Quadrant

    if (mouseX + xOffset > mouseStartX + xOffset && mouseY + yOffset < mouseStartY + yOffset) {

      if (player[p].position.x > mouseStartX + xOffset && player[p].position.y < mouseStartY + yOffset) {
        if (player[p].position.x < mouseX + xOffset && player[p].position.y > mouseY + yOffset) {

          player[p].selectMe();
        }
      }
    }

    //Lower-Right Quadrant

    if (mouseX + xOffset < mouseStartX + xOffset && mouseY + yOffset < mouseStartY + yOffset) {

      if (player[p].position.x < mouseStartX + xOffset && player[p].position.y < mouseStartY + yOffset) {

        if (player[p].position.x > mouseX + xOffset && player[p].position.y > mouseY + yOffset) {

          player[p].selectMe();
        }
      }
    }

  }
}