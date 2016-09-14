const MovingObject = require('../game/moving_object.js');
class Player extends MovingObject {
  constructor(color, game, p, side) {
    const RADIUS = 15;
    const randX = Math.floor(Math.random() * 902.4 + 10);
    const randY = Math.floor(Math.random() * 480 + 10);

    let POS;
    if (side) {
      if (p === 2) {
        POS = [300, 100];
      } else if (p === 1){
        POS = [300, 500];
      } else if (p === 0) {
        POS = [400, 300];
      } else if (p === 3) {
        POS = [200, 300];
      } else {
        POS = [50, 300];
      }
    } else {
      if (p === 2) {
        POS = [700, 100];
      } else if (p === 1){
        POS = [700, 500];
      } else if (p === 0) {
        POS = [600, 300];
      } else if (p === 3) {
        POS = [800, 300];
      } else {
        POS = [950, 300];
      }
    }
    const COLOR = color;
    const options = {
      radius: RADIUS,
      color: COLOR,
      pos: POS,
      vel: [0, 0],
      game: game
    };
    super(options);
    this.initPos = POS.slice(0, 2);
  }

  resetPlayer() {
    this.pos = this.initPos.slice(0, 2);
    this.vel = [0, 0];
  }

  changeVel(key) {
    switch(key) {
      case 'up':
        this.vel[1] -= 1;
        break;
      case 'down':
        this.vel[1] += 1;
        break;
      case 'left':
        this.vel[0] -= 1;
        break;
      case 'right':
        this.vel[0] += 1;
        break;
    }
  }

  checkCollision(pos) {
    let playX = this.pos[0];
    let playY = this.pos[1];
    let maxX = playX + 25;
    let minX = playX - 25;
    let maxY = playY + 25;
    let minY = playY - 25;
    if ((pos[0] < minX) || (pos[0] > maxX) || (pos[1] < minY) || (pos[1] > maxY)) {
      return false;
    } else {
      return true;
    }
  }

  reduceVel() {
    let x = this.vel[0];
    let y = this.vel[1];
    this.vel = [x / 1.05, y / 1.05];
    if ((Math.abs(this.vel[0]) < 0.5) && (Math.abs(this.vel[1]) < 0.5)) {
      this.vel = [0, 0]
    }
  }
}

module.exports = Player;
