const Player = require('./player.js');
const Util = require('../util/util.js');
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
