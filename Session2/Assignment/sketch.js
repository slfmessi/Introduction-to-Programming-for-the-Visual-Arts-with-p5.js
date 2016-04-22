/**
 * 
 */

var sound, amplitude, cnv;
var strongGray = 255;
var strongAlpha = 200;
var weakGray = 200;
var weakAlpha = 200;
var column = 10;
var row = 10;

function preload() {
  sound = loadSound('./assets/ウルトラタワー - 希望の唄.mp3');
}

function setup() {
  cnv = createCanvas(600, 600);
  amplitude = new p5.Amplitude();

  frameRate(30);

  cnv.mouseClicked(function() {
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.loop();
    }
  })
}

function draw() {
  background(0);
  var level = amplitude.getLevel();
  var size = map(level, 0, 1, 0, 200);
  var num = floor(map(level, 0, 1, 0, 10));

  for (var i = 0; i < column; i++) {
    for (var j = 0; j < row; j++) {
      // if (i == num && j == num) {
      //   for (var k = 0; k < num; k ++) {
      //     fill(strongGray, strongAlpha);
      //     ellipse(i * 100 + 50, i * 100 + 50, 40, 40);
      //     break;
      //   }
      //   fill(weakGray, weakAlpha);
      //   ellipse(i * 100 + 50, i * 100 + 50, 40, 40);
      // }
      if (num != 0) {
        if (i == num && j == num) {
          noFill();
          stroke(strongGray, strongAlpha);
          for (var k = 0; k < 3; k++) {
            ellipse(i * 60 + 30, j * 60 + 30, 20 + k * 10, 20 + k * 10);
          }
          continue;
        }
        noStroke();
        fill(weakGray, weakAlpha);
        ellipse(i * 60 + 30, j * 60 + 30, 50, 50);
      }

    }
  }

}