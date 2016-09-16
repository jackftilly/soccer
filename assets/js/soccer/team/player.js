const MovingObject = require('../game/moving_object.js');
class Player extends MovingObject {
  constructor(color, game, p, side) {
    const RADIUS = 10;
    const randX = Math.floor(Math.random() * 902.4 + 10);
    const randY = Math.floor(Math.random() * 480 + 10);

    let POS;
    if (side) {
      if (p === 2) {
        POS = [225, 100];
      } else if (p === 1){
        POS = [400, 400];
      } else if (p === 0) {
        POS = [400, 200];
      } else if (p === 3) {
        POS = [225, 500];
      } else if (p === 4) {
        POS = [20, 300];
      } else {
        let x = Math.floor(Math.random() * 500);
        let y = Math.floor(Math.random() * 300);
        POS = [x, y];
      }
    } else {
      if (p === 2) {
        POS = [775, 100];
      } else if (p === 1){
        POS = [600, 400];
      } else if (p === 0) {
        POS = [600, 200];
      } else if (p === 3) {
        POS = [775, 500];
      } else if (p === 4){
        POS = [980, 300];
      } else {
        let x = Math.floor(Math.random() * 500);
        let y = Math.floor(Math.random() * 300);
        POS = [500 + x, 300 + y];
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
      if (this.vel[1] > -7) {
        this.vel[1] -= 1;
      }
        break;
      case 'down':
        if (this.vel[1] < 7) {
          this.vel[1] += 1;
        }
        break;
      case 'left':
        if (this.vel[0] > -7) {
          this.vel[0] -= 1;
        }
        break;
      case 'right':
        if (this.vel[0] < 7) {
          this.vel[0] += 1;
        }
        break;
    }
  }
  aiChangeVel(vec) {
    if ((this.vel[0] < 10) && (this.vel[0] > -10)) {
      this.vel[0] += vec[0];
    }
    if ((this.vel[1] < 10) && (this.vel[1] > -10)) {
      this.vel[1] += vec[1];
    }
  }

  distanceFrom(pos) {
    let x = this.pos[0];
    let y = this.pos[1];

    let diffX = Math.abs(pos[0] - x);
    let diffY = Math.abs(pos[1] - y);

    let dist = Math.sqrt((diffX * diffX) + (diffY * diffY));
    return dist;
  }

  reduceVel() {
    let x = this.vel[0];
    let y = this.vel[1];
    this.vel = [x / 1.15, y / 1.15];
    if ((Math.abs(this.vel[0]) < 0.5) && (Math.abs(this.vel[1]) < 0.5)) {
      this.vel = [0, 0]
    }
  }

  moveWithFlow(ball) {
    if (ball.pos[0] > this.pos[0]) {
      this.vel = [2, 0];
    } else {
      this.vel = [-2, 0]
    }
     this.move();
  }

  moveToBall(ball) {
    let dist = this.distanceFrom(ball.pos);
    let addingVec = dist / 5;
    let ballVec = ball.getUnitVec();
    ballVec[0] += ball.vel[0];
    ballVec[1] += ball.vel[1];
    let ballPos = ball.pos.slice(0, 2);
    ballPos[0] += ballVec[0];
    ballPos[1] += ballVec[1];

    let x = this.pos[0];
    let y = this.pos[1];

    let diffX = ballPos[0] - x;
    let diffY = ballPos[1] - y;
    let diffPos = [diffX, diffY];
    let dist2 = Math.sqrt((diffX * diffX) + (diffY * diffY));

    diffPos[0] /= dist2;
    diffPos[1] /= dist2;
    this.aiChangeVel(diffPos);
    this.move();
  }

}

module.exports = Player;
