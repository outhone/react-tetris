import { useDispatch } from 'react-redux';
import GameButton from '../common/GameButton';
import Highscore from './Highscore';
import { goSinglePlayer } from '../../reducers/pageReducer';

const Home = () => {
  const dispatch = useDispatch();

  return (
    <div className="tetrisWrapper text-white">
      <Highscore />
      <div className="gameTypeBtnContainer">
        <GameButton
          callback={() => dispatch(goSinglePlayer())}
          text="Single Player"
        />
        {/*
      <GameButton
        callback={() => setView('two-player-game')}
        text="Two Player"
/> */}
      </div>
    </div>
  );
};

export default Home;
