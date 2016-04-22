/**
 * 
 */

var mausoleum, fuzimiao, font;
var option = 0;

function preload() {
  mausoleum = loadImage('./assets/Sun_yatse_mausoleum.jpg');
  fuzimiao = loadImage('./assets/Nanjing_Fuzimiao_Sunset.jpg');
  font = loadFont('./assets/ANTSYPAN.TTF');
  textFont(font);
  textSize(32);
}

function setup() {
  createCanvas(1024, 768);
  noLoop();
}

function draw() {
  if (option == 0) {
    image(mausoleum, 0, 0);
    // Add some words and a line
    text("Mausoleum of Sun Yatse.", 250, 100);
    strokeWeight(8);
    line(250, 120, 710, 120);
  } else {
    image(fuzimiao, 0, 0);
    // Add some words and a line
    text("Sunset at Fuzimiao.", 250, 100);
    strokeWeight(8);
    line(250, 120, 610, 120);
  }
}

function mousePressed() {
  option = (option+1) % 2;
  redraw();
}

