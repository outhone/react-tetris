import { useState } from 'react';
import type { KeyboardEvent } from 'react';

import { createStage, checkCollision } from '../utils/gameHelpers';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

// Custom Hooks
import usePlayer from '../hooks/usePlayer';
import useStage from '../hooks/useStage';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const { player, updatePlayer, resetPlayer } = usePlayer();
  const { stage, setStage } = useStage(player, resetPlayer);

  console.log('rendering');
  console.log(stage);
  console.log(dropTime);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const movePlayer = (dir: any) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayer({ x: dir, y: 0, collided: false });
    }
  };

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayer({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        console.log('Game Over!!!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayer({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    drop();
  };

  const move = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver) {
      if (e.key === 'ArrowLeft') {
        movePlayer(-1);
      } else if (e.key === 'ArrowRight') {
        movePlayer(1);
      } else if (e.key === 'ArrowDown') {
        dropPlayer();
      } else if (e.key === 'ArrowUp') {
        console.log('Arrow up');
      }
    }
  };

  return (
    <div
      className="tetrisWrapper"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => move(e)}
    >
      <div className="tetris">
        <Stage stage={stage} />
        <aside>
          <Display text="Score" />
          <Display text="Rows" />
          <Display text="Level" />
          <StartButton callback={startGame} />
          {gameOver && <Display text="Game Over" />}
        </aside>
      </div>
    </div>
  );
};

export default Tetris;
