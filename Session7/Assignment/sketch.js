/**
 * Author: Sun Lifei
 * Date: 2016.4.29
 * Feel free to move your mouse over the canvas. Enjoy!
 */

var timer = 0;
var mode = 2;
var style = 2;

function setup() {
  createCanvas(480, 640);
  smooth();
}

function draw() {
  background(240, 235, 233);
  drawLetter(mode, style);
  if (millis() - timer < 5000) {
    return;
  }
  timer = millis();
  
  style = floor(random(0, 3));
  // Debug
  // print(mode + ", " + style);
}

function drawLetter(mode, style) {
  switch (mode) {
    case 0:
      drawThick(style);
      break;
    case 1:
      drawThin(style);
      break;
    case 2:
      drawSerif(style);
      break;
    case 3:
      drawSerifThin(style);
      break;
    default:
      break;
  }
}

function drawThick(style) {
  switch (style) {
    case 0: // Basic style
      fill(27, 120, 100);
      break;
    case 1: // Fill color differents
      fill(map(mouseX, 0, width, 27, 90), 120, map(mouseY, 0, height, 92, 104));
      break;
    case 2: // Stroke differents
      fill(27, 120, 100);
      strokeWeight(map(mouseX, 0, width, 0, 2));
      stroke(0, map(mouseY, 0, height, 0, 255));
      break;
    default:
      break;
  }
  beginShape();
  vertex(90, 80);
  vertex(140, 80);
  vertex(140, 510);
  vertex(390, 510);
  vertex(390, 560);
  vertex(90, 560);
  endShape(CLOSE);
}

function drawThin(style) {
  strokeCap(PROJECT);
  strokeJoin(BEVEL);
  switch (style) {
    case 0:
      strokeWeight(map(second(), 0, 60, 4, 16));
      line(90, 560, 390, 560);
      translate(90, 560);
      line(0, 0, 0, -480);
      break;
    case 1:
      angle = map(second(), 0, 60, PI / 48, PI / 24);
      strokeWeight(8);
      line(90, 560, 390, 560);
      translate(90, 560);
      rotate(angle);
      line(0, 0, 0, -480);
      break;
    case 2:
      strokeWeight(8);
      if (second() > 30) {
        line(90, 230, 90, 410);
        line(90, 410, 390, 410);;
      } else {
        line(90, 560, 390, 560);
        translate(90, 560);
        line(0, 0, 0, -480);
      }
      break;
    default:
      break;
  }
}

function drawSerif(style) {
  switch (style) {
    case 0:
      noStroke();
      fill(27, 120, 100);
      beginShape();
      vertex(75, 80);
      vertex(155, 80);
      vertex(155, 120);
      vertex(140, 120);
      vertex(140, 520);
      vertex(340, 520);
      vertex(340, 500);
      vertex(390, 500);
      vertex(390, 560);
      vertex(75, 560);
      vertex(75, 520);
      vertex(90, 520);
      vertex(90, 120);
      vertex(75, 120);
      endShape(CLOSE);
      break;
    case 1:
      background(0);
      stroke(116, 227, 213);
      strokeWeight(4);
      strokeCap(PROJECT);
      strokeJoin(BEVEL);
      line(70, 80, 160, 80);
      line(70, 120, 90, 120);
      line(140, 120, 160, 120);
      line(90, 120, 90, 520);
      line(140, 120, 140, 520);
      line(70, 520, 90, 520);
      line(140, 520, 340, 520);
      line(70, 560, 350, 560);
      push();
      translate(340, 520);
      rotate(PI / 6);
      line(0, 0, 0, -40);
      pop();
      push();
      translate(350, 560);
      rotate(PI / 6);
      line(0, 0, 0, -84);
      pop();
      break;
    case 2:
      noStroke();
      fill(27, 120, 100);
      beginShape();
      vertex(90, 120)
      vertex(270, 120);
      vertex(270, 140);

      // Add a curve
      vertex(230, 160);
      vertex(230, 520);
      vertex(90, 520);
      vertex(90, 500);
      // Add a curve
      vertex(130, 480);
      vertex(130, 160);
      // Add a curve
      vertex(90, 140)
      endShape(CLOSE);

      // BETTER: use curves not circle
      noStroke();
      rect(250, 380, 140, 140);
      fill(240, 235, 233);
      arc(250, 380, 240, 230, 0, HALF_PI);
      break;
    default:
      break;
  }
}

function drawSerifThin(style) {
  strokeCap(PROJECT);
  strokeJoin(BEVEL);
  strokeWeight(8);
  var startX;
  var endY;
  switch (style) {
    case 0:
      startX = 370;
      endY = 480;      
      break;
    case 1:
      startX = map(mouseX, 0, width, 360, 380);
      endY = map(mouseY, 0, height, 480, 500);
      break;
    case 2:
      startX = map(mouseX, 0, width, 360, 370);
      endY = map(mouseY, 0, height, 480, 500);
      red = map(mouseX, 0, width, 105, 120);
      green = map(mouseY, 0, height, 220, 232);
      stroke(red, green, 213);
      break;
    default:
      break;
  }

  line(90, 80, 180, 80);
  line(135, 80, 110, 560);
  line(90, 560, 390, 560);
  line(startX, 560, 390, endY);
}

function mouseClicked() {
  nextMode = floor(random(0, 4));
  while (nextMode == mode) {
    nextMode = floor(random(0, 4));
  };
  mode = nextMode;
}
