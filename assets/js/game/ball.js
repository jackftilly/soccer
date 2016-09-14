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

  reduceVel() {
    this.vel = [this.vel[0] / 1.03, this.vel[1] / 1.03];
  }

  collision(vel) {
    this.vel[0] += vel[0];
    this.vel[1] += vel[1];
  }
}

module.exports = Ball;
