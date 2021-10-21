//I was inspired by a YouTube tutorial that I found while trying to learn more
//about jumping and gravity: https://www.youtube.com/watch?v=bG2BmmYr9NQ

//Retrieves canvas attributes from html file
var canvas = document.getElementById("canv");
var c = canvas.getContext("2d");
//Creates Player(white rectangle)
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 80;
        this.ySpeed = 3;
        this.xSpeed = 0;
    }
    show() {
        c.fillStyle = 'white';
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    update() {

        this.y += this.ySpeed;
        this.ySpeed += gravity;

        if (this.y >= 750-80) {
            this.ySpeed = 0;
            canJump = true;
        } else {
            canJump = false;
        }
    }
}
//Creates assignments(small black squares)
class Hw {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 40;
    }
    show() {
        c.fillStyle = 'black';
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    //If the player and an assignment collide, a message box will pop up saying the player has failed.
    update() {
        if (this.x < p.x + p.w && this.x + this.w > p.x && this.y < p.y + p.h && this.y + this.h > p.y) {
            window.alert('YOU HAVE FAILED TO MEET YOUR DEADLINES');
        }
    }
}
//creates gravity for player's jumping effect
var p;
var gravity = 0.1

var canJump = true;

var hws = [];

var hwX = 800;

var hwY = 800;

var score = 0;
//Fires up the functions that start the game once it is done loading
window.onload = function() {
    start();
    setInterval(update, 10);
}
//Starts game. Player's initial position is 100,400.
//Speed of assignments increases incrementally until it reaches 100.
//assignments are randomly generated accross the x axis.
function start() {
    p = new Player(100, 400);

    for (let i = 0; i < 100; i++) {
        var r = new Hw(hwX, 710);
        var r = new Hw(hwY, 710);
        hws.push(r);
        hwX += Math.floor(Math.random() * 500) + 300;
        hwY += Math.floor(Math.random() * 500) + 300;
    }

    p.xSpeed = 3.5;
}

function update() {
    canvas.width=canvas.width;
    //Creates ground
    c.fillStyle = 'lightgreen';
    c.fillRect(0, 750, 800, 100);
    //Displays player
    p.show();
    p.update();
    for (let i = 0; i < hws.length; i++) {
        hws[i].show();
        hws[i].update();
        hws[i].x -= p.xSpeed;
        hws[i].y = Math.floor(Math.random() * 50) + 680;
    }
    //Shows player's score
    document.getElementById("showScore").innerHTML = "Score: " + score;
}

function changeSpeed() {
    p.xSpeed += 0.1;
}
//increases score as the  game progresses
function increaseScore() {
    score++;
}

setInterval(changeSpeed, 500);
setInterval(increaseScore, 500);
//Sets the space bar as the key used to jump
function keyDown(e) {
    if (e.keyCode === 32 && canJump) {
        p.ySpeed = -4;
    }
}

document.onkeydown = keyDown;
