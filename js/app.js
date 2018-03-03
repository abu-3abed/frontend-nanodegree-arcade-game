// Enemies our player must avoid
// TODO: adjust stepY and stepX to correct measures.
// TODO: check size of images after cropping.
const stepY = 85.5;
const stepX = 101;

const cvsWidth = 505;
const cvsHeight = 606;






var Enemy = function(speed,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = -101;
    this.y = y;

    this.height = 171;
    this.width = 101;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    ctx.drawImage(Resources.get(this.sprite),0,72,101,85,this.x,this.y,101,85);
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    Enemy.call(this,0,0);

    this.sprite = 'images/char-boy.png';
    this.x = 218;
    this.y = 380;

    this.height = 171;
    this.width = 101;
}

Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(dt){

}

Player.prototype.render = function() {
    //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    //ctx.drawImage(Resources.get(this.sprite),0,0,this.width,this.height,17,59,68,91);
    ctx.drawImage(Resources.get(this.sprite),17,59,68,91,this.x,this.y,68,91);
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(button) {
    switch (button) {
        case 'up':
            if(player.y < stepY){
                reset();
                break;
            }
            player.y -= stepY;
            break;
        case 'right':
            if((player.x + stepX) >= cvsWidth)
                break;
            player.x += stepX;
            break;
        case 'down':
            if(player.y >= 390)
                break;
            player.y += stepY;
            break;
        case 'left':
            if(player.x < stepX)
                break;
            player.x -= stepX
            break;    
        default:

            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var player = new Player();

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // console.log(dt);
     this.x += this.speed * 100 * dt;

     //checkCollisions(player,this);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var allEnemies = new Array();
var enemiesLocations = new Array(133.5, 219, 304.5);



setInterval(function(){
    var l = Math.random() * 100;
    l = Math.floor(l % 4);

    var s = Math.random() * 100;
    s = Math.ceil(s % 3);

    allEnemies.push(new Enemy(s, enemiesLocations[l]));
},500);

function checkCollisions(body1,body2){
    if(body1.x < body2.x + body2.width &&
        body1.x + body1.width > body2.x &&
        body1.y < body2.y + body2.height &&
        body1.y + body1.height > body2.y){
            reset();

    }
}

function reset() {
    player.x = 202;
    player.y = 390;
}
