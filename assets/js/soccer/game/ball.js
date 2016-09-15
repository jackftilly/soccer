const MovingObject = require('./moving_object.js');
const Util = require('../util/util.js');
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
