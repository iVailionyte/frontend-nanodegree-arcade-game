const TILE_WIDTH = 101;
const TILE_HEIGHT = 83;
const GAME_WIDTH = 505;
const GAME_HEIGHT = 606;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x += this.speed;

  if (this.x > GAME_WIDTH) {
    this.x = 0 - TILE_WIDTH;
  }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
const Player = function() {
  this.x = GAME_WIDTH / 2 - TILE_WIDTH / 2;
  this.y = GAME_HEIGHT;
  this.sprite = 'images/char-boy.png';
};

// This class requires an update(), render() and

Player.prototype.update = function(dt) {
  if (this.x < 0) {
    this.x = 0;
  }

  if (this.y < 0) {
    this.y = 0;
  }

  if (this.x + TILE_WIDTH > GAME_WIDTH) {
    this.x = GAME_WIDTH - TILE_WIDTH;
  }

  if (this.y + TILE_HEIGHT + TILE_HEIGHT > GAME_HEIGHT) {
    this.y = GAME_HEIGHT - TILE_HEIGHT - TILE_HEIGHT;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method.

Player.prototype.handleInput = function(key) {
  switch(key) {
    case 'up': 
      this.y -= TILE_HEIGHT;
      break;

    case 'down':
      this.y += TILE_HEIGHT;
      break;

    case 'left':
      this.x -= TILE_WIDTH;
      break;

    case 'right':
      this.x += TILE_WIDTH;
      break;
  }
};


// Now instantiate your objects.



// Place all enemy objects in an array called allEnemies
const allEnemies = [];

for (let i = 0; i < 3; i++) {
  allEnemies.push(new Enemy(randomNumber(0, GAME_WIDTH), (1 + i) * TILE_HEIGHT, randomNumber(1, 3)));
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Place the player object in a variable called player

const player = new Player();


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
