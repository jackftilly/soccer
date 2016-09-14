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
  key('left', () => game.accel(1, 'left'));
  key('up', () => game.accel(1, 'up'));
  key('down', () => game.accel(1, 'down'));
  key('right', () => game.accel(1, 'right'));

  key('.', () => game.switchPlayers(1));


  key('a', () => game.accel(2, 'left'));
  key('w', () => game.accel(2, 'up'));
  key('s', () => game.accel(2, 'down'));
  key('d', () => game.accel(2, 'right'));

  key('t', () => game.switchPlayers(2));
}
