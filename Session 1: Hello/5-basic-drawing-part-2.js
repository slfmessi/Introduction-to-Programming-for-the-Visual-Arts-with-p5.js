/**
 * 
 */

function setup() {
  createCanvas(1024, 768);
}

function draw() {
  rect(10, 10, 1004, 748);
  ellipse(512, 300, 100, 100);
  line(0, 0, 500, 500);
  
  // strokeWeight() sets the width of stroke
  // Uncomment it to see changes
  // strokeWeight(10);
  
  line(0, 500, 500, 0);
  ellipse(200, 500, 200, 100);
}