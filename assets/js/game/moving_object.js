const Util = require("../util/util.js");
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
    ctx.fillStyle = this.color;
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
    if ((this.pos[0] < 0) || (this.pos[0] > 1000)) {
      this.vel = [-this.vel[0], this.vel[1]];
    } else if ((this.pos[1] < 0) || (this.pos[1] > 600)) {
      this.vel = [this.vel[0], -this.vel[1]];
    }
  }

}


module.exports = MovingObject;
