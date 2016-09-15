const Team = require('./team.js');
class AITeam extends Team {
  constructor(game, color, side) {
    super (game, color, side);
    this.currentPlayer = null;
  }
  move(ball) {
    let closestPlayerIdx = this.getClosestPlayer(ball.pos, 1);
    this.team.forEach((player, idx) => {
      if (idx === closestPlayerIdx) {
        player.moveToBall(ball);
      } else {
        player.moveWithFlow(ball);
      }
    });
  }

  resetPlayers() {
    this.team.forEach(player => {
      player.resetPlayer();
    });
  }
}

module.exports = AITeam;
