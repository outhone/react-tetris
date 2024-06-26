// import { useDispatch } from 'react-redux';
import GameButton from '../common/GameButton';
import Highscore from './Highscore';
// import { goSinglePlayer } from '../../pageReducer';
import { useViewContext, ViewActionType } from '../../context/ViewProvider';

const Home = () => {
  // const dispatch = useDispatch();
  const { dispatch } = useViewContext();

  return (
    <div className="text-white">
      <Highscore />
      <div className="gameTypeBtnContainer">
        <GameButton
          // callback={() => dispatch(goSinglePlayer())}
          callback={() => dispatch({ type: ViewActionType.SET_SINGLE_GAME })}
          text="Play Game"
        />
        <GameButton
          // callback={() => dispatch(goSinglePlayer())}
          callback={() => dispatch({ type: ViewActionType.SET_SETTINGS })}
          text="Settings"
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
