function Tentacle(x, y) {
  this.targetX;
  this.targetY;
  this.numSegments =20;
  this.x = [];
  this.y = [];
  this.angle = [];
  this.segLength = 10;

  this.baseX = x;
  this.baseY = y;

  for (var i = 0; i < this.numSegments; i++) {
    this.x[i] = 0;
    this.y[i] = 0;
    this.angle[i] = 0;
  }

  this.show = function(player) {

      this.x[this.x.length - 1] = this.baseX; // Set base x-coordinate
      this.y[this.x.length - 1] = this.baseY; // Set base y-coordinate

      this.reachSegment(0, player.pos.x, player.pos.y);

      for (var i = 1; i < this.numSegments; i++) {
        this.reachSegment(i, this.targetX, this.targetY);
      }
      for (var j = this.x.length - 1; j >= 1; j--) {
        this.positionSegment(j, j - 1);
      }
      for (var k = 0; k < this.x.length; k++) {
        this.segment(this.x[k], this.y[k], this.angle[k], (k + 1) * 2);
      }

    }
    //This is an attempt to make the plants render only within a given radius, like the cells.
  this.render = function(player) {

    var plantDistance = dist(this.baseX, this.baseY, player.pos.x, player.pos.y);

    if (plantDistance < drawDistance) {

      this.x[this.x.length - 1] = this.baseX; // Set base x-coordinate
      this.y[this.x.length - 1] = this.baseY; // Set base y-coordinate

      this.reachSegment(0, player.pos.x, player.pos.y);

      for (var i = 1; i < this.numSegments; i++) {
        this.reachSegment(i, this.targetX, this.targetY);
      }
      for (var j = this.x.length - 1; j >= 1; j--) {
        this.positionSegment(j, j - 1);
      }
      for (var k = 0; k < this.x.length; k++) {
        this.segment(this.x[k], this.y[k], this.angle[k], (k + 1) * 2);
      }


    }

  }

  this.positionSegment = function(a, b) {
    this.x[b] = this.x[a] + cos(this.angle[a]) * this.segLength;
    this.y[b] = this.y[a] + sin(this.angle[a]) * this.segLength;
  }

  this.reachSegment = function(i, xin, yin) {
    var dx = xin - this.x[i];
    var dy = yin - this.y[i];
    this.angle[i] = atan2(dy, dx);
    this.targetX = xin - cos(this.angle[i]) * this.segLength;
    this.targetY = yin - sin(this.angle[i]) * this.segLength;
  }

  this.segment = function(x, y, a, sw) {
    push();
    stroke(50, 100, sw * 2);
    //stroke(random(sw*3),random(255));
    fill(0, 255, sw * 4);
    strokeWeight(sw / 4);
    translate(x, y);
    rotate(a);
    ellipse(0, 0, this.segLength/2, this.segLength);
    //image(img, 0, 0, cellSize * 2, cellSize * 2);
    pop();
  }
}