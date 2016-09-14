const Player = require('./player.js');
class Team {
  constructor(game, color, side) {
    const p1 = new Player(color, game, 0, side);
    const p2 = new Player(color, game, 1, side);
    this.score = 0;
    this.currentPlayer = 0;
    this.team = [p1, p2]
  }

  score(amnt) {
    this.score += amnt;
  }
  draw(ctx) {
    this.team.forEach(player => {
      player.draw(ctx);
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
