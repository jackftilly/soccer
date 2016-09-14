const Game = require('./game/gameplay.js');
document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById('court');
  let ctx = canvas.getContext("2d");
  const game = new Game(ctx);
  game.draw();
  game.step();
  initiateKeyBindings(game);
});

function initiateKeyBindings(game) {
  key('left', () => game.accel('left'));
  key('up', () => game.accel('up'));
  key('down', () => game.accel('down'));
  key('right', () => game.accel('right'));

  key('x', () => game.switchPlayers());
}
