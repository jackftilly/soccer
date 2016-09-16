const Team = require('../team/team.js');
const Ball = require('./ball.js');
const AITeam = require('../team/aiTeam.js');
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
      if (this.time === 360) {
        clearInterval(timerId);
      }
      document.getElementById('time-left').innerHTML = (this.time / 4);
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
    this.ball.checkCollision(this.players);
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
      if (this.time === 360) {
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
