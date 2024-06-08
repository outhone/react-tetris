// import { useState } from 'react';
import { createStage } from '../utils/gameHelpers';

// Components
import Stage from './Stage';
import Display from './Display';
// import StartButton from './StartButton';

const Tetris = () => (
  // const [gameOver, setGameOver] = useState(false);

  <div className="tetrisWrapper">
    <div className="tetris">
      <Stage stage={createStage()} />
      <aside>
        <Display text="Score" />
        <Display text="Rows" />
        <Display text="Level" />
        {/* <StartButton /> */}
      </aside>
    </div>
  </div>
);
export default Tetris;
