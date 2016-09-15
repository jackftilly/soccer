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
    ctx.fillStyle = "#" + this.color;
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
    if ((this.pos[0] < 10) || (this.pos[0] > 990)) {
      this.vel = [-this.vel[0], this.vel[1]];
      if (this.pos[0] < 300) {
        this.pos = [10, this.pos[1]];
      } else {
        this.pos = [990, this.pos[1]];
      }
    } else if ((this.pos[1] < 10) || (this.pos[1] > 590)) {
      this.vel = [this.vel[0], -this.vel[1]];
      if (this.pos[1] < 300) {
        this.pos = [this.pos[0], 10];
      } else {
        this.pos = [this.pos[0], 590];
      }
    }
  }

}


module.exports = MovingObject;
