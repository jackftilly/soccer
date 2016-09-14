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
	    const team1color = '40E0D0';
	    const team2color = 'ffffff';
	    this.ctx = ctx;
	    this.team1 = new Team(this, team1color, true);
	    this.team2 = new Team(this, team2color, false)
	    this.ball = new Ball(this, this.team1);
	    this.players = this.team1.team.concat(this.team2.team);
	    this.updateScoreBoard();
	  }
	
	  updateScoreBoard() {
	    let team1score = document.getElementById('team1score');
	    team1score.innerHTML = this.team1.goals;
	
	    let team2score = document.getElementById('team2score');
	    team2score.innerHTML = this.team2.goals;
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
	    this.updateScoreBoard();
	  }
	
	  step() {
	    setInterval(() => {
	      this.move();
	      this.checkCollisions();
	      this.draw();
	      this.reduceVel();
	    }, 20)
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
	const Util = __webpack_require__(5);
	class Team {
	  constructor(game, color, side) {
	    const p1 = new Player(color, game, 0, side);
	    const p2 = new Player(color, game, 1, side);
	    const p3 = new Player(color, game, 2, side);
	    const p4 = new Player(color, game, 3, side);
	    const p5 = new Player(color, game, 4, side);
	    this.goals = 0;
	    this.color = color;
	    this.currentPlayer = 0;
	    this.team = [p1, p2, p3, p4, p5]
	    this.origColor = color;
	    this.team[0].color = this.activeColor();
	  }
	
	  score() {
	    this.goals += 1;
	  }
	  draw(ctx) {
	    this.team.forEach(player => {
	      player.draw(ctx);
	    })
	  }
	
	  resetPlayers() {
	    this.switchPlayers(0);
	    this.team.forEach(player => {
	      player.resetPlayer();
	    })
	  }
	
	  switchPlayers(playNum) {
	    if (playNum !== undefined) {
	      this.team[this.currentPlayer].color = this.origColor;
	      this.currentPlayer = playNum;
	      this.team[0].color = this.activeColor();
	    } else {
	      if (this.currentPlayer === 0) {
	        this.currentPlayer = 1;
	        this.team[0].color = this.origColor;
	        this.team[1].color = this.activeColor();
	      } else if (this.currentPlayer === 1) {
	        this.currentPlayer = 2;
	        this.team[1].color = this.origColor;
	        this.team[2].color = this.activeColor();
	      } else if (this.currentPlayer === 2) {
	        this.currentPlayer = 3;
	        this.team[2].color = this.origColor;
	        this.team[3].color = this.activeColor();
	      } else if (this.currentPlayer === 3) {
	        this.currentPlayer = 4;
	        this.team[3].color = this.origColor;
	        this.team[4].color = this.activeColor();
	      } else {
	        this.currentPlayer = 0;
	        this.team[4].color = this.origColor;
	        this.team[0].color = this.activeColor();
	      }
	    }
	  }
	
	  shoot() {
	    let player = this.team[this.currentPlayer];
	    let x = player.pos[0];
	    let y = player.pos[1];
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
	
	  activeColor() {
	    let color = Util.addHexColor(this.color, 'ffffff');
	    return color;
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
	    const RADIUS = 15;
	    const randX = Math.floor(Math.random() * 902.4 + 10);
	    const randY = Math.floor(Math.random() * 480 + 10);
	
	    let POS;
	    if (side) {
	      if (p === 2) {
	        POS = [300, 100];
	      } else if (p === 1){
	        POS = [300, 500];
	      } else if (p === 0) {
	        POS = [400, 300];
	      } else if (p === 3) {
	        POS = [200, 300];
	      } else {
	        POS = [50, 300];
	      }
	    } else {
	      if (p === 2) {
	        POS = [700, 100];
	      } else if (p === 1){
	        POS = [700, 500];
	      } else if (p === 0) {
	        POS = [600, 300];
	      } else if (p === 3) {
	        POS = [800, 300];
	      } else {
	        POS = [950, 300];
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
	    this.pos = this.initPos.slice(0, 2);
	    this.vel = [0, 0];
	  }
	
	  changeVel(key) {
	    switch(key) {
	      case 'up':
	        this.vel[1] -= 1;
	        break;
	      case 'down':
	        this.vel[1] += 1;
	        break;
	      case 'left':
	        this.vel[0] -= 1;
	        break;
	      case 'right':
	        this.vel[0] += 1;
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
	    this.vel = [x / 1.05, y / 1.05];
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
	    ctx.fillStyle = "#" + this.color;
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
	  },
	  addHexColor(c1, c2) {
	    c1 = c1.split("");
	    c2 = c2.split("");
	    endResult = [];
	    c1.forEach((it, idx) => {
	      let inner = parseInt(it, 16);
	      inner -= parseInt(c2[idx], 16);
	      endResult.push(Math.abs(inner).toString(16));
	    });
	    return endResult.join("");
	  }
	}
	
	module.exports = Util;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(5);
	class Ball extends MovingObject {
	  constructor(game, team) {
	    const RADIUS = 10;
	    const COLOR = '938832';
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
	    this.vel = [this.vel[0] / 1.1, this.vel[1] / 1.1];
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