/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	document.addEventListener("DOMContentLoaded", () => {
	  let canvas = document.getElementById('court');
	  let ctx = canvas.getContext("2d");
	  const game = new Game(ctx);
	  game.draw();
	  game.step();
	  initiateKeyBindings(game);
	});
	
	function initiateKeyBindings(game) {
	  key('left', () => game.accel(1, 'left'));
	  key('up', () => game.accel(1, 'up'));
	  key('down', () => game.accel(1, 'down'));
	  key('right', () => game.accel(1, 'right'));
	
	  key('.', () => game.switchPlayers(1));
	
	
	  key('a', () => game.accel(2, 'left'));
	  key('w', () => game.accel(2, 'up'));
	  key('s', () => game.accel(2, 'down'));
	  key('d', () => game.accel(2, 'right'));
	
	  key('t', () => game.switchPlayers(2));
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Team = __webpack_require__(2);
	const Ball = __webpack_require__(6);
	class Game {
	  constructor(ctx) {
	    const team1color = '#40E0D0';
	    const team2color = '#93ba5c';
	    this.ctx = ctx;
	    this.team1 = new Team(this, team1color, true);
	    this.team2 = new Team(this, team2color, false)
	    this.ball = new Ball(this, this.team1);
	    this.players = this.team1.team.concat(this.team2.team);
	  }
	
	  draw() {
	    createCourt(this.ctx);
	    this.team1.draw(this.ctx);
	    this.team2.draw(this.ctx);
	    this.ball.draw(this.ctx);
	  }
	
	  accel(teamNum, key) {
	    if (teamNum === 1) {
	      let pos = this.team1.accel(key);
	    } else {
	      let pos = this.team2.accel(key);
	    }
	  }
	  switchPlayers(team) {
	    if (team === 1) {
	      this.team1.switchPlayers();
	    } else {
	      this.team2.switchPlayers();
	    }
	  }
	  move() {
	    this.players.forEach(player => {
	      player.move();
	    });
	    this.ball.move();
	  }
	
	  reduceVel() {
	    this.team1.reduceVel();
	    this.team2.reduceVel();
	    this.ball.reduceVel();
	  }
	
	  checkCollisions() {
	    this.players.forEach(player => {
	      if (player.checkCollision(this.ball.pos)) {
	        this.ball.collision(player.vel);
	      }
	    });
	  }
	
	  resetPieces() {
	    this.team1.resetPlayers();
	    this.team2.resetPlayers();
	    this.ball.resetBall();
	  }
	
	  scored(team) {
	    this.resetPieces();
	    if (team === 1) {
	      this.team1.score();
	    } else {
	      this.team2.score();
	    }
	  }
	
	  step() {
	    setInterval(() => {
	      this.move();
	      this.checkCollisions();
	      this.draw();
	      this.reduceVel();
	    }, 10)
	  }
	}
	
	function createCourt(ctx) {
	  ctx.clearRect(0, 0, 1000, 600);
	  ctx.beginPath();
	
	  ctx.fillStyle = "#00aa00";
	  ctx.fillRect(0, 0, 1000, 600)
	  // creates outline of court
	  ctx.moveTo(0, 0);
	  ctx.lineTo(0, 600);
	  ctx.lineTo(1000, 600);
	  ctx.lineTo(1000, 0);
	  ctx.lineTo(0, 0);
	  ctx.stroke();
	  ctx.closePath();
	
	  // creates one side of court
	  // hoop
	  ctx.beginPath();
	  ctx.moveTo(0, 100);
	  ctx.lineTo(200, 100);
	  ctx.lineTo(200, 500);
	  ctx.lineTo(0, 500);
	  ctx.lineTo(0, 200);
	  ctx.lineTo(100, 200);
	  ctx.lineTo(100, 400);
	  ctx.lineTo(0, 400);
	  ctx.lineTo(0, 250);
	  ctx.lineTo(5, 250);
	  ctx.lineTo(5, 350);
	  ctx.lineTo(0, 350);
	  ctx.stroke();
	  ctx.closePath();
	
	  ctx.beginPath();
	  ctx.moveTo(500, 0);
	  ctx.lineTo(500, 600);
	  ctx.moveTo(500, 300);
	  ctx.stroke();
	  ctx.closePath();
	  ctx.beginPath();
	  ctx.arc(500, 300, 100, 0, 2 * Math.PI);
	  ctx.stroke();
	  ctx.closePath();
	
	  ctx.beginPath();
	  ctx.moveTo(1000, 100);
	  ctx.lineTo(800, 100);
	  ctx.lineTo(800, 500);
	  ctx.lineTo(1000, 500);
	  ctx.lineTo(1000, 200);
	  ctx.lineTo(900, 200);
	  ctx.lineTo(900, 400);
	  ctx.lineTo(1000, 400);
	  ctx.lineTo(1000, 250);
	  ctx.lineTo(995, 250);
	  ctx.lineTo(995, 350);
	  ctx.lineTo(1000, 350);
	  ctx.stroke();
	  ctx.closePath();
	
	}
	
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Player = __webpack_require__(3);
	class Team {
	  constructor(game, color, side) {
	    const p1 = new Player(color, game, 0, side);
	    const p2 = new Player(color, game, 1, side);
	    this.score = 0;
	    this.currentPlayer = 0;
	    this.team = [p1, p2]
	  }
	
	  score() {
	    this.score += 1;
	  }
	  draw(ctx) {
	    this.team.forEach(player => {
	      player.draw(ctx);
	    })
	  }
	
	  resetPlayers() {
	    this.team.forEach(player => {
	      player.resetPlayer();
	    })
	  }
	
	  switchPlayers() {
	    if (this.currentPlayer === 0) {
	      this.currentPlayer = 1;
	    } else {
	      this.currentPlayer = 0;
	    }
	  }
	
	  shoot() {
	    let player = this.team[this.currentPlayer];
	    let x = player.pos[0];
	    let y = player.pos[1];
	    console.log(x, y);
	    let distX = Math.abs(x - 375);
	    let distY = Math.abs(y - 10);
	    let dist = Math.sqrt((distX * distX) + (distY * distY));
	    if (dist > 325) {
	      console.log("FROM DOWNTOWN");
	    } else if (dist > 180) {
	      console.log("MIDRANGE");
	    } else {
	      console.log("LAYUP");
	    }
	  }
	
	  reduceVel() {
	    this.team.forEach(player => {
	      player.reduceVel();
	    })
	  }
	
	  accel(key) {
	    let player = this.team[this.currentPlayer];
	    player.changeVel(key);
	    return player.pos;
	  }
	  move() {
	    this.team.forEach(player => {
	      player.move();
	    });
	  }
	}
	
	
	module.exports = Team;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	class Player extends MovingObject {
	  constructor(color, game, p, side) {
	    const RADIUS = 25;
	    const randX = Math.floor(Math.random() * 902.4 + 10);
	    const randY = Math.floor(Math.random() * 480 + 10);
	
	    let POS;
	    if (side) {
	      if (p === 0) {
	        POS = [400, 200];
	      } else {
	        POS = [400, 400];
	      }
	    } else {
	      if (p === 0) {
	        POS = [600, 200];
	      } else {
	        POS = [600, 400];
	      }
	    }
	    const COLOR = color;
	    const options = {
	      radius: RADIUS,
	      color: COLOR,
	      pos: POS,
	      vel: [0, 0],
	      game: game
	    };
	    super(options);
	    this.initPos = POS.slice(0, 2);
	  }
	
	  resetPlayer() {
	    this.pos = this.initPos;
	    this.vel = [0, 0];
	  }
	
	  changeVel(key) {
	    switch(key) {
	      case 'up':
	        this.vel[1] -= 6;
	        break;
	      case 'down':
	        this.vel[1] += 6;
	        break;
	      case 'left':
	        this.vel[0] -= 6;
	        break;
	      case 'right':
	        this.vel[0] += 6;
	        break;
	    }
	  }
	
	  checkCollision(pos) {
	    let playX = this.pos[0];
	    let playY = this.pos[1];
	    let maxX = playX + 25;
	    let minX = playX - 25;
	    let maxY = playY + 25;
	    let minY = playY - 25;
	    if ((pos[0] < minX) || (pos[0] > maxX) || (pos[1] < minY) || (pos[1] > maxY)) {
	      return false;
	    } else {
	      return true;
	    }
	  }
	
	  reduceVel() {
	    let x = this.vel[0];
	    let y = this.vel[1];
	    this.vel = [x / 1.1, y / 1.1];
	    if ((Math.abs(this.vel[0]) < 0.5) && (Math.abs(this.vel[1]) < 0.5)) {
	      this.vel = [0, 0]
	    }
	  }
	}
	
	module.exports = Player;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(5);
	class MovingObject {
	  constructor(options) {
	    this.pos = options.pos;
	    this.vel = options.vel;
	    this.radius = options.radius;
	    this.color = options.color;
	    this.game = options.game;
	  }
	
	  draw(ctx) {
	    ctx.beginPath();
	    ctx.fillStyle = this.color;
	    ctx.arc(
	      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI
	    );
	    ctx.fill();
	    ctx.closePath();
	    Util.sleep(20);
	  }
	
	  move() {
	    this.pos[0] += this.vel[0];
	    this.pos[1] += this.vel[1];
	    if ((this.pos[0] < 0) || (this.pos[0] > 1000)) {
	      this.vel = [-this.vel[0], this.vel[1]];
	    } else if ((this.pos[1] < 0) || (this.pos[1] > 600)) {
	      this.vel = [this.vel[0], -this.vel[1]];
	    }
	  }
	
	}
	
	
	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports) {

	const Util = {
	  direction (pos) {
	    var norm = Util.norm(pos);
	    return Util.scale(pos, 1 / norm);
	  },
	  // Find distance between two points.
	  distance (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	  // Find the length of the vector.
	  normal (vec) {
	    return Util.dist([0, 0], vec);
	  },
	  // Return a randomly oriented vector with the given length.
	  randomVector (length) {
	    var deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  // Scale the length of a vector by the given amount.
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },
	
	  wrap (coord, max) {
	    if (coord < 0) {
	      return max - (coord % max);
	    } else if (coord > max) {
	      return coord % max;
	    } else {
	      return coord;
	    }
	  },
	  sleep (milliseconds) {
	    let start = new Date().getTime();
	    for (let i = 0; i < 1e7; i++) {
	      if ((new Date().getTime() - start) > milliseconds){
	        break;
	      }
	    }
	  }
	};
	
	module.exports = Util;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(5);
	class Ball extends MovingObject {
	  constructor(game, team) {
	    const RADIUS = 10;
	    const COLOR = '#938832';
	    const POS = [500, 300];
	    const VEL = [0, 0];
	    const options = {
	      radius: RADIUS,
	      color: COLOR,
	      pos: POS,
	      game,
	      vel: VEL
	    };
	    super(options);
	  }
	
	  resetBall() {
	    this.pos = [500, 300];
	    this.vel = [0, 0];
	  }
	
	  reduceVel() {
	    this.vel = [this.vel[0] / 1.03, this.vel[1] / 1.03];
	  }
	
	  collision(vel) {
	    this.vel[0] += vel[0];
	    this.vel[1] += vel[1];
	  }
	  move () {
	    this.pos[0] += this.vel[0];
	    this.pos[1] += this.vel[1];
	    if ((this.pos[0] < 0) || (this.pos[0] > 1000)) {
	      if ((this.pos[1] > 250) && (this.pos[1] < 350)) {
	        if (this.pos[0] < 500) {
	          alert('TEAM 2 SCORED');
	          this.game.scored(2);
	        } else {
	          alert('TEAM 1 SCORED')
	          this.game.scored(1);
	        }
	      } else {
	        this.vel = [-this.vel[0], this.vel[1]];
	      }
	    } else if ((this.pos[1] < 0) || (this.pos[1] > 600)) {
	      this.vel = [this.vel[0], -this.vel[1]];
	    }
	  }
	
	}
	
	module.exports = Ball;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map