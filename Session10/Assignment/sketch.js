/**
 * Author: Sun Lifei
 * 
 * You play as a germ to eat others to be larger.
 * Green ones can be eaten.
 * Red ones or those bigger than you make you die.
 * Yellow ones will slow you down for 7 seconds.
 * Enjoy!
 */

// CONST
var INTRO = 0;
var PLAYING = 1;
var END = 2;
var WIN = 3;
var gameState = INTRO;
var score = 0;

var eatSound;
var dieSound;

var player;
var enemies = [];

var startPos;
var playerColor;
var enemyColor;
var badColor;
var slowColor;
var slowTime = 0;

function preload() {
  eatSound = loadSound('assets/eat.mp3');
  dieSound = loadSound('assets/game-over.mp3');
}

function setup() {
  createCanvas(960, 640);

  startPos = createVector(width / 2, height / 2);
  playerColor = color(100, 0, 247, map(second() % 10, 0, 10, 120, 240));
  badColor = color(225, 0, 0, 220);
  enemyColor = color(0, 245, 0, 230);
  slowColor = color(245, 242, 0, 235);
  player = new Player();
  // print(player.pos);
  for (var i = 0; i < 20; i++) {
    enemies[i] = new Enemy();
  }
}

// function keyPressed() {
//   player.update();
// }

function draw() {
  switch (gameState) {
    case INTRO:
      drawIntro();
      break;
    case PLAYING:
      drawPlay();
      break;
    case END:
      drawEnd();
      break;
    case WIN:
      drawWin();
      break;
    default:
      break;
  }
  
}

function drawIntro() {
  background(0);
  textFont('Helvetica');
  textSize(48);
  textAlign(CENTER, CENTER);
  fill(255);
  text('Let\'s play a game!\nClick to start!', width/2, height/2-20);
}

function drawPlay() {
  background(0);

  player.update();
  player.render();

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].render();
  }  
}

function drawEnd() {
  background(0);
  textFont('Helvetica');
  textSize(48);
  textAlign(CENTER, CENTER);
  fill(255);
  text('Your score is ' + score + '.\nClick to restart!', width/2, height/2-20);
}

function drawWin() {
  background(0);
  textFont('Helvetica');
  textSize(48);
  textAlign(CENTER, CENTER);
  fill(255);
  text('Congrats!\nYou have meet the max score: '+375+'!\nClick to restart!', width/2, height/2-80);
}

function startGame() {
  score = 0;
  player.init();
}

function mousePressed() {
  if (gameState == INTRO || gameState == END || gameState == WIN) {
    gameState = PLAYING;
    startGame();
  }
}

function Cell(pos, size) {
  this.pos = pos;
  this.size = size || 20;
  this.label = this.size.toString() || '20';
}

function Player() {
  this.init();
}
Player.prototype = new Cell();
Player.prototype.constructor = Player;
Player.prototype.init = function () {
  this.pos = createVector(width / 2, height / 2);
  this.size = 25;
  this.label = this.size.toString();
  this.speed = 5;
  this.color = playerColor;
}
Player.prototype.update = function () {
  // if (keyCode == LEFT_ARROW) {
  //   this.moveLeft();
  // } else if (keyCode == RIGHT_ARROW) {
  //   this.moveRight();
  // } else if (keyCode == UP_ARROW) {
  //   this.moveUp();
  // } else if (keyCode == DOWN_ARROW) {
  //   this.moveDown();
  // }

  if (keyIsDown(LEFT_ARROW)) {
    this.moveLeft();
  }
  if (keyIsDown(RIGHT_ARROW)) {
    this.moveRight();
  }
  if (keyIsDown(UP_ARROW)) {
    this.moveUp();
  }
  if (keyIsDown(DOWN_ARROW)) {
    this.moveDown();
  }
  
  if (this.speed < 5) {
   if (millis() - slowTime > 7000) {
     showTime = millis();
     this.speed = 5;
   }
  }
}
Player.prototype.render = function () {
  noStroke();
  fill(this.color);
  // print(this.pos);
  ellipse(this.pos.x, this.pos.y, this.size, this.size);
  fill(255, map(second() % 5, 0, 5, 90, 240));
  textSize(16);
  // textFont('Consolas');
  textAlign(CENTER, CENTER);
  text(this.label, this.pos.x, this.pos.y + 4);
}
Player.prototype.moveLeft = function () {
  this.pos.x -= this.speed;
  if (this.pos.x < 0 + this.size / 2) {
    this.pos.x = 0 + this.size / 2;
  }
}
Player.prototype.moveRight = function () {
  this.pos.x += this.speed;
  if (this.pos.x + this.size / 2 > width) {
    this.pos.x = width - this.size / 2;
  }
}
Player.prototype.moveUp = function () {
  this.pos.y -= this.speed;
  if (this.pos.y < this.size / 2) {
    this.pos.y = 0 + this.size / 2;
  }
}
Player.prototype.moveDown = function () {
  this.pos.y += this.speed;
  if (this.pos.y + this.size / 2 > height) {
    this.pos.y = height - this.size / 2;
  }
}
Player.prototype.enLarge = function (size) {
  eatSound.play();
  
  score += floor(size / 10);
  this.size += floor(size / 10);
  this.label = this.size.toString();
  
  if (this.size > 30) {
    gameState = WIN;
  }  
}
Player.prototype.die = function () {
  gameState = END;
  dieSound.play();
}

function Enemy() {
  // this.pos = pos;
  this.init();
}
Enemy.prototype = new Cell();
Enemy.prototype.constructor = Enemy;
Enemy.prototype.init = function () {
  var pos = createVector(random(0, width), random(0, height));
  while (dist(pos.x, pos.y, player.pos.x, player.pos.y) < player.size + 10) {
    pos = createVector(random(0, width), random(0, height));
  }
  this.pos = pos;
  this.size = floor(random(15, 28));
  this.label = this.size.toString();
  this.speedX = random(0.5, 2) * (random() < 0.5 ? -1 : 1);
  this.speedY = random(0.5, 2) * (random() < 0.5 ? -1 : 1);
  this.color = random(0, 10) < 6 ? enemyColor :
               random(0, 10) < 7 ? slowColor : badColor;
}
Enemy.prototype.render = function () {
  noStroke();
  fill(this.color);
  ellipse(this.pos.x, this.pos.y, this.size, this.size);
  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  text(this.label, this.pos.x, this.pos.y);
}
Enemy.prototype.update = function () {
  this.detect();
  this.pos.x += this.speedX;
  this.pos.y += this.speedY;

  // Edge detect
  if (this.pos.x < 0 || this.pos.x > width) {
    this.speedX *= -1;
  }
  if (this.pos.y < 0 || this.pos.y > height) {
    this.speedY *= -1;
  }

  // TODO: Intelligent path choosing
}
Enemy.prototype.detect = function () {
  if (dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < this.size / 2 + player.size / 2) {
    if (this.color == badColor || this.size >= player.size) {
      player.die();
      this.init();
    } else if (this.color == slowColor) {
      slowTime = millis();
      player.speed = ceil(player.speed/2);
      // player.speed = 1;
      player.enLarge(this.size);
      this.init();
    } else {
      player.enLarge(this.size);
      this.init();
    }
  }
}
 