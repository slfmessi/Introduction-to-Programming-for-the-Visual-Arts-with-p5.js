/**
 * The point class.
 * @class
 */
function Point(x, y){
  this.x = x;
  this.y = y;
}

var weight = 8;

/**
 * Init the canvas.
 */
function setup() {
  createCanvas(1024, 768);
  background(255);
  strokeWeight(weight);

  var pTL = new Point(0, 0);
  var pTR = new Point(1024, 0);
  var pBL = new Point(0, 768);
  var pBR = new Point(1024, 768);
  
  // Top-left triangle.
  var p1 = new Point(82, 0);
  var p2 = new Point(0, 64);
  // Top-left poly.
  var p3 = new Point(300, 0);
  var p4 = new Point(0, 320);
  var p5 = new Point(330, 90);
  // Top-right triangle.
  var p6 = new Point(835, 0);
  var p7 = new Point(1024, 402);
  // Top-center triangle.
  var p8 = new Point(406, 0);
  // Bottom-Left triangle.
  var p9 = new Point(0, 655);
  var p10 = new Point(112, 768);
  // Central ellipse.
  var center = new Point(598, 488);
  // Central quadrilateral.
  var p11 = new Point(540, 196);
  var p12 = new Point(676, 224);
  var p13 = new Point(534, 768);
  var p14 = new Point(678, 768);
 

  var bc = color(198, 203, 182, 255);
  drawBackground(bc);

  var array1 = new Array(pTL, p1, p2);
  var c1 = color(100, 138, 105, 255);
  fill(array1, c1);
  
  var array2 = new Array(p2, p1, p3, p5, p4);
  var c2 = color(155, 145, 115, 255);
  fill(array2, c2);
  
  var array3 = new Array(p3, p8, p5);
  var c3 = c1;
  fill(array3, c3);
  
  var array4 = new Array(pTR, p6, p7);
  var c4 = color(137, 139, 110, 255);
  fill(array4, c4);
  
  var array5 = new Array(pBL, p9, p10);
  var c5 = color(160, 160, 130, 255);
  fill(array5, c5);
  
  var c6 = color(160, 145, 117, 255);
  ellipse(597, 486, 548, 596, c6);
  
  var c7 = color(105, 140, 110, 255);
  rect(542, 204, 133, 562, c7);
}

/**
 * I wanted to override the background method,
 * however it threw an error.
 * Just rename to drawBackground. 
 * @param  {Object} c - color of this shape
 */
p5.prototype.drawBackground = function(c) {
  for (var i = 0; i < width; i += weight / 2) {
    for (j = 0; j < height; j += weight / 2) {
      stroke(randomRGB(red(c), green(c), blue(c), alpha(c), 6));
      point(i, j);
    }
  }
}

/**
 * Override the rect() of p5.
 * 
 * @method rect
 * @param  {Number} x - x-coordinate of the rectangle.
 * @param  {Number} y - y-coordinate of the rectangle.
 * @param  {Number} w - width of the rectangle.
 * @param  {Number} h - height of the rectangle.
 * @param  {Object} c - color of this shape
 * @param  {Number} [tl] - optional radius of top-left corner.
 * @param  {Number} [tr] - optional radius of top-right corner.
 * @param  {Number} [br] - optional radius of bottom-right corner.
 * @param  {Number} [bl] - optional radius of bottom-left corner.
 */
p5.prototype.rect = function(x, y, w, h, c, tl, tr, br, bl) {
  for (var i = x; i < x + w; i += 2) {
    for (j = y; j < y + h; j += 2) {
      stroke(randomRGB(red(c), green(c), blue(c), alpha(c), 6));
      point(i, j);
    }
  }
}

/**
 * Override the ellipse() of p5.
 * 
 * @method ellipse
 * @param  {Number} x - x-coordinate of the ellipse.
 * @param  {Number} y - y-coordinate of the ellipse.
 * @param  {Number} w - width of the ellipse.
 * @param  {Number} h - height of the ellipse.
 * @param  {Object} c - color of this shape
 */
p5.prototype.ellipse = function(x, y, w, h, c) {
  translate(x, y);

  var angle = Math.atan2(y - (h / 2), x);
  var radiusX = w / 2;
  var radiusY = h / 2;

  while (radiusX >= 0 && radiusY >= 0) {
    var x = Math.sin(angle) * radiusX;
    var y = Math.cos(angle) * radiusY;

    stroke(randomRGB(red(c), green(c), blue(c), alpha(c), 6));
    point(x, y);

    radiusX -= 0.02;
    radiusY -= 0.02;
    angle += 2 * 0.01;
  }
  resetMatrix();
}

/**
 * Override fill() of p5 to draw a polygon.
 * @param  {Array} array - array of points
 * @param  {Object} c - the base color
 */
p5.prototype.fill = function(array, c) {
  var a = array.map(function(pair){
    return pair.y;
  })
  for(var i = 0; i < 1024; i += 2) {
    for(var j = 0; j < 768; j += 2) {
      if (a.indexOf(j) != -1)
        continue;
      if (checkPP({x: i, y: j}, array)) {
        stroke(randomRGB(red(c), green(c), blue(c), alpha(c), 6));
        point(i, j);
      }
    }
  }
}
/**
 * Override quad() of p5 to draw a polygon.
 * @param {Number} x1 - the x-coordinate of the first point
 * @param {Number} y1 - the y-coordinate of the first point
 * @param {Number} x2 - the x-coordinate of the second point
 * @param {Number} y2 - the y-coordinate of the second point
 * @param {Number} x3 - the x-coordinate of the third point
 * @param {Number} y3 - the y-coordinate of the third point
 * @param {Number} x4 - the x-coordinate of the fourth point
 * @param {Number} y4 - the y-coordinate of the fourth point
 * @param {Object} c - the base color
 */
p5.prototype.quad = function( x1, y1, x2, y2, x3, y3, x4, y4, c) {
  var width  = Math.max( Math.abs(x2 - x1), Math.abs(x3 - x4) );
  var height = Math.max( Math.abs(y4 - y1), Math.abs(y3 - y2) );

  for (var i = 0; i < width; i += 2) {
    var top    = lerp(y1, y2, i / width);
    var bottom = lerp(y4, y3, i / width);
    
    for (var j = 0; j < height; j += 2) {
      var left  = lerp(x1, x4, j / height);
      var right = lerp(x2, x3, j / height);

      var x = lerp(left, right, i / width);
      var y = lerp(top, bottom, j / height);
      stroke(randomRGB(red(c), green(c), blue(c), alpha(c), 6));
      point(x, y);
    }
  }
}
/**
 * Helper function to get a random color based on specfied rgb.
 * 
 * @param {number} baseR - Base red value
 * @param {number} baseG - Base green value
 * @param {number} baseB - Base blue value
 * @param {number} baseB - Base alpha value
 * @param {number} rgbRand - used to calulated min and max value
 * @returns {Object} A color object.
 */
var randomRGB = function(baseR, baseG, baseB, baseA, rgbRand) {
  var r = random((baseR - rgbRand > 0) ? (baseR - rgbRand) : 0,
                 (baseR + rgbRand > 255) ? 255: (baseR + rgbRand));
  var g = random((baseG - rgbRand > 0) ? (baseG - rgbRand) : 0, 
                 (baseG + rgbRand > 255) ? 255: (baseG + rgbRand));
  var b = random((baseB - rgbRand > 0) ? (baseB - rgbRand) : 0,
                 (baseB + rgbRand > 255) ? 255: (baseB + rgbRand));
  var a = random((baseA - rgbRand > 0) ? (baseA - rgbRand) : 0,
                 (baseA + rgbRand > 255) ? 255: (baseA + rgbRand));

  return color(r, g, b, a);
}

// Functions used to check if a point is in a poly.
var crossMul = function(v1, v2) {
  return v1.x * v2.y - v1.y * v2.x;
}

var checkCross = function(p1, p2, p3, p4) {
  var v1 = { x: p1.x - p3.x, y: p1.y - p3.y };
  var v2 = { x: p2.x - p3.x, y: p2.y - p3.y };
  var v3 = { x: p4.x - p3.x, y: p4.y - p3.y };

  v = crossMul(v1, v3) * crossMul(v2, v3);

  v1 = { x: p3.x - p1.x, y: p3.y - p1.y };
  v2 = { x: p4.x - p1.x, y: p4.y - p1.y };
  v3 = { x: p2.x - p1.x, y: p2.y - p1.y };

  return (v <= 0 && crossMul(v1, v3) * crossMul(v2, v3) <= 0) ? true : false;
}

var checkPP = function(point, polygon) {
  var l =polygon.length;
  var p1, p2, p3, p4;
  p1 = point;
  p2 = { x: -100, y: point.y };
  
  var count = 0;
  for (var i = 0; i < polygon.length; i++) {
    p3 = polygon[i % l];
    p4 = polygon[(i + 1) % l];
    if (checkCross(p1, p2, p3, p4) == true) {
      count++;
    }
  }

  return (count % 2 == 0) ? false : true;
}
