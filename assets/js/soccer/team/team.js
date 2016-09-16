const Player = require('./player.js');
const Keeper = require('./keeper.js');
const Util = require('../util/util.js');
class Team {
  constructor(game, color, side) {
    const p1 = new Player(color, game, 0, side);
    const p2 = new Player(color, game, 1, side);
    const p3 = new Player(color, game, 2, side);
    const p4= new Player(color, game, 3, side);
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
