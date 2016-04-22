/**
 * 
 */

var SMILE = 1
var SCARED = 2

var eyeRad = 160;
var pupilRad = 60;
var lightRad = 20;

var leftEyeX = 300;
var rightEyeX = 724;
var eyeY = 400;

var isToBlink = false;

function setup() {
  createCanvas(1024, 768);
  // background(204);
  ellipseMode(RADIUS);
  // frameRate(1);
  setInterval(changeBlinkFlag, 3000);
  frameRate(30);
}

function draw() {
  var speed = dist(mouseX, mouseY, pmouseX, pmouseY);

  background(204);
  if (speed > 500) {
    scared();
  } else if (isToBlink && !mouseIsPressed) {
    frameRate(5);
    blink();
    isToBlink = !isToBlink;
  } else if (mouseIsPressed) {
    smile();
  } else {
    frameRate(30);
    drawEye();
    drawPupil();
  }
}

function drawEye() {
  strokeWeight(10);
  ellipse(leftEyeX, eyeY, eyeRad, eyeRad);
  ellipse(rightEyeX, eyeY, eyeRad, eyeRad);
}

function drawPupil() {
  noStroke();
  fill(0);
  mouseX = mouseX > width ? width : mouseX;
  mouseY = mouseY > height ? height : mouseY;


  leftPupilX = map(mouseX, 0, width, 240, 360);
  leftPupilY = map(mouseY, 0, height, 320, 480);

  rightPupilX = map(mouseX, 0, width, 664, 784);
  rightPupilY = map(mouseY, 0, height, 320, 480);

  ellipse(leftPupilX, leftPupilY, pupilRad, pupilRad);
  ellipse(rightPupilX, rightPupilY, pupilRad, pupilRad);

  fill(255);
  leftLightX = map(mouseX, 0, width, 220, 380);
  leftLightY = map(mouseY, 0, height, 300, 500);

  rightLightX = map(mouseX, 0, width, 644, 804);
  rightLightY = map(mouseY, 0, height, 300, 500);

  ellipse(leftLightX, leftLightY, lightRad, lightRad);
  ellipse(rightLightX, rightLightY, lightRad, lightRad);
}

function changeBlinkFlag() {
  isToBlink = !isToBlink;
}

function blink() {
  drawEye();
  strokeWeight(10);
  arc(leftEyeX, eyeY, eyeRad, eyeRad, PI/16, -15 * PI/16, CHORD);
  arc(rightEyeX, eyeY, eyeRad, eyeRad, -PI/16, 15 * PI/16, CHORD);
}

function smile() {
  strokeWeight(10);
  noFill();
  bezier(130, 390, 300, 300, 360, 300, 480, 420);
  bezier(894, 390, 724, 300, 664, 300, 544, 420);
}

function scared() {
  strokeWeight(10);
  line(150, 300, 480, 360);
  line(874, 300, 544, 360);
  strokeWeight(5);
  line(886, 340, 946, 340);
  line(886, 360, 946, 360);
  line(906, 320, 906, 380);
  line(926, 320, 926, 380);
}

// function angry() {
  
// }