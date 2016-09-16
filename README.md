# Soccer in San Francisco

live: http://www.jacktilly.com/soccer.html

Soccer in San Francisco is a pure vanilla JavaScript game written over the span of a week. It is a two dimensional game that features HTML canvas technology and implements 'keymaster'(link) to control players.

Players are drawn as small circles on the page, that move around as keys are pressed. Instructions for this game are featured on the site:

![Alt Text](/assets/img/instructions.png)

## Game modes
There are three game modes implemented in Soccer in San Francisco.
 - One game mode is Two Player, in which two players can play on the same keyboard using different keys. Player 1 is the blue team and Player 2 is the white team.
 - The second game mode is One player, competing against a CPU with smart movement. This CPU logic is also used to control the players on the user controlled team, when the user isn't controlling them individually.
 - The last game move is CPU vs. CPU. This game mode is just two computer controlled teams facing off against one another.

## CPU logic
The logic behind the CPU is not that smart. There are two modes of moving, one is the general movement of all players on the pitch, moving towards the side where the ball is. The other is the player closest to the ball, moving towards a position slightly before where the ball is to cut it off.

Here is the CPU logic snippet for the player closest to the ball moving towards it. This logic took vector velocities to achieve correctly:

```javascript
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
```

The function aiChangeVel(pos) adds diffPos(the velocity of where the player should move) to the already existing velocity. The function move() is a function for all moving objects including players and ball that just adds velocity to position in an interval. 

## code
The code for this small project all lives within an assets folder. There is a JavaScript folder within assets that contains numerous subfolders with pure JavaScript inside.

Thank you for checking out my project! I hope you enjoy beating the computer at Soccer in San Francisco!
