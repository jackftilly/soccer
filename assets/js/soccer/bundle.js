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
	document.addEventListener('DOMContentLoaded', () => {
	  let oneLink = document.getElementById('oneLink');
	  let twoLink = document.getElementById('twoLink');
	  let zeroLink = document.getElementById('zeroLink');
	
	  document.getElementById('pause').style.display = 'none';
	  oneLink.addEventListener('click', () => {onePlayer()})
	  twoLink.addEventListener('click', () => {twoPlayer()})
	  zeroLink.addEventListener('click', () => {zeroPlayer()})
	})
	
	function twoPlayer() {
	  startgame(2);
	}
	
	function onePlayer() {
	  startgame(1);
	}
	
	function zeroPlayer() {
	  startgame(3);
	}
	function startgame(numPlays) {
	  let canvas = document.getElementById('pitch');
	  let ctx = canvas.getContext("2d");
	  const game = new Game(ctx, numPlays);
	  game.draw();
	  game.step();
	  initiateKeyBindings(game);
	  document.getElementById('pause').style.display = 'block';
	}
	
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
	
	  key('space', () => game.pauseGame())
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Team = __webpack_require__(2);
	const Ball = __webpack_require__(7);
	const AITeam = __webpack_require__(8);
	class Game {
	  constructor(ctx, numPlays, setTime) {
	    const team1color = '40E0D0';
	    const team2color = 'ffffff';
	    this.ctx = ctx;
	    if (numPlays === 1) {
	      this.team1 = new Team(this, team1color, true);
	      this.team2 = new AITeam(this, team2color, false);
	    } else if (numPlays === 2) {
	      this.team1 = new Team(this, team1color, true);
	      this.team2 = new Team(this, team2color, false)
	    } else {
	      this.team1 = new AITeam(this, team1color, true);
	      this.team2 = new AITeam(this, team2color, false);
	    }
	    this.ball = new Ball(this, this.team1);
	    this.players = this.team1.team.concat(this.team2.team);
	    this.updateScoreBoard();
	    this.paused = true;
	    this.timeFromNow();
	  }
	
	  timeFromNow() {
	    this.time = 0;
	    let timerId = setInterval(() => {
	      this.time += 1;
	      if (this.paused) {
	        this.time -= 1;
	      }
	      if (this.time === 180) {
	        clearInterval(timerId);
	      }
	      document.getElementById('time-left').innerHTML = (this.time / 2);
	    }, 1000);
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
	    if (this.paused) {
	
	    } else {
	      if (teamNum === 1) {
	        let pos = this.team1.accel(key);
	      } else {
	        let pos = this.team2.accel(key);
	      }
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
	    this.team1.move(this.ball);
	    this.team2.move(this.ball);
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
	
	  showGoal(team) {
	    let goalCover = document.getElementById('goal');
	    this.paused = true;
	    goalCover.innerHTML = "GOALLLLLL team" + team;
	    goalCover.style.display = 'block';
	    setTimeout(() => {
	      goalCover.style.display = 'none'
	    }, 5000);
	  }
	
	  scored(team) {
	    this.showGoal(team);
	    this.resetPieces();
	    if (team === 1) {
	      this.team1.score();
	    } else {
	      this.team2.score();
	    }
	    this.updateScoreBoard();
	  }
	
	  pauseGame() {
	    if (this.paused) {
	      document.getElementById('instructions').style.display = 'none'
	      this.paused = false;
	    } else {
	      this.paused = true;
	    }
	    this.step();
	  }
	
	  gameOver() {
	    document.getElementById('game-over').style.display = 'block';
	  }
	
	  step() {
	    let timerId = setInterval(() => {
	      let dateNow = new Date();
	      if (this.paused) {
	        clearInterval(timerId);
	        this.showPause();
	      } else {
	        this.hidePause();
	      }
	      if (this.time === 180) {
	        clearInterval(timerId);
	        this.gameOver();
	      }
	      this.move();
	      this.checkCollisions();
	      this.draw();
	      this.reduceVel();
	    }, 20)
	  }
	
	  hidePause() {
	    let pauseCover = document.getElementById('pause');
	    pauseCover.style.display = 'none';
	  }
	
	  showPause() {
	    let pauseCover = document.getElementById('pause');
	    pauseCover.style.display = 'block';
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
	const Keeper = __webpack_require__(6);
	const Util = __webpack_require__(5);
	class Team {
	  constructor(game, color, side) {
	    const p1 = new Player(color, game, 0, side);
	    const p2 = new Player(color, game, 1, side);
	    const p3 = new Player(color, game, 2, side);
	    const p4 = new Player(color, game, 3, side);
	    const p5 = new Keeper(color, game, 4, side);
	
	    this.goals = 0;
	    this.color = color;
	    this.currentPlayer = 0;
	    this.team = [p1, p2, p3, p4, p5];
	    this.origColor = color;
	    this.team[0].color = this.activeColor();
	    this.game = game;
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
	      this.team[this.currentPlayer].color = this.origColor;
	      let closestPlayer = this.getClosestPlayer(this.game.ball.pos, 1);
	      if (closestPlayer === this.currentPlayer) {
	        closestPlayer = this.getClosestPlayer(this.game.ball.pos, 2);
	      }
	      this.currentPlayer = closestPlayer;
	      this.team[closestPlayer].color = this.activeColor();
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
	
	  move(ball) {
	    let closestPlayerIdx = this.getClosestPlayer(ball.pos);
	    this.team.forEach((player, idx) => {
	      if (idx === this.currentPlayer) {
	        player.move();
	      } else if (idx === closestPlayerIdx) {
	        player.moveToBall(ball);
	      } else {
	        player.moveWithFlow(ball);
	      }
	    });
	  }
	
	  getClosestPlayer(ballPos, num) {
	    let closestPlayer = 0;
	    let secondClosest = 1;
	    this.team.forEach((player, idx) => {
	      let dist = player.distanceFrom(ballPos);
	      if (dist < this.team[closestPlayer].distanceFrom(ballPos)) {
	        secondClosest = closestPlayer;
	        closestPlayer = idx;
	      }
	    });
	    if (num === 1) {
	      return closestPlayer;
	    } else if (num === 2) {
	      return secondClosest;
	    }
	  }
	
	
	
	}
	
	
	module.exports = Team;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	class Player extends MovingObject {
	  constructor(color, game, p, side) {
	    const RADIUS = 10;
	    const randX = Math.floor(Math.random() * 902.4 + 10);
	    const randY = Math.floor(Math.random() * 480 + 10);
	
	    let POS;
	    if (side) {
	      if (p === 2) {
	        POS = [225, 100];
	      } else if (p === 1){
	        POS = [400, 400];
	      } else if (p === 0) {
	        POS = [400, 200];
	      } else if (p === 3) {
	        POS = [225, 500];
	      } else if (p === 4) {
	        POS = [20, 300];
	      } else {
	        let x = Math.floor(Math.random() * 500);
	        let y = Math.floor(Math.random() * 300);
	        POS = [x, y];
	      }
	    } else {
	      if (p === 2) {
	        POS = [775, 100];
	      } else if (p === 1){
	        POS = [600, 400];
	      } else if (p === 0) {
	        POS = [600, 200];
	      } else if (p === 3) {
	        POS = [775, 500];
	      } else if (p === 4){
	        POS = [980, 300];
	      } else {
	        let x = Math.floor(Math.random() * 500);
	        let y = Math.floor(Math.random() * 300);
	        POS = [500 + x, 300 + y];
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
	      if (this.vel[1] > -7) {
	        this.vel[1] -= 1;
	      }
	        break;
	      case 'down':
	        if (this.vel[1] < 7) {
	          this.vel[1] += 1;
	        }
	        break;
	      case 'left':
	        if (this.vel[0] > -7) {
	          this.vel[0] -= 1;
	        }
	        break;
	      case 'right':
	        if (this.vel[0] < 7) {
	          this.vel[0] += 1;
	        }
	        break;
	    }
	  }
	  aiChangeVel(vec) {
	    if ((this.vel[0] < 10) && (this.vel[0] > -10)) {
	      this.vel[0] += vec[0];
	    }
	    if ((this.vel[1] < 10) && (this.vel[1] > -10)) {
	      this.vel[1] += vec[1];
	    }
	  }
	
	  checkCollision(pos) {
	    let playX = this.pos[0];
	    let playY = this.pos[1];
	    let maxX = playX + 15;
	    let minX = playX - 15;
	    let maxY = playY + 15;
	    let minY = playY - 15;
	    if ((pos[0] < minX) || (pos[0] > maxX) || (pos[1] < minY) || (pos[1] > maxY)) {
	      return false;
	    } else {
	      return true;
	    }
	  }
	
	  distanceFrom(pos) {
	    let x = this.pos[0];
	    let y = this.pos[1];
	
	    let diffX = Math.abs(pos[0] - x);
	    let diffY = Math.abs(pos[1] - y);
	
	    let dist = Math.sqrt((diffX * diffX) + (diffY * diffY));
	    return dist;
	  }
	
	  reduceVel() {
	    let x = this.vel[0];
	    let y = this.vel[1];
	    this.vel = [x / 1.15, y / 1.15];
	    if ((Math.abs(this.vel[0]) < 0.5) && (Math.abs(this.vel[1]) < 0.5)) {
	      this.vel = [0, 0]
	    }
	  }
	
	  moveWithFlow(ball) {
	    if (ball.pos[0] > this.pos[0]) {
	      this.vel = [2, 0];
	    } else {
	      this.vel = [-2, 0]
	    }
	     this.move();
	  }
	
	  moveToBall(ball) {
	    let dist = this.distanceFrom(ball.pos);
	    let addingVec = dist / 5;
	    let ballVec = ball.getUnitVec();
	    ballVec[0] += ball.vel[0];
	    ballVec[1] += ball.vel[1];
	    let ballPos = ball.pos.slice(0, 2);
	    ballPos[0] += ballVec[0];
	    ballPos[1] += ballVec[1];
	
	    let x = this.pos[0];
	    let y = this.pos[1];
	
	    let diffX = ballPos[0] - x;
	    let diffY = ballPos[1] - y;
	    let diffPos = [diffX, diffY];
	    let dist2 = Math.sqrt((diffX * diffX) + (diffY * diffY));
	    if (dist > 50) {
	      
	    }
	    diffPos[0] /= dist2;
	    diffPos[1] /= dist2;
	    this.aiChangeVel(diffPos);
	    this.move();
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
	    if ((this.pos[0] < 10) || (this.pos[0] > 990)) {
	      this.vel = [-this.vel[0], this.vel[1]];
	      if (this.pos[0] < 300) {
	        this.pos = [10, this.pos[1]];
	      } else {
	        this.pos = [990, this.pos[1]];
	      }
	    } else if ((this.pos[1] < 10) || (this.pos[1] > 590)) {
	      this.vel = [this.vel[0], -this.vel[1]];
	      if (this.pos[1] < 300) {
	        this.pos = [this.pos[0], 10];
	      } else {
	        this.pos = [this.pos[0], 590];
	      }
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

	const Player = __webpack_require__(3);
	
	class Keeper extends Player {
	  constructor(color, game, p, side) {
	    super('123456', game, p, side);
	    this.initPos = this.pos.slice(0, 2);
	  }
	
	  moveWithFlow(ball) {
	    if (this.initPos[0] > 20) {
	      if (this.pos[0] > 750) {
	        if (ball.vel[1] > 0) {
	          if ((ball.pos[1] > 500) || (this.pos[1] > 340)) {
	            this.vel = [0, -1];
	          } else {
	            this.vel = [0, 2];
	          }
	        } else {
	          if ((ball.pos[1] < 100) || (this.pos[1] < 260)) {
	            this.vel = [0, 1];
	          } else {
	            this.vel = [0, -2];
	          }
	        }
	      } else {
	        this.vel = [2, 0]
	      }
	    } else {
	      if (this.pos[0] < 250) {
	        if (ball.vel[1] > 0) {
	          if ((ball.pos[1] > 500) || (this.pos[1] > 340)) {
	            this.vel = [0, -1];
	          } else {
	            this.vel = [0, 2];
	          }
	        } else {
	          if ((ball.pos[1] < 100) || (this.pos[1] < 260)) {
	            this.vel = [0, 1];
	          } else {
	            this.vel = [0, -2];
	          }
	        }
	      } else {
	        this.vel = [-2, 0]
	      }
	    }
	    this.move();
	  }
	}
	
	module.exports = Keeper;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(5);
	class Ball extends MovingObject {
	  constructor(game, team) {
	    const RADIUS = 5;
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
	    this.vel = [this.vel[0] / 1.2, this.vel[1] / 1.2];
	  }
	
	  collision(vel) {
	    let velMag = Math.sqrt((vel[0] * vel[0]) + (vel[1] * vel[1]));
	    this.vel[0] = vel[0] * velMag / 2;
	    this.vel[1] = vel[1] * velMag / 2;
	  }
	  move () {
	    this.pos[0] += this.vel[0];
	    this.pos[1] += this.vel[1];
	    if ((this.pos[0] < 10) || (this.pos[0] > 990)) {
	      if ((this.pos[1] > 250) && (this.pos[1] < 350)) {
	        if (this.pos[0] < 500) {
	          this.game.scored(2);
	        } else {
	          this.game.scored(1);
	        }
	        this.vel = [0, 0];
	        this.pos = [500, 300];
	      } else {
	        this.vel = [-this.vel[0], this.vel[1]];
	        if (this.pos[0] < 500) {
	          this.pos = [10, this.pos[1]];
	        } else {
	          this.pos = [990, this.pos[1]];
	        }
	      }
	    } else if ((this.pos[1] < 10) || (this.pos[1] > 590)) {
	      this.vel = [this.vel[0], -this.vel[1]];
	      if (this.pos[1] < 200) {
	        this.pos = [this.pos[0], 10];
	      } else {
	        this.pos = [this.pos[0], 590]
	      }
	    }
	  }
	
	  getUnitVec() {
	    let vel = this.vel.slice(0, 2);
	    let velLen = Math.sqrt((vel[0] * vel[0]) + (vel[1] * vel[1]));
	    if (velLen) {
	      vel[0] /= velLen;
	      vel[1] /= velLen;
	    }
	    return vel;
	  }
	
	}
	
	module.exports = Ball;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const Team = __webpack_require__(2);
	class AITeam extends Team {
	  constructor(game, color, side) {
	    super (game, color, side);
	    this.currentPlayer = null;
	  }
	  move(ball) {
	    let closestPlayerIdx = this.getClosestPlayer(ball.pos, 1);
	    this.team.forEach((player, idx) => {
	      if (idx === closestPlayerIdx) {
	        player.moveToBall(ball);
	      } else {
	        player.moveWithFlow(ball);
	      }
	    });
	  }
	
	  resetPlayers() {
	    this.team.forEach(player => {
	      player.resetPlayer();
	    });
	  }
	}
	
	module.exports = AITeam;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map