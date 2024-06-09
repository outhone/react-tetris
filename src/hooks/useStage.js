import { useState, useEffect } from 'react';

import { createStage } from '../utils/gameHelpers';

const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);
    const clearRows = (newStage) =>
      newStage.reduce((acc, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          return acc;
        }
        acc.push(row);
        return acc;
      }, []);

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

      // Check if we collided
      if (player.collided) {
        resetPlayer();
        return clearRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player.collided, player.pos.x, player.pos.y, player.shape, resetPlayer]);

  return { stage, setStage, rowsCleared };
};

export default useStage;
