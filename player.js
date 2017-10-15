var mutationRate = 0.5;

function Player(spawnX, spawnY, ID, dna) {

  //Evolutionary Steering Behavior
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, -2);
  this.position = createVector(spawnX, spawnY);

  this.dna = [];
  if (dna === undefined) {
    // Food weight
    this.dna[0] = random(0, 5);
    // Poison weight
    this.dna[1] = random(0, 5);
    // Food perception
    this.dna[2] = random(0, 400);
    // Poision Percepton
    this.dna[3] = random(0, 400);
    //Maximum speed
    this.dna[4] = 5;
    //Maximum force
    this.dna[5] = 1;

  } else {

    // Mutation
    this.dna[0] = dna[0];
    if (random(1) < mutationRate) {
      this.dna[0] += random(-0.5, 0.5);
    }
    this.dna[1] = dna[1];
    if (random(1) < mutationRate) {
      this.dna[1] += random(-0.5, 0.5);
    }
    this.dna[2] = dna[2];
    if (random(1) < mutationRate) {
      this.dna[2] += random(-0.5, -0.5);
    }
    this.dna[3] = dna[3];
    if (random(1) < mutationRate) {
      this.dna[3] += random(-0.5, 0.5);
    }
    this.dna[4] = dna[4];
    if (random(1) < mutationRate) {
      this.dna[4] += random(-0.5, 0.5);
    }
    this.dna[5] = dna[5];
    if (random(1) < mutationRate) {
      this.dna[5] += random(-0.5, 0.5);
    }
  }
  //Everything else
  this.ID = ID;
  this.isSelected = false;
  this.hunger = 100;
  this.thirst = 0;

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  this.behaviors = function(good, bad) {

    var steerG = this.eat(good, 25, this.dna[2]);
    var steerB = this.eat(bad, -1, this.dna[3]);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  this.clone = function() {
    if (random(1) < 0.0009) {
      return new Player(this.position.x, this.position.y, this.ID, this.dna);
    } else {
      return null;
    }
  }

  this.eat = function(list, nutrition, perception) {
    var record = Infinity;
    var closest = null;
    for (var i = list.length - 1; i >= 0; i--) {
      var d = this.position.dist(list[i]);

      if (d < this.dna[4]) {
        list.splice(i, 1);
        this.hunger += nutrition;
      } else {
        if (d < record && d < perception) {
          record = d;
          closest = list[i];
        }
      }
    }

    // This is the moment of eating!

    if (closest !== null) {
      return this.seek(closest);
    }

    return createVector(0, 0);
  }

  this.dead = function() {
    return (this.hunger < 0);
  }

  this.display = function() {

    var theta = this.velocity.heading() + PI / 2;

    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    noFill();

    //Food information
    stroke(0, 255, 0);
    strokeWeight(this.dna[0]);
    ellipse(0, 0, this.dna[2] * 2);

    //Poison information
    stroke(255, 0, 0);
    strokeWeight(this.dna[1]);
    ellipse(0, 0, this.dna[3] * 2);

    pop();
  }

  this.edges = function() {

    //Firstly, ensure that the player never exits the map.

    if (this.position.x < 0)
      this.position.x = 0;
    if (this.position.y < 0)
      this.position.y = 0;
    if (this.position.x > rows * cellSize - cellSize)
      this.position.x = rows * cellSize - cellSize;
    if (this.position.y > cols * cellSize - cellSize)
      this.position.y = cols * cellSize - cellSize;

    //Secondly, give them a new vector in the opposite direction.

    var d = cellSize;

    var desired = null;

    if (this.position.x < d) {
      desired = createVector(this.dna[4], this.velocity.x);
    } else if (this.position.x > width - d) {
      desired = createVector(-this.dna[4], this.velocity.x);
    }

    if (this.position.y < d) {
      desired = createVector(this.velocity.y, this.dna[4]);
    } else if (this.position.y > height - d) {
      desired = createVector(this.velocity.y, -this.dna[4]);
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.dna[4]);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.dna[5]);
      this.applyForce(steer);
    }
  }


  this.input = function() {

    //Up
    if (keyIsDown(UP_ARROW)) {
      this.position.add(0, -15);

    }
    //Right
    if (keyIsDown(RIGHT_ARROW)) {
      this.position.add(15, 0);

    }
    //Down
    if (keyIsDown(DOWN_ARROW)) {
      this.position.add(0, 15);
    }
    //Left
    if (keyIsDown(LEFT_ARROW)) {
      this.position.add(-15, 0);

    }

  }

  this.intersects = function(other) {

    var d = dist(this.position.x, this.position.y, other.position.x, other.position.y);

    if (d < cellSize / 4) {
      this.velocity.x = this.velocity.x * -this.dna[5];
      this.velocity.y = this.velocity.y * -this.dna[5];
    }


  }

  this.render = function(player) {

    switch (this.ID) {

      case 0:
        this.spriteWalk(spriteWidth, spriteHeight, 0, 0);
        break;

      case 1:
        this.spriteWalk(spriteWidth, spriteHeight, spriteWidth * 3, 0);
        break;

      case 2:
        this.spriteWalk(spriteWidth, spriteHeight, spriteWidth * 6, 0);
        break;

      case 3:
        this.spriteWalk(spriteWidth, spriteHeight, spriteWidth * 9, 0);
        break;

      case 4:
        this.spriteWalk(spriteWidth, spriteHeight, 0, spriteHeight * 4);
        break;

      case 5:
        this.spriteWalk(spriteWidth, spriteHeight, spriteWidth * 3, spriteHeight * 4);
        break;

      case 6:
        this.spriteWalk(spriteWidth, spriteHeight, spriteWidth * 6, spriteHeight * 4);
        break;

      case 7:
        this.spriteWalk(spriteWidth, spriteHeight, spriteWidth * 9, spriteHeight * 4);
        break;

    }

    //Regards mouse selection

    if (this.isSelected) {
      noFill();
      stroke(255);
      rect(this.position.x, this.position.y, cellSize, cellSize);
    }

  }

  this.selectMe = function() {
    if (!this.isSelected) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }


  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  this.seek = function(target) {

    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Scale to maximum speed
    desired.setMag(this.dna[4]);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.dna[5]); // Limit to maximum steering force

    return steer;
    //this.applyForce(steer);
  }

  this.spriteWalk = function(sw, sh, sx, sy) {

    //Regards directionality

    var directionInDegrees = degrees(this.velocity.heading());
    if (directionInDegrees <= 0) {
      directionInDegrees = directionInDegrees + 360;
    }

    //Up

    if (directionInDegrees < 315 && directionInDegrees > 225) {
      if (frameCount % 30 < 10) {
        image(playerSpriteSheet, this.position.x, this.position.y, playerSize, playerSize, sx + 0, sy + sh * 3, sw, sh);
        
      }
      if (frameCount % 30 >= 10 && frameCount % 30 < 20) {

        image(playerSpriteSheet, this.position.x, this.position.y, playerSize, playerSize, sx + sw, sy + sh * 3, sw, sh);
      }
      if (frameCount % 30 >= 20 && frameCount % 30 <= 30) {

        image(playerSpriteSheet, this.position.x, this.position.y, playerSize, playerSize, sx + sw * 2, sy + sh * 3, sw, sh);
      }
    }

    //Right

    if (directionInDegrees < 45 || directionInDegrees > 315) {
      if (frameCount % 60 < 20) {
        image(playerSpriteSheet, this.position.x, this.position.y, playerSize, playerSize, sx + 0, sy + sh * 2, sw, sh);
      }
      if (frameCount % 60 >= 20 && frameCount % 60 < 40) {

        image(playerSpriteSheet, this.position.x, this.position.y, playerSize, playerSize, sx + sw, sy + sh * 2, sw, sh);
      }
      if (frameCount % 60 >= 40 && frameCount % 60 <= 60) {

        image(playerSpriteSheet, this.position.x, this.position.y, playerSize, playerSize, sx + sw * 2, sy + sh * 2, sw, sh);
      }
    }

    //Down

    if (directionInDegrees < 135 && directionInDegrees > 45) {

      if (frameCount % 100 < 33) {
        image(playerSpriteSheet, this.position.x, this.position.y, playerSize, playerSize, sx + 0, sy, sw, sh);
      }
      if (frameCount % 100 >= 33 && frameCount % 100 < 66) {

        image(playerSpriteSheet, this.position.x, this.position.y, playerSize, playerSize, sx + sw, sy, sw, sh);
      }
      if (frameCount % 100 >= 66 && frameCount % 100 <= 100) {

        image(playerSpriteSheet, this.position.x, this.position.y, playerSize, playerSize, sx + sw * 2, sy, sw, sh);
      }
    }

    //Left

    if (directionInDegrees < 225 && directionInDegrees > 135) {
      if (frameCount % 100 < 33) {
        image(playerSpriteSheet, this.position.x, this.position.y, playerSize, playerSize, sx + 0, sy + sh, sw, sh);
      }
      if (frameCount % 100 >= 33 && frameCount % 100 < 66) {

        image(playerSpriteSheet, this.position.x, this.position.y, playerSize, playerSize, sx + sw * 2, sy + sh, sw, sh);
      }
      if (frameCount % 100 >= 66 && frameCount % 100 <= 100) {

        image(playerSpriteSheet, this.position.x, this.position.y, playerSize, playerSize, sx + sw * 2, sy + sh, sw, sh);
      }
    }

  }

  this.tread = function(tile) {

    var d = dist(this.position.x, this.position.y + cellSize / 2, tile.position.x, tile.position.y);

    if (d < playerSize / 4) {
      if (tile.r < 255) {
        tile.r++;
        tile.a = 50;
      }
      if (tile.g > 100) {
        tile.g--;
        tile.a = 50;
      }

    }

  }

  this.update = function() {

    this.hunger -= 0.1;

    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.dna[4]);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  this.write = function(stat, value) {

    stat = value;

  }

}

//Only call this once!!!
function spawnPlayers() {

  for (var i = 0; i < numPlayers; i++) {
    var randX = floor(random(0, rows * cellSize));
    var randY = floor(random(0, cols * cellSize));
    append(player, new Player(randX, randY, i));
    //player.push(new Player(randX, randY, i));
  }

}