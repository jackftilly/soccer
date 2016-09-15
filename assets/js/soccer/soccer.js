const Game = require('./game/gameplay.js');
document.addEventListener('DOMContentLoaded', () => {
  let oneLink = document.getElementById('oneLink');
  let twoLink = document.getElementById('twoLink');
  let zeroLink = document.getElementById('zeroLink');

  document.getElementById('pause').style.display = 'none';
  oneLink.addEventListener('click', () => {onePlayer()})
  twoLink.addEventListener('click', () => {twoPlayer()})
  zeroLink.addEventListener('click', () => {zeroPlayer()})
})

function twoPlayer() {
  startgame(2);
}

function onePlayer() {
  startgame(1);
}

function zeroPlayer() {
  startgame(3);
}
function startgame(numPlays) {
  let canvas = document.getElementById('pitch');
  let ctx = canvas.getContext("2d");
  const game = new Game(ctx, numPlays);
  game.draw();
  game.step();
  initiateKeyBindings(game);
  document.getElementById('pause').style.display = 'block';
}

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

  key('space', () => game.pauseGame())
}
