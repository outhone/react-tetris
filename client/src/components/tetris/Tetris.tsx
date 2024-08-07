import { useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import Button from '@mui/material/Button';
// import { useDispatch } from 'react-redux';
// import { goHome } from '../../pageReducer';
import { useViewContext, ViewActionType } from '../../context/ViewProvider';

import {
  createStage,
  checkCollision,
  STAGE_HEIGHT,
} from '../../utils/gameHelpers';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import PauseButton from './PauseButton';

// Custom Hooks
import usePlayer from '../../hooks/usePlayer';
import useStage from '../../hooks/useStage';
import useInterval from '../../hooks/useInterval';
import useGameStatus from '../../hooks/useGameStatus';
import TransitionsModal from '../common/TextTransitionsModal';
import AddHighScoreModal from './AddHighScoreModal';

const Tetris = () => {
  // const dispatch = useDispatch();
  const { dispatch } = useViewContext();

  const [dropTime, setDropTime] = useState<null | number>(null);
  const [gameOver, setGameOver] = useState(false);
  const [pausedGame, setPausedGame] = useState(false);
  const [showHighScoreModal, setShowHighScoreModal] = useState(false);

  const { player, playerRotate, updatePlayer, resetPlayer } = usePlayer();
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } =
    useGameStatus(rowsCleared);

  // Fetch 5th highscore from database, don't really need to use react query for this
  useEffect(() => {
    if (gameOver) {
      const fetchMinScore = async () => {
        try {
          const data = await fetch(
            `${process.env.REACT_APP_API_URL}/api/highscores/5`
          );
          const minScore = await data.json();
          if (score > minScore) {
            setShowHighScoreModal(true);
          }
        } catch {
          // Todo: Send error to sentry.io
        }
      };
      fetchMinScore();
    }
  }, [gameOver]);

  const moveLeftRight = (dir: number) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 }) && !player.collided) {
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

    if (!checkCollision(player, stage, { x: 0, y: 1 }) && !player.collided) {
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
    if (!gameOver) {
      e.preventDefault();
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
          setDropTime(null);
          dropToBottom();
        }
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
          {gameOver && showHighScoreModal && (
            <AddHighScoreModal score={score} />
          )}
          <TransitionsModal
            btnText="How to Play"
            title="How to Play Tetris"
            description={`Use your computer's arrow keys to move the block LEFT, RIGHT, or DOWN. 
            Use the UP arrow key to rotate the block. 
            Use the SPACE BAR key to instantly drop the block down.`}
          />
          <Button onClick={() => dispatch({ type: ViewActionType.SET_HOME })}>
            Go Home
          </Button>
        </aside>
      </div>
    </div>
  );
};

export default Tetris;
