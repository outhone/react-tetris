import { useState } from 'react';
import type { KeyboardEvent } from 'react';

import {
  createStage,
  checkCollision,
  STAGE_HEIGHT,
} from '../utils/gameHelpers';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import PauseButton from './PauseButton';

// Custom Hooks
import usePlayer from '../hooks/usePlayer';
import useStage from '../hooks/useStage';
import useInterval from '../hooks/useInterval';
import useGameStatus from '../hooks/useGameStatus';

const Tetris = () => {
  const [dropTime, setDropTime] = useState<null | number>(null);
  const [gameOver, setGameOver] = useState(false);
  const [pausedGame, setPausedGame] = useState(false);

  const { player, playerRotate, updatePlayer, resetPlayer } = usePlayer();
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } =
    useGameStatus(rowsCleared);

  const moveLeftRight = (dir: number) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayer({ x: dir, y: 0, collided: false });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setRows(0);
    setLevel(0);
    setGameOver(false);
    setPausedGame(false);
  };

  const drop = () => {
    // increase level after 10 cleared rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayer({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayer({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver && !pausedGame) {
      if (e.key === 'ArrowDown') {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const dropToBottom = () => {
    for (let i = 1; i < STAGE_HEIGHT; i += 1) {
      if (!checkCollision(player, stage, { x: 0, y: i })) {
        // Loop until collision happens to get the biggest jump down the shape can take
      } else {
        // Jump to the bottom of the stage
        // Set collide to true if you don't want users to have chance to rotate or move the shape after the absolute drop
        updatePlayer({ x: 0, y: i - 1, collided: false });
        setDropTime(1000 / (level + 1) + 200);
        break;
      }
    }
  };

  const move = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver && !pausedGame) {
      if (e.key === 'ArrowLeft') {
        moveLeftRight(-1);
      } else if (e.key === 'ArrowRight') {
        moveLeftRight(1);
      } else if (e.key === 'ArrowDown') {
        dropPlayer();
      } else if (e.key === 'ArrowUp') {
        playerRotate(stage, 1);
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        setDropTime(null);
        dropToBottom();
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  const onPause = () => {
    if (pausedGame) {
      setDropTime(1000 / (level + 1) + 200);
    } else {
      setDropTime(null);
    }
    setPausedGame(!pausedGame);
  };

  return (
    <div
      className="tetrisWrapper"
      role="button"
      tabIndex={0}
      onKeyUp={(e) => keyUp(e)}
      onKeyDown={(e) => move(e)}
    >
      <div className="tetris">
        <Stage stage={stage} />
        <aside>
          <Display text={`Score: ${score}`} />
          <Display text={`Rows: ${rows}`} />
          <Display text={`Level: ${level}`} />
          <StartButton callback={startGame} />
          {!gameOver && player.shape.length > 1 && (
            <PauseButton callback={onPause} status={pausedGame} />
          )}
          {gameOver && <Display text="Game Over" />}
        </aside>
      </div>
    </div>
  );
};

export default Tetris;
