import { useViewContext, ViewActionType } from '../../context/ViewProvider';
import GameButton from '../common/GameButton';
import ShapeSelector from './ShapeSelector';
import './Settings.css';

const Settings = () => {
  const { dispatch } = useViewContext();
  return (
    <div className="settingsContainer">
      <h1 className="text-white">Add Extra Shapes</h1>
      <ShapeSelector />
      <div className="gameTypeBtnContainer">
        <GameButton
          callback={() => dispatch({ type: ViewActionType.SET_HOME })}
          text="Home"
        />
      </div>
    </div>
  );
};

export default Settings;
