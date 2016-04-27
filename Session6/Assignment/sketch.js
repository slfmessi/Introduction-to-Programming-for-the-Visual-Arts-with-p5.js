/**
 * Author: Sun Lifei
 * Date: 2016.4.27
 */

var sound;
var amp;
var fft;

function preload() {
  sound = loadSound('assets/rainforest-ambient.mp3');
}

function setup() {
  createCanvas(600, 600);
  amp = new p5.Amplitude();
  fft = new p5.FFT(0.8, 128);
  sound.loop();
}

function draw() {
  colorMode(HSB, 100);
  background(50, 50, 80);
  noStroke();
  
  level = amp.getLevel();
  var radius = map(level, 0, 0.2, 200, 300);
  fill(82, 42, 100);
  ellipse(300, 300, radius, radius);
  
  stroke(30, 40, 50);
  fill(30, 40, 50, 0);
  var scale = map(level, 0, 0.2, 0.1, 0.25) + 1;
  ellipse(300, 300, scale*scale*radius, scale*scale*radius);
  
  var spectrum = fft.analyze();
  var size = [];
  for(var i = 0; i < 32; i++) {
    size[i] = (1 + sin(map(spectrum[i], 0, 255, 0, TWO_PI))) * 40;
  }
  
  translate(300, 300);
  gapAngle = TWO_PI / 32;
  for(var i = 0; i < 32; i++) {
    rotate(gapAngle);
    fill(20, 20, 100);
    // noStroke();
    // rotate(gapAngle);
    // rectMode(CORNER);
    rect(-10, -scale*scale*radius / 2, 20, -size[i]);
  }
}

