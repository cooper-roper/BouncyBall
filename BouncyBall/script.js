// Learn to code this at:

// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = 720;
canvas.height = 560;


var colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
];

var gravity = 0.1;
var friction = 0.5;
var active = false;
var ball;

// Event Listeners
addEventListener("mousemove", function(event) {
	if (active && ball.y + ball.radius + ball.dy <= canvas.height && ball.y - ball.radius + ball.dy >= 0 && ball.x + ball.radius + ball.dx <= canvas.width && ball.x - ball.radius + ball.dx >= 0){
		ball.dx = event.movementX / 5;
    	ball.dy = event.movementY / 5;
		ball.x = event.clientX - 7;
		ball.y = event.clientY - 7;
	}
});

addEventListener("mousedown", function(event) {
	if (event.clientX - 7 <= ball.x + ball.radius && event.clientX - 7 >= ball.x - ball.radius && event.clientY - 7 >= ball.y - ball.radius && event.clientY - 7 <= ball.y + ball.radius){
		active = true;
		ball.x = event.clientX - 7;
		ball.y = event.clientY - 7;
	}
});

addEventListener("mouseup", function(event) {
	active = false;
});

addEventListener("mouse", function(event) {
	active = true;
});


addEventListener("resize", function() {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;
  init();
});



function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
function Ball(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;

	this.update = function() {

		if (!active){
			if (this.y + this.radius + this.dy >= canvas.height || this.y - this.radius + this.dy <= 0) {
				this.dy = -this.dy;
				this.dy = this.dy * friction;
				this.dx = this.dx * friction;
			} else {
				this.dy += gravity;
			}
		}

		if (this.x + this.radius + this.dx >= canvas.width || this.x - this.radius + this.dx <= 0) {
			this.dx = -this.dx * friction;
		}

		if(this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0){
			this.x = canvas.width/ 2;
			this.y = canvas.height/ 2;
		}
		

		this.x += this.dx * !active;
		this.y += this.dy * !active;
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		c.stroke();
		c.closePath();
	};
}


function init() {
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	var dx = 0;
	var dy = 0;
	var r = 10;
	ball = new Ball(x, y, dx, dy, r, randomColor(colors));
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);

	c.clearRect(0, 0, canvas.width, canvas.height);

	ball.update();
	
}


init();
animate();