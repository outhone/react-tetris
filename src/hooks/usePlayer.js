import { useState, useCallback } from 'react';

import { SHAPES, randomShape } from '../utils/shapes';
import { STAGE_WIDTH, checkCollision } from '../utils/gameHelpers';

const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    shape: SHAPES[0].shape,
    collided: false,
  });

  const rotate = (matrix, dir) => {
    // Make the rows to be cols (transpose)
    const rotatedShape = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );

    // Reverse each row to get a rotated matrix
    if (dir > 0) {
      return rotatedShape.map((row) => row.reverse());
    }
    return rotatedShape.reverse();
  };

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.shape = rotate(clonedPlayer.shape, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.shape[0].length) {
        rotate(clonedPlayer.shape, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayer = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      shape: randomShape().shape,
      collided: false,
    });
  }, []);

  return { player, playerRotate, updatePlayer, resetPlayer };
};

export default usePlayer;
