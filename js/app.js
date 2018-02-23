// Enemies our player must avoid
//TODO: enemies initial locations.
//TODO: Canvas videos.
//TODO: add multiple enemies.
//TODO: reset game after player gets to river in handleInput().
//TODO: handle collision inside handleInput().

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
    this.x = 0;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

};

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

Player.prototype.handleInput = function(button) {
    switch (button) {
        case 'up':
            if(player.y < stepY)
                break;
            player.y -= stepY;
            break;
        case 'right':
            if((player.x + stepX) > cvsWidth)
                break;
            player.x += stepX;
            break;
        case 'down':
            if((player.y + stepY) > cvsHeight)
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

var allEnemies = new Array(new Enemy(20));
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
