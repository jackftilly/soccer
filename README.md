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

## code
The code for this small project all lives within an assets folder. There is a JavaScript folder within assets that contains numerous subfolders with pure JavaScript inside.

Thank you for checking out my project! I hope you enjoy beating the computer at Soccer in San Francisco!
