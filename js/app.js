// Enemies our player must avoid
//TODO: reset game after player gets to river in handleInput().
//TODO: handle collision inside handleInput().

const stepY = 85.5;
const stepX = 101;

const cvsWidth = 505;
const cvsHeight = 606;

const spriteWidth = stepX;
const spriteHeight = stepY;


var Enemy = function(speed,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = -101;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    Enemy.call(this,0,0);

    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 390;
}

Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(dt){

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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

     checkCollisions(player,this);
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
var enemiesLocations = new Array(48, 133.5, 219);



setInterval(function(){
    var l = Math.random() * 100;
    l = Math.floor(l % 4);

    var s = Math.random() * 100;
    s = Math.ceil(s % 3);

    allEnemies.push(new Enemy(s, enemiesLocations[l]));
},500);

function checkCollisions(body1,body2){
    if(body1.x < body2.x + spriteWidth &&
        body1.x + spriteWidth > body2.x &&
        body1.y < body2.y + spriteHeight &&
        body1.y + spriteHeight > body2.y){
            reset();

    }
}

function reset() {
    player.x = 202;
    player.y = 390;
}
