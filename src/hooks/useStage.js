import { useState, useEffect } from 'react';

import { createStage } from '../utils/gameHelpers';

const useStage = (player, resetPlayer) => {
  console.log(resetPlayer);

  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    // First flush stage
    const updateStage = (prevStage) => {
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // Draw the shape
      player.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player]);

  return { stage, setStage };
};

export default useStage;
