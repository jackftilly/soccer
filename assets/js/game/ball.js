const MovingObject = require('./moving_object.js');
const Util = require('../util/util.js');
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
