/**
 * 
 */

var raw;
var date = [];
var hour = [];
var time = [];
var units = [];
var month = 'April';
var barChart;
var count; // Increase by time

function preload() {
  raw = loadTable('assets/data.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1000, 600);
  background(123);
  print(raw.getRowCount());
  print(raw.getColumnCount());

  for (var r = 0; r < raw.getRowCount(); r++) {
    date[r] = raw.getNum(r, 'date');
    hour[r] = raw.getNum(r, 'hour');
    time[r] = raw.getNum(r, 'time');
    // Debug
    // print(date[r] + ', ' + hour[r] + ', ' + time[r]);
    units[r] = hour[r];
  }

  var title = new Title('Hourly time that I use my cellphone from 4-27 to 4-29',  createVector(width/2, 60));
  var axisX = new AxisX(800, createVector(50, 500), units);
  var axisY = new AxisY(480, createVector(50, 500), 0, 60);
  barChart = new Chart('Bar', title, axisX, axisY, time, units);
  
  // barChart.render();
}

function draw() {
  background(127);
  smooth();
  count = millis() / 1000;
  barChart.render(count);
}

function Chart(type, title, axisX, axisY, data, units) {
  this.type = type || 'Bar';
  this.title = title;
  this.axisX = axisX;
  this.axisY = axisY;
  this.data = data;
  this.units = units;

  this.render = function (count) {
    
    this.axisX.render();
    this.axisY.render();
    
    count = min(count, data.length);
    
    for (var i = 0; i < count; i++) {
      var barHeight = map(data[i], 0, 60, 0, this.axisY.getScale()*60);
      var xPos = this.axisX.pos.x+this.axisX.getFirstPos()+this.axisX.getScale()*i;
      rectMode(CORNERS);
      if (data[i] > 0 && data[i] < 20) {
        fill('blue');
      } else if (data[i] >= 20 && data[i] < 40) {
        fill('yellow');
      } else {
        fill('red');
      }
      rect(xPos, this.axisX.pos.y,
        xPos+this.axisX.getBarWitdh(), this.axisX.pos.y-barHeight);
    }
    this.title.render();
  }
}

function Title(content, pos) {
  this.content = content;
  this.pos = pos;

  this.render = function () {
    fill(0);
    textAlign(CENTER);
    textFont('Arial');
    textSize(24);
    text(content, this.pos.x, this.pos.y);
  }
}

function AxisX(length, pos, units) {
  // this.dimension = dimension;
  this.length = length;
  this.pos = pos;
  this.units = units;

  this.getLength = function () {
    return this.length;
  }

  this.getPos = function () {
    return this.Pos;
  }

  this.getCount = function () {
    return this.units.length;
  }

  this.getScale = function () {
    var count = this.getCount();
    var scale = this.length * 0.95 / count;
    return scale;
  }

  this.getFirstPos = function () {
    return this.getScale() * 0.2;
  }

  this.getBarWitdh = function () {
    return this.getScale() * 0.7;
  }

  this.render = function () {
    // strokeWeight(4);
    stroke(175);
    // line(100, 600, 700, 600);
    line(this.pos.x, this.pos.y, this.pos.x + this.length, this.pos.y);

    textAlign(CENTER, TOP);
    textSize(6);
    for (var i = 0; i < this.units.length; i++) {
      text(this.units[i], this.pos.x+i * this.getScale(), this.pos.y + 4);
    }
    text(this.units[this.units.length-1]+1, this.pos.x+this.units.length*this.getScale(),this.pos.y + 4);
  }
}

function AxisY(length, pos, min, max) {
  this.length = length;
  this.pos = pos;
  this.min = min;
  this.max = max;

  this.getLength = function () {
    return this.length;
  }

  this.getPos = function () {
    return this.pos;
  }

  this.getMin = function () {
    return this.min;
  }

  this.getMax = function () {
    return this.max;
  }

  this.getRange = function () {
    return this.max - this.min;
  }

  this.getScale = function () {
    // Use 90% of axis to measure the whole value range
    return 0.9 * this.length / this.getRange();
  }

  this.render = function () {
    stroke(175);
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y - this.length);

    var scale = this.getScale();
    // render measures
    textSize(9);
    textAlign(RIGHT, CENTER);
    for (var i = 0; i <= this.getRange(); i += 5) {
      var yPos = this.pos.y - this.getScale() * i;
      if (i % 10 == 0) {
        line(this.pos.x, yPos, this.pos.x - 6, yPos);
        text(i, this.pos.x - 8, yPos)
      } else {
        line(this.pos.x, yPos, this.pos.x - 4, yPos);
      }

    }
  }
}