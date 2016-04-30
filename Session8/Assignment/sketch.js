/**
 * Author: Sun Lifei
 * Date: 2016.4.30
 * 
 * This creature is inspired by icon of blender, a open software for 3D creation.
 * Enjoy!
 */

function setup() {
  createCanvas(900, 600);
  b1 = new Blender();
  b2 = new Blender(createVector(400, 300), color('magenta'), 300, 80);
}

function draw() {
  background(224);

  b1.update(true);
  b1.render();
  b2.update(false);
  b2.render('left');
}

function Blender(basicPos, skinColor, height, headSize) {
  this.basicPos = basicPos || createVector(100, 100);
  this.skinColor = skinColor || color(253, 115, 0);
  this.height = height || 200;
  this.headSize = headSize || 50;
  this.width = 0.4 * this.height;
  this.legAng = PI / 12;
  this.armAng = PI / 6;
  this.hairAng1 = 0.3 * PI;
  this.hairAng2 = 0.22 * PI;
  this.hairAng3 = 0.25 * PI;
  this.eyeColor = color(0, 100, 247);
  // this.motion = 0; // Default motion type

  this.render = function (orientation) {
    this.orientation = orientation || 'right';
    if (this.orientation == 'left') {
      this.hairAng1 = -0.3 * PI;
      this.hairAng2 = -0.22 * PI;
      this.hairAng3 = -0.25 * PI;
    }

    translate(this.basicPos.x, this.basicPos.y);
    translate(0.5 * this.width, 0.6 * this.height);
    // Draw two legs
    stroke(0);
    push();
    strokeWeight(8);
    rotate(-this.legAng);
    line(0, 0, 0, 0.4 * this.height);
    rotate(2 * this.legAng);
    line(0, 0, 0, 0.4 * this.height);
    pop();
    // Draw body
    strokeWeight(10);
    line(0, 0, 0, -0.2 * this.height);

    // Draw arms
    translate(0, -0.15 * this.height);
    push();
    strokeWeight(8);
    rotate(-this.armAng);
    line(0, 0, 0, 0.25 * this.height);
    rotate(2 * this.armAng);
    line(0, 0, 0, 0.25 * this.height);
    pop();

    // Draw head
    noStroke();
    translate(0, -0.05 * this.height - 0.5 * this.headSize);
    fill(this.skinColor);
    ellipse(0, 0, this.headSize, this.headSize);
    // Draw eyes
    fill(255, 227);
    ellipse(0, 0, 0.6 * this.headSize, 0.6 * this.headSize);
    fill(this.eyeColor);
    ellipse(0, 0, 0.3 * this.headSize, 0.3 * this.headSize);
    // Draw hair
    translate(0, -0.5 * this.headSize + 2);
    push();
    stroke(this.skinColor);
    strokeJoin(BEVEL);
    strokeWeight(8);
    rotate(this.hairAng1);
    line(0, 0, 0, this.headSize);
    rotate(this.hairAng2);
    line(0, 0, 0, 0.8 * this.headSize);
    rotate(this.hairAng3);
    line(0, 0, 0, 0.6 * this.headSize);
    pop();

    this.reset();
    resetMatrix();
  }

  this.update = function (easing) {
    this.detect();
    if (this.motion == 0) {
      this.eyeColor = color(map(mouseY, 0, this.height, 200, 220), 37, 38);
    } else if (this.motion == 1) {
      this.jump(easing);
    } else {
      this.moveTo(easing);
    }
  }

  this.detect = function () {
    if (mouseX > this.basicPos.x && mouseX < this.basicPos.x + 0.4 * this.height
      && mouseY > this.basicPos.y && mouseY < this.basicPos.y + this.height) {
      this.motion = 0;
    } else if (mouseY > 0 && mouseY < this.basicPos.y) {
      this.motion = 1;
      print("test!");
    } else {
      this.motion = 2;
    }
  }

  this.moveTo = function (easing) {
    if (easing) {
      var ease = 0.04;
      var targetX = mouseX;
      var targetY = mouseY;

      this.basicPos.x += (targetX - this.basicPos.x) * ease;
      this.basicPos.y += (targetY - this.basicPos.y) * ease;
    } else {
      this.basicPos.x = mouseX;
      this.basicPos.y = mouseY;
    }
  }

  this.jump = function (easing) {
    if (easing) {
      var ease = 0.04;
      var targetX = mouseX;
      var targetY = mouseY;

      this.basicPos.x += (targetX - this.basicPos.x) * ease;
      this.basicPos.y += (targetY - this.basicPos.y) * ease;
    } else {
      this.basicPos.x = mouseX;
      this.basicPos.y = mouseY;
    }
    this.legAng = HALF_PI - PI / 10;
    this.armAng = PI / 6;
  }

  this.reset = function () {
    this.legAng = PI / 12;
    this.armAng = PI / 6;
    this.eyeColor = color(0, 100, 247);
  }
}

