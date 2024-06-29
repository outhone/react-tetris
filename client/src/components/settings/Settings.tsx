import { useViewContext, ViewActionType } from '../../context/ViewProvider';
import GameButton from '../common/GameButton';
import ShapeSelector from './ShapeSelector';

const Settings = () => {
  const { dispatch } = useViewContext();
  return (
    <>
      <ShapeSelector />
      <GameButton
        callback={() => dispatch({ type: ViewActionType.SET_HOME })}
        text="Home"
      />
    </>
  );
};

export default Settings;
