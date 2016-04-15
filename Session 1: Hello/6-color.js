/**
 * 
 */

function setup() {
  createCanvas(1024, 768);
}

function draw() {
  // background() sets the color of background
  // Set with grey scale color
  // background(0);
  // background(100);
  // background(255);
  
  // Set with RGB color
  // background(255, 0, 0);
  // background(255, 255, 0);
  // background(255, 0, 255);
  // background(100, 0, 0);  
  
  background(100);
  strokeWeight(10);
  
  // fill() sets the color used to fill shapes
  // fill(0);
  // fill(200);
  // fill(255, 0, 0);
  // rect(100, 100, 100, 100);
  stroke(255, 0, 0);
  // noFill() disables filling geometry
  noFill();
  rect(100, 100, 300, 300);
  
  // stroke() sets the color used to draw lines and borders around shapes
  // stroke(100);
  stroke(0, 255, 255);
  // fill(255, 255, 0);
  // Set the color with transparency
  // fill(255, 255, 0, 100);
  fill(255, 255, 0, 200);
  // rect(300, 100, 100, 100);
  rect(250, 250, 300, 300);
  
  fill(200, 100);
  // stroke(255, 0, 0, 100);
  // noStroke() disables drawing the stroke (outline)
  noStroke();
  rect(150, 150, 300, 300);
}