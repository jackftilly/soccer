const Team = require('../team/team.js');
const Ball = require('./ball.js');
class Game {
  constructor(ctx) {
    const color = '#40E0D0';
    this.ctx = ctx;
    this.team1 = new Team(this, color);
    this.ball = new Ball(this, this.team1);
    this.players = this.team1.team;
  }

  draw() {
    createCourt(this.ctx);
    this.team1.draw(this.ctx);
    this.ball.draw(this.ctx);
  }

  accel(key) {
    let pos = this.team1.accel(key);
  }
  switchPlayers() {
    this.team1.switchPlayers();
  }
  move() {
    this.players.forEach(player => {
      player.move();
    });
    this.ball.move();
  }

  reduceVel() {
    this.team1.reduceVel();
    this.ball.reduceVel();
  }

  checkCollisions() {
    this.players.forEach(player => {
      if (player.checkCollision(this.ball.pos)) {
        this.ball.collision(player.vel);
      }
    });
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
