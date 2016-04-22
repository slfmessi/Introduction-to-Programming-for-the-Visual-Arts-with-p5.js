/**
 * Author: Sun Lifei
 * Date: 2016.4.14
 *
 * This story is adapted from The Elser Scroll: Skyrim.
 * Usuall, you use mouse to show next step. But in some steps,
 * you need to type sth. Read the code for more information.
 */

var KILL_OR_NOT = 0x01;
var KEEP_OR_NOT = 0x02;
var FETCH_OR_NOT = 0x04;

var state = 0;
var choice = 0;
var typed = '';

// Variables to store images and sounds
var whiterun;
var chicken;
var kill_chicken;
var villagers;
var dragonsreach;
var lydia;
var with_lydia;
var golden_claw;
var rescue;
var winterhold;
var wordwall;
var marriage;
var mage;
var hero;
var alduin;
var dragonshout;

var imageX = 200;
var imageY = 100;
var imageW = 400;
var imageH = 300;

var textX = 200;
var textY = 450;
var textW = 400;
var textH = 100;

function preload() {
  whiterun = loadImage('assets/Whiterun.jpg');
  chicken = loadImage('assets/chick.jpg');
  kill_chicken = loadImage('assets/kill_chicken.jpg');
  villagers = loadImage('assets/villagers.jpg');
  dragonsreach = loadImage('assets/Dragonsreach.jpg');
  lydia = loadImage('assets/Lydia.jpg');
  with_lydia = loadImage('assets/with_lydia.jpg');
  golden_claw = loadImage('assets/GoldenClaw.png');
  rescue = loadImage('assets/Rescued.jpg');
  winterhold = loadImage('assets/Winterhold.jpg');
  wordwall = loadImage('assets/Dragonaspectshoutword.jpg');
  marriage = loadImage('assets/Marriage.jpg');
  mage = loadImage('assets/Tolfdir.jpg');
  hero = loadImage('assets/hero.jpg');
  alduin = loadImage('assets/Alduin.jpg');

  dragonshout = loadSound('assets/UnrelentingForce.ogg');
}

function setup() {
  createCanvas(800, 600);
  textFont('Consolas');
  textSize(20);
  // No loop
  // Use redraw() to call draw()
  noLoop();
}

function draw() {
  background(255);
  background(234, 234);

  fill(0);
  stroke(0);
  switch (state) {
    case WHITERUN: // 0
      image(whiterun, imageX, imageY, imageW, imageH);
      text(STR_0, textX, textY, textW, textH);

      // Reset all the flags
      state = 0;
      choice = 0;
      typed = '';
      break;
    case MEET_CHICKEN: // 1
      image(chicken, imageX, imageY, imageW, imageH);
      text(STR_1, textX, textY, textW, textH);
      break;
    case KILL_CHICKEN: // 2
      image(kill_chicken, imageX, imageY, imageW, imageH);
      text(STR_2, textX, textY, textW, textH);
      break;
    case KILLED_BY_VILLAGERS: // 3
      image(villagers, imageX, imageY, imageW, imageH);
      text(STR_3, textX, textY, textW, textH);
      break;
    case DRAGONSREACH: // 4
      image(dragonsreach, imageX, imageY, imageW, imageH);
      text(STR_4, textX, textY, textW, textH);
      break;
    case MEET_LYDIA: // 5
      image(lydia, imageX, imageY, imageW, imageH);
      text(STR_5, textX, textY, textW, textH);
      break;
    case WITH_LYDIA: // 6
      image(with_lydia, imageX, imageY, imageW, imageH);
      text(STR_6, textX, textY, textW, textH);
      break;
    case REJECT_LYDIA: // 7
      image(lydia, imageX, imageY, imageW, imageH);
      text(STR_7, textX, textY, textW, textH);
      break;
    case GOLDEN_CLAW: // 8
      image(golden_claw, imageX, imageY, imageW, imageH);
      text(STR_8, textX, textY, textW, textH);
      break;
    case RESCUED: // 9
      image(rescue, imageX, imageY, imageW, imageH);
      text(STR_9, textX, textY, textW, textH);
      break;
    case WINTERHOLD: // 10
      image(winterhold, imageX, imageY, imageW, imageH);
      text(STR_10, textX, textY, textW, textH);
      break;
    case DRAGON_SHOUT: // 11
      image(wordwall, imageX, imageY, imageW, imageH);
      text(STR_11, textX, textY, textW, textH);
      dragonshout.play();
      break;
    case FALL_IN_LOVE: // 12
      image(marriage, imageX, imageY, imageW, imageH);
      text(STR_12, textX, textY, textW, textH);
      break;
    case ELDERRLY_MAGE: // 13
      image(mage, imageX, imageY, imageW, imageH);
      text(STR_13, textX, textY, textW, textH);
      break;
    case BE_HERO: // 14
      image(hero, imageX, imageY, imageW, imageH);
      text(STR_14, textX, textY, textW, textH);
      break;
    case KILLED_BY_DRAGON: // 15
      image(alduin, imageX, imageY, imageW, imageH);
      text(STR_15, textX, textY, textW, textH);
      break;
    default:
      break;
  }

  // Draw input
  fill(255, 234);
  stroke(255, 204, 100);
  rect(600, 500, 180, 40);
  fill(0);
  stroke(0);
  text(typed, 610, 510, 100, 40);
}

function mousePressed() {
  switch (state) {
    case WHITERUN: // 0
      state = MEET_CHICKEN;
      break;
    case MEET_CHICKEN: // 1
      break;
    case KILL_CHICKEN: // 2
      state = KILLED_BY_VILLAGERS;
      break;
    case KILLED_BY_VILLAGERS: // 3
      state = WHITERUN;
      break;
    case DRAGONSREACH: // 4
      state = MEET_LYDIA;
      break;
    case MEET_LYDIA: // 5
      break;
    case WITH_LYDIA: // 6
      state = GOLDEN_CLAW;
      break;
    case REJECT_LYDIA: // 7
      state = GOLDEN_CLAW;
      break;
    case GOLDEN_CLAW: // 8
      break;
    case RESCUED: // 9
      state = FALL_IN_LOVE;
      break;
    case WINTERHOLD: // 10
      if (choice & KEEP_OR_NOT) {
        state = ELDERRLY_MAGE;
      } else {
        state = KILLED_BY_DRAGON;
      }
      break;
    case DRAGON_SHOUT: // 11
      state = BE_HERO;
      break;
    case FALL_IN_LOVE: // 12
      state = WHITERUN;
      break;
    case ELDERRLY_MAGE: // 13
      state = WHITERUN;
      break;
    case BE_HERO: // 14
      state = WHITERUN;
      break;
    case KILLED_BY_DRAGON: // 15
      state = WHITERUN;
      break;
    default:
      break;
  }
  redraw();
}

function keyTyped() {
  if (typed.length < 12 && keyCode != BACKSPACE && keyCode != ENTER) {
    typed += key;
  }
  redraw();
}

function keyPressed() {
  if (keyCode == BACKSPACE) {
    typed = '';
  }
  if (keyCode == ENTER) {
    checkInput();
  }
  redraw();
}

function checkInput() {
  switch (state) {
    case MEET_CHICKEN:
      if (typed == 'kill') {
        state = KILL_CHICKEN;
        choice |= KILL_OR_NOT;
      } else if (typed != '') {
        state = DRAGONSREACH;
      }
      break;
    case MEET_LYDIA:
      if (typed == 'keep') {
        state = WITH_LYDIA;
        choice |= KEEP_OR_NOT;
      } else if (typed != '') {
        state = REJECT_LYDIA;
      }
      break;
    case GOLDEN_CLAW:
      if (typed == 'fetch') {
        if (choice & KEEP_OR_NOT) {
          state = RESCUED;
          choice |= FETCH_OR_NOT;
        } else {
          state = DRAGON_SHOUT;
        }
      } else if (typed != '') {
        state = WINTERHOLD;
      }
      break;
    default:
      break;
  }
  typed = '';
}