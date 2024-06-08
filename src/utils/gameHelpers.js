export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear'])
  );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.shape.length; y += 1) {
    for (let x = 0; x < player.shape[y].length; x += 1) {
      // Check if cell is 0 or not
      if (player.shape[y][x] !== 0) {
        if (
          // Check if movement inside the game area height
          // Check it shouldn't go through the bottom area
          !stage[y + player.pos.y + moveY] ||
          // Check move is within the game width
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // Check the cell we're moving to isn't set clean
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            'clear'
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
