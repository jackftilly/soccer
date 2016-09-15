const Player = require('./player.js');

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
